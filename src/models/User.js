import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        requerid: true,
    }
})

// utilizando a função pre (antes de salvar o Schema faça algo)
UserSchema.pre("save", async function (next) {
    // passando dois parâmetros na função de bcrypt: a string que queremos criptografar e em quantas rodadas/saltos de criptografia ele deve assumir
    this.password = await bcrypt.hash(this.password, 10);
    // logo apos a criptografia continue o que foi progamado pra fazer 
    next();
})

// indicando para o mongoose que é uma model
const User = mongoose.model("User", UserSchema);

export default User;