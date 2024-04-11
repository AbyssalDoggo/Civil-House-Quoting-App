import React from "react";
import { Link } from "react-router-dom";

const HomeProjects = ({ projectItems }) => {
  const { title, imageUrl, id } = projectItems;

  const handleMouseEnter = (event) => {
    event.currentTarget.style.filter = "grayscale(0%)";
    event.currentTarget.nextElementSibling.style.opacity = 1;
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.filter = "grayscale(100%)";
    event.currentTarget.nextElementSibling.style.opacity = 0;
  };

  return (
    <Link to={"/projectview/" + id}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "300px",
            height: "500px",
            filter: "grayscale(100%)",
            transition: "filter 0.5s",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <h2
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            opacity: 0,
            transition: "opacity 0.5s",
          }}
        >
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default HomeProjects;
