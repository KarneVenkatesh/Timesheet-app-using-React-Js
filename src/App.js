import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./Components/Tasks";
import Home from "./Components/Home";
import ProjectMain from "./Components/ProjectMain";
import ClientMain from "./Components/Client/ClientMain";
import Timesheet from "./Components/Timesheet";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  //const location = useLocation();
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="wrapper">
            {/* <Sidebar /> */}
            <Routes>
              <Route exact path="/" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/projects" element={<ProjectMain />} />
              <Route path="/client" element={<ClientMain />} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/timesheet" element={<Timesheet />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
    // <>
    //   <div className="App">
    //     <Router>
    //       <Navbar />
    //       <div className="wrapper">
    //         {location.pathname !== "/" && <Sidebar />}
    //         <Routes>
    //           <Route exact path="/" element={<Signup />} />
    //           <Route path="/home" element={<Home />} />
    //           <Route path="/projects" element={<ProjectMain />} />
    //           <Route path="/client" element={<ClientMain />} />
    //           <Route path="/tasks" element={<Task />} />
    //           <Route path="/timesheet" element={<Timesheet />} />
    //         </Routes>
    //       </div>
    //     </Router>
    //   </div>
    // </>
  );
}

export default App;
