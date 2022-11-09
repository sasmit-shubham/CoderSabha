import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
export const useStateWithCallback = (initialState) => {
    const [state,setState] = useState(initialState);
    const cbRef = useRef(null);
    const updateState = useCallback((newState,cb)=>{
        cbRef.current = cb;
        setState((prev)=>{
            console.log(prev, " you are looking for the prev");
            return typeof newState==='function'?newState(prev):newState;
        })
    },[]);
    
    useEffect(()=>{
        if(cbRef.current){
            cbRef.current(state);
                cbRef.current = null;
        }
    },[state])
    return [state,updateState]
}