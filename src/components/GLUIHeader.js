import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {GLCommonImages} from "../assets/common";
import GLUI_ImgButton from './GLUI_ImgButton'
import {Link} from "react-router-dom";

const GLUI_Header = ({link, menuClick, menuOver}) => {
    return (
        <Container className = "GLUI_Header">
            <Row className = "GLUIHeaderTop">
                <Col className={"GLUI_HeaderButtonContainer"} xs={4} md={2}>
                    <Link to="/">
                    <GLUI_ImgButton image={GLCommonImages.GL_APPICON} onClick={()=>{


                    }}></GLUI_ImgButton>
                    </Link>
                </Col>

                <Col className={"GLUI_HeaderButtonContainer"} xs={{span: 4, offset: 4}} md={{ span: 2, offset: 8 }}>
                    <GLUI_ImgButton image={GLCommonImages.GL_MENUICON} onClick={()=>{


                    }}></GLUI_ImgButton>
                </Col>

            </Row>
            <Row className = "GLUIHeaderBottom">
                <Col>
                    <h2>What can GL do for uuuuuu?</h2>
                </Col>

            </Row>

        </Container>
    );
}
export default GLUI_Header;