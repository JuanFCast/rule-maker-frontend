import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const InsertRecordModal = ({ isOpen, form, cerrarModalInsertar, handleChange, insertar, data }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Insertar nuevo registro</h3></div>
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
      {Object.entries(form).filter(([key]) => key !== 'id').map(([key, value], index) => (
        <FormGroup key={index}>
          <label>{key}:</label>
          <input
            className="form-control"
            name={key}
            type="text"
            onChange={handleChange}
            value={value}
          />
        </FormGroup>
      ))}
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

export default InsertRecordModal;
