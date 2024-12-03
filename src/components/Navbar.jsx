import React from "react";
import { CiUser } from "react-icons/ci";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100 shadow-md">
      {/* Task Manager Centered */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-semibold">
        Task Manager
      </h1>

      <div className="flex-1"></div>

      <div className="bg-blue-100 rounded-full px-2 hover:bg-blue-200 hover:border-2 border-2 border-blue-200 hover:border-blue-300">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="flex flex-row items-center space-x-2"
        >
          <CiUser className="text-lg sm:text-xl" />
          <p className="text-sm sm:text-base capitalize font-medium">
            Nachiketh
          </p>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <a
              href="https://drive.google.com/file/d/1j_lfW6iHFCbqSDrrpMdlFvJlJGtdR710/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <IoDocumentTextOutline size={20} /> Resume
            </a>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <a
              href="https://www.linkedin.com/in/nachiketh-neelaraddi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </a>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <a
              href="https://github.com/Nachiketh-vn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaGithub size={20} />
              Github
            </a>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
