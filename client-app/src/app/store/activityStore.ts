import {makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity"

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
           this.setActivity(activity);
            
          })
          this.setLoadingInitial(false);
        
        
       } catch (error) {
        this.setLoadingInitial(false);
       }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {//it is in memory we will fetch
            this.selectedActivity = activity;
            return activity;
        } else {//it is in not in memory means when user refreshes page then need to get from API
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity=(activity:Activity)=>
    {
        activity.date=activity.date.split('T')[0];
        //this.activities.push(activity)
        this.activityRegistry.set(activity.id,activity);
    }

    private getActivity=(id:string)=>
    {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createActivity= async(activity:Activity)=>
    {
       this.loading=true;
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