//Usamos ecmascript 6+ para importar los módulos -> agregar el "type": "module" a el package-json
//express es un framework de node para crear el servidor
import express from 'express';
//Cors nos brinda seguridad l
import cors from 'cors';
//Usamos dotenv para no tener que colocar un puerto en específico
import {} from 'dotenv/config.js';

//Instanciamos express en nuestra variable app
var app = express();

//Usamos cors
app.use(cors());

//Middlewars -> cuando usamos el body
app.use(express.json());

//Solicitamos un mensaje en pantalla y cambiamos el estado de respuesta del servidor
app.get('/solicitud', (req, res) => {
  res.status(202).send('Prueba con una arrow');
});

//Recibimos datos del usuario por medio de req.query
app.post('/solicitud/query', (req, res) => {
  console.log(req.query);
  const {nombre, edad} = req.query;
  res.json({
    msg: `Mi nombre es ${nombre} y tengo ${edad} años`,
  });
});

//Recibimos datos del usuario por medio de req.body
app.post('/solicitud/body', (req, res) => {
  const {nombre, edad} = req.body;
  res.json({
    msg: `Mi nombre es ${nombre} y tengo ${edad} años`,
  });
});

//Recibimos datos del usuario por medio de req.params
app.put('/solicitud/:id', (req, res) => {
  const {id} = req.params;
  res.json({
    msg: `El id es: ${id}`,
  });
});

//Recibimos datos del usuario por medio de headers
app.post('/solicitud/headers', (req, res) => {
  const {token} = req.headers;
  res.json({
    msg: `Soy un ${token}`,
  });
});

app.listen(process.env.PORT, () => {
  console.log('Servidor iniciado correctamente');
});
