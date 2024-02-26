import mongoose from 'mongoose'
import validator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
})

UserSchema.plugin(validator)

UserSchema.pre('save', function(next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt
    .genSalt(12)
    .then((salt) => {
      return bcrypt.hash(user.password, salt)
    })
    .then((hash) => {
      user.password = hash
      next()
    })
    .catch((err) => next(err))
});

export default mongoose.model('Auth', AuthSchema)
