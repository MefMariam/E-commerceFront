import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../configuration/axiosconfig";

import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

function SIGNUP() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({});

  const validateForm = () => {
    const errors = {};

    if (data.firstname.trim() === "") {
      errors.firstname = "Please enter your First name";
    }

    if (data.lastname.trim() === "") {
      errors.lastname = "Please enter your first Last name";
    }

    if (data.email.trim() === "") {
      errors.email = "Please enter your email";
    }

    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (data.confirmpassword !== data.password) {
      errors.confirmpassword = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with data:", data);
    try {
      const response = await axios.post("/users/register", data);
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "30rem" }} className="shadow p-4">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="mb-3">
              <Form.Control
                name="firstname"
                placeholder="Firt name"
                value={data.firstname}
                onChange={handleChange}
              />
            </Col>
            <Col className="mb-3">
              <Form.Control
                name="lastname"
                placeholder="Last name"
                value={data.lastname}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <Form.Control
                name="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                value={data.confirmpassword}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="text-center">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Link to="/login" className="btn btn-link">
              Sign In instead
            </Link>
          </div>
        </Form>
      </Card>
      <ToastContainer />
    </Container>
  );
}

export default SIGNUP;
