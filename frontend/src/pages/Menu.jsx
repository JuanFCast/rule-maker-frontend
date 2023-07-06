import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import '../style/Menu.css';

const Menu = () => {
  const [groups, setGroups] = useState([
    { groupId: '1', description: 'Group 1 Description', name: 'Group1' },
    { groupId: '2', description: 'Group 2 Description', name: 'Group2' },
    { groupId: '3', description: 'Group 3 Description', name: 'Group3' }
  ]);

  const [tables, setTables] = useState([
    { tableId: '1', title: 'Table1', groupId: '1', data: 'Data1' },
    { tableId: '2', title: 'Table2', groupId: '2', data: 'Data2' },
    { tableId: '3', title: 'Table3', groupId: '3', data: 'Data3' }
  ]);

  const selectGroup = (group) => {
    localStorage.setItem('selectedGroup', group.name);
  };

  const selectTable = (table) => {
    localStorage.setItem('selectedTable', table.title);
  };

  const editItem = (arrayUpdater, array, item, isTable = false) => {
    const newTitle = isTable ? prompt("Nuevo título", item.title) : prompt("Nuevo nombre", item.name);
    const newDescription = isTable ? prompt("Nuevo groupId", item.groupId) : prompt("Nueva descripción", item.description);
    
    if (newTitle && newDescription) {
      const newArray = array.map(i => {
        if ((isTable && i.tableId === item.tableId) || (!isTable && i.groupId === item.groupId)) {
          return { ...i, name: newTitle, description: newDescription };
        } else {
          return i;
        }
      });
      
      arrayUpdater(newArray);
    }
  };

  const createItem = (arrayUpdater, array, isTable = false) => {
    const newId = prompt("ID del nuevo item");
    const newTitle = isTable ? prompt("Título de la nueva tabla") : prompt("Nombre del nuevo grupo");
    const newDescription = isTable ? prompt("GroupId de la nueva tabla") : prompt("Descripción del nuevo grupo");
    const newData = isTable ? prompt("Datos de la nueva tabla") : null;

    if (newId && newTitle && newDescription) {
      const newArray = [...array, isTable ? { tableId: newId, title: newTitle, groupId: newDescription, data: newData } : { groupId: newId, description: newDescription, name: newTitle }];
      arrayUpdater(newArray);
    }
  };

  const deleteItem = (arrayUpdater, array, item, isTable = false) => {
    const newArray = array.filter(i => (isTable ? i.tableId !== item.tableId : i.groupId !== item.groupId));
    arrayUpdater(newArray);
  };

  return (
    <div className="menu-wrapper">
      <div className="left-container">
        <div className="container1">
          <h2>Groups</h2>
          <BsPlusSquare onClick={() => createItem(setGroups, groups)} />
          <table className="groups-table">
            <thead>
              <tr>
                <th>GroupId</th>
                <th>Name</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => (
                <tr key={group.groupId} onClick={() => selectGroup(group)}>
                  <td>{group.groupId}</td>
                  <td>{group.name}</td>
                  <td>{group.description}</td>
                  <td><AiFillEdit onClick={(e) => {e.stopPropagation(); editItem(setGroups, groups, group)}} /></td>
                  <td><AiFillDelete onClick={(e) => {e.stopPropagation(); deleteItem(setGroups, groups, group)}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container2">
          <h2>Tables</h2>
          <BsPlusSquare onClick={() => createItem(setTables, tables, true)} />
          <table className="groups-table">
            <thead>
              <tr>
                <th>TableId</th>
                <th>Title</th>
                <th>GroupId</th>
                <th>Data</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tables.map(table => (
                <tr key={table.tableId} onClick={() => selectTable(table)}>
                  <td>{table.tableId}</td>
                  <td>{table.title}</td>
                  <td>{table.groupId}</td>
                  <td>{table.data}</td>
                  <td><AiFillEdit onClick={(e) => {e.stopPropagation(); editItem(setTables, tables, table, true)}} /></td>
                  <td><AiFillDelete onClick={(e) => {e.stopPropagation(); deleteItem(setTables, tables, table, true)}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
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
