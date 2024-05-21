const axios = require('axios').default
const url = "http://localhost:3333/api/v1" // Change this if you have another host

axios.defaults.baseURL = url

module.exports = {url, axios}

