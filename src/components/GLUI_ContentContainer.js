
import Container from 'react-bootstrap/Container';

export default function GLUI_ContentContainer(props){
    return (
        <Container className={"GLUI_ContentContainer"} fluid>
            {props.children}
        </Container>
    )
}