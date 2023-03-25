
import {Col, Row, Container, Button} from 'react-bootstrap';
import GLUI_MainContainer from '../components/GLUI_MainContainer'
//import GLUI_ListContainer from "../components/GLUI_ListContainer";
import React, {useContext, useState} from "react";
import GLListProvider, {ListContext} from "../services/GLListContext";
import GLUI_ImgButton from "../components/GLUI_ImgButton";
import GLUI_ContentContainer from "../components/GLUI_ContentContainer";
import GLUI_Header from "../components/GLUIHeader";

import {GLCommonIcon} from "../assets/common.js"
import GLUI_Input from "../components/GLUI_Input";



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

            <GLUI_ListContainer/>
        </GLUI_MainContainer>
    );
}


// We render the GLUI_Header template with the properties necessary to give the header buttons the appropriate action.
function GLUI_ListHeader() {
    return (<GLUI_Header link={"farts"} menuClick={()=>{}} menuOver={()=>{}}></GLUI_Header>);
}




function GLUI_ListContainer(props){

    //Should my state variable be here? Well..

    //const [addStatus, setAddStatus] = useState(0);

    // I put this here first, but every time I clicked the button the entire container flashed as it redrew. that didn't look good.
    // Why did it do that? Maybe I need to find another place to put it (farther down)


    //const [lists, setLists] = useContext(ListContext);
    // Until a source for the list is made, this is a dummy list to test render layout for items.
    const initialValue = [
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


    // An inline component, that is, this is a valid react component defined within a component.
    const GLUI_ListItem = ({label, icon}) => {
        return (
            <Col xs={12} md={6} lg={4} xl={3} className={"GLUI_ListItem row mx-auto"}>

                    <GLUI_ImgButton image={icon} onClick={()=>{


                    }}/>

                    {label}

            </Col>
        );
    }

    const GLUI_ListItemAdd = () => {

        // After moving this statement here, my performance improved vastly. can you imagine why?
        // Set state renders whichever component it is attached to the scope of.
        const [addStatus, setAddStatus] = useState(0);


        if(addStatus == false){
            return (
                <Col md={3} xs={6} className={"GLUI_ListItemAdd row"}>

                    <GLUI_ImgButton image={GLCommonIcon.GL_ICON_ADD} onClick={()=>{
                        setAddStatus(1);
                    }}/>

                    Add Item

                </Col>
            );
        }
        if(addStatus == true){
            return (
                <Col md={3} xs={6} className={"GLUI_ListItemAdd row"}>

                    <GLUI_Input onClick={()=>{
                       
                    }}/>

                    Set Label

                </Col>
            );
        }

    }


    // An inline lambda statement returning a list of GLUI_ListItems within a grid container.
    const generateListItemsContent = () => {
        return (

            // The CSS definition for this component is located here. Within this lambda function. Couldn't go wrong.
            <Row className = "GLUI_ListContainer mx-auto">

                {/*  Maps each value in our list of lists to it's own component, and passes it what it needs to function.*/}
                {
                    initialValue.map(
                            (value) => {
                                 return (<GLUI_ListItem label={value.name} icon={value.icon}></GLUI_ListItem>);
                             })
                }
                {/* Now we need our addList item*/}
                <GLUI_ListItemAdd/>
            </Row>


        )
    }



    return(

        //This is where the render method of this function is located.
        <GLUI_ContentContainer>

            {//This ListContext provides us with our global lists value, and in the future will provide reducer
                // tasks for the remainder of the app functionality. I was originally going to make this a simple
                // use state but the fact that I need not just a setLists function to give the app the functionality
                // it needs. an example of these reducer tasks could be 'changed', 'add', 'remove'
            }
            <ListContext.Provider value={initialValue}>


                {generateListItemsContent()}
            </ListContext.Provider>


        </GLUI_ContentContainer>
    );
    //
}
// ListContainer end

