
import {Form, InputGroup} from "react-bootstrap";


export default function GLUI_Input({onClick}){
    return (
        <InputGroup>
            <Form.Control className=""  alt="Set List Name" onClick={onClick} value={"List Name"}/>
        </InputGroup>
    );
}