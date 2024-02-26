import mongoose from 'mongoose'
import Game from '../Models/GameModel.js'
import Rating from '../Models/RatingModel.js'

class RatingService {

  async create(post) {

    post.games = post.games.map(function(el) { return mongoose.Types.ObjectId(el) })

    const createRating = await Game.aggregate([
      {$match: {
        _id: {
          $in: post.games
        }
      }},
      {$unwind: "$players"},
      {$unwind: "$players.nickname"},
      {$unwind: "$players.role"},
      {$group: {
        _id: "$players.nickname.name",
        allgames: {$sum:1 },
        totalpoints: { $sum: "$players.point" },
        allmafia: { $sum: "$players.role.mafia" },
        winmafia: { $sum: { $multiply: ["$players.role.mafia", "$players.point"] } },
        dopmafia: { $sum: { $multiply: ["$players.role.mafia", "$players.extra"] } },
        alldon: { $sum: "$players.role.don" },
        windon: { $sum: { $multiply: ["$players.role.don", "$players.point"] } },
        dopdon: { $sum: { $multiply: ["$players.role.don", "$players.extra"] } },
        allcivilian: { $sum: "$players.role.civilian" },
        wincivilian: { $sum: { $multiply: ["$players.role.civilian", "$players.point"] } },
        dopcivilian: { $sum: { $multiply: ["$players.role.civilian", "$players.extra"] } },
        allsheriff: { $sum: "$players.role.sheriff" },
        winsheriff: { $sum: { $multiply: ["$players.role.sheriff", "$players.point"] } },
        dopsheriff: { $sum: { $multiply: ["$players.role.sheriff", "$players.extra"] } },
        totalfouls: { $sum: "$players.fouls" },
        totalextra: { $sum: "$players.extra" },
        total: { $sum: { $sum: ["$players.extra", "$players.point"] } },
      }},
      {$sort: { total:-1, windon:-1, winsheriff:-1, allgames:1, _id:1 }},
    ])

    const obj = {}

    obj.name = post.name
    obj.date = post.date
    obj.rating = createRating
    obj.games = post.games

    console.log(`Rating Service update ${obj}`)
    const ratingCreated = await Rating.create(obj)

    return ratingCreated
  }


  async update(post) {

    post.games = post.games.map(function(el) { return mongoose.Types.ObjectId(el) })

    const createRating = await Game.aggregate([
      {$match: {
        _id: {
          $in: post.games
        }
      }},
      {$unwind: "$players"},
      {$unwind: "$players.nickname"},
      {$unwind: "$players.role"},
      {$group: {
        _id: "$players.nickname.name",
        allgames: {$sum:1 },
        totalpoints: { $sum: "$players.point" },
        allmafia: { $sum: "$players.role.mafia" },
        winmafia: { $sum: { $multiply: ["$players.role.mafia", "$players.point"] } },
        dopmafia: { $sum: { $multiply: ["$players.role.mafia", "$players.extra"] } },
        alldon: { $sum: "$players.role.don" },
        windon: { $sum: { $multiply: ["$players.role.don", "$players.point"] } },
        dopdon: { $sum: { $multiply: ["$players.role.don", "$players.extra"] } },
        allcivilian: { $sum: "$players.role.civilian" },
        wincivilian: { $sum: { $multiply: ["$players.role.civilian", "$players.point"] } },
        dopcivilian: { $sum: { $multiply: ["$players.role.civilian", "$players.extra"] } },
        allsheriff: { $sum: "$players.role.sheriff" },
        winsheriff: { $sum: { $multiply: ["$players.role.sheriff", "$players.point"] } },
        dopsheriff: { $sum: { $multiply: ["$players.role.sheriff", "$players.extra"] } },
        totalfouls: { $sum: "$players.fouls" },
        totalextra: { $sum: "$players.extra" },
        total: { $sum: { $sum: ["$players.extra", "$players.point"] } },
      }},
      {$sort: { total:-1, windon:-1, winsheriff:-1, allgames:1, _id:1 }},
    ])
    //'total', 'windon', 'winsheriff', 'allgames', '_id'

    const obj = {}

    obj._id = post._id
    obj.name = post.name
    obj.date = post.date
    obj.rating = createRating
    obj.games = post.games

    console.log(`Rating result update ${obj}`)
    const ratingUpdate = await Rating.findByIdAndUpdate(obj._id, obj, {new: true})

    return ratingUpdate
  }


