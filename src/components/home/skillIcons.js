import {
    SiPython, SiPytorch, SiTensorflow, SiNvidia,
    SiPydantic, SiSpring, SiFastapi, SiFlask,
    SiTerraform, SiDocker, SiKubernetes, SiRedis,
    SiApachekafka, SiGit, SiRust, SiCplusplus,
    SiGo, SiPostgresql, SiMongodb,
    SiReact, SiTypescript, SiVuedotjs, SiJavascript,
    SiOpenjdk,
} from "react-icons/si";

import { ReactComponent as HuggingFaceIcon } from "../../assets/icons/huggingface.svg";
import { ReactComponent as LangGraphIcon } from "../../assets/icons/langgraph.svg";

export const iconMap = {
    // ML
    pytorch: SiPytorch,
    tensorflow: SiTensorflow,
    huggingface: HuggingFaceIcon,
    langgraph: LangGraphIcon,
    cuda: SiNvidia,
    pydantic: SiPydantic,
    // Frameworks / Infra
    springboot: SiSpring,
    fastapi: SiFastapi,
    flask: SiFlask,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    redis: SiRedis,
    kafka: SiApachekafka,
    git: SiGit,
    // Backend
    java: SiOpenjdk,
    python: SiPython,
    rust: SiRust,
    cpp: SiCplusplus,
    golang: SiGo,
    sql: SiPostgresql,
    nosql: SiMongodb,
    // Frontend
    react: SiReact,
    typescript: SiTypescript,
    vue: SiVuedotjs,
    javascript: SiJavascript,
};