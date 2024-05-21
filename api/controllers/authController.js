const { axios } = require('../config')

const authController = {
    login: async (req, res) => {
        const request = req.body
        let response = await axios.post('/api/auth/login', {
            username: request.username,
            email: request.email,
            password: request.password
        })
    }
}

module.exports = authController