//GRAFICOS
const ctx1 = document.getElementById('chart1').getContext('2d');
new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [{
      label: 'Ventas',
      data: [12, 19, 3, 5],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
      borderColor: '#555555',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }
});

// Configuración para el segundo gráfico (Gráfico de líneas)
const ctx2 = document.getElementById('chart2').getContext('2d');
new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [{
      label: 'Usuarios Activos',
      data: [5, 15, 8, 12],
      borderColor: '#36a2eb',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }
});

// Configuración para el tercer gráfico (Gráfico de pastel)
const ctx3 = document.getElementById('chart3').getContext('2d');
new Chart(ctx3, {
  type: 'pie',
  data: {
    labels: ['Rojo', 'Azul', 'Amarillo'],
    datasets: [{
      data: [10, 20, 30],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }
});

// Configuración para el cuarto gráfico (Gráfico de pastel)
const ctx4 = document.getElementById('chart4').getContext('2d')
const xValues= [100,200,300,400,500,600,700,800,900,1000];

new Chart(ctx4, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{ 
        data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
        borderColor: "red",
        fill: false
        }, { 
        data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
        borderColor: "green",
        fill: false
        }, { 
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "blue",
        fill: false
        }]
    },
    options: {
      legend: {display: false}
    }
});



// CALCULADORA 

function calcular() {
  // Obtener el valor ingresado por el usuario
  const consumoMensual = parseFloat(document.getElementById('consumoMensual').value);
  
  // Verificar si el valor ingresado es válido
  if (isNaN(consumoMensual) || consumoMensual <= 0) {
      alert("Por favor, ingresa un valor válido para el consumo mensual.");
      return;
  }
  
  // Calcular el consumo anual en kWh
  const consumoAnualKWh = consumoMensual * 12;
  
  // Convertir el consumo anual a TWh (1 TWh = 1,000,000,000 kWh)
  const consumoAnualTWh = consumoAnualKWh / 1e9;
  
  // Calcular el porcentaje respecto a un valor de referencia (por ejemplo, 500 TWh)
  const valorReferenciaTWh = 0.32; // Este valor puede ajustarse
  const porcentaje = (consumoAnualTWh / valorReferenciaTWh) * 100;
  
  // Mostrar los resultados en la página
  document.getElementById('resultadoTWh').textContent = consumoAnualTWh.toFixed(6);
  document.getElementById('resultadoPorcentaje').textContent = porcentaje.toFixed(2);
}

// Tabla
function leerCSV() {
  const archivo = document.getElementById("archivo").files[0];

  if (!archivo) {
      alert("Por favor, selecciona un archivo CSV.");
      return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
      const contenido = event.target.result;
      const lineas = contenido.split("\n");

      // Procesar las líneas del archivo CSV
      const datos = lineas.map(linea => {
          const columnas = linea.split(",");
          return {
              pais: columnas[0],
              ano: columnas[2],
              khw: columnas[3]
          };
      });

      // Cargar los datos en la tabla
      cargarDatos(datos);
  };
  reader.readAsText(archivo);
}

// Función para cargar los datos en la tabla
function cargarDatos(datos) {
  const tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];

  // Limpiar la tabla antes de agregar nuevos datos
  tabla.innerHTML = "";

  // Iterar sobre los datos y agregar las filas
  datos.forEach(dato => {
      const fila = document.createElement("tr");

      const celdaPais = document.createElement("td");
      celdaPais.textContent = dato.pais;
      fila.appendChild(celdaPais);

      const celdaAno= document.createElement("td");
      celdaAno.textContent = dato.ano;
      fila.appendChild(celdaAno);

      const celdaKhw = document.createElement("td");
      celdaKhw.textContent = dato.khw;
      fila.appendChild(celdaKhw);

      tabla.appendChild(fila);
  });
}
window.onload = cargarDatos();


