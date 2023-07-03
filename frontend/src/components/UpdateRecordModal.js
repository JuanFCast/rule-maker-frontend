import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const UpdateRecordModal = ({ isOpen, form, cerrarModalActualizar, handleChange, editar }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Editar Registro</h3></div>
    </ModalHeader>

    <ModalBody>
      <FormGroup>
        <label>Id:</label>
        <input
          className="form-control"
          readOnly
          type="text"
          value={form.id}
        />
      </FormGroup>

      <FormGroup>
        <label>Personaje:</label>
        <input
          className="form-control"
          name="personaje"
          type="text"
          onChange={handleChange}
          value={form.personaje}
        />
      </FormGroup>

      <FormGroup>
        <label>Anime:</label>
        <input
          className="form-control"
          name="anime"
          type="text"
          onChange={handleChange}
          value={form.anime}
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
        onClick={() => editar(form)}
      >
        Editar
      </Button>
      <Button
        color="danger"
        onClick={cerrarModalActualizar}
      >
        Cancelar
      </Button>
    </ModalFooter>
  </Modal>
);

export default UpdateRecordModal;
