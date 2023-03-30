import React from 'react';
import {Col} from 'react-bootstrap';
import GLUI_ImgButton from "./GLUI_ImgButton";


// This file is deprecated. I decided to move this into the main view folder although it is -technically- a template.
// It will not be used outside of that view any time in the near future.
const GLUI_ListItem = ({label, icon}) => {
    return (<Col className = "GLUI_ListItem">
            <GLUI_ImgButton image={icon} onClick={()=>{


            }}/>
            <h2>{label}</h2>
        </Col>);
}
export default GLUI_ListItem;