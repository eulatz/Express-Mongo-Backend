import mongoose from "mongoose";
const {Schema, model} = mongoose

const linkSchema = new Schema( {
    longLink : {
        type: String,
        requiered: true,
        trim: true,

    },
    nanoLink : {
        type: String,
        requiered: true,
        trim: true,
        unique:true,
    },
    uid : {
        type: Schema.Types.ObjectId,
        requiered: true,
        ref: 'User',
    }
})

export const Link = model ('Link', linkSchema)