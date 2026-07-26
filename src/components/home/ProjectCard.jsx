import React, { useEffect, useState, useCallback } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";

const ProjectCard = ({ value }) => {
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    pushed_at,
    previewMedia,
    previewType,
    languagesData,
  } = value;

  const isVideo = previewType === "video";

  return (
    <Col md={isVideo ? 12 : 6} className="mb-4">
      <Card className="card shadow-lg p-3 mb-5 bg-white rounded">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-100"
            style={{
              objectFit: "cover",
              maxHeight: "480px",
              borderTopLeftRadius: "0.375rem",
              borderTopRightRadius: "0.375rem",
            }}
          >
            <source src={previewMedia} type="video/mp4" />
          </video>
        ) : (
          previewMedia && (
            <Card.Img
              variant="top"
              src={previewMedia}
              alt={`${name} preview`}
              style={{
                objectFit: "cover",
                maxHeight: "200px",
              }}
            />
          )
        )}

        <Card.Body>
          <Card.Title as="h5">{name || <Skeleton />}</Card.Title>
          <Card.Text>
            {name ? description || "No description provided." : <Skeleton count={3} />}
          </Card.Text>
          {svn_url ? <CardButtons svn_url={svn_url} /> : <Skeleton count={2} />}
          <hr />
          {languagesData ? (
            <Language languagesData={languagesData} repo_url={svn_url} />
          ) : (
            <Skeleton count={2} />
          )}
          {name ? (
            <CardFooter
              star_count={stargazers_count}
              repo_url={svn_url}
              pushed_at={pushed_at}
            />
          ) : (
            <Skeleton />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const CardButtons = ({ svn_url }) => {
  return (
    <div className="d-grid gap-2 d-md-block">
      <a
        href={`${svn_url}/archive/master.zip`}
        className="btn btn-outline-secondary mx-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github" /> Clone Project
      </a>
      <a
        href={svn_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-secondary mx-2"
      >
        <i className="fab fa-github" /> Repo
      </a>
    </div>
  );
};

const Language = ({ languagesData, repo_url }) => {
  const languages = Object.keys(languagesData || {});
  const total_count = Object.values(languagesData || {}).reduce((acc, bytes) => acc + bytes, 0);

  return (
    <div className="pb-3">
      Languages:{" "}
      {languages.length ? (
        languages.map((language) => (
          <a
            key={language}
            className="card-link"
            href={`${repo_url}/search?l=${language}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="badge bg-light text-dark me-1">
              {language}: {Math.trunc((languagesData[language] / total_count) * 1000) / 10}%
            </span>
          </a>
        ))
      ) : (
        <span className="text-muted">Code yet to be analyzed.</span>
      )}
    </div>
  );
};

const CardFooter = ({ star_count, repo_url, pushed_at }) => {
  const [updated_at, setUpdated_at] = useState("just now");

  const handleUpdatetime = useCallback(() => {
    if (!pushed_at) return;
    const date = new Date(pushed_at);
    const nowdate = new Date();
    const diff = nowdate.getTime() - date.getTime();
    const hours = Math.trunc(diff / 1000 / 60 / 60);

    if (hours < 24) {
      if (hours < 1) return setUpdated_at("just now");
      let measurement = hours === 1 ? "hour" : "hours";
      return setUpdated_at(`${hours} ${measurement} ago`);
    } else {
      const options = { day: "numeric", month: "long", year: "numeric" };
      const time = new Intl.DateTimeFormat("en-US", options).format(date);
      return setUpdated_at(`on ${time}`);
    }
  }, [pushed_at]);

  useEffect(() => {
    handleUpdatetime();
  }, [handleUpdatetime]);

  return (
    <p className="card-text">
      <a
        href={`${repo_url}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark text-decoration-none"
      >
        <span className="text-dark card-link mr-4">
          <i className="fab fa-github" /> Stars{" "}
          <span className="badge badge-dark">{star_count}</span>
        </span>
      </a>
      <small className="text-muted">Updated {updated_at}</small>
    </p>
  );
};

export default ProjectCard;