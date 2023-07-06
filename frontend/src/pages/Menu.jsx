import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Menu.css';

const Menu = () => {
  const [groups, setGroups] = useState(['Group1', 'Group2', 'Group3']); // Ejemplo de grupos
  const [tables, setTables] = useState(['Table1', 'Table2', 'Table3']); // Ejemplo de tablas

  const selectGroup = (group) => {
    // Aquí puedes actualizar las tablas según el grupo seleccionado
    // Y también puedes guardar el grupo seleccionado en localStorage
    localStorage.setItem('selectedGroup', group);
  };

  const selectTable = (table) => {
    // Aquí puedes guardar la tabla seleccionada en localStorage
    localStorage.setItem('selectedTable', table);
  };

  return (
    <div className="menu-wrapper">
      <div className="left-container">
        <div className="container1">
          <h2>Groups</h2>
          {groups.map(group => (
            <p key={group} onClick={() => selectGroup(group)}>{group}</p>
          ))}
        </div>
        <div className="container2">
          <h2>Tables</h2>
          {tables.map(table => (
            <p key={table} onClick={() => selectTable(table)}>{table}</p>
          ))}
        </div>
      </div>
      <div className="right-container">
        <h1>Bienvenido al Motor de Reglas</h1>
        <div className="buttons">
          <Link to="/EvaluateRecords">
            <button>Aplicar Reglas a Datos</button>
          </Link>
          <Link to="/CRUD_records">
            <button>Gestión de Datos</button>
          </Link>
          <Link to="/CRUD_rules">
            <button>Gestión de Reglas</button>
          </Link>
          <Link to="/CRUD_rules">
            <button>Gestión de Columnas</button>
          </Link>
          <Link to="/CRUD_rules">
            <button>Gestión de Usuarios en Grupos</button>
          </Link>
          <Link to="/CRUD_rules">
            <button>Gestión de Roles de Usuarios en Grupos</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
