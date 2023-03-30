import GLUI_MainContainer from "../components/GLUI_MainContainer";
import GLUI_Header from "../components/GLUIHeader";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {GLDBWrapper} from "../services/GLDBWrapper";
import {GLItemsProvider, UseItems, UseItemsDispatch} from "../services/GLItemsContext";
import {GLDbg} from "../services/util";
import {ListContext} from "../services/GLListContext";

import {Container, Col, Row, InputGroup, FormCheck, Form} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {GLCommonIcon} from "../assets/common";
import {GLItemsViewProvider, UseItemsView, UseItemsViewDispatch} from "../services/GLItemsViewContext";


export default function GLUI_ViewList(props) {
    return (
        <GLItemsProvider>
            <GLItemsViewProvider>
                <GLUI_ViewContainer>

                </GLUI_ViewContainer>
            </GLItemsViewProvider>
        </GLItemsProvider>
    );
}

// item: '++id, name, list_id, label, order, parent, state',



function GLUI_ViewContainer(){

    // This will store variables related to this page
    const itemsViewContext = UseItemsView();
    const itemsViewDispatch = UseItemsViewDispatch();
    
    // This will store the status of our DB queries
    const itemsContext = UseItems();
    const itemsDispatch = UseItemsDispatch();

    // This accesses the :listid variable contained in the <Route properties, if it exists.
    let { listid } = useParams();
    const db = new GLDBWrapper();

    //First, we need to get the list information so we can populate the root list item (head)
    if(!itemsContext.listHeadPopulated) {
        Promise.resolve(db.get_list(listid)).then(
            (result) => {
           itemsDispatch({
                type: "set-list",
                list : result
            });
        }, (response) => {
            GLDbg("GLUI: Failed to retrieve information for list_id "+ listid + ": " + response);
        }).catch((exception) => {
            GLDbg("GLUI: Error retrieving information for list_id "+ listid + ": " + exception);
        }).then(()=>db.get_list_items(listid)).then((result) => {
             itemsDispatch({
                    type: "set-items",
                    items: result
                });
            itemsViewDispatch({type: "db-loaded"});
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
            <GLUI_RootContainer itemsViewContext={itemsViewContext} itemsViewDispatch={itemsViewDispatch}
                                itemsContext={itemsContext} itemsDispatch={itemsDispatch} list={itemsContext.listHead}/>

            {// for i in folder list
                 }

            <GLUI_AddFolderContainer itemsContext={itemsContext} itemsDispatch={itemsDispatch}
                                     itemsViewContext={itemsViewContext} itemsViewDispatch={itemsViewDispatch}/>
            <GLUI_FolderContainer/>
            <GLUI_ItemContainer/>

        </Container>
   );
}

function GLUI_RootContainer(props){

    const context = props.itemsViewContext;
    const dispatch = props.itemsViewDispatch;

    return( <Row className={"justify-content-start my-1"} >
        <Col md={2}></Col>
        <Col md={8} className={"GLUIRootContainer ItemListContainer container"}>
            <Row className={"align-items-center"}>
                <Col md={1}>
                    <GLUI_GripBtn/>
                </Col>
                <Col md={1}>
                    <GLUI_Checkbox/>
                </Col>
                <Col md={7}>
                    <h3>{props.list.name}</h3>
                </Col>
                <Col md={1}>
                    <GLUI_RootAddBtn onClick={()=>{
                        if(context.adding.status == 0) {
                            dispatch({type: "root-add-clicked"});
                        } else {
                            dispatch({type: "root-cancel-clicked"});
                        }
                    }} onOver={()=>{}} onOut={()=>{}} rotate={(context.adding.status > 0)} />
                </Col>
                <Col md={2}>

                </Col>
            </Row>
        </Col>
        <Col md={3}></Col>
    </Row>);
}
function GLUI_AddFolderContainer(props){
    const itemsDispatch = props.itemsDispatch;
    const itemsContext = props.itemsContext;
    const itemViewContext = props.itemsViewContext;
    const dispatch = props.itemsViewDispatch

    if(itemViewContext.adding.status === 0 || (itemsContext.listItemsPopulated === false)){
        return <></>;
    }

    let newID = Math.max(...itemsContext.listItems.map((o)=>o.id),0)+1;

    return(<Row className={"justify-content-start my-1"} >
        <Col md={4}></Col>
        <Col md={8} className={"GLUIAddFolderContainer ItemListContainer container"}>
            <Row className={"align-items-center"}>
                <Col md={2}>
                    <GLUI_GripBtn/>
                </Col>
                <Col md={7}>
                    <Form className={"GLUIForm"}>
                        <Form.Control id={"RootNewItemText"} placeholder="Enter item name..." />
                    </Form>
                </Col>
                <Col md={1}>
                    <Image  className="rounded GLUI_ImgButton GLUI_ItemSubmitBtn" src={GLCommonIcon.GL_ICON_SUBMIT}
                            alt="Description" onClick={()=>{
                            let itemName = document.getElementById("RootNewItemText").value;
                            dispatch({type: "root-item-submit" });


                            itemsDispatch({type: "add-item", item: {
                                name: itemName,
                                id: newID,
                                order: 0,
                                parent: 0,
                                list_id: itemsContext.listHead.id
                            }
                            });

                    }}></Image>
                </Col>
                <Col md={2}>

                </Col>
            </Row>
        </Col>
        <Col md={1}></Col>
    </Row>);
}
function GLUI_FolderContainer({folder}){
    return(<Row className={"justify-content-start my-1"} >
        <Col md={4}></Col>
        <Col md={8} className={"GLUIFolderContainer ItemListContainer container"}>
            <Row className={"align-items-center"}>
                <Col md={2}>
                    <GLUI_GripBtn/>
                </Col>
                <Col md={1}>
                    <GLUI_Checkbox/>
                </Col>
                <Col md={7}>
                    <h3>A folder item</h3>
                </Col>
                <Col md={1}>
                    <GLUI_ItemAddBtn/>
                </Col>
                <Col md={1}>
                    <GLUI_ExpandContract/>
                </Col>
            </Row>
        </Col>
        <Col md={1}></Col>
    </Row>);
}
function GLUI_ItemContainer({item}){
    return (<>
        <Row className={"justify-content-start my-1"} >
            <Col md={5}></Col>
            <Col md={7} className={"GLUIFolderContainer ItemListContainer container"}>
                <Row className={"align-items-center"}>
                    <Col md={2} sm={1}>
                        <Row>
                            <Col><GLUI_GripBtn/></Col>
                            <Col><GLUI_Checkbox/></Col>
                        </Row>

                    </Col>
                    <Col md={8} sm={8}>
                        <h5>An item, it's name could be anything</h5>
                    </Col>
                    <Col md={1} sm={0.5}>
                        <GLUI_ItemAddBtn/>
                    </Col>
                    <Col md={1} sm={1}>
                        <GLUI_ExpandContract/>
                    </Col>
                </Row>
            </Col>
            <Col md={1}></Col>
        </Row>
        </>);
}
function GLUI_Checkbox({onClick}) {
    return(<InputGroup>
        <FormCheck className={"GLUI_Checkbox"}></FormCheck>
    </InputGroup>
    );
}
function GLUI_RootAddBtn(props) {

    let classn = "rounded GLUI_ImgButton "+(props.rotate ? "GLUI_RootCancelBtn" : "GLUI_RootAddBtn");
    return(<Image className={classn} src={GLCommonIcon.GL_ICON_ADD}
                  alt="Description" onClick={props.onClick} onMouseOver={props.onOver} onMouseOut={props.onOut} />
    );
}
function GLUI_ItemAddBtn() {
    return(<Image  className="rounded GLUI_ImgButton GLUI_ItemAddBtn" src={GLCommonIcon.GL_ICON_ADD}
                  alt="Description"  />
    );
}

function GLUI_ExpandContract() {
    return(<Image className="rounded GLUI_ImgButton GLUI_ExpandContract" src={GLCommonIcon.GL_ICON_DOWN}
                  alt="Description"/>
    );
}
function GLUI_GripBtn() {
    return(<Image fluid={true} className="rounded GLUI_ImgButton " src={GLCommonIcon.GL_ICON_GRIP}
                  alt="Description" />
    );
}