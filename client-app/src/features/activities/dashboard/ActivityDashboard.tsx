import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponet from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import ActivityList from './ActivityList';


export default observer(function ActivityDashboard() // Destructring the  activities from props
{

  const {activityStore}=useStore();
  const{loadActivities,activityRegistry}=activityStore;

 



  useEffect(()=>
  {
    if(activityRegistry.size<=1) loadActivities();
  },[activityRegistry.size,loadActivities]);//activityRegistry.size or loadActivities changes at that time only useeffect() calls


if(activityStore.loadingInitial) return <LoadingComponet content='Loading app'/>
    return(
        <Grid>
            <Grid.Column width='10'>
         <ActivityList/>
            </Grid.Column>
          {/* <Grid.Column width="6">
            {selectedActivity && !editMode &&
            <ActivityDetails/>}
            {editMode &&
            <ActivityForm />}
          </Grid.Column> */}
        </Grid>
    )
})