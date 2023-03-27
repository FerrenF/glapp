

import {Col, Row, Container, Button, InputGroup} from 'react-bootstrap';

import React, {useContext, useState} from "react";

import {ListContext, GLListProvider, UseLists, UseListsDispatch} from "../services/GLListContext";

import GLUI_ContentContainer from "../components/GLUI_ContentContainer";

import {GLCommonIcon} from "../assets/common.js"
import GLUI_Input from "../components/GLUI_Input";
import Image from "react-bootstrap/Image";

import {GLDBWrapper} from "../services/GLDBWrapper";
import {Link} from "react-router-dom";


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

    // GLListProvider gives us our current lists oject and a dispatch for events.
    // GLUI_ListContainer contains everything else, and receives the objects provided by GLListProvider
    return (
            <GLListProvider>
                <GLUI_ListContainer/>
            </GLListProvider>
    );
}


// This is a template component for the images inside of each of the item containers making up our display for the
// list of lists we import. The inline style and state variable are simply for the enlargement effect.
function GLUI_ListItemImgBtn({icon, onClick}) {
    const [enlarged, setEnlarged] = useState(false);
    return(<Image style={ {display: "flex", width: "100%", scale: (enlarged ? "1.25" : "1")}} fluid={true} className="rounded GLUI_ImgButton " src={icon}
                                  alt="Description" onClick={onClick} onMouseOver={()=>setEnlarged(true)} onMouseOut={()=>setEnlarged(false)}/>
    );
}


// This button has three different states depending on which part of the 'add an item to the list' process they are in.
function GLUI_ListItemAdd(){

    const dispatch = UseListsDispatch();
    const [addStatus, setAddStatus] = useState(0);
    const [text, setText] = useState('');

    //Pull from this list with an index depending on our status.
    const _img = [GLCommonIcon.GL_ICON_ADD,GLCommonIcon.GL_ICON_SUBMIT,GLCommonIcon.GL_ICON_ADDIMG];



    // This is an inline template component for the input box that appears when status == 1, or the user has clicked on
    // the button to add an item. It will not render otherwise and is simply an empty variable.
    const inpt = () =>{
        if(addStatus == 1){
            return (<>
                Set Label
                <InputGroup>
                    <GLUI_Input onChange={(e)=>setText(e.target.value)} onClick={()=>{
                    }}/>
                </InputGroup>
            </>);
        }
        return <></>;
    }


    //We adjust various properties of this button-to-be depending on the status.
    return (
        <Col xs={6} sm={6} md={3} lg={3} xl={3} className={"GLUI_ListItem mx-auto row"}>
            {inpt()}
            <GLUI_ListItemImgBtn icon={_img[addStatus]} onClick={()=>{
                if(addStatus <2) {
                    setAddStatus(addStatus+1);
                    return;
                }
                dispatch({
                    type: 'added',
                    icon: GLCommonIcon.GL_ICON_FILE,
                    name: text
                });
                setAddStatus(0);
            }}/>
            {(addStatus == 0) ? "Add Item" : (addStatus == 2) ? "Set Image" : ""}
        </Col>
    );
}


// This contains most of the components that make up our list of lists display.
function GLUI_ListContainer(props){

    const [listsLoaded, setListsLoaded] = useState(false);


    //This inline component represents what an item should look like when rendered on our list of lists.
    const GLUI_ListItem = ({label, icon, id}) => {
        return (
            <Col xs={6} sm={6} md={3} lg={3} xl={3} className={"GLUI_ListItem mx-auto row"}>
                <Link to={"list/"+id} style={{width:"100%"}}>
                     <GLUI_ListItemImgBtn icon={icon} onClick={(e)=>{

                     }}/>
                </Link>
                    {label}

            </Col>
        );
    }

    //TODO
    /*function GLUI_ListSidebar(props){

        const [menuItems, setMenuItems] = useState(false);
    
    
        //This inline component represents what an item should look like when rendered on our list of lists.
        const GLUI_MenuItem = ({label, icon, id}) => {
            return (
                <Col md={3} xs={6} className={"GLUI_ListItem row"}>
                    <Link to={"list/"+id} style={{width:"100%"}}>
                         <GLUI_ListItemImgBtn icon={icon} onClick={(e)=>{
    
                         }}/>
                    </Link>
                        {label}
    
                </Col>
            );
        }
    }*/


    //Resources
    const lists = UseLists();
    const dispatch = UseListsDispatch();
    const db = new GLDBWrapper();


    if(!listsLoaded) {
        setListsLoaded(true);
        db.get_lists().then((response) => {

            if (response == null) {
                console.log("No current lists");
            } else {
                console.log("Loaded lists.");
                    dispatch({
                        type: 'set',
                        lists: response
                    })
            }
        });
    }


    // Render time.
    return(
        <GLUI_ContentContainer>
                <Row className = "GLUI_ListContainer d-flex justify-content-center mx-auto">
                    
                    {/* RB: Idea to keep this list item first and append new lists immediately after it (or after pinned items) */}
                    {/* Add Item button could become a fixed icon at the bottom right of the screen once the screen begins to hide the original Add Item icon*/}
                    <GLUI_ListItemAdd/>
                        {/*  Maps each value in our list of lists to it's own component, and passes it what it needs to function.*/}
                        {
                            lists.map(
                                (value) => {
                                    return (<GLUI_ListItem label={value.name} icon={value.icon} id={value.id}></GLUI_ListItem>);
                                })
                        }

                    {/* Now we need our addList component*/}
                    
                </Row>
        </GLUI_ContentContainer>
    );

    //
}


