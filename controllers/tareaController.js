import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

const agregarTarea = async (req,res) => {
    const {proyecto} = req.body;

    const proyectoAsociar = await Proyecto.findById(proyecto);

    if(!proyectoAsociar){
        const error = new Error('No existe proyecto');
        return res.status(404).json({msg : error.message})
    }
    if(proyectoAsociar.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes los permisos para añadir tareas');
        return res.status(403).json({msg : error.message});
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }


    res.json(proyectoAsociar);
}

const obtenerTarea = async (req,res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea){
        const error = new Error("No existe tarea con ese Id");
        return res.status(404).json({msg : error.message});
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(403).json({msg : error.message})
    }

    res.json(tarea)
}

const actualizarTarea = async (req,res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea){
        const error = new Error("No existe tarea con ese Id");
        return res.status(404).json({msg : error.message});
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(403).json({msg : error.message})
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;

    try {
        const tareaAlmacenada = await tarea.save();
        return res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error)
    }
}

const eliminarTarea = async (req,res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea){
        const error = new Error("No existe tarea con ese Id");
        return res.status(404).json({msg : error.message});
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(403).json({msg : error.message})
    }

    try {
        await tarea.deleteOne();
        res.json({msg : 'Tarea Eliminada'})
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req,res) => {
    
}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}