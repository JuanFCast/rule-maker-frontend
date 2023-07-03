import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const InsertRecordModal = ({ isOpen, form, cerrarModalInsertar, handleChange, insertar, data }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Insertar Personaje</h3></div>
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
        <label>Personaje:</label>
        <input
          className="form-control"
          name="personaje"
          type="text"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Anime:</label>
        <input
          className="form-control"
          name="anime"
          type="text"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Poder:</label>
        <input
          className="form-control"
          name="poder"
          type="text"
          onChange={handleChange}
          value={form.poder}
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
