// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "rgb(0, 102, 204), rgb(0, 76, 153), rgb(0, 51, 102), rgb(25, 25, 112), rgb(70, 130, 180)",
  firstName: "Johnny",
  middleName: "",
  lastName: "Huang",
  message: "Interested in Software Engineering and Machine Learning.",
  icons: [
    {
      image: "fa-github",
          url: "https://github.com/JohnnyHuang101",
    },
    {
      image: "fa-linkedin",
        url: "https://www.linkedin.com/in/johnny-li-huang/",
      },
      {
          image: "fa-hackerrank",
          url: "https://leetcode.com/u/johnnybaguettes/",
      },
      {
        image: "fas fa-share-alt",
        url: "mailto:h.johnny@wustl.edu",
      },
  ],
};


const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/johnny_2024.jpg"),
  imageSize: 400,
  message:
    "Hi, I’m Johnny — welcome to my portfolio! 😄\n\nI’m currently a Senior at Washington University in St. Louis, pursuing a B.S. in Computer Science + Mathematics, and will be continuing for an M.S. in Computer Science in Spring 2026.\n\nOriginally from Shenzhen, China, I moved to the U.S. at age 12 and grew up in the Bay Area (Foster City). A fun fact: I have an identical twin brother, Johnson, who’s also studying CS and Math—at UC Berkeley!\n\nMy main interests lie in software engineering, especially building highly scalable and efficient systems, services, and databases. I also enjoy applying ML solutions in meaningful, production-ready settings (ie. RAG search systems). I have hands-on experience as a full-stack developer, building fast and resilient web servers and designing scalable SQL and NoSQL databases.\n\nI’ve also worked on end-to-end machine learning tools, including validation pipelines and agent-based systems powered by LLMs. Additionally, I’m familiar with cloud platforms like AWS and managing microservices using Docker containers.\n\nThis portfolio was built using JavaScript, Node, and React to highlight a few of my projects. They’re pretty cool—check them out! More details are on my GitHub!",
  resume: require("../editable-stuff/Job-Resume-Aug-13th-2025-Johnny.pdf"),
};


const repos = {
  show: true,
  heading: "Recent Projects / Click Repo to find out more!",
  gitHubUsername: "JohnnyHuang101", 
  reposLength: 0,
    specificRepos: ["Halu--OpenBMB-4B-Tuned-and-Inference", "url_shortner_proj", "yolov8_optical_character_recognition", "DiaryApp", "QR-code-Scanner", "UNET_Inverse_Solver_and_PnP", "Petrichor_website_eventsApp", "RL_maze_pacman", "Verizon-BlackScholes_CRR", "JohnnyHuang101.github.io"],
};


const getInTouch = {
    show: true,
    heading: "Getting In Touch",
    message:
        'Need to contact me? Send me an email linked at the top of my website!'
};


export {navBar, mainBody, about, repos, getInTouch};
