
import Stack from 'react-bootstrap/Stack'

export default function GLUI_MainContainer(props){
    return (
        <Stack className={"GLUI_MainContainer"} direction="vertical" gap={0}>
            {props.children};
        </Stack>
    )
}