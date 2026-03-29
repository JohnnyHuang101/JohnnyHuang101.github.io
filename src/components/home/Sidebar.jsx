import React from "react";
import "./Sidebar.css";
 
// 1. IMPORT YOUR IMAGES directly so the bundler can process them
import vro1 from "../../assets/img/vro1.jpeg";
import vro2 from "../../assets/img/vro2.jpeg";
import vro3 from "../../assets/img/vro3.jpeg";
 
// Use the imported variables in your array
const images = [vro1, vro2, vro3];
 
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* 2. Reduced length from 10 to 3 to make them much less frequent */}
      {Array.from({ length: 7 }).map((_, i) => {
        const img = images[i % images.length];
        
        return (
          <img
            key={i}
            src={img}
            className="floating-img"
            style={{
                /* Spawns the sticker at a random horizontal position between 0% and 100% of the screen */
                left: `${Math.random() * 100}vw`, 
                
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${12 + Math.random() * 1}s`,
            }}
            alt={`Floating icon ${i}`}
            />
        );
      })}
    </div>
  );
};
 
export default Sidebar;