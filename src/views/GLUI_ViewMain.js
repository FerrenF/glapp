

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
function GLUI_ListItemAdd(props){
    const listContext = UseLists();
    const dispatch = UseListsDispatch();
    const [addStatus, setAddStatus] = useState(0);
    const [text, setText] = useState('');

    //Pull from this list with an index depending on our status.
    const _img = [GLCommonIcon.GL_ICON_ADD,GLCommonIcon.GL_ICON_SUBMIT,GLCommonIcon.GL_ICON_ADDIMG];

    // This is an inline template component for the input box that appears when status == 1, or the user has clicked on
    // the button to add an item. It will not render otherwise and is simply an empty variable.
    const inpt = () => (addStatus == 1) ? <>
        Set Label
        <InputGroup>
            <GLUI_Input onChange={(e)=>setText(e.target.value)} onClick={()=>{
            }}/>
        </InputGroup>
    </> : <></>;

    //We adjust various properties of this button-to-be depending on the status.
    return (
        <Col xs={12} md={6} lg={4} xl={3} className={"GLUI_ListItem row mx-auto"}>
            {inpt()}
            <GLUI_ListItemImgBtn icon={_img[addStatus]} onClick={()=>{
                switch (addStatus) {
                    case 0:
                    case 1:
                        setAddStatus(addStatus+1);
                        break;
                    case 2:
                        let newID = Math.max(...listContext.lists.map((o)=>o.id))+1;
                        dispatch({
                            type: 'added',
                            icon: GLCommonIcon.GL_ICON_FILE,
                            name: text,
                            id: newID
                        });
                        setAddStatus(0);
                    default:
                }
            }}/>
            {(addStatus == 0) ? "Add Item" : (addStatus == 2) ? "Set Image" : ""}
        </Col>
    );
}


// This contains most of the components that make up our list of lists display.
const GLUI_ListContainer = (props)=>{

    //This inline component represents what an item should look like when rendered on our list of lists.
    const GLUI_ListItem = ({label, icon, id}) => {
        return (
            <Col md={3} xs={6} className={"GLUI_ListItem row"}>
                <Link to={"list/"+id} style={{width:"100%"}}>
                     <GLUI_ListItemImgBtn icon={icon} onClick={(e)=>{

                         //Todo: This action should stop the add item function.

                     }}/>
                </Link>
                    {label}
            </Col>
        );
    }

    //Resources
    const listContext = UseLists();
    const dispatch = UseListsDispatch();
    const dbObject = new GLDBWrapper();


    if(!listContext.isLoaded) {
        dbObject.get_lists().then((response) => {
            if (response == null) {
                console.log("No current lists");
            } else {
                console.log("Loaded lists.");
                    dispatch({
                        type: 'load',
                        lists: response
                    })
            }
        }).then(()=>{
            dispatch({
                type: "loaded",
                isLoaded: true
            });
        });
        return <></>;
    }
    else {

    }


    // Render time.
    return(
        <GLUI_ContentContainer>
                <Row className = "GLUI_ListContainer mx-auto">
                    {/*  Maps each value in our list of lists to it's own component, and passes it what it needs to function.*/}
                    {
                        listContext.lists.map(
                            (value) => {
                                return (<GLUI_ListItem label={value.name} icon={value.icon} id={value.id}></GLUI_ListItem>);
                            })
                    }

                    {/* Now we need our addList component*/}
                    <GLUI_ListItemAdd dbObject={dbObject} context={{listContext: listContext, dispatchContext: dispatch}}/>
                </Row>
        </GLUI_ContentContainer>
    );

    //
}

