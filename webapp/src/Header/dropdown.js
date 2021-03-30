import React, { useContext } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { UserContext } from "../context/MyContext";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from "./../history";
function Dropdownn() { 
    const { user, logout } = useContext(UserContext);
    const trigger = (
        <span>
          <Icon name='user' /> Hello, {user.username}
        </span>
      )
      
      const options = [
        {
          key: 'user',
          text: (
            <span>
              Signed in as <strong>{user.username}</strong>
            </span>
          ),
          disabled:true,
        },
        { key: 'profile', text: 'Your Profile'},
        
        { key: 'sign-out', text: 'Sign Out' },
      ]

    return (
        <Dropdown trigger={trigger} options={options}/>
    );
}
export default Dropdownn;