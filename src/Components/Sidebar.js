import React from "react";
import { SidebarData } from "../SidebarData";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="Sidebarlist">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname == val.link ? "active" : ""}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="title">{val.title}</div>
              <div id="icon">{val.icon}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
