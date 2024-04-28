import React, { useEffect, useState } from "react";
import { useId } from "react";

const ProjectForm = ({ projectData, setShowForm, editproject }) => {
  const [projectt, setProjectt] = useState({});
  const projectId = useId();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (editproject !== null) {
      setProjectt(editproject);
    }
  }, [editproject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectt({
      ...projectt,
      id: projectId,
      email: user.email,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //to edit the existing project
    if (editproject !== null) {
      const updatedData = projectData.map((prj) => {
        if (prj.id === projectt.id) {
          return projectt;
        } else {
          return prj;
        }
      });
      localStorage.setItem("todolist", JSON.stringify(updatedData));
    } else {
      projectData.push(projectt);
      localStorage.setItem("todolist", JSON.stringify(projectData));
    }
    setShowForm(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="mt-5">
        <h2 className="mb-3 text-center">Project Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="projectName" className="form-label">
              Project Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              name="projectName"
              value={projectt.projectName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="startDate" className="form-label">
              Start Date of Project :
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={projectt.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="EndDate" className="form-label">
              End Date of Project :
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="endDate"
              value={projectt.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="pointOfContact" className="form-label">
              Reporting Officer :
            </label>
            <input
              type="text"
              className="form-control"
              id="pointOfContact"
              name="pointOfContact"
              value={projectt.pointOfContact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="billable">
              Billable:
            </label>
            <select
              className="form-select"
              id="billable"
              name="billable"
              value={projectt.billable ? "yes" : "no"}
              onChange={handleChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="client" className="form-label">
              Client
            </label>
            <input
              type="text"
              className="form-control"
              id="client"
              name="client"
              value={projectt.client}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary m-4 ">
            Submit
          </button>

          <button
            className="btn btn-danger pl-3 ml-5"
            onClick={() => setShowForm(false)}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
