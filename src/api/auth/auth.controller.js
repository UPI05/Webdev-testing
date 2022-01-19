authService = require('./auth.service')

module.exports = {
    register: async (req, res, next) => {
        let stat = await authService.register(req.body)
        if (stat.error) {
            res.status(500).json(error.msg)
            return
        }
        res.status(200).json(stat)
    },
    login: (req, res) => {
        authService.login()
    },
}
