import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
} from "react-bootstrap";
import axiosInstance from "../../configuration/axiosconfig";
import { toast } from "react-toastify";

function UpdateProduct() {
  let params = useParams();
  const productId = params.id;

  const [data, setData] = useState({
    name: "",
    category: null,
    description: "",
    price: "",
  });
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
    const fetchcategory = async () => {
      try {
        const res = await axiosInstance.get("/category");
        console.log(res.data);
        setcategory(res.data);
      } catch (error) {
        toast.error("error while importig categorys");
      }
    };
    fetchcategory();
  }, [productId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    console.log("Form submitted with data:", data);
    try {
      const response = await axiosInstance.put(`/products/${productId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      navigate("/produit");
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Please try again.");
    }
  };
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

        <Form.Group as={Col} controlId="name">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="category"
            onChange={handleChange}
          >
            <option>category</option>
            {category?.map((cat) => (
              <option
                selected={cat?._id == data?.category?._id}
                value={cat._id}
                key={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

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
        Update Product
      </Button>
    </Form>
  );
}
export default UpdateProduct;
