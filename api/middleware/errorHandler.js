const errorHandler = (err, req, res, next) => {
  const errStatus = err.response.status || 500
  const errMsg = err.message || 'Something went wrong'
  let response = err.response.data
  response.status = errStatus
  response.errorMessage = errMsg
  response.stack = process.env.NODE_ENV === 'development' ? err.stack : {}
  response.errorMessage = errMsg
  res.status(errStatus).json(response)
}

export default errorHandler
