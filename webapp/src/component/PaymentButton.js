import React, {useRef, useEffect} from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./PaymentButton.css";
import { user } from "../context/MyContext";
import { sentNotification } from "../Notification/NotificationUtils";
import socketIOClient from "socket.io-client";

function ReceiveButton({payment, accessToken, setState, state, index}) {
    const onClick = () => {
        const header = {"authorization": "Bearer " + accessToken};
        console.log(state.reserves[index]);
        const receiver = (state.reserves[index]).petowner;
        const sender = (state.reserves[index]).caretaker;
        const type = "DONE";
        sentNotification(socket, sender, receiver, type);

        // axios
        // .post("http://localhost:4000/user/transfer?type=receive", {paymentId: payment._id}, {
        //     headers: header
        // })
        // .then((res) => {
        //     // const newPayment = state.payments.slice();
        //     // newPayment[index].transferStatus = res.data.transferStatus;
        //     // setState({payments: newPayment});
        //     const newState = state.reserves.slice();
        //     newState[index].payment.transferStatus = res.data.transferStatus;
        //     setState({reserves: newState});
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
    };

    return(
        <div className="receivebutton">
        <Button variant="primary" onClick={onClick}>done</Button>
        </div>
    );
};

function AcceptButton({payment, accessToken, setState, state, index}) {
    const onClick = () => {
        const header = {"authorization": "Bearer " + accessToken};
        axios
        .post("http://localhost:4000/user/transfer?type=accept", {paymentId: payment._id}, {
            headers: header
        })
        .then((res) => {
            // const newPayment = state.payments.slice();
            // newPayment[index].transferStatus = res.data.transferStatus;
            // setState({payments: newPayment});
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

function CancelButton({payment, accessToken, setState, state, index}) {
    const onClick = () => {
        const header = {"authorization": "Bearer " + accessToken};
        axios
        .post("http://localhost:4000/user/transfer?type=cancel", {paymentId: payment._id}, {
            headers: header
        })
        .then((res) => {
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