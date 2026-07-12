import { Menu, Youtube } from "lucide-react";
import React from "react";
import SearchBar from "../SearchBar";
import Drawer from "../Drawer";
import Nav from "../Nav";

const Header = ({setCategoryID}) => {
  return (
    <header>
      <div className="flex justify-between items-center px-6 py-4">
        <Nav setCategoryID={setCategoryID} />
        <SearchBar size={32} className="cursor-pointer" />
        <div className=" md:block hidden"></div>
      </div>
    </header>
  );
};

export default Header;
