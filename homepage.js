document.getElementById('add-expression').addEventListener('click', function() {
    var expression = document.createElement('div');
    expression.className = 'expression';
    expression.innerHTML = `
        <select class="column">
            <option value="">Seleccione una columna...</option>
            <!-- Aquí irían las opciones de columnas -->
        </select>
        <select class="operator">
            <option value="">Seleccione un operador...</option>
            <!-- Aquí irían las opciones de operadores -->
        </select>
        <input class="value" type="text" placeholder="Valor">
    `;
    document.getElementById('rule-form').insertBefore(expression, this);
});

document.getElementById('rule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Aquí iría el código para crear la regla a partir de las expresiones
});
