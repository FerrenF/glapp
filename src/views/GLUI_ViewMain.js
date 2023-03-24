
import {Col, Row, Container, InputGroup} from 'react-bootstrap';
import GLUI_MainContainer from '../components/GLUI_MainContainer'
//import GLUI_ListContainer from "../components/GLUI_ListContainer";
import React, {useContext, useState} from "react";

import {ListContext, GLListProvider, UseLists, UseListsDispatch} from "../services/GLListContext";

import GLUI_ImgButton from "../components/GLUI_ImgButton";
import GLUI_ContentContainer from "../components/GLUI_ContentContainer";
import GLUI_Header from "../components/GLUIHeader";

import {GLCommonIcon} from "../assets/common.js"
import GLUI_Input from "../components/GLUI_Input";
import Image from "react-bootstrap/Image";



// IN THIS FILE:
//
// Main View Container - GLUI_ViewMain
// All associated view specific components:
// GLUI_ListHeader                                          Resonsible for opening the sidebar and navigating back to the main menu from anywhere.
//      Children
// GLUI_ListContainer
//      GLUI_ListItem <- Inline definition                  Responsible for containing the components of each list displayed on the list view page.
//      GLUI_ListItemAdd <- Inline definition               Responsible for containing a single component which begins the process of adding an item to the list.
//      Children
// GLUI_ListSidebar                                         Todo: Implement the sidebar.
//      Children




//This is the view that all users will see when they hit the main page. Keep this at either the top or bottom for
//easy access.


//Main menu view.
export default function GLUI_ViewMain(props) {
    return (
        <GLUI_MainContainer>

            <GLUI_ListHeader/>
            <GLListProvider>
                {//This ListContext Provider, GLListProvider provides us with our global lists value, and in the future will provide reducer
                    // tasks for the remainder of the app functionality.
                }
                <GLUI_ListContainer/>
            </GLListProvider>
        </GLUI_MainContainer>
    );
}


// We render the GLUI_Header template with the properties necessary to give the header buttons the appropriate action.
function GLUI_ListHeader() {
    return (<GLUI_Header link={"farts"} menuClick={()=>{}} menuOver={()=>{}}></GLUI_Header>);
}


function GLUI_ListItemImgBtn({icon, onClick}) {

    const [enlarged, setEnlarged] = useState(false);
    return(<Image style={ {scale: (enlarged ? "1.25" : "1")}} fluid={true} className="rounded GLUI_ImgButton " src={icon}
                  alt="Description" onClick={onClick} onMouseOver={()=>setEnlarged(true)} onMouseOut={()=>setEnlarged(false)}/>
    );
}


// This button has three different states depending on which part of the 'add an item to the list' process they are in.

function GLUI_ListItemAdd(){
    const dispatch = UseListsDispatch();
    // After moving this statement here, my performance improved vastly. can you imagine why?
    // Set state renders whichever component it is attached to the scope of.
    const [addStatus, setAddStatus] = useState(0);
    const [text, setText] = useState('');
    const [img, setImg] = useState(GLCommonIcon.GL_ICON_ADD);

    if(addStatus == 0){
        return (
            <Col md={3} xs={6} className={"GLUI_ListItemAdd row"}>
                <GLUI_ListItemImgBtn icon={GLCommonIcon.GL_ICON_ADD} onClick={()=>{
                    setAddStatus(1);
                }}/>
                Add Item
            </Col>
        );
    }
    else if(addStatus == 1){
        return (
            <Col md={3} xs={6} className={"GLUI_ListItemAdd row"}>
                Set Label
                <InputGroup>
                    <GLUI_Input onChange={(e)=>setText(e.target.value)} onClick={()=>{

                    }}/>
                </InputGroup>
                <GLUI_ListItemImgBtn icon={GLCommonIcon.GL_ICON_SUBMIT} onClick={()=>{
                    setAddStatus(2);
                }}/>

            </Col>
        );
    }
    else if(addStatus == 2){

        //Todo: The user needs to be able to select an image here. Maybe itll be a file prompt, or maybe it'll be a modal offering choices
        // that already exist on the server.
        return (
            <Col md={3} xs={6} className={"GLUI_ListItemAdd row"}>
                <GLUI_ListItemImgBtn icon={GLCommonIcon.GL_ICON_ADDIMG} onClick={()=>{
                    dispatch({
                        type: 'added',
                        icon: GLCommonIcon.GL_ICON_FILE,
                        name: text
                    });
                    setAddStatus(0);
                }}/>
                Set Image
            </Col>
        );
    }
}

function GLUI_ListContainer(props){


    // An inline component, that is, this is a valid react component defined within a component.
    const GLUI_ListItem = ({label, icon}) => {
        const [enlarged, setEnlarged] = useState(false);
        return (
            <Col md={3} xs={6} className={"GLUI_ListItem row"}>
                <GLUI_ListItemImgBtn icon={icon}/>
                    {label}

            </Col>
        );
    }

    //Todo: add this to the figma
    //This component is the item in the list the user must click to add more items.

    const initialValues = [
        {
            id : 1,
            name: "Item 1",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 0,
            pinned: false
        }, {
            id : 2,
            name: "Item 2",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 1,
            pinned: false
        }, {
            id : 3,
            name: "Item 3",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 2,
            pinned: false
        }, {
            id : 4,
            name: "Item 4",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 3,
            pinned: false
        }, {
            id : 5,
            name: "Item 5",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 4,
            pinned: false
        }, {
            id : 6,
            name: "Item 6",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 5,
            pinned: false
        }, {
            id : 7,
            name: "Item 7",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 6,
            pinned: false
        }, {
            id : 8,
            name: "Item 8",
            user_id: 0,
            created: Date.now(),
            changed: 0,
            icon: GLCommonIcon.GL_ICON_FILE,
            order: 7,
            pinned: false
        }


    ];

    // An inline lambda statement returning a list of GLUI_ListItems within a grid container.
    const lists = UseLists();

    return(

        //This is where the render method of this function is located.
        <GLUI_ContentContainer>

                <Row className = "GLUI_ListContainer mx-auto">
                    {/*  Maps each value in our list of lists to it's own component, and passes it what it needs to function.*/}
                    {
                        lists.map(
                            (value) => {
                                return (<GLUI_ListItem label={value.name} icon={value.icon}></GLUI_ListItem>);
                            })

                    }

                    {/* Now we need our addList item*/}
                    <GLUI_ListItemAdd/>
                </Row>

        </GLUI_ContentContainer>
    );

    //
}
//This component adds the enlarge on mouse over animation.

// ListContainer end

