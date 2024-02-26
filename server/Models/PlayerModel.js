import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema({
    nickname: {
      type: String,
      trim: true,
      unique: true,
      default: ''
    },
    club: {
      id:     {type: String, default: ''},
      name:   {type: String, default: ''},
      city:   {type: String, default: ''},
    },
    country: {
      type: String,
      default: ''
    },
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    sex: {
      type: String,
      default: ''
    },
    birthday: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      required:true,
      minlength: 1,
      trim: true,
    },
    password: {
      type: String,
      required:true,
      minlength: 1,
      trim: true,
    },
    roles: [{type: String, ref: 'Role'}],
    created: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
)

export default mongoose.model('Player', PlayerSchema)
