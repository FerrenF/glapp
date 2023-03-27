import { Stack } from "react-bootstrap";
import { Button } from "react-bootstrap/lib/InputGroup";

export default function GLUI_ContextMenu(props) {

    function mapProps(props){

        // RB: I borrowed this code from another place in this project and was like "sure, I can do this. Just pass the props in and assign to each option".
        // But now it's 4AM and I'm tired. Also I'm sure this won't be a button, but I didn't change it.
        props.map(
            (value) => {
                return (
                    <Button label={value.name} icon={value.icon} id={value.id} onClick={value.action} className="contextMenuOption" style={{width: "100%" }}>

                    </Button>
                    );
            })

    }

    return(
        <div>
            <p>Context Menu ayyyy lmao</p>
            <Stack className="GLUI_ContextMenuContainer">
                {/* RB: Define a context menu container and pass functions to it to set option text and function called or something, idk*/}
                {/* Still gotta define context container properties.*/}
                <mapProps />
            </Stack>
            
        </div>

    );
}

