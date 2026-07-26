import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import axios from "axios";

const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: "dummy", // Keeps Skeleton structure consistent
  pushed_at: null,
  languagesData: null,
};

const API = "https://api.github.com";

const getFirstImageFromReadme = async (owner, repo, reqConfig) => {
  try {
    const res = await axios.get(
      `${API}/repos/${owner}/${repo}/readme`,
      reqConfig
    );

    const markdown = atob(res.data.content);
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

const fetchLanguages = async (languagesUrl, reqConfig) => {
  try {
    const res = await axios.get(languagesUrl, reqConfig);
    return res.data;
  } catch {
    return {};
  }
};

function importAll(r) {
  const files = {};
  r.keys().forEach((item) => {
    const key = item.replace("./", "");
    files[key] = r(item);
  });
  return files;
}

const mediaFiles = importAll(
  require.context(
    "../../assets/previews",
    false,
    /\.(mp4|webm|gif|png|jpg|jpeg)$/i
  )
);

const getLocalPreview = (repoName) => {
  const extensions = ["mp4", "webm", "gif", "png", "jpg", "jpeg"];

  for (const ext of extensions) {
    const filename = `${repoName}.${ext}`;
    if (mediaFiles[filename]) {
      return {
        media: mediaFiles[filename],
        type: ["mp4", "webm"].includes(ext) ? "video" : "image",
      };
    }
  }
  return null;
};

const Project = ({ heading, username, length, specfic = [] }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;

  const dummyProjectsArr = new Array(length + specfic.length).fill(dummyProject);
  const [projectsArray, setProjectsArray] = useState([]);

  const CACHE_KEY = `projects-${username}`;
  const CACHE_DURATION = 1000 * 60 * 60 * 24; // 1 day

  const fetchRepos = useCallback(async () => {
    try {
      // Conditionally attach authorization headers
      const hasToken = Boolean(process.env.REACT_APP_GITHUB_TOKEN);
      const reqConfig = hasToken
        ? {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        }
        : undefined; // Makes explicit unauthenticated calls without extra headers

      // 1. Primary Cache Check
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setProjectsArray(parsed.data);
            return;
          }
        } catch {
          sessionStorage.removeItem(CACHE_KEY);
        }
      }

      // 2. Fetch the main user repos list (WITH key if present, WITHOUT key if missing)
      const response = await axios.get(allReposAPI, reqConfig);
      const baseRepos = response.data.slice(0, length);

      // 3. Helper: Enriches ANY repo firing Metadata, README, and Languages SIMULTANEOUSLY
      const hydrateRepo = async (repoOrName) => {
        const isString = typeof repoOrName === "string";
        const repoName = isString ? repoOrName : repoOrName.name;
        const localPreview = getLocalPreview(repoName);

        // Deterministic URLs — fire ALL 3 requests in parallel immediately!
        const repoInfoPromise = isString
          ? axios
            .get(`${specficReposAPI}/${repoName}`, reqConfig)
            .then((r) => r.data)
            .catch(() => null)
          : Promise.resolve(repoOrName);

        const readmePromise = localPreview
          ? Promise.resolve(null)
          : getFirstImageFromReadme(username, repoName, reqConfig);

        const languagesPromise = fetchLanguages(
          `${API}/repos/${username}/${repoName}/languages`,
          reqConfig
        );

        // Fire all 3 concurrently for this single project
        const [repoData, image, languagesData] = await Promise.all([
          repoInfoPromise,
          readmePromise,
          languagesPromise,
        ]);

        if (!repoData) return null;

        return {
          ...repoData,
          previewMedia: localPreview ? localPreview.media : image,
          previewType: localPreview ? localPreview.type : "image",
          languagesData,
        };
      };

      // 4. Fire EVERYTHING across ALL projects in one massive Promise.all fan-out
      const allTargets = [...baseRepos, ...specfic];
      const results = await Promise.all(allTargets.map(hydrateRepo));
      const validProjects = results.filter(Boolean);

      // 5. Cache & Update State
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: validProjects })
      );

      setProjectsArray(validProjects);
    } catch (error) {
      console.error("Pipeline error:", error.message);
    }
  }, [allReposAPI, length, specfic, specficReposAPI, username, CACHE_KEY, CACHE_DURATION]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <Jumbotron fluid id="projects" className="bg-light m-0">
      <Container>
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {projectsArray.length
            ? projectsArray.map((project, index) => (
              <ProjectCard key={`project-card-${index}`} value={project} />
            ))
            : dummyProjectsArr.map((project, index) => (
              <ProjectCard key={`dummy-${index}`} value={project} />
            ))}
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Project;