const express = require("express");
const cors = require("cors");

const app = express();

let IdRef = 2;
let Pacientes = [{
    id: 0,
    nombre: "Luis",
    apellido: "Arancibia",
    edad: 29
  },
  {
    id: 1,
    nombre: "Christian",
    apellido: "Diaz",
    edad: 28
  },
  {
    id: 2,
    nombre: "Angeles",
    apellido: "Oliva",
    edad: 27
  },
];

const PacientesRouter = express.Router();

PacientesRouter.get("/pacientes", (req, res) => {
    res.json(Pacientes);
  })
  .get("/pacientes/:id", (req, res) => {
    const paciente = Pacientes.find(
      (paciente) => paciente.id === Number.parseInt(req.params.id)
    );

    if (paciente) {
      res.json(paciente);
    } else {
      res.sendStatus(404);
    }
  })

PacientesRouter.post("/pacientes", (req, res) => {
  id = ++IdRef
  const Pacinete = req.body;
  const nuevoPaciente = {
    ...Pacinete
  };
  nuevoPaciente.id = id

  Pacientes.push(nuevoPaciente);
  console.log(Pacientes);

  res.json(nuevoPaciente);
})

PacientesRouter.put("/pacientes/:id", (req, res) => {

  const pacienteIndex = Pacientes.findIndex(
    (paciente) => paciente.id === Number.parseInt(req.params.id)
  );
  if (pacienteIndex !== -1) {
    Pacientes[pacienteIndex] = {
      ...req.body,
      id: Pacientes[pacienteIndex].id,
    };
    console.log(Pacientes[pacienteIndex]);
    res.send(Pacientes[pacienteIndex]);
  } else {
    res.sendStatus(404);
  }
})

PacientesRouter.delete('/pacientes/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id)
  try {
    console.log(req.params);
    const pacienteIndex = await Pacientes.findIndex(item => item.id === id)
    const pacienteEliminado = await Pacientes[pacienteIndex];
    Pacientes.splice(pacienteIndex, 1)
    res.send(pacienteEliminado)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/api", PacientesRouter);
app.listen(3000, undefined, () => {
  console.log("Servidor iniciado");
});
