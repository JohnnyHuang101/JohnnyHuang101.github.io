require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API = "https://api.github.com";

// ---- CONFIG: match these to your <Project length={8} specfic={[...]} /> usage ----
const USERNAME = process.env.GITHUB_USERNAME;
const LENGTH = parseInt(process.env.PROJECT_LENGTH || "0", 10);
const SPECIFIC_REPOS = (process.env.SPECIFIC_REPOS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const OUTPUT_PATH = path.join(__dirname, "../src/data/projects.json");

// ---- Auth config (token only lives here, in the Actions runner / your local shell) ----
const token = process.env.GITHUB_TOKEN;
if (!token) {
    console.warn(
        "WARNING: No GITHUB_TOKEN set. Falling back to unauthenticated requests (60/hr limit). " +
        "This is fine for local testing but will likely fail in CI without a token."
    );
}
const reqConfig = token
    ? { headers: { Authorization: `token ${token}` } }
    : undefined;

// ---- Same helper logic as your old client-side code ----

const getFirstImageFromReadme = async (owner, repo) => {
    try {
        const res = await axios.get(`${API}/repos/${owner}/${repo}/readme`, reqConfig);
        const markdown = Buffer.from(res.data.content, "base64").toString("utf-8");

        let match = markdown.match(/!\[.*?\]\((.*?)\)/);
        if (!match) {
            match = markdown.match(/<img[^>]+src=["']([^"']+)["']/i);
        }
        if (!match) return null;

        let imageUrl = match[1];
        if (!imageUrl.startsWith("http")) {
            const cleanPath = imageUrl.replace(/^\.\//, "");
            imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${cleanPath}`;
        }
        return imageUrl;
    } catch {
        return null;
    }
};

const fetchLanguages = async (languagesUrl) => {
    try {
        const res = await axios.get(languagesUrl, reqConfig);
        return res.data;
    } catch {
        return {};
    }
};

// NOTE: local preview detection (mp4/gif/png in assets/previews) still works
// the same way at runtime in React — we don't need to replicate that here.
// We just leave previewMedia/previewType null when there's no README image;
// your ProjectCard / getLocalPreview logic in the component can still layer
// local previews on top of this data if you want to keep that feature.

const hydrateRepo = async (repoOrName) => {
    const isString = typeof repoOrName === "string";
    const repoName = isString ? repoOrName : repoOrName.name;

    const repoInfoPromise = isString
        ? axios
            .get(`${API}/repos/${USERNAME}/${repoName}`, reqConfig)
            .then((r) => r.data)
            .catch(() => null)
        : Promise.resolve(repoOrName);

    const readmePromise = getFirstImageFromReadme(USERNAME, repoName);
    const languagesPromise = fetchLanguages(
        `${API}/repos/${USERNAME}/${repoName}/languages`
    );

    const [repoData, image, languagesData] = await Promise.all([
        repoInfoPromise,
        readmePromise,
        languagesPromise,
    ]);

    if (!repoData) return null;

    return {
        name: repoData.name,
        description: repoData.description,
        svn_url: repoData.svn_url,
        html_url: repoData.html_url,
        stargazers_count: repoData.stargazers_count,
        pushed_at: repoData.pushed_at,
        previewImage: image, // README-derived image URL, if any
        languagesData,
    };
};

async function main() {
    console.log(`Fetching repos for ${USERNAME}...`);

    const listRes = await axios.get(
        `${API}/users/${USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
        reqConfig
    );
    const baseRepos = listRes.data.slice(0, LENGTH);

    const allTargets = [...baseRepos, ...SPECIFIC_REPOS];
    const results = await Promise.all(allTargets.map(hydrateRepo));
    const validProjects = results.filter(Boolean);

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(validProjects, null, 2));

    console.log(
        `Wrote ${validProjects.length} projects to ${OUTPUT_PATH}. No token included in output.`
    );
}

main().catch((err) => {
    console.error("fetchProjects.js failed:", err.message);
    process.exit(1); // fail the build loudly if this breaks, rather than shipping stale/empty data silently
});