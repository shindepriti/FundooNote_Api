const message = require('../mutation/query').message
const register = require('../mutation/user').register

exports.resolvers = {

    Query : {
        message
    },
    Mutation : {
        register
    }
}