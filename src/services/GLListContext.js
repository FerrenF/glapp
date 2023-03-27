//import * as React from 'react';
import React, {createContext, useState, useContext, useReducer} from 'react';
import {GLCommonIcon} from "../assets/common";
import {GLDbg} from "./util";
import {GLDBWrapper} from "./GLDBWrapper";
// GLListContext provides components under its scope access to state variables containing stored lists, as well as
// variables tracking whether that list has actually been loaded in from the indexedDB for rendering.


const dbObject = new GLDBWrapper();
// This function handles all of the actions related to inter component communication and actions involving the variables
// contained within the context. Its a handler!
const listReducer = (state, action)=> {
    switch (action.type) {
        case 'added': {
            //This is really to prevent react from duplicating things we are going to add to our database.

            if(state.lists.findIndex((obj)=>obj.id === action.id)!=-1){
                return state;
            }
            let newArr = [...state.lists, {
                id: action.id,
                order: state.length,
                name: action.name,
                pinned: false,
                icon: action.icon,
                created: Date.now(),
                changed: Date.now(),
                user_id: 0      // Todo: user_id implementation here
            }];

            dbObject.set_lists(newArr);
            return {...state, needSync:true, lists: newArr};
        }
        case 'changed': {
            return state.map(t => {
                if (t.id === action.list.id) {
                    return action.list;
                } else {
                    return t;
                }
            });
        }
        case 'needSync': {
            return {...state, needSync: true};
        }
        case 'synced': {
            return {...state, needSync: false};
        }
        case 'loaded': {
            return {...state, isLoaded: action.isLoaded};
        }
        case 'load': {
            return {...state, lists: action.lists};
        }
        case 'deleted': {
            return state.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


// This is the actual component tag and what is rendered when you use it. Our handler and initial state is assigned here
// although it's also assigned below for redundancy.

export function GLListProvider({children})  {

        const [state, dispatch] = useReducer(listReducer, initialValues);

        return (
            <ListContext.Provider value={state}>
                <ListDispatchContext.Provider value={dispatch}>
                    {children}
                </ListDispatchContext.Provider>
            </ListContext.Provider>
           );
    };

const initialValues = {
        lists: [{

        },
        ],
        isLoaded: false,
        needSync: false,
    };


export const ListContext = createContext(initialValues);
export const ListDispatchContext = createContext(null);

export const UseLists = () => useContext(ListContext);
export const UseListsDispatch = () => useContext(ListDispatchContext);