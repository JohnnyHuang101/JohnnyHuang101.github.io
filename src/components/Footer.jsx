import React from "react";
import Container from "react-bootstrap/Container";

const Footer = (props) => {
  const bgStyle = { backgroundColor: "#f5f5f5" };

  return (
    <footer style={bgStyle} className="mt-auto py-5 text-center ">
      <Container>
        <p>
          <small className="text-muted">
            Johnny Huang Portfolio November 2024
          </small>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
