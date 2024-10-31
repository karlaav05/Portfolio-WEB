const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/bmi', (req, res) => { 
   const weight = parseFloat(req.body.weight);  
   const height = parseFloat(req.body.height);  

   if (isNaN(weight) || isNaN(height) || height <= 0) {
       return res.send('Por favor ingresa valores válidos para el peso y la altura.');
   }

   const bmi = (weight / (height * height)) * 10000;

   const resultHTML = `
       <h1>Calculadora de BMI</h1>
       <form action="/bmi" method="POST"> <!-- Cambiar a '/bmi' -->
           <label for="weight">Peso (kg):</label>
           <input type="number" id="weight" name="weight" required>
           <br>
           <label for="height">Altura (cm):</label>
           <input type="number" id="height" name="height" required>
           <br>
           <button type="submit">Calcular BMI</button>
       </form>
       <h2>Tu BMI es: ${bmi.toFixed(2)}</h2>
   `;

   res.send(resultHTML);
});

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
