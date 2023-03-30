//import * as React from 'react';
import React, {createContext, useState, useContext, useReducer} from 'react';
import {GLCommonIcon} from "../assets/common";
import {GLDbg} from "./util"
import {UseItems, UseItemsDispatch} from "./GLItemsContext";


const itemsViewReducer = (state, action)=> {

    switch (action.type) {
        case 'root-add-clicked':{
            return {...state, adding: {
                    status: 1,
                    item: {
                        order: 0,
                        parent: 0,
                    }
                }
            };
        }

        case 'root-cancel-clicked':{
            return {...state, adding: {
                    status: 0,
                    item: {
                    }
                }
            };
        }
        case 'root-item-submit': {

            return {...state, adding: {
                    status: 0,
                    item: {
                    }
                }
            };
        }
        case 'db-loaded':{
            return {...state, loaded: true};
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export function GLItemsViewProvider({children})  {

    const [state, dispatch] = useReducer(itemsViewReducer, initialValue);
    return (
        <ItemsViewContext.Provider value={state}>
            <ItemsViewDispatchContext.Provider value={dispatch}>
                {children}
            </ItemsViewDispatchContext.Provider>
        </ItemsViewContext.Provider>
    );
};

const initialValue = {
    adding: {
        status: 0,
        item: {},
    },
    loaded:false,    
};
export const ItemsViewContext = createContext([]);
export const ItemsViewDispatchContext = createContext(null);

export const UseItemsView = () => useContext(ItemsViewContext);
export const UseItemsViewDispatch = () => useContext(ItemsViewDispatchContext);