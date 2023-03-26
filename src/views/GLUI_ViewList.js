import GLUI_MainContainer from "../components/GLUI_MainContainer";
import GLUI_Header from "../components/GLUIHeader";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {GLDBWrapper} from "../services/GLDBWrapper";
import {GLItemsProvider, UseItems, UseItemsDispatch} from "../services/GLItemsContext";
import {GLDbg} from "../services/util";
import {ListContext} from "../services/GLListContext";

import {Container, Col, Row, InputGroup, FormCheck} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {GLCommonIcon} from "../assets/common";


export default function GLUI_ViewList(props) {
    return (
        <GLItemsProvider>
            <GLUI_ViewContainer>

            </GLUI_ViewContainer>
        </GLItemsProvider>
    );
}

// item: '++id, name, list_id, label, order, parent, state',

function GLUI_ViewContainer(){

    const [loaded, setLoaded] = useState(false);
    // This will store the status of our DB queries
    const itemsContext = UseItems();
    const itemsContextDispatch = UseItemsDispatch();

    // This accesses the :listid variable contained in the <Route properties, if it exists.
    let { listid } = useParams();
    const db = new GLDBWrapper();

    //First, we need to get the list information so we can populate the root list item (head)
    if(!itemsContext.listHeadPopulated) {
        Promise.resolve(db.get_list(listid)).then(
            (result) => {
           itemsContextDispatch({
                type: "set-list",
                list : result
            });
        }, (response) => {
            GLDbg("GLUI: Failed to retrieve information for list_id "+ listid + ": " + response);
        }).catch((exception) => {
            GLDbg("GLUI: Error retrieving information for list_id "+ listid + ": " + exception);
        }).then(()=>db.get_list_items(listid)).then((result) => {
            if(result!=""){
                itemsContextDispatch({
                    type: "set-items",
                    list: {items: result}
                });
            }
            setLoaded(true);
        }, (response) =>{
            GLDbg("GLUI: Failed to retrieve item list for list_id "+ listid + ": " + response);
        }).catch((exception)=>{
            GLDbg("GLUI: Error retrieving item list for list_id "+ listid + ": " + exception);
        });
    }
    else
    {

    }
    return (
        <Container style={ {width:"100%"}}>

            <Row className={"justify-content-start my-1"} >
                <Col md={2}></Col>
                <Col md={8} className={"GLUIRootContainer ItemListContainer container"}>
                    <Row className={"align-items-center"}>
                        <Col md={2}>
                            <GLUI_GripBtn/>
                        </Col>
                        <Col md={1}>
                            <GLUI_Checkbox/>
                        </Col>
                        <Col md={4}>
                            <h3>{itemsContext.listHead.name}</h3>
                        </Col>
                        <Col md={2}>
                            <GLUI_RootAddBtn icon={GLCommonIcon.GL_ICON_ADD}/>
                        </Col>
                        <Col md={2}>

                        </Col>
                    </Row>
                </Col>
                <Col md={3}></Col>
            </Row>

            <Row className={"justify-content-start my-1"} >
                <Col md={2}></Col>
                <Col md={8} className={"GLUIRootContainer ItemListContainer container"}>
                    <Row className={"align-items-center"}>
                        <Col md={2}>
                            <GLUI_GripBtn/>
                        </Col>
                        <Col md={1}>
                            <GLUI_Checkbox/>
                        </Col>
                        <Col md={4}>
                            <h3>{itemsContext.listHead.name}</h3>
                        </Col>
                        <Col md={2}>
                            <GLUI_RootAddBtn icon={GLCommonIcon.GL_ICON_ADD}/>
                        </Col>
                        <Col md={2}>

                        </Col>
                    </Row>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
   );
}
function GLUI_Checkbox({onClick}) {
    return(<InputGroup>
        <FormCheck className={"GLUI_Checkbox"}></FormCheck>
    </InputGroup>
    );
}
function GLUI_RootAddBtn({icon, onClick}) {
    return(<Image fluid={true} className="rounded GLUI_ImgButton " src={icon}
                  alt="Description" onClick={onClick} />
    );
}
function GLUI_GripBtn() {
    return(<Image fluid={true} className="rounded GLUI_ImgButton " src={GLCommonIcon.GL_ICON_GRIP}
                  alt="Description" />
    );
}