import {
    Outlet,
} from "react-router-dom";
import Stack from 'react-bootstrap/Stack'

export default function GLUI_MainContainer(props){
    return (
        <Stack className={"GLUI_MainContainer mx-auto"} style={{maxWidth: "1140px", minWidth: "320px"}} direction="vertical" gap={0}>
            {props.children}
        </Stack>
    )
}