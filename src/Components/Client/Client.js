import React, { useEffect } from "react";

function Client({ projectData, setProjectData, setShowForm, setEditProject }) {
  useEffect(() => {
    const localProjects = localStorage.getItem("clientlist");
    if (localProjects) {
      setProjectData(JSON.parse(localProjects));
    }
  }, []);

  const handleDelete = (projectId) => {
    const updatedProjects = projectData.filter(
      (project) => project.id !== projectId
    );
    setProjectData(updatedProjects);
  };
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allProjects = JSON.parse(localStorage.getItem("clientlist")) || [];
  const userproject = allProjects.filter(
    (project) => project.email === loggedInUser.email
  );
  return (
    <React.Fragment>
      <div className="container">
        <div className="row ">
          <div className="col-md-12 ">
            <h5 className="mt-2">Clients</h5>
            <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <button
                className="btn btn-warning"
                onClick={() => {
                  setShowForm(true);
                  setEditProject(null);
                }}
              >
                Add New Client
              </button>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name Of Client</th>
                  <th>Country</th>
                  <th>Type</th>
                  <th>Billable Rate</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {userproject.map((project, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{project.projectName} </td>
                    <td>{project.startDate} </td>
                    <td>{project.pointOfContact} </td>
                    <td>{project.billable} </td>
                    <td>
                      <td>
                        <button
                          onClick={() => {
                            setEditProject(project);
                            setShowForm(true);
                          }}
                          className="btn btn-success mx-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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

export default Client;
