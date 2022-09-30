import React, { useEffect } from 'react';
import {  Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponet from './LoadingComponent';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';



function App() {

  const {activityStore} =useStore()


  useEffect(()=>
  {
    activityStore.loadActivities();
  },[activityStore]);


if(activityStore.loadingInitial) return <LoadingComponet content='Loading app'/>

  return (
    <>
      <NavBar/>
    <Container style={{margin:'7em'}}>
       <ActivityDashboard />
          </Container>      
       
    </>
  );

 
}

export default observer(App);
