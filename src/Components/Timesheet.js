import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./Sidebar";

const Timesheet = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  const [timesheetData, setTimesheetData] = useState([
    {
      id: new Date().getTime(),
      Project: "",
      Client: "",
      task: "",
      mon: "",
      tue: "",
      wed: "",
      thurs: "",
      fri: "",
      sat: "",
      totalhours: "",
      date: "",
    },
  ]);

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localProjects = JSON.parse(localStorage.getItem("todolist")) || [];
    const localClients = JSON.parse(localStorage.getItem("clientlist")) || [];
    const localTasks = JSON.parse(localStorage.getItem("tasklist")) || [];

    setProjects(localProjects);
    setClients(localClients);
    setTasks(localTasks);

    // Update date field when selectedWeek changes
    setTimesheetData((prevData) =>
      prevData.map((row) => ({
        ...row,
        date: formatDate(selectedWeek),
      }))
    );
  }, [selectedWeek]);

  useEffect(() => {
    calculateTotalHours();
    saveDataToLocalStorage();
  }, [
    timesheetData.map((row) => row.mon).join(),
    timesheetData.map((row) => row.tue).join(),
    timesheetData.map((row) => row.wed).join(),
    timesheetData.map((row) => row.thurs).join(),
    timesheetData.map((row) => row.fri).join(),
    timesheetData.map((row) => row.sat).join(),
  ]);

  const calculateTotalHours = () => {
    const totalMinutes = timesheetData.reduce(
      (total, row) =>
        total +
        convertToMinutes(row.mon) +
        convertToMinutes(row.tue) +
        convertToMinutes(row.wed) +
        convertToMinutes(row.thurs) +
        convertToMinutes(row.fri) +
        convertToMinutes(row.sat),
      0
    );

    const formattedTotalHours = convertToHoursAndMinutes(totalMinutes);

    setTimesheetData((prevData) =>
      prevData.map((row) => ({
        ...row,
        totalhours: formattedTotalHours,
      }))
    );
  };

  const convertToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const convertToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const formatDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };

  const handleViewPreviousWeek = () => {
    const previousWeek = new Date(selectedWeek);
    previousWeek.setDate(selectedWeek.getDate() - 7);
    setSelectedWeek(previousWeek);
  };

  const handleViewNextWeek = () => {
    const nextWeek = new Date(selectedWeek);
    nextWeek.setDate(selectedWeek.getDate() + 7);
    setSelectedWeek(nextWeek);
  };

  const handleAddRow = () => {
    setTimesheetData((prevData) => [
      ...prevData,
      {
        id: new Date().getTime(),
        Project: "",
        Client: "",
        task: "",
        mon: "",
        tue: "",
        wed: "",
        thurs: "",
        fri: "",
        sat: "",
        totalhours: "",
        date: formatDate(selectedWeek),
      },
    ]);
  };

  const handleInputChange = (e, rowIndex, fieldName) => {
    const { value } = e.target;

    setTimesheetData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, [fieldName]: value } : row
      )
    );
  };

  const saveDataToLocalStorage = () => {
    localStorage.setItem("timesheetData", JSON.stringify(timesheetData));
  };

  return (
    <>
      <Sidebar />
      <div className="container" id="taskcontainer">
        <h2>Weekly Timesheet</h2>
        <div className="container mb-3">
          <button className="week-btn" onClick={handleViewPreviousWeek}>
            Previous Week
          </button>
          <DatePicker
            selected={selectedWeek}
            onChange={(date) => setSelectedWeek(date)}
            showWeekNumbers
            dateFormat="MMMM d, yyyy"
          />
          <button className="week-btn2" onClick={handleViewNextWeek}>
            Next Week
          </button>
        </div>

        <form className="d-flex .justify-content-between">
          <table className="table">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="project" className="form-label">
                    Project
                  </label>
                </th>
                <th>
                  <label htmlFor="client" className="form-label">
                    Client
                  </label>
                </th>
                <th>
                  <label htmlFor="task" className="form-label">
                    Task
                  </label>
                </th>
                <th>
                  <label htmlFor="Mondat" className="form-label">
                    Monday
                  </label>
                </th>
                <th>
                  <label htmlFor="Mondat" className="form-label">
                    Tuesday
                  </label>
                </th>
                <th>
                  <label htmlFor="Mondat" className="form-label">
                    Wednesday
                  </label>
                </th>
                <th>
                  <label htmlFor="Mondat" className="form-label">
                    Thursday
                  </label>
                </th>
                <th>
                  <label htmlFor="Mondat" className="form-label">
                    Friday
                  </label>
                </th>
                <th>
                  <label htmlFor="Mondat" className="form-label">
                    Saturday
                  </label>
                </th>
                {/* <th>
                <label htmlFor="Mondat" className="form-label">
                  Total Hours
                </label>
              </th> */}
              </tr>
              {timesheetData.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <select
                      id={`project_${index}`}
                      name="Project"
                      className="form-select"
                      value={row.Project}
                      onChange={(e) => handleInputChange(e, index, "Project")}
                    >
                      <option value="" disabled>
                        Select Project
                      </option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.projectName}>
                          {project.projectName}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <select
                      id={`client_${index}`}
                      name="client"
                      className="form-select"
                      value={row.Client}
                      onChange={(e) => handleInputChange(e, index, "Client")}
                    >
                      <option value="" disabled>
                        Select Client
                      </option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.projectName}>
                          {client.projectName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      id={`task_${index}`}
                      name="task"
                      className="form-select"
                      value={row.task}
                      onChange={(e) => handleInputChange(e, index, "task")}
                    >
                      <option value="" disabled>
                        Select Task
                      </option>
                      {tasks.map((task) => (
                        <option key={task.id} value={task.task}>
                          {task.task}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id={`mon_${index}`}
                      name="mon"
                      value={row.mon}
                      onChange={(e) => handleInputChange(e, index, "mon")}
                      placeholder="hh:mm"
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id={`tue_${index}`}
                      name="tue"
                      value={timesheetData.tue}
                      onChange={(e) => handleInputChange(e, index, "tue")}
                      placeholder="hh:mm"
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id={`wed_${index}`}
                      name="wed"
                      value={timesheetData.wed}
                      onChange={(e) => handleInputChange(e, index, "wed")}
                      placeholder="hh:mm"
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id={`thurs_${index}`}
                      name="thurs"
                      value={timesheetData.thurs}
                      onChange={(e) => handleInputChange(e, index, "thurs")}
                      placeholder="hh:mm"
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id={`fri_${index}`}
                      name="fri"
                      value={timesheetData.fri}
                      onChange={(e) => handleInputChange(e, index, "fri")}
                      placeholder="hh:mm"
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control"
                      id={`sat_${index}`}
                      name="sat"
                      value={timesheetData.sat}
                      onChange={(e) => handleInputChange(e, index, "sat")}
                      placeholder="hh:mm"
                    />
                  </td>
                  {/* <td>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    className="form-control"
                    id={`totalhours_${index}`}
                    name="totalhours"
                    value={row.totalhours}
                    readOnly
                  />
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddRow}
          >
            + Add Timesheet Row
          </button>
        </div>
      </div>
    </>
  );
};

export default Timesheet;
