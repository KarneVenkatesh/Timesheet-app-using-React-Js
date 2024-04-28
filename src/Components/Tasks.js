import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Tasks() {
  let [todoValue, TodoChange] = useState("");
  let [todolist, updateTodos] = useState([
    {
      id: 1,
      task: "learn react",
    },
    {
      id: 2,
      task: "learn JS",
    },
  ]);
  let nextId = 3;
  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("tasklist"));
    if (storedTodoList) {
      const maxId = Math.max(...storedTodoList.map((todo) => todo.id), 0);
      nextId = maxId + 1;
      updateTodos(storedTodoList);
    }
  }, []);

  function addNewTodo() {
    if (todoValue === "") {
      alert("Add Some Data");
    } else {
      let newTodos = [
        ...todolist,
        {
          id: nextId,
          task: todoValue,
        },
      ];
      updateTodos(newTodos);
      TodoChange("");
      nextId++;
      localStorage.setItem("tasklist", JSON.stringify(newTodos));
    }
  }

  function deleteTodo(id) {
    let updatedTodos = todolist.filter((todo) => todo.id !== id);
    updateTodos(updatedTodos);
    localStorage.setItem("tasklist", JSON.stringify(updatedTodos));
  }
  return (
    <>
      <Sidebar />
      <div className="container mt-5 w-50" id="taskcontainer">
        <h3 className="text-center">Add Tasks</h3>
        <div className="input-group">
          <input
            className="form-control"
            onChange={(e) => {
              let task = e.target.value;
              TodoChange(task);
            }}
            type="text"
            value={todoValue}
          />
          <button
            className="btn btn-primary"
            onClick={() => {
              addNewTodo();
            }}
          >
            ADD
          </button>
        </div>
        <ul className="list-group mt-4">
          {todolist.map((todo) => {
            return (
              <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between"
              >
                <p>{todo.task}</p>
                <button
                  className="btn"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  ✖️
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Tasks;
