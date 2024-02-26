import Club from '../Models/ClubModel.js'
import ClubService from '../Services/ClubService.js'

class ClubController {

  async create(req, res) {
    console.log(`Club controller create body ${req.body.name}`)

    try {
        const clubCreate = await ClubService.create(req.body)
        res.status(200).json({message: req.body.name})
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async update(req, res) {
    console.log(`Club controller update body ${req.body.name}`)

    try {
        const clubUpdate = await ClubService.update(req.body)
        res.status(200).json({message: req.body.name})
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async delete(req,res) {
    try {
      console.log(`Delete: ${req.params.id}`)

      if (!req.params.id) {
        throw new Error('не указан ID')
      }
      const clubDelete = await Club.findByIdAndDelete(req.params.id)

      res.status(200).json({message: 'Клуб успешно удален'})
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
        const clubs = await ClubService.getAll()
        return res.json(clubs)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async listAll(req, res) {
    try {
        const clubsList = await ClubService.listAll()
        return res.json(clubsList)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async listClubs(req, res) {
    try {
        const listClubs = await ClubService.listClubs()
        return res.json(listClubs)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    console.log(`GetOne rating controller: ${req.params.id}`)
    try {
        const clubOne = await ClubService.getOne(req.params.id)
        return res.json(clubOne)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async test(req, res) {
    try {
        const club = await ClubService.testClub()
        return res.json(club)
    } catch (e) {
        res.status(500).json(e)
    }
  }

}

export default new ClubController();
