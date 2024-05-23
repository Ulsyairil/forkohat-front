import { request, response } from 'express'
import axios from 'axios'
import errorHandler from '../../middleware/errorHandler'

export const newsList = async (req = request, res = response, next) => {
  try {
    const bearer = req.get('authorization')
    const response = await axios.post(
      '/superadmin/news',
      {
        page: req.body.page,
        limit: req.body.limit,
        order: req.body.order,
        trash: req.body.trash,
        search: req.body.search,
      },
      {
        headers: {
          Authorization: bearer,
        },
      }
    )

    res.status(200).json(response.data)
  } catch (error) {
    errorHandler(error, req, res, next)
  }
}
