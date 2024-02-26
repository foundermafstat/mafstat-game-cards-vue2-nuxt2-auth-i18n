import Player from '../Models/PlayerModel.js'
import Game from '../Models/GameModel.js'

class PlayerService {

  async create(post) {
    console.log(`Create: ${post.body}`)

    const playerCreated = await Player.create(post)
    return playerCreated
  }


  async getAll() {
    console.log(`GetAll`)
    const playersAll = await Player.find({},{password: false, roles: false})
    return playersAll
  }


  async listAll() {
    console.log(`ListAll`)
    const playersList = await Player.aggregate([
      {$project: {
        _id: false,
        text: "$nickname",
        club: "$club",
        value: {id:"$_id", name:"$nickname"},
      }},
      {$sort: {text:1}}
    ])

    const arr = {}

    arr.players = playersList

    return arr
  }

  async profile(post) {
    console.log(`Player Service profile `)
    console.log(post)

    const playerOne = await Player.findById(post)

    const profileList = await Game.aggregate([
      {
        $match: {
          "players.nickname.id":post
        }
      },

      {$unwind: "$type"},
      {$unwind: "$result"},
      {$unwind: "$players"},
      {$unwind: "$players.nickname"},
      {$unwind: "$players.role"},

      {
        $project: {
          _id : "$players.nickname.id",
          gameid: "$_id",
          name: "$name",
          label: "$type.label",
          type: "$type.game",
          result: "$players.point",
          role: "$players.role.label",
          extra: "$players.extra",
          slot: "$players.slot",
          timeend: "$timeend",
          date: "$date",
          fulldate: { $dateToString: { format: "%d.%m.%Y %H:%M", date: "$date" } },
          day: { $dateToString: { format: "%d.%m.%Y", date: "$date" } },
          time: { $dateToString: { format: "%H:%M", date: "$date" } },
        }
      },

      {$sort: { date: -1 }},

      {
        $match: {
          "_id":post
        }
      },

    ])

    const arr = {
      stats: {
        allgames: 0,
        wingames: 0,
        alldop: 0,
        allcivilian: 0,
        wincivilian: 0,
        dopcivilian: 0,
        allsheriff: 0,
        winsheriff: 0,
        dopsheriff: 0,
        allmafia: 0,
        winmafia: 0,
        dopmafia: 0,
        alldon: 0,
        windon: 0,
        dopdon: 0,
        error: 0
      }
    }

    for (const gameValue of profileList) {

      if (gameValue.type === "rating") {
        arr.stats.allgames++

        arr.stats.alldop = arr.stats.alldop + gameValue.extra

        if (gameValue.result === 1) {
          arr.stats.wingames++
        }

        if (gameValue.role === "Мирный") {
          arr.stats.allcivilian++

          arr.stats.dopcivilian = arr.stats.dopcivilian + gameValue.extra

          if (gameValue.result === 1) {
            arr.stats.wincivilian++
          }

        }else if (gameValue.role === "Шериф") {
          arr.stats.allsheriff++

          arr.stats.dopsheriff = arr.stats.dopsheriff + gameValue.extra

          if (gameValue.result === 1) {
            arr.stats.winsheriff++
          }

        }else if (gameValue.role === "Мафия") {
          arr.stats.allmafia++

          arr.stats.dopmafia = arr.stats.dopmafia + gameValue.extra

          if (gameValue.result === 1) {
            arr.stats.winmafia++
          }

        }else if (gameValue.role === "Дон") {
          arr.stats.alldon++

          arr.stats.dopdon = arr.stats.dopdon + gameValue.extra

          if (gameValue.result === 1) {
            arr.stats.windon++
          }

        }else {
          arr.stats.error++
        }
      }



    }

    arr.user = playerOne

    arr.games = profileList

    return arr
  }

