import React from 'react';
import {Col} from 'react-bootstrap';
import GLUI_ImgButton from "./GLUI_ImgButton";

const GLUI_ListItem = ({label, icon}) => {
    return (<Col className = "GLUI_ListItem">
            <GLUI_ImgButton image={icon} onClick={()=>{


            }}/>
            <h2>{label}</h2>
        </Col>);
}
export default GLUI_ListItem;