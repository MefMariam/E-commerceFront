import { use, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../../configuration/axiosconfig";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Profile({ token }) {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    profileImage: "",
  });
  const [isConsulting, setIsConsulting] = useState(true);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser((prev) => ({
            ...prev,
            lastname: response.data?.lastname,
            firstname: response.data?.firstname,
            email: response.data?.email,
            age: response.data?.age,
            profileImage: response.data?.profileImage || null,
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }, 1000);

    return () => {
      setUser(null);
      setLoading(false);
    };
  }, []);

  async function useSubmit() {
    console.log("HELLO");
    try {
      const token = localStorage.getItem("token");
      const formdata = new FormData();
      formdata.append("firstname", user.firstname);
      formdata.append("lastname", user.lastname);
      formdata.append("email", user.email);

      console.log("Profile image is set:", user.profileImage);
      formdata.append("imageprofile", user.profileImage);
      console.log("Form data prepared:", formdata.getAll("imageprofile"));

      const response = await axios.put("users/profile", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("user has been updated", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error("user has not been updated", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("user has not been updated", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  // Empty dependency array to run only once on mount

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={user?.firstname}
                type="text"
                placeholder="Enter first name"
                disabled={isConsulting}
                onChange={(e) =>
                  setUser({ ...user, firstnametname: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={user?.lastname}
                type="text"
                placeholder="Enter last name"
                disabled={isConsulting}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="profileImage"
              placeholder="Enter profile image URL"
              disabled={isConsulting}
              onChange={(e) =>
                setUser({ ...user, profileImage: e.target.files[0] })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={user?.email}
              type="email"
              placeholder="Enter email"
              disabled={isConsulting}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>

          <Row>
            <Col>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  setIsConsulting(!isConsulting);
                }}
              >
                {isConsulting ? "Modifier" : "Annuler"}
              </Button>
            </Col>
            <Col></Col>
            <Col>
              {!isConsulting && (
                <Button variant="primary" type="button" onClick={useSubmit}>
                  Save changess
                </Button>
              )}

              <Button variant="primary" type="button" onClick={logout}>
                {" "}
                Logout{" "}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <ToastContainer />
    </Container>
  );
}

export default Profile;
