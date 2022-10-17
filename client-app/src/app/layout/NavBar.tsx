
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';


 function NavBar(){

  const {activityStore}=useStore();

  return(
  
    <Menu inverted fixed='top' style={{Text:'center'}}>
        <Container>
            <Menu.Item header as ={NavLink} to ='/' exact>
               <img src="/assests/logo.png" alt='logo' style={{marginRight:'10px'}}/>
               Reactivities
            </Menu.Item>
            <Menu.Item name="Activities" as={NavLink} to='/activities'/>
            <Menu.Item>
                <Button  positive content="Create Activity" as={NavLink} to ='createActivity'/>
            </Menu.Item>
            </Container>
        
    </Menu>
  )
  }

export default NavBar