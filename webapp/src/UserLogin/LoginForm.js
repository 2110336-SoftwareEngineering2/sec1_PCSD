import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
function ServiceForm({ input, updateInput, submitForm }) {
  const [submitted, setSubmitted] = useState(false);
  const [modified, setModified] = useState(false);

  function modifiedInput({ target: { name, value } }) {
    if (["type", "pet_type", "available_day"].includes(name)) {
      const vals = input[name].includes(value)
        ? input[name].filter((e) => {
            return e !== value;
          })
        : [...input[name], value];
      updateInput({ ...input, [name]: vals });
    } else updateInput({ ...input, [name]: value });
    setModified(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setSubmitted(true);
      submitForm();
    }
  }

  return (
    <Form validated={modified} onSubmit={handleSubmit}>
      <fieldset disabled={submitted}>
        
      </fieldset>
    </Form>
  );
}

export default ServiceForm;
