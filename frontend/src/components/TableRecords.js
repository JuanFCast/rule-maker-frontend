import React from 'react';
import { Table, Button } from 'reactstrap';

const TableRecords = ({ data, mostrarModalActualizar, eliminar }) => (
  <Table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Columna 1</th>
        <th>Columna 2</th>
        <th>Columna 3</th> 
        <th>Columna 4</th> {/* Nueva Columna */}
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dato) => (
        <tr key={dato.id}>
          <td>{dato.id}</td>
          <td>{dato.columna1}</td>
          <td>{dato.columna2}</td>
          <td>{dato.columna3}</td>
          <td>{dato.columna4}</td> {/* Nueva celda */}
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

export default TableRecords;
