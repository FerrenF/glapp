import GLUI_MainContainer from "../components/GLUI_MainContainer";
import GLUI_Header from "../components/GLUIHeader";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {GLDBWrapper} from "../services/GLDBWrapper";
export default function GLUI_ViewList(props) {
    return (
        <GLUI_ViewContainer>

        </GLUI_ViewContainer>
    );
}

// item: '++id, name, list_id, label, order, parent, state',
const viewContainerState = {
    listHeadPopulated: false,
    listItemsPopulated: false,
    listHead: {},
    listItems: [

        {
            id: 0,
            name: "Large Octopus",
            list_id : 2,
            label : "Large Octopus",
            order : 0,
            parent : 20,
            state : {
                farts : true
            }

        }

    ]
}
function GLUI_ViewContainer(){

    // This will store the status of our DB queries
    const [containerState,setContainerState] = useState(viewContainerState);

    // This accesses the :listid variable contained in the <Route properties, if it exists.
    let { listid } = useParams();
    const db = new GLDBWrapper();

    //First, we need to get the list information so we can populate the root list item (head)

    var newState = {
        listHeadPopulated: containerState.listHeadPopulated,
        listItemsPopulated: containerState.listHeadPopulated,
        listHead: containerState.listHeadPopulated ? containerState.listHead : {},
        listItems: containerState.listHeadPopulated ? containerState.listHead : []
    };
    if(!containerState.listHeadPopulated) {
        const listInfo = db.get_list(listid).then((result) => {
            newState.listHeadPopulated = true;
            newState.listHead = result;

            setContainerState(newState);
        }, (response) => {

        }).catch((exception) => {

        });
    }
    else
    {

    }




    return (<>
        <p>{JSON.stringify(containerState.listHead)}
        </p>



    </>);
}
