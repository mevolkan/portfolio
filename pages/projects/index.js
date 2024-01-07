import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
const Project = ({ projects }) => {
  const showProject = useRef(data.showProject);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showProject.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createProject = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteProject = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };
  return (
    showProject.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Project</title>
        </Head>
        <div
          className={`container mx-auto mb-10 ${
            data.showCursor && "cursor-none"
          }`}
        >
          <Header isProject={true}></Header>
          <div className="mt-10">
            <h1
              ref={text}
              className="w-full mx-auto text-6xl mob:p-2 text-bold laptop:text-8xl"
            >
              Project.
            </h1>
            <div className="grid justify-between grid-cols-1 gap-10 mt-10 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3">
              {projects &&
                projects.map((project) => (
                  <div
                    className="relative cursor-pointer"
                    key={project.slug}
                    onClick={() => Router.push(`/project/${project.slug}`)}
                  >
                    <img
                      className="object-cover w-full rounded-lg shadow-lg h-60"
                      src={project.image}
                      alt={project.title}
                    ></img>
                    <h2 className="mt-5 text-4xl">{project.title}</h2>
                    <p className="mt-2 text-lg opacity-50">{project.preview}</p>
                    <span className="mt-5 text-sm opacity-25">
                      {ISOToDate(project.date)}
                    </span>
                    {process.env.NODE_ENV === "development" && mounted && (
                      <div className="absolute top-0 right-0">
                        <Button
                          onClick={(e) => {
                            deleteProject(project.slug);
                            e.stopPropagation();
                          }}
                          type={"primary"}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createProject} type={"primary"}>
              Add New Post +{" "}
            </Button>
          </div>
        )}
      </>
    )
  );
};

export async function getStaticProps() {
  const projects = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ]);

  return {
    props: {
      projects: [...projects],
    },
  };
}

export default Project;
