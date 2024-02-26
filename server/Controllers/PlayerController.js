import PlayerService from '../Services/PlayerService.js'

class PlayerController {
  async create(req, res) {
    console.log(req.body)
      try {
          const playerCreate = await PlayerService.create(req.body)
          res.json(playerCreate)
      } catch (e) {
          res.status(500).json(e)
      }
  }

  async getAll(req, res) {
      try {
          const players = await PlayerService.getAll()
          return res.json(players)
      } catch (e) {
          res.status(500).json(e)
      }
  }

  async listAll(req, res) {
    try {
        const playersList = await PlayerService.listAll()
        return res.json(playersList)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async playersAll(req, res) {
    try {
        const playersAll = await PlayerService.playersList()
        return res.json(playersAll)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async profile(req, res) {
    try {
        const profileList = await PlayerService.profile(req.params.id)
        return res.json(profileList)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    try {
        const playerOne = await PlayerService.getOne(req.params.id)
        return res.json(playerOne)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async update(req, res) {
      try {
          const playerUpdate = await PlayerService.update(req.body)
          return res.json(playerUpdate)
      } catch (e) {
          res.status(500).json(e)
      }
  }

  async delete(req, res) {
      try {
          const playerDelete = await PlayerService.delete(req.params.id)
          return res.json(playerDelete)
      } catch (e) {
          res.status(499).json(e)
      }
  }
}

export default new PlayerController();
