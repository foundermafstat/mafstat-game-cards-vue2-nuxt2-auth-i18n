import GameService from '../Services/GameService.js'

class GameController {

  async create(req, res) {
    console.log("Game controller: create")
    try {
        const game = req.body
        const date = req.body.date.substr(0, 10)

        game.name = `${date}, игра: ${req.body.type.label}`

        const candidate = {
          text: "Мирный",
          value: {
            name: "civilian",
            label: "Мирный",
            civilian: 1,
            mafia: 0,
            sheriff: 0,
            don: 0
          }
        }

        for (const player of game.players) {

          if(game.result.civilian === 1){
            if(!player.role){
              player.role = candidate,
              player.point = 1
            }

            if(player.role.civilian === 1 || player.role.sheriff === 1){
              player.point = 1
            }

          }
          else if(game.result.mafia === 1){
            if(!player.role){
              player.role = candidate
            }

            if(player.role.mafia === 1 || player.role.don === 1){
              player.point = 1
            }

          }
          else {
            if(!player.role){
              player.role = candidate
            }
          }

        }

        console.log(game)

        const gameCreate = await GameService.create(game)

        res.status(200).json({message: game.name})

    } catch (err) {
        res.status(500).json({
          errors: [
            {
              title: 'Registration Error',
              detail: 'Something went wrong during registration process.',
              errorMessage: err.message,
            },
          ],
        })
    }
  }

  async update(req, res) {
    try {

      const game = req.body

      const date = req.body.date.substr(0, 10)

      game.name = `${date}, game: ${req.body.type.label}`

      const candidate = {
        text: "Мирный",
        value: {
          name: "civilian",
          label: "Мирный",
          civilian: 1,
          mafia: 0,
          sheriff: 0,
          don: 0
        }
      }

      for (const player of game.players) {

        if(game.result.civilian === 1){
          if(!player.role){
            player.role = candidate,
            player.point = 1
          }

          if(player.role.civilian === 1 || player.role.sheriff === 1 ){
            player.point = 1
          }else{
            player.point = 0
          }

        }
        else if(game.result.mafia === 1){
          if(!player.role){
            player.role = candidate
          }

          if(player.role.mafia === 1 || player.role.don === 1){
            player.point = 1
          }else{
            player.point = 0
          }

        }
        else {
          if(!player.role){
            player.role = candidate
          }
        }

      }

      console.log(game)

      const gameUpdate = await GameService.update(game)

      res.status(200).json({message: game.name})

    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete(req, res) {
    try {
        const gameDelete = await GameService.delete(req.params.id)

        res.status(200).json({message: req.params.id})

    } catch (e) {
        res.status(500).json(e)
    }
  }

  async game(req, res) {
    try {
        const games = await Game.getAll()
        return res.json(games)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async listAll(req, res) {
    try {
        const games = await GameService.listAll()
        return res.json(games)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async listGames(req, res) {
    try {
        const games = await GameService.listGames()
        return res.json(games)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async getAll(req, res) {
      try {
          const games = await GameService.getAll()
          return res.json(games)
      } catch (e) {
          res.status(500).json(e)
      }
  }

  async getOne(req, res) {
      console.log(`GetOne controller: ${req.params.id}`)
      try {
          const gameOne = await GameService.getOne(req.params.id)
          return res.json(gameOne)
      } catch (e) {
          res.status(500).json(e)
      }
  }

}

export default new GameController()
