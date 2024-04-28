import React, { useEffect } from "react";

function Project({ projectData, setProjectData, setShowForm, setEditProject }) {
  useEffect(() => {
    const localProjects = localStorage.getItem("todolist");
    if (localProjects) {
      setProjectData(JSON.parse(localProjects));
    }
  }, []);

  const handleDelete = (projectId) => {
    const updatedProjects = projectData.filter(
      (project) => project.id !== projectId
    );
    //setProjectData(updatedProjects);
    localStorage.setItem("todolist", JSON.stringify(updatedProjects));
    console.log(updatedProjects);
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allProjects = JSON.parse(localStorage.getItem("todolist")) || [];
  const userproject = allProjects.filter(
    (project) => project.email === loggedInUser.email
  );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Projects</h5>
            <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <button
                className="btn btn-warning"
                onClick={() => {
                  setShowForm(true);
                  setEditProject(null);
                }}
              >
                Add New Project
              </button>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Project Name</th>
                  <th>Start Date Of Project</th>
                  <th>End Date Of Project</th>
                  <th>Reporting Officer</th>
                  <th>Billable</th>
                  <th>Client</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userproject.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{project.projectName} </td>
                    <td>{project.startDate} </td>
                    <td>{project.endDate} </td>
                    <td>{project.pointOfContact} </td>
                    <td>{project.billable} </td>
                    <td>{project.client} </td>
                    <td>
                      <td>
                        <button
                          // to={"/editproject/" + project.id}
                          onClick={() => {
                            setEditProject(project);
                            setShowForm(true);
                          }}
                          className="btn btn-success mx-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(project.id && project.email)
                          }
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Project;
