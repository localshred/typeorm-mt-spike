const R = require('ramda')

throw new Exception('Not implemented')

const wrapGetUser = (fn) => [(req, res, next) => {
  res.locals.user = null
  res.locals.models.user
    .findOne(
      { id: req.params.userId },
      { withRelated: ['accounts'], require: true }
    )
    .then((user) => {
      res.locals.user = user
      next()
    })
    .catch((error) => {
      res.sendStatus(404)
    })
}, fn]

const index = (req, res) => {
  return res.locals.user.related('accounts').fetch()
    .then(res.json.bind(res))
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

const create = (req, res) => {
  const params = R.pipe(
    R.pick(['label', 'accountType']),
    R.assoc('userId', req.params.userId)
  )(req.body)

  return res.locals.models.account.create(params)
    .then(res.json.bind(res))
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

const destroy = (req, res) => {
  return res.locals.models.account
    .findOne(
      { id: req.params.id, userId: req.params.userId },
      { require: true }
    )
    .then((account) => {
      return res.locals.models.account
        .forge({ id: account.id })
        .destroy({ require: true })
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

const show = (req, res) => {
  return res.locals.models.account
    .findOne(
      { id: req.params.id, userId: req.params.userId },
      { require: true }
    )
    .then(res.json.bind(res))
    .catch((error) => {
      res.sendStatus(404)
    })
}

const update = (req, res) => {
  return res.locals.models.account
    .findOne(
      { id: req.params.id, userId: req.params.userId },
      { require: true }
    )
    .then((account) => {
      const params = R.pick(['label', 'accountType'], req.body)
      return account.save(params, { patch: true, require: true })
    })
    .then(res.json.bind(res))
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

module.exports = {
  create: wrapGetUser(create),
  destroy: wrapGetUser(destroy),
  index: wrapGetUser(index),
  show: wrapGetUser(show),
  update: wrapGetUser(update),
}
