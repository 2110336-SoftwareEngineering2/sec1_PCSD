import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";

// import Test2 from "./Test2";

function Test(props) {
  const [state, setState] = useState({
    amount: "",
    senderName: "", //6022a8bf06621b30649233dd
    receiverName: "", //60222565051c0a6b4c8b855b
  });
  const [errors, setError] = useState({});

  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/user/transfer", state)
      .then((res) => {
        setError({});
        const senderBalance = res.data.senderBalance;
        const receiverBalance = res.data.receiverBalance;
        const message = `Successfully transfer\n 
        Sender's balance: ${senderBalance}\n 
        Receiver's balance: ${receiverBalance}\n`;
        window.alert(message);
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
            <Form.Control
              type="text"
              name="senderName"
              value={state.senderName}
              placeholder="Sender's username"
              onChange={onChange}
              isInvalid={errors.senderError}
              required
            />
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
    </div>
  );
}

export default Test;
