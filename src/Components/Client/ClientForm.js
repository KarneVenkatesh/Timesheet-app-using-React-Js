import React, { useEffect, useState } from "react";
import { useId } from "react";

const ClientForm = ({ projectData, setShowForm, editproject }) => {
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
      localStorage.setItem("clientlist", JSON.stringify(updatedData));
    } else {
      projectData.push(projectt);
      localStorage.setItem("clientlist", JSON.stringify(projectData));
    }
    setShowForm(false);
  };

  // let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = `/projects`;
  //   navigate(path);
  // };
  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="mt-5">
        <h2 className="mb-4 text-center">Client Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="projectName" className="form-label">
              Name Of Client:
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
              Country :
            </label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              name="startDate"
              value={projectt.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="pointOfContact" className="form-label">
              Type :
            </label>
            <select
              name="pointOfContact"
              value={projectt.pointOfContact}
              onChange={handleChange}
            >
              <option>Hourly</option>
              <option>Time in Money</option>
              <option>Fixed Project</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label" htmlFor="billable">
              Billable :
            </label>
            <br></br>
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
          <button type="submit" className="btn btn-primary m-3 ">
            Submit
          </button>

          <button
            className="btn btn-danger pl-3 "
            onClick={() => setShowForm(false)}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
