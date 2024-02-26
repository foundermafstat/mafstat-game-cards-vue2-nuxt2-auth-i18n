import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema({
  name: {type: String},
  date: {type: Date},
  club: {
    id:       {type: String},
    name:     {type: String}
  },
  rating: [{
      _id:          {type: String},
      allgames:     {type: Number},
      totalpoints:  {type: Number},
      allmafia:     {type: Number},
      winmafia:     {type: Number},
      dopmafia:     {type: Number},
      alldon:       {type: Number},
      windon:       {type: Number},
      dopdon:       {type: Number},
      allcivilian:  {type: Number},
      wincivilian:  {type: Number},
      dopcivilian:  {type: Number},
      allsheriff:   {type: Number},
      winsheriff:   {type: Number},
      dopsheriff:   {type: Number},
      totalfouls:   {type: Number},
      totalextra:   {type: Number},
      total:        {type: Number}
  }],
  games: [
    {type: String}
  ]
})

export default mongoose.model('Rating', RatingSchema)
