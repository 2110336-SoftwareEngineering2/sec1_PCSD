import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import { user } from "../context/MyContext";

function ReceiveButton({payment, accessToken, setState, state, index}) {
    const onClick = () => {
        const header = {"authorization": "Bearer " + accessToken};
        axios
        .post("http://localhost:4000/user/transfer?type=receive", {paymentId: payment._id}, {
            headers: header
        })
        .then((res) => {
            const newPayment = state.payments.slice();
            newPayment[index].transferStatus = res.data.transferStatus;
            setState({payments: newPayment});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <Button variant="primary" onClick={onClick}>receive</Button>
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
            const newPayment = state.payments.slice();
            newPayment[index].transferStatus = res.data.transferStatus;
            setState({payments: newPayment});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <Button variant="primary" onClick={onClick}>accept</Button>
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
            const newPayment = state.payments.slice();
            newPayment[index].transferStatus = res.data.transferStatus;
            setState({payments: newPayment});
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <Button variant="primary" onClick={onClick}>cancel</Button>
    );
}

export {ReceiveButton, CancelButton, AcceptButton};