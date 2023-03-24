//import * as React from 'react';
import React, {createContext, useState, useContext, useReducer} from 'react';
import {GLCommonIcon} from "../assets/common";






const listreducer = (tasks, action)=> {
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: tasks.length,
                order: tasks.length,
                name: action.name,
                pinned: false,
                icon: action.icon,
                created: Date.now(),
                changed: Date.now(),
                user_id: 0      // Todo: user_id implementation here
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.list.id) {
                    return action.list;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export function GLListProvider({children})  {

        const [state, dispatch] = useReducer(listreducer, initialValues);

        return (
            <ListContext.Provider value={state}>
                <ListDispatchContext.Provider value={dispatch}>
                    {children}
                </ListDispatchContext.Provider>
            </ListContext.Provider>
           );
    };

const initialValues = [
    {
        id : 1,
        name: "Item 1",
        user_id: 0,
        created: Date.now(),
        changed: 0,
        icon: GLCommonIcon.GL_ICON_FILE,
        order: 0,
        pinned: false
    },


];
export const ListContext = createContext([]);
export const ListDispatchContext = createContext(null);

export const UseLists = () => useContext(ListContext);
export const UseListsDispatch = () => useContext(ListDispatchContext);