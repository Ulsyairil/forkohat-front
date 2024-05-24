import { request, response } from 'express'
import axios from 'axios'

const errorFileHandler = async (err, req = request, res = response, next) => {
  if (err.response.status === 404) {
    const response = await axios({
      method: 'get',
      baseURL: req.protocol + '://' + req.get('host'),
      url: 'no-image.png',
      responseType: 'arraybuffer',
    })

    let file = Buffer.from(response.data, 'base64')

    res
      .status(200)
      .setHeader('Content-Type', response.headers['content-type'])
      .setHeader('Content-Length', response.headers['content-length'])
      .send(file)
  }
}

export default errorFileHandler
