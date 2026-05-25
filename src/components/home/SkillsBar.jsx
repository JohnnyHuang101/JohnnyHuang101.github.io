import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { iconMap } from "./skillIcons";

function SkillsBar({ skill, value, icon, isScrolled }) {
  const IconComponent = iconMap[icon] || null;

  return (
    <div style={{ width: "95%" }}>
      <p className="lead mb-1 mt-2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {IconComponent && (
          <IconComponent
            size={50}
            style={{ width: "50px", height: "50px", flexShrink: 0 }}
          />
        )}
        {skill}
      </p>
      <ProgressBar
        className={!isScrolled ? "progress" : "progress-bar-animation"}
        now={value}
      />
    </div>
  );
}

export default SkillsBar;