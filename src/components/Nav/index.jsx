import { Menu, Youtube } from "lucide-react";
import React from "react";
import Drawer from "../Drawer";
import { Link, useNavigate } from "react-router";

const Nav = ({setCategoryID}) => {
  const navigate = useNavigate();
  const navigateHome = ()=>{
    setCategoryID(null)
    navigate("/")
  }
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        data-drawer-target="drawer-example"
        aria-controls="drawer-example"
        className="relative z-50"
        data-drawer-toggle="drawer-example"
      >
        <Menu />
      </button>
      <Drawer setCategoryID={setCategoryID}/>
      <div onClick={navigateHome}>
        <div className="flex items-center gap-1 relative z-50">
          <Youtube
            fill="red"
            stroke="black"
            size={48}
            strokeWidth={1}
            className="cursor-pointer"
          />
          <span className="text-xl">Youtube</span>
        </div>
      </div>
    </div>
  );
};

export default Nav;



// import { Menu, Youtube } from "lucide-react";
// import React, { useState } from "react";
// import Drawer from "../Drawer";
// import { Link } from "react-router";

// const Nav = ({ setCategoryID }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         type="button"
//         className="relative z-50"
//         onClick={() => setIsOpen(true)}
//       >
//         <Menu />
//       </button>

//       <Drawer
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         setCategoryID={setCategoryID}
//       />

//       <Link to="/">
//         <div className="flex items-center gap-1 relative z-50">
//           <Youtube
//             fill="red"
//             stroke="black"
//             size={48}
//             strokeWidth={1}
//             className="cursor-pointer"
//           />
//           <span className="text-xl">Youtube</span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Nav;