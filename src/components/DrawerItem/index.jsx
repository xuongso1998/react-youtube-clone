import React from "react";
import { Link } from "react-router";

const DrawerItem = ({ title, icon, filter, setFilter, filterTag, categoryChildID, setCategoryID }) => {
  const toggleCategory = () => {
    setFilter(filterTag);
    setCategoryID(categoryChildID)
  };
  return (
    <li onClick={toggleCategory}>
      <Link
        to={"/"}
        className={`flex items-center px-6 py-4 text-body rounded-base hover:bg-neutral-tertiary ${filter === filterTag ? "bg-white/25" : ""} hover:bg-white/20 group`}
      >
        {icon}
        <span className="ms-3 text-lg">{title}</span>
      </Link>
    </li>
  );
};

export default DrawerItem;

