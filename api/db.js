const _ = require('lodash');

const blogs = _.range(0, 100).map((i) => {
  return {
    id: `${i}`,
    user_id: `${i % 3 + 1}`,
    title: `test title${i}`,
    body: 'test test test test test test',
    category_id: i % 5 + 1,
  }
})

module.exports = {
  user: [
    {
      id: '1',
      name: 'test user1',
    },
    {
      id: '2',
      name: 'test user2',
    },
    {
      id: '3',
      name: 'test user3',
    },
  ],
  blog: blogs,
  category: [
    {
      id: '1',
      name: 'category1',
    },
    {
      id: '2',
      name: 'category2',
    },
    {
      id: '3',
      name: 'category3',
    },
    {
      id: '4',
      name: 'category4',
    },
    {
      id: '5',
      name: 'category5',
    },
  ]
};

