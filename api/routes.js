const express = require('express')

module.exports = {
  createUserRoute
}

function createUserRoute(db) {
  const router = express.Router({});

  router.get('/', (req, res) => {
    const body = db.user.map((u) => {
      u.blogs = retrieveBlogsByUser(db, u.id)
      return u
    })
    res.json({users: body})
  })

  router.get('/:id', (req, res) => {
    const user = db.user.find(u => u.id === req.params.id)
    user.blogs = retrieveBlogsByUser(db, user.id)
    res.json({user})
  })

  return router
}

function retrieveBlogsByUser(db, userId) {
  return db.blog.filter(b => b.user_id === userId).map(b => {
    b.category = db.category.find(c => c.id === b.category_id)
    return b
  })
}
