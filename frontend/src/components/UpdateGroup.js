import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const UpdateRule = ({ isOpen, form, cerrarModalActualizar, handleChange, editar }) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Editar grupo</h3></div>
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
        <label>grupos:</label>
        <input
          className="form-control"
          name="grupos"
          type="text"
          onChange={handleChange}
          value={form.grupos}
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

export default UpdateRule;
