import { Button, Card,Image } from "semantic-ui-react";
import LoadingComponet from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";


export default function ActivityDetails()
{
  const {activityStore}=useStore();
  const {selectedActivity:activity,openForm,cancelSelectedActivity}=activityStore

  if(!activity) return <LoadingComponet/>

   return(
    <Card fluid>{/*fluid means takes all avialable space inside the grid*/}
    <Image src={`/assests/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group>
        <Button onClick={()=>openForm(activity.id)} basic color="blue" content="Edit"/>
        <Button onClick={()=>cancelSelectedActivity()} basic color="grey" content="Cancel"/>
      </Button.Group>
    </Card.Content>
  </Card>
   )
}