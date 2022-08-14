import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
export function useLoadingWithRefresh(){
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
        (async()=>{
            try {
                const {data} = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    {
                      withCredentials:true,
                    }
                )
                console.log(data)
                dispatch(setAuth(data));
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.log(error);

                setLoading(false);
                console.log("A")
                console.log(loading)
            }
        })()
    });
    console.log("B");
    console.log(loading);
    return {loading};
}