import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    date:       {type: Date},
    timeend:    {type: Date, default: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()},
    name:       {type: String},
    firstkill:  {type: Number, default: 0},
    bestmove:   {type: Array},
    club: {
      id:       {type: String},
      name:     {type: String},
      city:     {type: String}
    },
    type: {
      label:    {type: String},
      game:     {type: String}
    },
    result: {
      label:    {type: String},
      civilian: {type: Number},
      mafia:    {type: Number},
      deadheat: {type: Number}
    },
    table:      {type: Number, default: 1},
    about:      {type: String},
    judge: {
      id:     {type: String},
      name:   {type: String}
    },
    players: [{
      slot:   {type: Number},
      nickname: {
        clubid:   {type: String},
        clubname: {type: String},
        id:       {type: String},
        name:     {type: String}
      },
      role: {
        name:     {type: String, default: "civilian"},
        label:    {type: String, default: "Мирный"},
        civilian: {type: Number, default: 1},
        mafia:    {type: Number, default: 0},
        sheriff:  {type: Number, default: 0},
        don:      {type: Number, default: 0}
      },
      point: {type: Number, default: 0},
      extra: {type: Number, default: 0},
      fouls: {type: Number, default: 0}
    }],
    vote: [{
      result: {type: Array},
      c1:     {type: Number},
      c2:     {type: Number},
      c3:     {type: Number},
      c4:     {type: Number},
      c5:     {type: Number},
      c6:     {type: Number},
      c7:     {type: Number},
      c8:     {type: Number},
      c9:     {type: Number},
      c10:    {type: Number},
      v1:     {type: Number},
      v2:     {type: Number},
      v3:     {type: Number},
      v4:     {type: Number},
      v5:     {type: Number},
      v6:     {type: Number},
      v7:     {type: Number},
      v8:     {type: Number},
      v9:     {type: Number},
      v10:    {type: Number},
      rv1:    {type: Number},
      rv2:    {type: Number},
      rv3:    {type: Number},
      rv4:    {type: Number},
      rv5:    {type: Number},
      rv6:    {type: Number},
      rv7:    {type: Number},
      rv8:    {type: Number},
      rv9:    {type: Number},
      rv10:   {type: Number},
      rrv1:   {type: Number},
      rrv2:   {type: Number},
      rrv3:   {type: Number},
      rrv4:   {type: Number},
      rrv5:   {type: Number},
      rrv6:   {type: Number},
      rrv7:   {type: Number},
      rrv8:   {type: Number},
      rrv9:   {type: Number},
      rrv10:  {type: Number},
    }]
})

export default mongoose.model('Game', GameSchema)
