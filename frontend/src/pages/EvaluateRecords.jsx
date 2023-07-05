import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EvaluateRecords = () => {
  const [data, setData] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Se tiene que reemplazar con los endpoints de backend
    axios.get('http://localhost:8080/getRecords').then((response) => {
      setData(response.data);
    });

    axios.get('http://localhost:8080/getRules').then((response) => {
      setRules(response.data);
    });
  }, []);

  const handleDataSelection = (data) => {
    setSelectedData(data);
  }

  const handleRuleSelection = (index) => {
    setSelectedRuleIndex(index);
  }

  const applyRule = () => {
    // Aquí es donde se necesita implementar la lógica para evaluar la regla seleccionada en los datos seleccionados
    // La implementación exacta depende de cómo estén estructuradas las reglas y de qué tipo de lógica quieran permitir
    const result = "Verdadero"; // Este es un valor de demostración
    setResult(`Al evaluar el registro ${selectedData.ID} contra la regla ${selectedRuleIndex + 1}, el resultado es ${result}.`);
  }

  return (
    <div>
      <h1>Motor de reglas</h1>

      <h2>Selecciona un registro</h2>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => handleDataSelection(row)}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Selecciona una regla</h2>
      <ul>
        {rules.map((rule, index) => (
          <li key={index} onClick={() => handleRuleSelection(index)}>{rule.name}</li>
        ))}
      </ul>

      <button onClick={applyRule}>Aplicar regla</button>

      {result !== null && <p>{result}</p>}
    </div>
  );
}

export default EvaluateRecords;
