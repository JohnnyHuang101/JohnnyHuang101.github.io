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

/**
 * Get first image from README
 */
const getFirstImageFromReadme = async (owner, repo) => {

  const cacheKey = `readme-image-${owner}-${repo}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) return cached;
  try {
    const res = await axios.get(
      `${API}/repos/${owner}/${repo}/readme`
    );

    const markdown = atob(res.data.content);
    const match = markdown.match(/!\[.*?\]\((.*?)\)/);

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

const Project = ({ heading, username, length, specfic }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;

  const dummyProjectsArr = new Array(length + specfic.length).fill(dummyProject);
  const [projectsArray, setProjectsArray] = useState([]);

  const fetchRepos = useCallback(async () => {
    try {
      // 1️⃣ Get all repos
      const response = await axios.get(allReposAPI);
      let repos = response.data.slice(0, length);

      // 2️⃣ Fetch specific repos
      for (const repoName of specfic) {
        const res = await axios.get(`${specficReposAPI}/${repoName}`);
        repos.push(res.data);
      }

      // 3️⃣ Fetch README images
      const reposWithImages = await Promise.all(
        repos.map(async (repo) => {
          const image = await getFirstImageFromReadme(username, repo.name);
          return { ...repo, readmeImage: image };
        })
      );

      setProjectsArray(reposWithImages);
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
                  image={project.readmeImage}
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
