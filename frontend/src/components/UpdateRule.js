import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const UpdateRule = ({ isOpen, form, cerrarModalActualizar, handleChange, editar}) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Editar Regla</h3></div>
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
        <label>Nombre:</label>
        <input
          className="form-control"
          name="Name"
          type="text"
          onChange={handleChange}
          value={form.Name}
        />
      </FormGroup>

      <FormGroup>
        <label>Regla:</label>
        <input
          className="form-control"
          name="Rules"
          type="text"
          onChange={handleChange}
          value={form.Rules}
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
