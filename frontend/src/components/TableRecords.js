import React from 'react';
import { Table, Button } from 'reactstrap';

const TableRecords = ({ data, mostrarModalActualizar, eliminar, asignarKey }) => (
  <Table>
    <thead>
      <tr>
        {data.length > 0 && Object.keys(data[0]).map((key, index) => (
          <th key={index}>{key}</th>
        ))}
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dato, index) => (
        <tr key={index}>
          {Object.values(dato).map((value, i) => (
            <td key={i}>{value}</td>
          ))}
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

export default TableRecords;
