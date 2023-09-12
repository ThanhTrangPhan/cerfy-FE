import { createContext, useContext } from "react";

export const StoreContext = createContext(null);

//global store

export const MyGlobalContext = createContext({
    saveAddress: true,
    setSaveAddress: () => { },
    
    postCode: '',
    setPostCode: () => { },

    triggerFlag: false,
    setTriggerFlag: () => { },

    triggerCalculate: false,
    setTriggerCalculate: () => { }
})

export const useGlobalContext = () => useContext(MyGlobalContext);
