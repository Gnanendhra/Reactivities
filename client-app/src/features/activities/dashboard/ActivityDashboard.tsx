import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/AvtivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props /* Accepting interface props */
{
    activities:Activity[]; // accepting activity as a prop
    selectedActivity:Activity |undefined;
    selectActivity:(id:string)=> void;
    cancelSelectactivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=> void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean
}

export default function ActivityDashboard({activities,selectedActivity,
selectActivity,cancelSelectactivity,editMode,openForm,closeForm,createOrEdit,deleteActivity,submitting}:Props) // Destructring the  activities from props
{
    return(
        <Grid>
            <Grid.Column width='10'>
         <ActivityList activities={activities} 
         selectActivity={selectActivity} 
         deleteActivity={deleteActivity}
         submitting={submitting}/>
            </Grid.Column>
          <Grid.Column width="6">
            {selectedActivity && !editMode &&
            <ActivityDetails activity={selectedActivity} 
            cancelSelectactivity={cancelSelectactivity}
            openForm={openForm}
           
            />}
            {editMode &&
            <ActivityForm  submitting={submitting} closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
          </Grid.Column>
        </Grid>
    )
}