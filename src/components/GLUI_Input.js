
import {Form, InputGroup} from "react-bootstrap";


export default function GLUI_Input({onClick, onChange}){
    return (

            <Form.Control className="GLUI_Input"  alt="Set List Name" onClick={onClick} onChange={onChange} placeholder={"List Name"}/>

    );
}