import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore:ActivityStore
}

export const store:Store={
    activityStore:new ActivityStore()
}

export const StoreContext=createContext(store);//above store is avaiable in createContext when new store instance is created.


//used to use our stores in components, returns storecontext(store object that is activitystore)
export function useStore()
{
    return useContext(StoreContext);
}