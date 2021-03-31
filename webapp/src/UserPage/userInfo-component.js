import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo(props) {
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:4000/user/profile/${props.username}`)
        .then((res) => {
            const tmp = (({
                username,
                firstname,
                lastname,
                email,
                mobileNumber,
                gender,
              }) => ({ username, firstname, lastname, email, mobileNumber, gender }))(
                res.data
              );
            setUser(tmp);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        if(user) {
            axios.post(`http://localhost:4000/user/caretaker/find`, {caretaker: user.email})
            .then((res) => {
                const tmp = (({
                    type,
                    pet_type,
                    available_day,
                    rate,
                    city,
                    province,
                    country,
                    description
                  }) => ({ type,pet_type,available_day,rate,city,province,country,description }))(
                    res.data
                  );
                setInfo(tmp);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [user]);

    return(
        <div>
            { loading ? <p>Loading...</p> : <p>{info.pet_type.join(', ')}</p> }
        </div>
    )
}

export default UserInfo;