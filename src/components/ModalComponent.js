import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { toast } from "react-toastify";

function ModalComponent(props) {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={() => props.setModal(false)}>
        <ModalHeader toggle={() => props.setModal(false)}>
          {props.modaltiltle}
        </ModalHeader>
        <ModalBody>
          {props.ModalContent}:{props.product.name}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => props.action(props.product._id)}
          >
            comfirmer
          </Button>{" "}
          <Button color="secondary" onClick={() => props.setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ModalComponent;
