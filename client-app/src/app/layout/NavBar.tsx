
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
  openForm:()=> void;
}

 function NavBar({openForm}:Props){
  return(
  
    <Menu inverted fixed='top' style={{Text:'center'}}>
        <Container>
            <Menu.Item header>
               <img src="/assests/logo.png" alt='logo' style={{marginRight:'10px'}}/>
               Reactivities
            </Menu.Item>
            <Menu.Item name="Activities"/>
            <Menu.Item>
                <Button onClick={()=>openForm()} positive content="Create Activity"/>
            </Menu.Item>
            </Container>
        
    </Menu>
  )
  }

export default NavBar