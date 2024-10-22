import { createContext, useState } from "react";
import {useAuth} from '@clerk/clerk-react'
import { toast } from "react-toastify";
import axios from "axios";
export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const [credit,setCredits] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const {getToken} = useAuth();
    const loadCreditsData = async()=>{
        try {
            const token = await getToken();
            
            const {data} = await axios.get(backendUrl+'/api/user/credits',{headers:{token}});

            console.log(data)
            if(data.success){
                setCredits(data.credits)
                
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    const value = {
        credit,setCredits,
        loadCreditsData,
        backendUrl

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
