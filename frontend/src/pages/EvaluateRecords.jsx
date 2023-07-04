import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener el archivo CSS en la misma ruta

const EvaluateRecords = () => {
  const [data, setData] = useState([
    {ID: '6df48a', Columna1: 53, Columna2: 'Amarillo', Columna3: 'Antioquia', Columna4: false},
    {ID: 'asd687', Columna1: 36, Columna2: 'Azul', Columna3: 'Cordoba', Columna4: true},
    {ID: '13sad8', Columna1: 46, Columna2: 'Rojo', Columna3: 'Nariño', Columna4: false}
  ]);

  const [rules, setRules] = useState([
    "Columna 1 ES MAYOR QUE 18 Y Columna 3 ES IGUAL A Antioquia"
  ]);

  const [selectedData, setSelectedData] = useState(null);
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(null);
  const [result, setResult] = useState(null);

  const handleDataSelection = (data) => {
    setSelectedData(data);
  }

  const handleRuleSelection = (index) => {
    setSelectedRuleIndex(index);
  }

  const applyRule = () => {
    // Aquí debes implementar la lógica para evaluar la regla seleccionada contra los datos seleccionados
    // Por simplicidad, asumiremos que siempre retorna "Verdadero".
    const result = "Verdadero";
    setResult(`Al evaluar el registro ${selectedData.ID} contra la regla ${selectedRuleIndex + 1}, el resultado es ${result}.`);
  }

  return (
    <div>
      <h1>Motor de reglas</h1>

      <h2>Selecciona un registro</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Columna 1</th>
            <th>Columna 2</th>
            <th>Columna 3</th>
            <th>Columna 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} 
                className={selectedData === row ? 'selected' : ''}
                onClick={() => handleDataSelection(row)}
            >
              <td>{row.ID}</td>
              <td>{row.Columna1}</td>
              <td>{row.Columna2}</td>
              <td>{row.Columna3}</td>
              <td>{row.Columna4.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Selecciona una regla</h2>
      <ul>
        {rules.map((rule, index) => (
          <li key={index} 
              className={selectedRuleIndex === index ? 'selected' : ''} 
              onClick={() => handleRuleSelection(index)}
          >
            {rule}
          </li>
        ))}
      </ul>

      <button onClick={applyRule}>Aplicar regla</button>

      {result !== null && <p>{result}</p>}
    </div>
  );
}

export default EvaluateRecords;
