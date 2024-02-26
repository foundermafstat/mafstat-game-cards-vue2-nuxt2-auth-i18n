import mongoose from 'mongoose'

const ClubSchema = new mongoose.Schema({
  name: {type: String},
  city: {type: String}
})

export default mongoose.model('Club', ClubSchema)
