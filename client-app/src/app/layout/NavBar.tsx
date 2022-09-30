
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';


 function NavBar(){

  const {activityStore}=useStore();
  return(
  
    <Menu inverted fixed='top' style={{Text:'center'}}>
        <Container>
            <Menu.Item header>
               <img src="/assests/logo.png" alt='logo' style={{marginRight:'10px'}}/>
               Reactivities
            </Menu.Item>
            <Menu.Item name="Activities"/>
            <Menu.Item>
                <Button onClick={()=>activityStore.openForm()} positive content="Create Activity"/>
            </Menu.Item>
            </Container>
        
    </Menu>
  )
  }

export default NavBar