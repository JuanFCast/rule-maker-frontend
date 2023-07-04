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
        <label>columna1:</label>
        <input
          className="form-control"
          name="columna1"
          type="text"
          onChange={handleChange}
          value={form.columna1}
        />
      </FormGroup>

      <FormGroup>
        <label>columna2:</label>
        <input
          className="form-control"
          name="columna2"
          type="text"
          onChange={handleChange}
          value={form.columna2}
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
