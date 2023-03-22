
import {Container} from 'react-bootstrap';
import GLUI_MainContainer from '../components/GLUI_MainContainer'
//import GLUI_ListContainer from "../components/GLUI_ListContainer";
import React, {useContext} from "react";
import GLListProvider, {ListContext} from "../services/GLListContext";
import GLUI_ImgButton from "../components/GLUI_ImgButton";
import GLUI_ContentContainer from "../components/GLUI_ContentContainer";
import GLUI_ListItem from "../components/GLUI_ListItem"
import GLUI_Header from "../components/GLUIHeader";




function GLUI_ListHeader() {
    return (<GLUI_Header link={"farts"} menuClick={()=>{}} menuOver={()=>{}}></GLUI_Header>);
}
export default function GLUI_ViewMain(props) {


    return (
            <GLUI_MainContainer>
                <GLUI_ListHeader/>
               <GLUI_ListContainer>

               </GLUI_ListContainer>
            </GLUI_MainContainer>
        );
}


function GLUI_ListContainer(props){

    //const [lists, setLists] = useContext(ListContext);

    const initialValue = [
            {
                id : "1",
                name: "fart",
                user_id: 0,
                created: Date.now(),
                changed: 0,
                icon: "howtodothis",
                order: 0,
                pinned: false
            }
        ];

    function bottomHalf(lists) {
        return (<div>

            <GLUI_ListItem label={lists.length} icon={"none"}></GLUI_ListItem>

        </div>);
    }
    return(

        <GLUI_ContentContainer>
            <ListContext.Provider value={initialValue}>
                {bottomHalf(initialValue)}
            </ListContext.Provider>
        </GLUI_ContentContainer>
    );
}