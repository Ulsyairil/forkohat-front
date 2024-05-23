import { request, response } from 'express'

const errorHandler = (err, req = request, res = response, next) => {
  const errStatus = err.response.status || 500
  const errMsg = err.message || 'Something went wrong'
  let response = err.response.data
  response.status = errStatus
  response.errorMessage = errMsg
  response.stack = process.env.NODE_ENV === 'development' ? err.stack : {}

  if (response.message === "E_INVALID_JWT_TOKEN: jwt must be provided") {
    response.message = "jwt must be provided";
  }

  res.status(errStatus).json(response)
}

export default errorHandler
