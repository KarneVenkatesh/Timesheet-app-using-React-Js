import React from "react";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

export const SidebarData = [
  {
    title: "Projects",
    icon: <AccountTreeOutlinedIcon />,
    link: "/projects",
  },
  {
    title: "Clients",
    icon: <AccountCircleOutlinedIcon />,
    link: "/client",
  },
  {
    title: "Tasks",
    icon: <BadgeOutlinedIcon />,
    link: "/tasks",
  },

  {
    title: "Timesheet",
    icon: <TaskOutlinedIcon />,
    link: "/timesheet",
  },
];
