import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {type: String, required:true, unique: true},
  password: {type: String, required:true},
  roles: [{type: String, ref: 'Role'}]
})

export default mongoose.model('User', UserSchema)
