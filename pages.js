const ghpages = require("gh-pages");
const path = require("path");

const pathname = "/";
const repoURL = "https://github.com/JohnnyHuang101/JohnnyHuang101.github.io.git";

ghpages.publish(
  pathname,
  {
    branch: "gh-pages",
    repo: repoURL,
  },
  (err) => {
    if (err) console.log("ERROR: ", err);
    else console.log("PUBLISHED");
  }
);
