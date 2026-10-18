import { Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(inputText.trim()){
      navigate(`/search?query=${inputText}`)
    } else {
      navigate("/")
    }
    
  }
  return (
    <form onSubmit={handleSubmit} className="border border-gray-400 px-8 py-1.5 rounded-full inline-flex justify-between gap-2 ">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent border-transparent focus:outline-none min-w-[22rem]"
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
      />
      <Search className="cursor-pointer" />
    </form>
  );
};

export default SearchBar;
