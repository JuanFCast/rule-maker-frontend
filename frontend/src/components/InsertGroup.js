import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const InsertRule = ({ isOpen, form, cerrarModalInsertar, handleChange, insertar, data }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Insertar nuevo grupo</h3></div>
    </ModalHeader>

    <ModalBody>
      <FormGroup>
        <label>Id:</label>
        <input
          className="form-control"
          readOnly
          type="text"
          value={data.length+1}
        />
      </FormGroup>

      <FormGroup>
        <label>grupos:</label>
        <input
          className="form-control"
          name="grupos"
          type="text"
          onChange={handleChange}
        />
      </FormGroup>

    </ModalBody>

    <ModalFooter>
      <Button
        color="primary"
        onClick={insertar}
      >
        Insertar
      </Button>
      <Button
        className="btn btn-danger"
        onClick={cerrarModalInsertar}
      >
        Cancelar
      </Button>
    </ModalFooter>
  </Modal>
);

export default InsertRule;
