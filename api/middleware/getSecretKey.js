import { request, response } from 'express'
import bcrypt from 'bcrypt'

const getSecretKey = async (req = request, res = response, next) => {
  let getHeaderSecretKey = req.get('secret-key')
  if (getHeaderSecretKey !== undefined && getHeaderSecretKey !== '') {
    let check = bcrypt.compareSync('forkohat', getHeaderSecretKey)
    if (!check) {
      return res.status(403).json({
        status: 403,
        message: 'Invalid secret key',
      })
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: 'Missing secret key',
    })
  }

  next()
}

export default getSecretKey
