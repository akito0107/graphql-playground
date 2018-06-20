const axios = require('axios')

const HOST = 'http://localhost:3002'

module.exports = {
  Query: {
    async users() {
      const response = await axios({
        method: 'GET',
        url: `${HOST}/users`,
      })
      return response.data.users
    },
    async user(_, {id}) {
      const response = await axios({
        method: 'GET',
        url: `${HOST}/users/${id}`
      })
      return response.data.user
    }
  },
};
