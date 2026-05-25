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
  languages_url: null,
  pushed_at: null,
};

const API = "https://api.github.com";

const axiosConfig = {
  headers: {
    // Add this authorization header to bypass the 60 request/hr limit
    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
};

const getFirstImageFromReadme = async (owner, repo) => {

  const cacheKey = `readme-image-${owner}-${repo}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) return cached;
  try {
    const res = await axios.get(
      `${API}/repos/${owner}/${repo}/readme`,
      // axiosConfig
    );

    const markdown = atob(res.data.content);
    let match = markdown.match(/!\[.*?\]\((.*?)\)/);

    if (!match) {
      match = markdown.match(/<img[^>]+src=["']([^"']+)["']/i);
    }

    if (!match) return null;

    let imageUrl = match[1];

    // Handle relative paths
    if (!imageUrl.startsWith("http")) {
      imageUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${imageUrl}`;
    }

    sessionStorage.setItem(cacheKey, imageUrl);
    return imageUrl;
  } catch {
    return null;
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

console.log("mediaFiles keys:", Object.keys(mediaFiles));

const getLocalPreview = (repoName) => {
  const extensions = [
    "mp4",
    "webm",
    "gif",
    "png",
    "jpg",
    "jpeg",
  ];

  for (const ext of extensions) {
    const filename = `${repoName}.${ext}`;

    if (mediaFiles[filename]) {
      return {
        media: mediaFiles[filename],
        type: ["mp4", "webm"].includes(ext)
          ? "video"
          : "image",
      };
    }
  }

  return null;
};

const Project = ({ heading, username, length, specfic }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;

  const dummyProjectsArr = new Array(length + specfic.length).fill(dummyProject);
  const [projectsArray, setProjectsArray] = useState([]);

  const CACHE_KEY = `projects-${username}`;
  const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes


  const fetchRepos = useCallback(async () => {
    try {
      // 1️⃣ Check cache first
      const cached = sessionStorage.getItem(CACHE_KEY);

      if (cached) {
        const parsed = JSON.parse(cached);

        const isExpired =
          Date.now() - parsed.timestamp > CACHE_DURATION;

        if (!isExpired) {
          setProjectsArray(parsed.data);
          return;
        }
      }

      const response = await axios.get(allReposAPI);//, axiosConfig
      let repos = response.data.slice(0, length);

      // 2️⃣ Fetch specific repos
      for (const repoName of specfic) {
        const res = await axios.get(`${specficReposAPI}/${repoName}`); //, axiosConfig
        repos.push(res.data);
      }

      // 3️⃣ Fetch README images
      const reposWithMedia = await Promise.all(
        repos.map(async (repo) => {

          const localPreview = getLocalPreview(repo.name);

          if (localPreview) {
            return {
              ...repo,
              previewMedia: localPreview.media,
              previewType: localPreview.type,
            };
          }

          // fallback to README image
          const image = await getFirstImageFromReadme(
            username,
            repo.name
          );

          return {
            ...repo,
            previewMedia: image,
            previewType: "image",
          };
        })
      );

      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: reposWithMedia,
        })
      );

      setProjectsArray(reposWithMedia);
    } catch (error) {
      console.error(error.message);
    }
  }, [allReposAPI, length, specfic, specficReposAPI, username]);

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
              <ProjectCard
                key={`project-card-${index}`}
                value={project}
              />
            ))
            : dummyProjectsArr.map((project, index) => (
              <ProjectCard
                key={`dummy-${index}`}
                value={project}
              />
            ))}
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Project;
