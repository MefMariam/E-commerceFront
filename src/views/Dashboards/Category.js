import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import axios from "../../configuration/axiosconfig";
import { toast, ToastContainer } from "react-toastify";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import axiosInstance from "../../configuration/axiosconfig";
import ListItems from "../../components/listitems";

function Category({ token }) {
  const [Loading, setLoading] = useState(true);
  const [category, setcategory] = useState([]);
  const [popup, setpopup] = useState(false);
  const [categoryname, setcategoryname] = useState(null);
  const [popupupdate, setpopupupdate] = useState(false);
  const [categoryupdate, setcategoryupdate] = useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/category")
      .then((response) => {
        setcategory(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Erreur server", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  }, [popup, popupupdate]);
  const handleClose = () => {
    setpopup(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcategoryname(value);
  };
  const handleCloseupdate = () => {
    setpopupupdate(false);
  };
  const handleClickupDate = (element) => {
    setpopupupdate(true);
    setcategoryupdate(element);
  };
  const handleChangeupdate = (e) => {
    const { name, value } = e.target;
    setcategoryupdate({ ...categoryupdate, [name]: value });
  };
  const savecategory = async () => {
    try {
      console.log(token);
      const response = await axiosInstance.post(
        "/category",
        { name: categoryname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("category added successfully", {
        position: "top-right",
        autoClose: 5000,
      });
      setpopup(false);
    } catch (error) {
      toast.error("category addition failed", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  const Deletecategory = async (id) => {
    try {
      const data = await axios.delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status == 200) {
        toast.success("category deleted successfuly");
        setcategory(category.filter((el) => el._id != id));
      }
    } catch (error) {
      toast.error("error while deleting");
    }
  };
  const Updatecategory = async (category) => {
    console.log(categoryupdate);
    try {
      const Category = await axios.put(
        `/category/${categoryupdate._id}`,
        { name: categoryupdate?.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Category.status == 200) {
        toast.success("category updated successfully");
        setpopupupdate(false);
      }
    } catch (error) {
      toast.error("error while updaiting");
    }
  };

  return (
    <div>
      <Button variant="secondary" onClick={() => setpopup(true)}>
        ajouter category
      </Button>
      {category.length == 0 ? (
        <h3>category empty</h3>
      ) : (
        <Container>
          <Row>
            <ListItems
              data={category}
              ondelete={Deletecategory}
              onupdate={handleClickupDate}
            />
          </Row>
        </Container>
      )}
      <Modal show={popup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ajouter category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="inputPassword5">category name</Form.Label>
          <Form.Control type="text" id="category" onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={savecategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={popupupdate} onHide={handleCloseupdate}>
        <Modal.Header closeButton>
          <Modal.Title>modifier category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="inputPassword5">category name</Form.Label>
          <Form.Control
            type="text"
            id="category"
            name="name"
            onChange={handleChangeupdate}
            value={categoryupdate?.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseupdate}>
            Close
          </Button>
          <Button variant="primary" onClick={Updatecategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Category;
