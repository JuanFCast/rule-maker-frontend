import React from 'react';
import { Table, Button } from 'reactstrap';

const RecordsTable = ({ data, mostrarModalActualizar, eliminar }) => (
  <Table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Columna 1</th>
        <th>Columna 2</th>
        <th>Columna 3</th> 
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dato) => (
        <tr key={dato.id}>
          <td>{dato.id}</td>
          <td>{dato.personaje}</td>
          <td>{dato.anime}</td>
          <td>{dato.poder}</td> 
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

export default RecordsTable;
