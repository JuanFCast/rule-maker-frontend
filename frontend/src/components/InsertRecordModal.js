import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const InsertRecordModal = ({ isOpen, form, cerrarModalInsertar, handleChange, insertar, data }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Insertar columna1</h3></div>
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
        <label>columna1:</label>
        <input
          className="form-control"
          name="columna1"
          type="text"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <label>columna2:</label>
        <input
          className="form-control"
          name="columna2"
          type="text"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <label>columna3:</label>
        <input
          className="form-control"
          name="columna3"
          type="text"
          onChange={handleChange}
          value={form.columna3}
        />
      </FormGroup>

      <FormGroup>  {/* Nuevo FormGroup */}
        <label>columna4:</label>
        <input
          className="form-control"
          name="columna4"
          type="text"
          onChange={handleChange}
          value={form.columna4}
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

export default InsertRecordModal;
