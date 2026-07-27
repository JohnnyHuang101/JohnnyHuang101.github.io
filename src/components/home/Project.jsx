import React from "react";
import Container from "react-bootstrap/Container";
import { Jumbotron } from "./migration";
import Row from "react-bootstrap/Row";
import ProjectCard from "./ProjectCard";
import projectsData from "../../data/projects.json";

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

// Layer local preview assets (if present) on top of the static GitHub data,
// same priority as before: local preview wins over README image.
const projectsArray = projectsData.map((project) => {
  const localPreview = getLocalPreview(project.name); // returns item IF IT IS IN ASSET PREVIEW, else NULL
  return {
    ...project,
    previewMedia: localPreview ? localPreview.media : project.previewImage,
    previewType: localPreview ? localPreview.type : "image",
  };
});

const Project = ({ heading }) => {
  return (
    <Jumbotron fluid id="projects" className="bg-light m-0">
      <Container>
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {projectsArray.map((project, index) => (
            <ProjectCard key={`project-card-${index}`} value={project} />
          ))}
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Project;