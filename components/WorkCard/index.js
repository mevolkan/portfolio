import Image from "next/image";
import React from "react";

const WorkCard = ({ img, name, description, technologies, year, onClick }) => {
  return (
    <div
      className="p-2 overflow-hidden rounded-lg laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative h-48 overflow-hidden transition-all duration-300 ease-out rounded-lg mob:h-auto"
        style={{ height: "300px" }}
      >
        <Image
          alt={name}
          className="object-cover w-full h-full transition-all duration-300 ease-out hover:scale-110"
          src={`/images/${img}.png`}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover"
          }} />
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
      <p>{technologies? technologies : "Technologies"} | {year? year : "Year"}</p>
      <span onClick={onClick}>🔗  {name ? name : "#"}</span>
    </div>
  );
};

export default WorkCard;
