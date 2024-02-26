import User from '../Models/UserModel.js'

class AuthService {
  async create(post) {
    console.log(`Create AUTH: ${post}`)

    const playerCreated = await Player.create(post)
    return playerCreated
  }

  async getAll() {
    console.log(`GetAll`)
    const playersAll = await Player.find()
    return playersAll
  }

  async listAll() {
    console.log(`ListAll Users AUTH`)
    const playersList = await User.aggregate([
      {$project: {
        _id: false,
        text: "$nickname",
        value: {id:"$_id", name:"$nickname"},
      }},
      {$sort: {text:1}}
    ])

    const arr = {}

    arr.players = playersList

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
}

export default new AuthService()
