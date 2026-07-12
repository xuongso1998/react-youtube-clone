import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import CardList from "./components/CardList/index.jsx";
import VideoDetails from "./components/VideoDetail/index.jsx";
import ChannelInfo from "./components/ChannelInfo/index.jsx";
import Playlist from "./components/Playlist/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {index: true, element: <CardList/>},
      {path: "video/:id", element: <VideoDetails/> },
      {path: "channel/:id", element: <ChannelInfo/>},
      {path: "playlist/:id", element: <Playlist/>}
    ]
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
