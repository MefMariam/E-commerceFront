import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "../../configuration/axiosconfig";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/ModalComponent";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";

function ResponsiveProduit() {
  const storedtoken = localStorage.getItem("token");
  const [Loading, setLoading] = useState(true);
  const [produit, setProduit] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedproduct, setselectedproduct] = useState(null);
  const [token, setToken] = useState(storedtoken);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProduit(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Product data:", error);
      });
  }, []);
  const Deleteproduct = async (id) => {
    try {
      console.log(id);
      const data = await axios.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setProduit(produit.filter((el) => el._id != id));
        setModal(false);
        toast.success("product has been delated", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("product has not been delated", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div>
      {produit.length === 0 ? (
        <h1> Produit not found :D !! </h1>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {produit.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category.name}</td>
                <td>{item.price} DT</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate(`/UpdateProduct/${item._id}`)}
                  >
                    Modifier
                  </button>

                  <Button
                    className="btn btn-danger"
                    onClick={() => {
                      setModal(true);
                      setselectedproduct(item);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <button
        className="btn btn-primary"
        onClick={() => navigate("/addProduct")}
      >
        Ajouter un produit
      </button>

      {modal && (
        <ModalComponent
          modal={modal}
          setModal={setModal}
          product={selectedproduct}
          modaltiltle="supprimer produit"
          ModalContent="est ce que vous etes sur  "
          action={Deleteproduct}
        />
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default ResponsiveProduit;
