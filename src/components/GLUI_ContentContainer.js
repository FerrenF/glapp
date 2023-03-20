
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GLUI_ContentContainer({top, bottom}){
    return (
        <Container className={"GLUI_ContentContainer"} fluid>
            <Row>
                <Col>
                    {top}
                </Col>
            </Row>
            <Row>
                <Col>
                    {bottom}
                </Col>
            </Row>
        </Container>
    )
}