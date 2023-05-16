const Proyecto = require("../models/proyecto");
const { request, response } = require("express");
const Etapas = require("../models/etapas");
const TipoProyecto = require("../models/tipoProyecto");
const Universidad = require("../models/universidad");
const Cliente = require("../models/cliente");

// crear
const createProyecto = async (req = request, res = response) => {
  try {
    const data = req.body;
    console.log(data);
    const { cliente, universidad, tipoProyecto, etapa } = data;

    const tipoProyectoDB = TipoProyecto.findOne({
      _id: tipoProyecto._id,
    });
    if (!tipoProyectoDB) {
      return res.status(400).json({ msg: "tipo de proyecto invalido " });
    }

    const clienteDB = Cliente.findOne({
      _id: cliente._id,
    });
    if (!clienteDB) {
      return res.status(400).json({ msg: "cliente invalido" });
    }

    const universidadDB = Universidad.findOne({
      _id: universidad._id,
    });
    if (!universidadDB) {
      return res.status(400).json({ msg: "Universidad invalida" });
    }

    const etapasDB = Etapas.findOne({
      _id: etapa._id,
    });
    if (!etapasDB) {
      return res.status(400).json({ msg: "Etapa invalida" });
    }

    const proyecto = new Proyecto(data);

    await proyecto.save();

    return res.status(201).json(proyecto);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};


//listar todos
const getProyectos = async (req = request, res = response) => {
    try {
    const proyectoDB = await Proyecto.find()
    .populate({
    path: 'tipoProyecto'
    })
    .populate({
    path: 'cliente'
    })
    .populate({
    path: 'universidad'
    })
    .populate({
    path: 'etapa'
    })
   
    return res.json(proyectoDB);
    } catch (e) {
    return res.status(500).json({
    msg: "Error general " + e,
    });
    }
   };

// actualizar inventario
const updateProyectosByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const proyecto = await Proyecto.findByIdAndUpdate(id, data, { new: true });
    return res.status(201).json(proyecto);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msj: "Error" });
  }
};

module.exports = { createProyecto, getProyectos, updateProyectosByID };
