import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';



function App() {

  const [activities,setActivities]=useState<Activity[]>([]);//activities will recevie data type is Activity
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>
  {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then((response)=>{
      setActivities(response.data);
    });
  },[]);

  function handleSelectActivity(id: string)
  {
    setSelectedActivity(activities.find(x=>x.id===id));
    console.log(selectedActivity);
  }

  function handleCancelSelectActivity()
  {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? :string)
  {
    id? handleSelectActivity(id):handleCancelSelectActivity()
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity)
  {
    activity.id? 
    setActivities([...activities.filter(x=>x.id!==activity.id),activity])://for an edit activity
    setActivities([...activities,{...activity, id:uuid()}]);//to create new activity
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string)
  {
    setActivities([...activities.filter(x=>x.id!==id)])
  }
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
    <Container style={{margin:'7em'}}>
       <ActivityDashboard activities={activities} 
       selectedActivity={selectedActivity}
       selectActivity={handleSelectActivity}
       cancelSelectactivity={handleCancelSelectActivity}
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       createOrEdit={handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}
       />{/* passing activities as a prop to ActivityDashboard Component */}
          </Container>      
       
    </>
  );

 
}

export default App;
