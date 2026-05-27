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
      I specialize in bridging the gap between <b>scalable engineering and AI agent systems</b> that work autonomously. <b>I focus on owning projects and delivering results above all with my work and I'm good at scaling ideas to production-ready applications</b>.
      <br /><br />
      I’m a software engineer specializing in scalable infrastructure and applied machine learning. Professionally, I’ve architected distributed, event-driven systems for the <b>City of San Francisco</b> to ensure platform stability during massive traffic surges, developed multi-modal AI models to automate forensic data workflows, and deployed high-throughput RAG search pipelines for enterprise CRM tools at companies.
      <br /><br />
      In my free time, I love building end-to-end products to solve complex problems. My technical interests span the entire stack—from engineering low-latency <b>high-frequency trading engines</b> in Rust and C, to building horizontally scalable, real-time communication platforms in Golang. I'm also deeply invested in LLM engineering, creating custom machine learning pipelines and autonomous <b>AI agents</b> that securely integrate with platforms like Google Workspace to manage everyday workflows.
      <br /><br />
      I built this site to share my work. Check out my projects below!
    </span>
  )
};


const repos = {
  show: true,
  heading: "Recent Projects / Click Repo to find out more!",
  gitHubUsername: "JohnnyHuang101",
  reposLength: 0,
  specificRepos: ["workspace", "jarvis", "johnnycoin", "Halu--OpenBMB-4B-Tuned-and-Inference", "-watchparty_2.0", "JohnnyHuang101.github.io", "url_shortner_proj", "yolov8_optical_character_recognition", "DiaryApp", "QR-code-Scanner", "UNET_Inverse_Solver_and_PnP", "Petrichor_website_eventsApp", "RL_maze_pacman"],
};


const skills = {
  show: true,
  heading: "Skills",
  hardSkills: [
    // ML
    { name: "PyTorch", value: 80, icon: "pytorch", category: "ML" },
    { name: "HuggingFace", value: 80, icon: "huggingface", category: "ML" },
    { name: "LangGraph", value: 80, icon: "langgraph", category: "ML" },
    { name: "Pydantic", value: 80, icon: "pydantic", category: "ML" },
    { name: "CUDA", value: 60, icon: "cuda", category: "ML" },
    // Frameworks
    { name: "Docker", value: 80, icon: "docker", category: "Frameworks" },
    { name: "FastAPI", value: 80, icon: "fastapi", category: "Frameworks" },
    { name: "Redis", value: 80, icon: "redis", category: "Frameworks" },
    { name: "Kubernetes", value: 60, icon: "kubernetes", category: "Frameworks" },
    { name: "Kafka", value: 60, icon: "kafka", category: "Frameworks" },
    { name: "Flask", value: 80, icon: "flask", category: "Frameworks" },
    { name: "Spring Boot", value: 80, icon: "springboot", category: "Frameworks" },
    { name: "Git", value: 100, icon: "git", category: "Frameworks" },
    // Backend
    { name: "Python", value: 100, icon: "python", category: "Backend" },
    { name: "Java", value: 100, icon: "java", category: "Backend" },
    { name: "SQL", value: 80, icon: "sql", category: "Backend" },
    { name: "Golang", value: 80, icon: "golang", category: "Backend" },
    { name: "NoSQL", value: 60, icon: "nosql", category: "Backend" },
    { name: "Rust", value: 60, icon: "rust", category: "Backend" },
    // Frontend
    { name: "React", value: 60, icon: "react", category: "Frontend" },
    { name: "JavaScript", value: 80, icon: "javascript", category: "Frontend" },
    { name: "Vue", value: 80, icon: "vue", category: "Frontend" },
  ],
};


const getInTouch = {
  show: true,
  heading: "Getting In Touch",
  message:
    'Need to contact me? Send me an email linked at the top of my website!'
};


export { navBar, mainBody, about, repos, getInTouch, skills };
