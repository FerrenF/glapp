import {BrowserRouter, Route, Routes,  createBrowserRouter,
    RouterProvider} from "react-router-dom";
import GLUI_ViewMain from "../views/GLUI_ViewMain";
import GLUI_ViewLogin from "../views/GLUI_ViewLogin";
import GLUI_ViewRegister from "../views/GLUI_ViewRegister";
import GLUI_ViewList from "../views/GLUI_ViewList";
import React from "react";
import GLApp from "../GLApp";


const router = createBrowserRouter([
    {
        path: "/",
        element: <GLApp />,

        children: [
            {
                path: "",
                element: <GLUI_ViewMain />,

            },
            {
                path: "login",
                element: <GLUI_ViewLogin />,

            },
            {
                path: "register",
                element: <GLUI_ViewRegister />,

            },
            {
                path: "list/:listid",
                element: <GLUI_ViewList />,

            },
        ],

    },




]);
export const GLRoutes = () => {

    return (<>
        <RouterProvider router={router}>

        </RouterProvider>

    </>);
}
