import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function Test2(props) {
  return (
    <div className="test">
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{props.message}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Test2;