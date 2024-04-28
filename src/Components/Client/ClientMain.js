import React, { useState } from "react";
import Client from "./Client";
import ClientForm from "./ClientForm";
import Sidebar from "../Sidebar";

const ClientMain = () => {
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
          <Client
            projectData={projectData}
            setProjectData={setProjectData}
            setShowForm={setShowForm}
            setEditProject={setEditProject}
          />
        )}
        {showForm && (
          <ClientForm
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

export default ClientMain;
