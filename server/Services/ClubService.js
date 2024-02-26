import Club from '../Models/ClubModel.js'

class ClubService {
  async create(post) {
    const clubCreated = await Club.create(post)

    return clubCreated
  }

  async update(post) {
    if (!post._id) {
      throw new Error('не указан ID')
    }
    const clubUpdate = await Club.findByIdAndUpdate(post._id, post, {new: true})

    return clubUpdate
  }

  async delete(id) {
    console.log(`Delete: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const clubDelete = await Club.findByIdAndDelete(id)

    return clubDelete
  }

  async getAll() {
    console.log(`GetAll clubs`)
    const clubsAll = await Club.find()

    return clubsAll
  }

  async listGames() {
    console.log(`List Clubs`)
    const listClubs = await Club.aggregate([
      {$project: {
        _id: true,
        text: "$name",
        result: "$result.label",
        judge: "$judge.name",
        judgeid: "$judge.id",
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

    return listClubs
  }

  async listAll() {
    console.log(`List All clubs`)
    const clubsList = await Club.aggregate([
      {$project: {
        _id: false,
        text: "$name",
        value: {id:"$_id", name:"$name", city:"$city"},
      }},
      {$sort: {text:1}}
    ])

    const arr = {}

    arr.clubs = clubsList

    return arr
  }

  async getOne(id) {
    console.log(`GetOne service: ${id}`)
    if (!id) {
      throw new Error('не указан ID')
    }
    const clubOne = await Club.findById(id)

    return clubOne
  }
}

export default new ClubService()
