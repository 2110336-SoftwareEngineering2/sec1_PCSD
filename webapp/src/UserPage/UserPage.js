import React, { useContext, useEffect } from 'react'
import {useCookies} from 'react-cookie'
import axios from 'axios'

import { UserContext } from '../context/MyContext'
import Header from '../Header/header';
import UserInfo from './userInfo-component';

function UserPage(props) {
    const username = props.match.params.username;
    const { user, login } = useContext(UserContext);
    const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

    useEffect(() => {
        if (!user && cookie.accessToken !== undefined) {
          axios
            .post("http://localhost:4000/auth/valid", {}, {
              headers: {
                "authorization": "Bearer " + cookie.accessToken
              }
            })
            .then((res) => {
                axios
                .post("http://localhost:4000/user/email", {email: (res.data).email})
                .then((res) => {
                  login({...res.data, accessToken: cookie.accessToken});
                })
            })
            .catch((err) => {
              console.log(err);
              removeCookie("accessToken", {path: "/"});
            });
        }
      }, []);

    return(
        <div>
            {user ? <Header />: null}
            <UserInfo username={username} />
        </div>
    )
}

export default UserPage