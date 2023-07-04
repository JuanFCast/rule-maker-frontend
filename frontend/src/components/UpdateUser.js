import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const UpdateUser = ({ isOpen, form, cerrarModalActualizar, handleChange, editar }) => (
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
        <label>ID del grupo:</label>
        <input
          className="form-control"
          name="idGroup"
          type="text"
          onChange={handleChange}
          value={form.idGroup}
        />
      </FormGroup>

      <FormGroup>
        <label>Usuarios:</label>
        <input
          className="form-control"
          name="user"
          type="text"
          onChange={handleChange}
          value={form.user}
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

export default UpdateUser;
