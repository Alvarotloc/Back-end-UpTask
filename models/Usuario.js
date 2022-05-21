import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    nombre : {
        type     : String,
        required : true,
        trim     : true
    },
    password : {
        type     : String,
        required : true,
        trim     : true
    },
    email : {
        type     : String,
        required : true,
        trim     : true,
        unique   : true,
    },
    token : {
        type     : String
    },
    auth : {
        type     : Boolean,
        default  : false
    }
}, {
    timestamps   : true, //* Esto le añade el created_At y el updated_At
});

usuarioSchema.pre('save', async function (next) { //* Este pre lo que hace es antes del 'save' lanzar esa función. Tambien existe post para hacerlo después
    if(!this.isModified('password')){ //? No está del todo entendido
        next();
    }
    const salt = await bcrypt.genSalt(10); //* Esto le dice cuán dificil tiene que ser el hasheo, cuanto más alto más seguro pero más consume

    this.password = await bcrypt.hash(this.password, salt); //! This aquí hace referencia a dentro del objeto del schema
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario,this.password);
}

const Usuario = mongoose.model('Usuario',usuarioSchema);

export default Usuario;