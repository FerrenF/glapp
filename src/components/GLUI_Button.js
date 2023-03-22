
import {Button} from 'react-bootstrap';

export default function GLUI_Button({label, onClick}){
    return (
        <Button className="GLUI_Button"  alt="Description" onClick={onClick}>
            {label}
        </Button>
    );
}