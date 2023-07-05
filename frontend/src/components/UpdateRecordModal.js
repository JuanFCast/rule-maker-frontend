import React from 'react';
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const UpdateRecordModal = ({ isOpen, form, cerrarModalActualizar, handleChange, editar ,prevValue}) => (
  <Modal isOpen={isOpen}>
    <ModalHeader>
      <div><h3>Editar Registro</h3></div>
    </ModalHeader>

    <ModalBody>
      {Object.entries(form).map(([key, value], index) => (
        <FormGroup key={index}>
          <label>{key}:</label>
          <input
            className="form-control"
            name={key}
            type="text"
            onChange={handleChange}
            value={value}
            readOnly={key === 'id'} // Only make the id field read only
          />
        </FormGroup>
      ))}
    </ModalBody>

    <ModalFooter>
      <Button
        color="primary"
        onClick={() => editar(prevValue,form)}
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
