import React, {useRef, useEffect, useContext} from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./PaymentButton.css";
import { user } from "../context/MyContext";
import { ProgressBar } from 'react-bootstrap';
import { UserContext } from "../context/MyContext";
import { sentNotification } from "../Notification/NotificationUtils";
function ReceiveButton({payment, accessToken, setState, state, index, socket}) {
    const onClick = () => {
        const header = {"authorization": "Bearer " + accessToken};
        // console.log(state.reserves[index]);
        const receiver = (state.reserves[index]).petowner;
        const sender = (state.reserves[index]).caretaker;
        const type = "DONE";

        axios
        .post("http://localhost:4000/user/transfer?type=receive", {paymentId: payment._id}, {
            headers: header
        })
        .then((res) => {
            const newState = state.reserves.slice();
            newState[index].payment.transferStatus = res.data.transferStatus;
            setState({reserves: newState});
            sentNotification(socket, sender, receiver, type);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <div className="receivebutton">
        <Button variant="primary" onClick={onClick}>done</Button>
        </div>
    );
};

function AcceptButton({payment, accessToken, setState, state, index, socket}) {
    const onClick = () => {
        const header = {"authorization": "Bearer " + accessToken};
        const receiver = (state.reserves[index]).petowner;
        const sender = (state.reserves[index]).caretaker;
        const type = "ACCEPT";
        axios
        .post("http://localhost:4000/user/transfer?type=accept", {paymentId: payment._id}, {
            headers: header
        })
        .then((res) => {
            sentNotification(socket, sender, receiver, type);
            const newState = state.reserves.slice();
            newState[index].payment.transferStatus = res.data.transferStatus;
            setState({reserves: newState});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <div className="acceptbutton">
        <Button variant="primary" onClick={onClick}>accept</Button>
        </div>
    );
};

function CancelButton({payment, accessToken, setState, state, index, socket}) {
    const userContext = useContext(UserContext);
    const onClick = () => {
        const role = userContext.user.role;
        const header = {"authorization": "Bearer " + accessToken};
        const receiver = role === "caretaker" ? (state.reserves[index]).petowner : (state.reserves[index]).caretaker;
        const sender = role === "caretaker" ? (state.reserves[index]).caretaker : (state.reserves[index]).petowner;
        const type = "CANCEL";
        axios
        .post("http://localhost:4000/user/transfer?type=cancel", {paymentId: payment._id}, {
            headers: header
        })
        .then((res) => {
            sentNotification(socket, sender, receiver, type);
            const newState = state.reserves.slice();
            newState[index].payment.transferStatus = res.data.transferStatus;
            setState({reserves: newState});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <div className="cancelbutton">
        <Button variant="primary" onClick={onClick}>cancel</Button>
        </div>
    );
}

export {ReceiveButton, CancelButton, AcceptButton};