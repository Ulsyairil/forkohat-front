import { request, response } from 'express'

const errorHandler = (err, req = request, res = response, next) => {
  const errStatus = err.response.status || 500
  const errMsg = err.message || 'Something went wrong'
  let response = err.response.data
  response.status = errStatus

  if (process.env.NODE_ENV === 'development') {
    response.errorMessage = errMsg
    response.stack = err.stack
  }

  if (process.env.NODE_ENV === 'production') {
    switch (errStatus) {
      case 401:
        response.message = 'Unauthorized'
        break

      case 403:
        response.message = 'Forbidden'
        break

      default:
        response.message = 'Internal Server Error'
        break
    }
  }

  res.status(errStatus).json(response)
}

export default errorHandler
