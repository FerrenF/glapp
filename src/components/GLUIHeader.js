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
                <Col className={"GLUI_HeaderButtonContainer"} xs={3} sm={3} md={3} lg={2}>
                    <Link to="/">
                    <GLUI_ImgButton image={GLCommonImages.GL_APPICON} onClick={()=>{


                    }}></GLUI_ImgButton>
                    </Link>
                </Col>

                <Col className={"GLUI_HeaderButtonContainer d-flex"} style={{maxWidth: "80px"}} xs={{span: 6, offset: 6}} sm={{ span: 6, offset: 7}} md={{ span: 8, offset: 7}} lg={{ span: 10, offset: 9}}>
                    <GLUI_ImgButton image={GLCommonImages.GL_MENUICON} onClick={()=>{


                    }}></GLUI_ImgButton>
                </Col>

            </Row>

            <div className = "mt-4">
                <hr/>
            </div>

            <Row className = "GLUIHeaderBottom">
                
                <Col>
                    <h2>What's GLAPpening?</h2>
                </Col>

            </Row>

            <div className = "mx-auto" style={{maxWidth: "60%"}}>
                <hr/>
            </div>
            

        </Container>
    );
}
export default GLUI_Header;