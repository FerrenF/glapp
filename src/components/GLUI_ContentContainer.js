
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GLUI_ContentContainer(props){
    return (
        <Container className={"GLUI_ContentContainer"} fluid>
            {props.children}
        </Container>
    )
}