import React, { useEffect, useState } from "react";

import DrawerItem from "../DrawerItem";
import {
  Clapperboard,
  Gamepad2,
  House,
  Lightbulb,
  Music,
  Newspaper,
  Shirt,
  Volleyball,
} from "lucide-react";
import api from "../../apis";

const Drawer = ({ setCategoryID }) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("home");
  const categoryItems = [
    {
      icon: <Music size={20} strokeWidth={2} />,
      text: "Music",
      filterTag: "music",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "Music";
      })?.id,
    },
    {
      icon: <Volleyball size={20} strokeWidth={2} />,
      text: "Sports",
      filterTag: "sports",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "Sports";
      })?.id,
    },
    {
      icon: <Gamepad2 size={20} strokeWidth={2} />,
      text: "Gaming",
      filterTag: "gaming",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "Gaming";
      })?.id,
    },
    {
      icon: <Clapperboard size={20} strokeWidth={2} />,
      text: "Movies",
      filterTag: "movies",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "Movies";
      })?.id,
    },
    {
      icon: <Newspaper size={20} strokeWidth={2} />,
      text: "News & Politics",
      filterTag: "news",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "News & Politics";
      })?.id,
    },
    {
      icon: <Shirt size={20} strokeWidth={2} />,
      text: "Howto & Style",
      filterTag: "howto&style",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "Howto & Style";
      })?.id,
    },
    {
      icon: <Lightbulb size={20} strokeWidth={2} />,
      text: "Education",
      filterTag: "education",
      categoryID: categories.find((category) => {
        return category?.snippet?.title === "Education";
      })?.id,
    },
  ];
  const fetchCategories = async () => {
    const response = await api.get(
      `videoCategories?part=snippet&regionCode=us&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`,
    );
    setCategories(response.data.items);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div
      id="drawer-example"
      className="fixed top-0 left-0 z-40 h-screen py-4 pt-20 overflow-y-auto transition-transform -translate-x-full bg-[#0c0c0c] w-96 dark:bg-gray-500"
      tabIndex="-1"
      aria-labelledby="drawer-label"
    >
      <div className="py-5 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <DrawerItem
            title={"Home"}
            icon={<House size={20} strokeWidth={2} />}
            filterTag={"home"}
            filter={filter}
            setFilter={setFilter}
            categoryChildID={null}
            setCategoryID={setCategoryID}
          />
          {categoryItems.map((category, index) => {
            return (
              <DrawerItem
                title={category.text}
                icon={category.icon}
                key={index}
                filterTag={category.filterTag}
                filter={filter}
                setFilter={setFilter}
                categoryChildID={category.categoryID}
                setCategoryID={setCategoryID}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;




// import React, { useEffect, useState } from "react";
// import DrawerItem from "../DrawerItem";
// import {
//   Clapperboard,
//   Gamepad2,
//   House,
//   Lightbulb,
//   Music,
//   Newspaper,
//   Shirt,
//   Volleyball,
// } from "lucide-react";
// import api from "../../apis";

// const Drawer = ({ setCategoryID, isOpen, setIsOpen }) => {
//   const [categories, setCategories] = useState([]);
//   const [filter, setFilter] = useState("home");

//   const categoryItems = [
//     {
//       icon: <Music size={20} />,
//       text: "Music",
//       filterTag: "music",
//       categoryID: categories.find(c => c?.snippet?.title === "Music")?.id,
//     },
//     {
//       icon: <Volleyball size={20} />,
//       text: "Sports",
//       filterTag: "sports",
//       categoryID: categories.find(c => c?.snippet?.title === "Sports")?.id,
//     },
//     {
//       icon: <Gamepad2 size={20} />,
//       text: "Gaming",
//       filterTag: "gaming",
//       categoryID: categories.find(c => c?.snippet?.title === "Gaming")?.id,
//     },
//     {
//       icon: <Clapperboard size={20} />,
//       text: "Movies",
//       filterTag: "movies",
//       categoryID: categories.find(c => c?.snippet?.title === "Movies")?.id,
//     },
//     {
//       icon: <Newspaper size={20} />,
//       text: "News & Politics",
//       filterTag: "news",
//       categoryID: categories.find(c => c?.snippet?.title === "News & Politics")?.id,
//     },
//     {
//       icon: <Shirt size={20} />,
//       text: "Howto & Style",
//       filterTag: "howto&style",
//       categoryID: categories.find(c => c?.snippet?.title === "Howto & Style")?.id,
//     },
//     {
//       icon: <Lightbulb size={20} />,
//       text: "Education",
//       filterTag: "education",
//       categoryID: categories.find(c => c?.snippet?.title === "Education")?.id,
//     },
//   ];

//   const fetchCategories = async () => {
//     const res = await api.get(
//       `videoCategories?part=snippet&regionCode=US&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
//     );
//     setCategories(res.data.items);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       {/* overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* drawer */}
//       <div
//         className={`fixed top-0 left-0 z-40 h-screen pt-20 w-80 bg-[#0c0c0c] transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* close button */}
//         <button
//           className="absolute top-4 right-4 text-white text-xl"
//           onClick={() => setIsOpen(false)}
//         >
//           ✕
//         </button>

//         <div className="py-5 overflow-y-auto">
//           <ul className="space-y-2 font-medium">
//             <DrawerItem
//               title="Home"
//               icon={<House size={20} />}
//               filterTag="home"
//               filter={filter}
//               setFilter={setFilter}
//               categoryChildID={null}
//               setCategoryID={setCategoryID}
//               onClick={() => setIsOpen(false)}
//             />

//             {categoryItems.map((cat, i) => (
//               <DrawerItem
//                 key={i}
//                 title={cat.text}
//                 icon={cat.icon}
//                 filterTag={cat.filterTag}
//                 filter={filter}
//                 setFilter={setFilter}
//                 categoryChildID={cat.categoryID}
//                 setCategoryID={setCategoryID}
//                 onClick={() => setIsOpen(false)}
//               />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Drawer;