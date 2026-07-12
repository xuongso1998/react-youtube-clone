import "./App.css";
import Header from "./components/Header";
import CardList from "./components/CardList";
import Spinner from "./components/Spinner";
import { Outlet } from "react-router";
import { useState } from "react";

function App() {
  const [categoryID, setCategoryID] = useState(null)
  
  return (
    <>
      <Header setCategoryID={setCategoryID}/>
      <div className="overflow-clip px-6">
        <Outlet context={{categoryID}}/>
      </div>
    </>
  );
}

export default App;
