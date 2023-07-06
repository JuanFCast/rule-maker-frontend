import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Menu.css';

const Menu = () => {
  return (
    <div className="menu-container">
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
  );
};

export default Menu;