  async getOne(id) {
    console.log(`GetOne: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const playerOne = await Player.findById(id)
    return playerOne
  }

  async update(post) {
    console.log(`Update: ${post.nickname} ${post.firstname} ${post.lastname}`)
    if (!post._id) {
      throw new Error('не указан ID')
    }
    const playerUpdate = await Player.findByIdAndUpdate(post._id, post, {new: true})
    return playerUpdate

  }

  async delete(id) {
    console.log(`Delete: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const playerDelete = await Player.findByIdAndDelete(id)
    return playerDelete
  }

  async playersList() {

    const playersAll = await Player.find({},{password: false, roles: false})

    const allPlayers = await Game.aggregate([
      {$match:
        {
          "type.game":"rating"
        }
      },
      {$unwind: "$players"},
      {$unwind: "$players.nickname"},
      {$unwind: "$players.role"},
      {$group: {

        _id: "$players.nickname.id",

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

    const playersList = []

    for (const player of allPlayers) {

      player.allextra = Number(player.allextra.toFixed(2))

      player.allwr = Number(((player.allpoints / player.allgames)*100).toFixed(2))

      player.allmdop = Number((player.allextra / player.allgames).toFixed(2))

      player.mafstat = Number(((player.allpoints * (player.allpoints / player.allgames)) + player.allextra).toFixed(2))

      //civilian

      if (player.allcivilian > 0) {
        player.wrcivilian = Number((( player.wincivilian/player.allcivilian)*100).toFixed(2))
        player.mdopcivilian = Number(( player.dopcivilian/player.allcivilian).toFixed(2))
      }else{
        player.wrcivilian = 0
        player.mdopcivilian = 0
      }

      player.dopcivilian = Number(player.dopcivilian.toFixed(2))

      //sheriff

      if (player.allsheriff > 0) {
        player.wrsheriff = Number((( player.winsheriff/player.allsheriff)*100).toFixed(2))
        player.mdopsheriff = Number(( player.dopsheriff/player.allsheriff).toFixed(2))
      }else{
        player.wrsheriff = 0
        player.mdopsheriff = 0
      }

      player.dopsheriff = Number(player.dopsheriff.toFixed(2))

      //mafia

      if (player.allmafia > 0) {
        player.wrmafia = Number((( player.winmafia/player.allmafia)*100).toFixed(2))
        player.mdopmafia = Number(( player.dopmafia/player.allmafia).toFixed(2))
      }else{
        player.wrmafia = 0
        player.mdopmafia = 0
      }

      player.dopmafia = Number(player.dopmafia.toFixed(2))

      //don

      if (player.alldon > 0) {
        player.wrdon = Number((( player.windon/player.alldon)*100).toFixed(2))
        player.mdopdon = Number(( player.dopdon/player.alldon).toFixed(2))
      }else{
        player.wrdon = 0
        player.mdopdon = 0
      }

      player.dopdon = Number(player.dopdon.toFixed(2))

      
      //if (player.allgames > 15) {
        let result = playersList.push(player)
      //}
    }

    //playersList.sort((a,b) => a.mafstat > b.mafstat ? -1 : 1)

    //playersRating.sort((a,b) => a.wr > b.wr ? -1 : 1)

    //playersAll

    const key = '_id'

    const dictSmall = playersList.reduce((acc, c) => {
      acc[c[key]] = c
      return acc
    }, {})

    const template = { 
      allgames: 0,
      allpoints: 0,
      allfouls: 0,
      allextra: 0,
      allmafia: 0,
      winmafia: 0,
      dopmafia: 0,
      alldon: 0,
      windon: 0,
      dopdon: 0,
      allcivilian: 0,
      wincivilian: 0,
      dopcivilian: 0,
      allsheriff: 0,
      winsheriff: 0,
      dopsheriff: 0,
      total: 0,
      allwr: 0,
      allmdop: 0,
      mafstat: 0,
      wrcivilian: 0,
      mdopcivilian: 0,
      wrsheriff: 0,
      mdopsheriff: 0,
      wrmafia: 0,
      mdopmafia: 0,
      wrdon: 0,
      mdopdon: 0
    }

    const res = playersAll.map(item => ({ ...item, ...template, ...dictSmall[item[key]] }))

    res.sort((a,b) => a._doc.nickname > b._doc.nickname ? 1 : -1)

    return res
  }

}

export default new PlayerService()
