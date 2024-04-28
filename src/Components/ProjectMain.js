import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import Project from "./Project";
import Sidebar from "./Sidebar";

const ProjectMain = () => {
  const [projectData, setProjectData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editproject, setEditProject] = useState(null);
  //   const addProject = () => {
  //     setShowForm(true);
  //   };
  return (
    <>
      <Sidebar />
      <div className="container" id="taskcontainer">
        {!showForm && (
          <Project
            projectData={projectData}
            setProjectData={setProjectData}
            setShowForm={setShowForm}
            setEditProject={setEditProject}
          />
        )}
        {showForm && (
          <ProjectForm
            projectData={projectData}
            setProjectData={setProjectData}
            setShowForm={setShowForm}
            editproject={editproject}
          />
        )}
      </div>
    </>
  );
};

export default ProjectMain;
