import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store{
    activityStore:ActivityStore;
    commonStore: CommonStore;
}

export const store:Store={
    activityStore:new ActivityStore(),
    commonStore: new CommonStore()
}

export const StoreContext=createContext(store);//above store is avaiable in createContext when new store instance is created.


//used to use our stores in components, returns storecontext(store object that is activitystore)
export function useStore()
{
    return useContext(StoreContext);
}