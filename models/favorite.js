const mongoose = require("mongoose")
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  ref: "User",
  campsites: mongoose.Schema.Types.ObjectId,
  ref: "Campsite"
})

export const Favorite = mongoose.model("Favorite", favoriteSchema)
