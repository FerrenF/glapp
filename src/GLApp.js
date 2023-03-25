import React from 'react';
import io from 'socket.io-client';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter,
    Routes,
    Route, Outlet,
} from "react-router-dom";


import {GLRoutes} from "./components/GLUIRoutes";
import GLUI_MainContainer from "./components/GLUI_MainContainer";
import GLUI_Header from "./components/GLUIHeader";


// IN THIS FILE:
//
// Main App Container
// GLApp - "GLAppMain"
//
// Application URL routing
// Todo: Seperate routes from this file.
//
//
//


// Todo: Server Connection
//main socket, change port in future
//const socket = io('localhost:3001');

// We render the GLUI_Header template with the properties necessary to give the header buttons the appropriate action.
function GLUIAppHeader() {
    return (<GLUI_Header link={"farts"} menuClick={()=>{}} menuOver={()=>{}}></GLUI_Header>);
}

export default function GLApp(props) {

    // Todo: server connectivity
    // const [isConnected, setIsConnected] = useState(socket.connected);
    // const [lastMessage, setLastMessage] = useState(null);

    return (
            <div className='GLAppMain'>
                <GLUI_MainContainer>
                    <GLUIAppHeader/>
                    <Outlet></Outlet>
                </GLUI_MainContainer>
            </div>

    );
}

console.log('GLAPP Initialized')