  async getAll() {
    console.log(`GetAll ratings`)
    const ratingsAll = await Rating.find()

    return ratingsAll
  }

  async listRatings() {
    console.log(`List Ratings Service`)
    const listRatings = await Rating.aggregate([
      {$project: {
        _id: true,
        text: "$name",
        games: { $size:"$games" },
        date: { $dateToString: { format: "%d.%m.%Y", date: "$date" } },
        time: { $dateToString: { format: "%H:%M", date: "$date" } },
        fulldate: { $dateToString: { format: "%H:%M %d.%m.%Y", date: "$date" } },
        value: { $toObjectId: "$_id" },
      }},
      {$sort: {_id:-1}}
    ])

    return listRatings
  }

  async getOne(id) {
    console.log(`GetOne rating service: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const ratingOne = await Rating.findById(id)

    return ratingOne
  }

  async testRating() {

    const allRatings = await Game.aggregate([
      {$match:
        {
          "type.game":"rating",
          date: {
            $gte: new Date("2022-12-01T00:00:00.0Z"),
            $lt: new Date("2023-12-01T00:00:00.0Z")
          }
        }
      },
      {$unwind: "$players"},
      {$unwind: "$players.nickname"},
      {$unwind: "$players.role"},
      {$group: {
        _id: "$players.nickname.name",

        allgames: {$sum:1},
        allpoints: { $sum: "$players.point" },
        allfouls: { $sum: "$players.fouls" },
        allextra: { $sum: "$players.extra" },

        allmafia: { $sum: "$players.role.mafia" },
        winmafia: { $sum: { $multiply: ["$players.role.mafia", "$players.point"] } },
        dopmafia: { $sum: { $multiply: ["$players.role.mafia", "$players.extra"] } },

        alldon: { $sum: "$players.role.don" },
        windon: { $sum: { $multiply: ["$players.role.don", "$players.point"] } },
        dopdon: { $sum: { $multiply: ["$players.role.don", "$players.extra"] } },

        allcivilian: { $sum: "$players.role.civilian" },
        wincivilian: { $sum: { $multiply: ["$players.role.civilian", "$players.point"] } },
        dopcivilian: { $sum: { $multiply: ["$players.role.civilian", "$players.extra"] } },

        allsheriff: { $sum: "$players.role.sheriff" },
        winsheriff: { $sum: { $multiply: ["$players.role.sheriff", "$players.point"] } },
        dopsheriff: { $sum: { $multiply: ["$players.role.sheriff", "$players.extra"] } },

        total: { $sum: { $sum: ["$players.extra", "$players.point"] } },
      }},
      {$sort: {total:-1}},
    ])

    const playersRating = []

    for (const player of allRatings) {

      player.wr = Number(((player.allpoints / player.allgames)*100).toFixed(2))

      player.me = Number((player.allextra / player.allgames).toFixed(2))

      player.result = Number(((player.allpoints * (player.allpoints / player.allgames)) + player.allextra).toFixed(2))

      if (player.allcivilian > 0) {
        player.wrcivilian = Number((( player.wincivilian/player.allcivilian)*100).toFixed(2))
      }else{
        player.wrcivilian = 100
      }

      if (player.allsheriff > 0) {
        player.wrsheriff = Number((( player.winsheriff/player.allsheriff)*100).toFixed(2))
      }else{
        player.wrsheriff = 100
      }

      if (player.allmafia > 0) {
        player.wrmafia = Number((( player.winmafia/player.allmafia)*100).toFixed(2))
      }else{
        player.wrmafia = 100
      }

      if (player.alldon > 0) {
        player.wrdon = Number((( player.windon/player.alldon)*100).toFixed(2))
      }else{
        player.wrdon = 100
      }

      player.allextra = Number(player.allextra.toFixed(2))

      player.dopcivilian = Number(player.dopcivilian.toFixed(2))
      player.dopsheriff = Number(player.dopsheriff.toFixed(2))
      player.dopmafia = Number(player.dopmafia.toFixed(2))
      player.dopdon = Number(player.dopdon.toFixed(2))

      //if (player.allgames > 15) {
        let result = playersRating.push(player)
      //}
    }

    playersRating.sort((a,b) => a.result > b.result ? -1 : 1)

    //playersRating.sort((a,b) => a.wr > b.wr ? -1 : 1)

    return playersRating
  }

}

export default new RatingService()

