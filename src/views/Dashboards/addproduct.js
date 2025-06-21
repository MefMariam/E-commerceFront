import React from "react";
import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import axiosInstance from "../../configuration/axiosconfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Addproduct() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [error, setError] = useState({});
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    console.log("Form submitted with data:", data);
    try {
      const response = await axiosInstance.post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      navigate("/produit");
      toast.success("Product added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Product addition failed. Please try again.");
    }
  };
  useEffect(() => {
    const categorys = async () => {
      console.log("useeffect");
      try {
        const res = await axiosInstance.get("/category");
        console.log(res.data);
        setcategory(res.data);
      } catch (error) {
        toast.error("error while importig categorys");
      }
    };
    categorys();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Product name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Select
          aria-label="Default select example"
          name="category"
          onChange={handleChange}
        >
          <option>category</option>
          {category?.map((cat) => (
            <option value={cat._id} key={cat._id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>

        <Form.Group as={Col} controlId="description:">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Enter Your Description"
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          placeholder="Enter Price"
          value={data.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default Addproduct;
