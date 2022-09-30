import {makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"
import {v4 as uuid} from 'uuid';

export default class ActivityStore
{
    activityRegistry = new Map<string,Activity>();
    selectedActivity:Activity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=false;
    

    constructor()
    {
        makeAutoObservable(this)
    }

    get activityByDate()
    {
      return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    }

    loadActivities= async()=>
    {
       
    this.setLoadingInitial(true);
       try {
        const activities= await agent.Activities.list();//agent will return promises, so we need use await
        activities.forEach(activity=>{
            activity.date=activity.date.split('T')[0];
            //this.activities.push(activity)
            this.activityRegistry.set(activity.id,activity);
            
          })
          this.setLoadingInitial(false);
        
        
       } catch (error) {
        this.setLoadingInitial(false);
       }
    }

    setLoadingInitial=(state:boolean)=>
    {
        this.loadingInitial=state;
    }

    selectActivity=(id:string)=>
    {
        //this.selectedActivity=this.activities.find(a=>a.id===id);
       this.selectedActivity= this.activityRegistry.get(id);
    }

    cancelSelectedActivity=()=>
    {
        this.selectedActivity=undefined;
    }
   
    openForm=(id? :string)=>
    {
        id? this.selectActivity(id):this.cancelSelectedActivity();
        this.editMode=true;
    }

    closeForm=()=>
    {
        this.editMode=false;
    }

    createActivity= async(activity:Activity)=>
    {
       this.loading=true;
       activity.id=uuid();
       try {
        await agent.Activities.create(activity);
        runInAction(()=>
        {
            //this.activities.push(activity);
            this.activityRegistry.set(activity.id,activity);
            this.selectedActivity=activity;
            this.editMode=false;
            this.loading=false;
        })
        
       } catch (error) {
        console.log(error);
        runInAction(()=>
        {
            this.loading=false;
        })
       }
    }

    updateActivity= async(activity:Activity)=>
    {
       this.loading=true;
      
       try {
        await agent.Activities.update(activity);
        runInAction(()=>
        {
            this.activityRegistry.set(activity.id,activity);
           // this.activities=[...this.activities.filter(a=>a.id!==activity.id),activity];//creates new area
            this.selectedActivity=activity;
            this.editMode=false;
            this.loading=false;
        })
        
       } catch (error) {
        console.log(error);
        runInAction(()=>
        {
            this.loading=false;
        })
       }
    }
    deleteActivity= async(id:string)=>
    {
       this.loading=true;
      
       try {
        await agent.Activities.delete(id);
        runInAction(()=>
        {
           this.activityRegistry.delete(id);
            // this.activities=[...this.activities.filter(a=>a.id!==id)];//creates new area
            if(this.selectedActivity?.id===id) this.cancelSelectedActivity();
            this.loading=false;
        })
        
       } catch (error) {
        console.log(error);
        runInAction(()=>
        {
            this.loading=false;
        })
       }
    }
}