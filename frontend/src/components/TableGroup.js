import React from 'react';
import { Table, Button } from 'reactstrap';

const TableRule = ({ data, mostrarModalActualizar, eliminar }) => (
  <Table>
    <thead>
      <tr>
        <th>id</th>
        <th>Grupos</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dato) => (
        <tr key={dato.id}>
          <td>{dato.id}</td>
          <td>{dato.grupos}</td>
          <td>
            <Button
              color="primary"
              onClick={() => mostrarModalActualizar(dato)}
            >
              Editar
            </Button>{" "}
            <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TableRule;
