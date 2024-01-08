import React from "react";

const WorkCard = ({ img, name, description, technologies, onClick }) => {
  return (
    <div
      className="p-2 overflow-hidden rounded-lg laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative h-48 overflow-hidden transition-all duration-300 ease-out rounded-lg mob:h-auto"
        style={{ height: "600px" }}
      >
        <img
          alt={name}
          className="object-cover w-full h-full transition-all duration-300 ease-out hover:scale-110"
          src={img}
        ></img>
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
      <p>{technologies? technologies : "Technologies"}</p>
    </div>
  );
};

export default WorkCard;
