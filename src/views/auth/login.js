import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../configuration/axiosconfig";

import { Container, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

function Login({ setToken }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const validateForm = () => {
    const errors = {};
    if (data.email.trim() === "") {
      errors.email = "Please enter your email";
    }
    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleEnvoyer = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((msg) => {
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
        });
      });
      return;
    }

    try {
      const response = await axios.post("/users/login", data);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/produit");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Form onSubmit={handleEnvoyer}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Se connecter
          </Button>
          <Link to="/Signap" className="btn btn-link">
            Create an account
          </Link>
        </Form>
      </Card>

      <ToastContainer />
    </Container>
  );
}

export default Login;
