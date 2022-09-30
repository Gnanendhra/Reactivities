import { observer } from 'mobx-react-lite';
import React, {SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';


export default observer(function ActivityList()
{
    const {activityStore}=useStore();
    const {deleteActivity,loading,activityByDate}=activityStore

    const [target,setTarget]=useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>,id:string)
    {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return(
        <Segment>
            <Item.Group divided>
                {activityByDate.map(activity=>(
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                {activity.description}<br/>
                               City: {activity.city}<br/>
                                Venue: {activity.venue}
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={(e)=>handleActivityDelete(e,activity.id)} 
                            name={activity.id}
                            loading={loading && target===activity.id} floated='right' content='Delete' color='red'/>
                                <Label basic content={activity.category}/>
                                <Button onClick={()=>activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})