//import * as React from 'react';
import React, {createContext, useState, useContext, useReducer} from 'react';
import {GLCommonIcon} from "../assets/common";
import {GLDBWrapper} from "./GLDBWrapper";
import {GLDbg} from "./util"



const dbObject = new GLDBWrapper();

const itemsReducer = (state, action)=> {

    let newState = state;
    switch (action.type) {
        case 'set-list':{
            newState.listHead = action.list;
            return newState;
        }
        case 'set-items': {

            newState.listItems = action.list.items
            return newState;
        }

        case 'set': {
            return action.items;
        }
        case 'deleted': {
            return state.filter(t => t.id !== action.list.id);
        }
        case 'sync':{

        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export function GLItemsProvider({children})  {

    const [state, dispatch] = useReducer(itemsReducer, initialValue);
    return (
        <ItemsContext.Provider value={state}>
            <ItemsDispatchContext.Provider value={dispatch}>
                {children}
            </ItemsDispatchContext.Provider>
        </ItemsContext.Provider>
    );
};

const initialValue = {
    listHeadPopulated: false,
    listItemsPopulated: false,
    listHead: {},
    listItems: [
        {
            id: 0,
            name: "Large Octopus",
            list_id: 2,
            label: "Large Octopus",
            order: 0,
            parent: 20,
            state: {
                farts: true
            }

        }

    ]
};
export const ItemsContext = createContext([]);
export const ItemsDispatchContext = createContext(null);

export const UseItems = () => useContext(ItemsContext);
export const UseItemsDispatch = () => useContext(ItemsDispatchContext);