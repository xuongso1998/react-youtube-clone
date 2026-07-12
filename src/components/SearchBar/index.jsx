import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="border border-gray-400 px-8 py-1.5 rounded-full inline-flex justify-between gap-2 ">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent border-transparent focus:outline-none min-w-[22rem]"
      />
      <Search className="cursor-pointer"/>
    </div>
  );
};

export default SearchBar;
