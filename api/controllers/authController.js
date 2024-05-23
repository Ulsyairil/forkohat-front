import axios from 'axios'
import errorHandler from '../middleware/errorHandler'

const authController = {
  login: async (req, res, next) => {
    try {
      const response = await axios.post('/login', {
        select: req.body.select,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })

      res.status(200).json(response.data)
    } catch (error) {
      errorHandler(error, req, res, next)
    }
  },
}

export default authController