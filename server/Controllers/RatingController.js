import Rating from '../Models/RatingModel.js'
import RatingService from '../Services/RatingService.js'

class RatingController {

  async create(req, res) {
    console.log(`Rating controller create body ${req.body.name}`)

    try {
        const ratingCreate = await RatingService.create(req.body)
        res.status(200).json({message: req.body.name})
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async update(req, res) {
    console.log(`Rating controller update body ${req.body.name}`)

    try {
        const ratingUpdate = await RatingService.update(req.body)
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
      const ratingDelete = await Rating.findByIdAndDelete(req.params.id)

      res.status(200).json({message: 'Рейтинг успешно удален'})
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async listRatings(req, res) {
    try {
        const listRatings = await RatingService.listRatings()
        return res.json(listRatings)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
        const ratings = await RatingService.getAll()
        return res.json(ratings)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    console.log(`GetOne rating controller: ${req.params.id}`)
    try {
        const ratingOne = await RatingService.getOne(req.params.id)
        return res.json(ratingOne)
    } catch (e) {
        res.status(500).json(e)
    }
  }

  async test(req, res) {
    try {
        const rating = await RatingService.testRating()
        return res.json(rating)
    } catch (e) {
        res.status(500).json(e)
    }
  }

}

export default new RatingController();
