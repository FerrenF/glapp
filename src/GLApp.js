import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";

import GLUI_ViewLogin from "./views/GLUI_ViewLogin";
import GLUI_ViewMain from "./views/GLUI_ViewMain";
import GLUI_ViewRegister from "./views/GLUI_ViewRegister";
import GLUI_ViewConfirm from "./views/GLUI_ViewConfirm";
import GLUI_ViewList from "./views/GLUI_ViewList";
import GLUI_MainContainer from "./components/GLUI_MainContainer";

//main socket, change port in future
const socket = io('localhost:3001');


export default function GLApp(props) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastMessage, setLastMessage] = useState(null);
    const view = props.view;

    return (
        <div className='GLAppMain'>
            <Routes>
                /*
                    So here is where we enter the GLUI.
                    GLUI_MainContainer is special in that it holds all other components for our app.
                    We can change it's content to reflect changes in the browser URL.
                */
                <Route element={<GLUI_MainContainer />}>
                    <Route path="/" element={<GLUI_ViewMain />} />
                    <Route path="/login" element={<GLUI_ViewLogin />} />
                    <Route path="/register" element={<GLUI_ViewRegister />} />
                </Route>
            </Routes>
        </div>
    );
}

console.log('GLAPP Initialized')

