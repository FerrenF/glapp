import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {GLCommonImages} from "../assets/common";
import GLUI_ImgButton from './GLUI_ImgButton'
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const GLUI_Header = ({link, menuClick, menuOver}) => {
    return (

        <Container className = "GLUI_Header mt-4">
            <Row className = "GLUIHeaderTop">
                <Col className={"GLUI_HeaderButtonContainer"} xs={4} md={2}>
                    <Link to="/">
                    <GLUI_ImgButton image={GLCommonImages.GL_APPICON} onClick={()=>{


                    }}></GLUI_ImgButton>
                    </Link>
                </Col>

                <Col className={"GLUI_HeaderButtonContainer d-flex"} style={{maxWidth: "60px"}} xs={{span: 4, offset: 6}} md={{ span: 2, offset: 9}}>
                    <GLUI_ImgButton image={GLCommonImages.GL_MENUICON} onClick={()=>{


                    }}></GLUI_ImgButton>
                </Col>

            </Row>

            <hr/>
            <Row className = "GLUIHeaderBottom">
                
                <Col>
                    <h2>What's GLAPpening?</h2>
                </Col>

            </Row>
            <hr/>

        </Container>
    );
}
export default GLUI_Header;