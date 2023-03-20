import {
    Outlet,
} from "react-router-dom";
import Stack from 'react-bootstrap/Stack'

export default function GLUI_MainContainer(){
    return (
        <Stack className={"GLUI_MainContainer"} direction="vertical" gap={0}>
            <Outlet/>
        </Stack>
    )
}