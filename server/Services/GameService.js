import Game from '../Models/GameModel.js'

class GameService {
  async create(post) {
    const gameCreated = await Game.create(post)

    return gameCreated
  }

  async update(post) {
    console.log(`Update: Game - date:${post.date}, result:${post.result}`)
    if (!post._id) {
      throw new Error('не указан ID')
    }
    const gameUpdate = await Game.findByIdAndUpdate(post._id, post, {new: true})

    return gameUpdate
  }

  async delete(id) {
    console.log(`Delete: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const gameDelete = await Game.findByIdAndDelete(id)

    return gameDelete
  }

  async getAll() {
    console.log(`GetAll games`)
    const gamesAll = await Game.find()

    return gamesAll
  }

  async listGames() {
    console.log(`List Games`)
    const listGames = await Game.aggregate([
      {$project: {
        _id: true,
        text: "$name",
        result: "$result.label",
        judge: "$judge.name",
        judgeid: "$judge.id",
        club: "$club.name",
        clubid: "$club.id",
        table: "$table",
        type: "$type.label",
        date: { $dateToString: { format: "%d.%m.%Y", date: "$date" } },
        time: { $dateToString: { format: "%H:%M", date: "$date" } },
        fulldate: { $dateToString: { format: "%H:%M %d.%m.%Y", date: "$date" } },
        timeend: { $dateToString: { format: "%H:%M %d.%m.%Y", date: "$timeend" } },
        value: { $toObjectId: "$_id" },
      }},
      {$sort: {_id:-1}}
    ])

    return listGames
  }

  async listAll() {
    console.log(`ListAll games`)
    const listAll = await Game.aggregate([
      {$project: {
        _id: false,
        text: { $dateToString: { format: "%H:%M %d.%m.%Y", date: "$date" } },
        value: { $toObjectId: "$_id" },
      }},
      {$sort: {text:1}}
    ])

    return listAll
  }

  async getOne(id) {
    console.log(`GetOne service: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const gameOne = await Game.findById(id)

    return gameOne
  }
}

export default new GameService()
