import React from "react";
import { CiUser } from "react-icons/ci";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

      {/* Empty Space (left-aligned) */}
      <div className="flex-1"></div>

      {/* User Button (right-aligned) */}
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
