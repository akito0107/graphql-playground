const _ = require('lodash')

module.exports = {
  ID: () => "<id>",
  String: () => "<string>",
  User: () => ({
    id: () => Date.now().toString(),
    name: () => "user_by_type"
  }),
  Query: () => ({
    user: (_, {id}) => ({
      id: id,
      name: () => "user_by_query"
    }),
    users: () => ([
      {id: '1', name: 'test'}
    ])
  })
};
