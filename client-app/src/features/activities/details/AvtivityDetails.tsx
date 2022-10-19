import { link } from "fs";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card,Grid,Image } from "semantic-ui-react";
import { GeneratedIdentifierFlags } from "typescript";
import LoadingComponet from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";


export default observer( function  ActivityDetails()
{
  const {activityStore}=useStore();
  const {selectedActivity:activity,loadActivity,loadingInitial}=activityStore
  const {id}=useParams<{id:string}>();
  console.log(id);

  useEffect(()=>
  {
    if(id) loadActivity(id)
  },[id,loadActivity])

  if(loadingInitial || !activity) return <LoadingComponet/>

   return(
    <Grid>
      <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo activity={activity}/>
          <ActivityDetailedChat/>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar/>
      </Grid.Column>
    </Grid>

   )
})