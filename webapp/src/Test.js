import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";

import {UserContext} from "./context/MyContext";
import Test2 from "./Test2";

function Test(props) {
  const { user } = useContext(UserContext);

  const [state, setState] = useState({
    amount: "",
    senderName: "",
    receiverName: "",
  });
  const [errors, setError] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("hi");

  useEffect(() => {
    if(user)
      setState({...state, senderName: user.username});
  }, [user]);

  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleClose = (() => {setShow(false)});

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/user/transfer", state)
      .then((res) => {
        setError({});
        const senderBalance = res.data.senderBalance;
        const receiverBalance = res.data.receiverBalance;
        const message = `Current balance\n
        Sender: ${senderBalance} 
        Receiver: ${receiverBalance}`;
        setMessage(message);
        setShow(true);
      })
      .catch((err) => {
        setError({ ...err.response.data });
      });
  };

  return (
    <div className="test">
      <Form onSubmit={onSubmit}>
        <Form.Row>
          <Col>
            <Form.Label>Sender</Form.Label>
            {user ? 
              <Form.Control
              type="text"
              name="senderName"
              defaultValue={state.senderName}
              isInvalid={errors.senderError}
              readOnly
              required
              /> : <Form.Control
                type="text"
                name="senderName"
                value={state.senderName}
                placeholder="Sender's username"
                onChange={onChange}
                isInvalid={errors.senderError}
                required
            />
            }
          </Col>
          <Col>
            <Form.Label>Receiver</Form.Label>
            <Form.Control
              type="text"
              name="receiverName"
              value={state.receiverName}
              placeholder="Receiver's username"
              onChange={onChange}
              isInvalid={errors.receiverError}
              required
            />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            placeholder="Amount"
            value={state.amount}
            min="1"
            onChange={onChange}
            isInvalid={errors.balanceError}
            required
          />
          <Form.Control.Feedback type="invalid">
            Insufficient balance
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Test2 handleClose={handleClose} show={show} message={message} />
    </div>
  );
}

export default Test;
