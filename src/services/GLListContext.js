//import * as React from 'react';
import React, {createContext, useState} from 'react';


export const ListContext = createContext({lists : {}

});

const GLListProvider = ({children}) =>
    {
        const [lists, setLists] = useState(null);

        return (<ListContext.Provider value={{lists,setLists}}>{children}</ListContext.Provider>);
    };

export default GLListProvider;



