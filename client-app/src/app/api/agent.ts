//file contains all our requests to API
import axios,{AxiosError, AxiosResponse} from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../store/store";

const sleep=(delay:number)=>
{
    return new Promise((resolve)=>
    {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL='http://localhost:5000/api';//every request uses this url

//if get response is 200 indicates success other than 200 it will takes it(axios.interceptors) is an error
axios.interceptors.response.use(async response=>
    {
        console.log(response);
        await sleep(1000);
        return response;
       
    
    },(error:AxiosError)=>{
     const {data,status,config}=error.response!;
     switch (status) {
        case 400:
            if(typeof data ==='string')
            {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
          if(data.errors)
          {
            const modalStateErrors=[];
            for(const key in data.errors)
            {
                if(data.errors[key])
                {
                    modalStateErrors.push(data.errors[key])
                }
            }
            throw modalStateErrors.flat();
          }
           break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
    })

const responseBody=<T>(response: AxiosResponse<T>)=>response.data;//storing response from api in responsebody 

//storing common requests that we used
const requests={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{})=>axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string,body:{})=>axios.put<T>(url,body).then(responseBody),
    del:<T>(url:string)=>axios.delete<T>(url).then(responseBody),
}


const Activities={
    list:()=>requests.get<Activity[]>("/activities"),//Specifying type that we need to receive from api
    details:(id:string)=>requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post<void>('/activities/',activity),
    update:(activity:Activity)=>requests.put<void>(`/activities/${activity.id}`,activity),
    delete:(id:string)=>requests.del<void>(`/activities/${id}`)
}

const agent={
    Activities
}

export default agent;