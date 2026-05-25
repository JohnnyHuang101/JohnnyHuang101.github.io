import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SkillsTab from "./SkillsTab";
import Row from "react-bootstrap/Row";
import { Jumbotron } from "./migration";
import { Container } from "react-bootstrap";
import { useScrollPosition } from "../../hooks/useScrollPosition";

const CATEGORY_ORDER = ["ML", "Frameworks", "Backend", "Frontend"];

const Skills = React.forwardRef(({ heading, hardSkills }, ref) => {
  const skillsTabRef = React.useRef(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  useScrollPosition(
    ({ currPos }) => {
      if (!isScrolled && currPos.y < -300) setIsScrolled(true);
    },
    [isScrolled]
  );  // <-- no element ref passed

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = [...hardSkills]
      .filter((s) => s.category === cat)
      .sort((a, b) => b.value - a.value);
    return acc;
  }, {});

  return (
    <Jumbotron ref={skillsTabRef} fluid className="bg-white m-0" id="skills">
      <Container className="p-5">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Tabs
          className="skills-tabs"
          defaultActiveKey="ML"
          id="skills-tabs"
          fill
        >
          {CATEGORY_ORDER.map((cat) => (
            <Tab
              key={cat}
              tabClassName="skills-tab lead"
              eventKey={cat}
              title={cat}
            >
              <Row className="pt-3 px-1">
                <SkillsTab skills={grouped[cat]} isScrolled={isScrolled} />
              </Row>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </Jumbotron>
  );
});

export default Skills;