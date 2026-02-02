// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "rgba(255, 0, 0, 1), rgba(255, 127, 0, 1), rgba(172, 172, 58, 1), rgba(21, 151, 21, 1), rgba(19, 19, 132, 1), rgba(48, 12, 73, 1)",
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
  message: (
    <span>
      Hi, I’m Johnny! 👋 I’m a recent <b>B.S. CS + Math graduate from WashU in St.Louis (SP 2026)</b>. I grew up in the bay area but am originally from ShenZhen China and finished secondary school in China. <b>Fun Fact:</b> If you ever see someone look like me on linkedin, I have an identical twin brother who codes too-- he's at UC Berkeley.
      <br /><br />
      I specialize in bridging the gap between <b>scalable engineering and cutting-edge AI</b>. I focus on delivering results above all with my work and I'm good at scaling visionary projects to production-ready applications.
      <br /><br />
      I’ve helped the City of San Francisco keep their systems running during massive traffic spikes (<b>scaling 250x</b>) that's now used by all city administrators, and I’ve designed and trained multi-modal AI models for <b>Thermo Fisher</b> that help analyze forensic data faster by <b>20%</b>. 
      <br /><br />
      In my freetime i like to build things that I think are interesting and impactful. From <b>high-frequency trading engines</b> backends that i researched with low-level machine code in Rust to horizontally scalable video chat platforms that can elastically become ready to handle a single to 1 million active requests within minutes, I love building end-to-end products for complex problems. I've also trained and utilized many custom <b>Machine learning models</b> for smart RAG search interfaces & a personal <b>AI agent</b> that manages your google calendar for you linked to your google account.
      <br /><br />
      I built this site to share my work. with node and react. Check out my projects below!
    </span>
  ),
  resume: require("../editable-stuff/Job-Resume-Aug-13th-2025-Johnny.pdf"),
};


const repos = {
  show: true,
  heading: "Recent Projects / Click Repo to find out more!",
  gitHubUsername: "JohnnyHuang101", 
  reposLength: 0,
    specificRepos: ["johnnycoin", "jarvis", "Halu--OpenBMB-4B-Tuned-and-Inference", "-watchparty_2.0", "JohnnyHuang101.github.io", "url_shortner_proj", "yolov8_optical_character_recognition", "DiaryApp", "QR-code-Scanner", "UNET_Inverse_Solver_and_PnP", "Petrichor_website_eventsApp", "RL_maze_pacman"],
};


const getInTouch = {
    show: true,
    heading: "Getting In Touch",
    message:
        'Need to contact me? Send me an email linked at the top of my website!'
};


export {navBar, mainBody, about, repos, getInTouch};
