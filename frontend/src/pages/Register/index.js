import { useState } from "react";
import api from "../../services/api";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";

export default function Register({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/user/register", {
      email,
      password,
      firstName,
      lastName,
    });

    const userId = response.data._id || false;
    if (userId) {
      localStorage.setItem("user", userId);
      history.push("/dashboard");
    } else {
      const { message } = response.data;
      console.log(message);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2">
          <Input
            name="firstName"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2">
          <Input
            name="lastName"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2">
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2">
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}
