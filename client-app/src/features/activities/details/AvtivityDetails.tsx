import { Button, Card,Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props
{
    activity:Activity;
    cancelSelectactivity:()=>void;
    openForm:(id:string)=> void;
   
}

export default function ActivityDetails({activity,cancelSelectactivity,openForm}:Props)
{
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
        <Button onClick={()=>cancelSelectactivity()} basic color="grey" content="Cancel"/>
      </Button.Group>
    </Card.Content>
  </Card>
   )
}