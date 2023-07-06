import React from 'react';
import { Table, Button } from 'reactstrap';

const TableRule = ({ data, mostrarModalActualizar, eliminar, asignarKey }) => (
  <Table>
    <thead>
      <tr>
        <th>id</th>
        <th>Columnas</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dato) => (
        <tr key={dato.id}>
          <td>{dato.id}</td>
          <td>{dato.columna1}</td>
          <td>
            <Button
              color="primary"
              onClick={() => mostrarModalActualizar(dato)}
            >
              Editar
            </Button>{" "}
            <Button color="danger" onClick={() => eliminar(dato)}>Eliminar</Button>{" "}
            <Button color="info" onClick={() => asignarKey(dato)}>Asignar Key</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TableRule;
