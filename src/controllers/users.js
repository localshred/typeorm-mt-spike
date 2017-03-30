const R = require('ramda')
const Bluebird = require('bluebird')

const index = (req, res, next) => {
  return res.locals.models.user
    .findAll()
    .then(res.json.bind(res))
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

const create = (req, res, next) => {
  const user = res.locals.models.user
  const params = R.pick(['firstName', 'lastName'], req.body)
  return user
    .create(params, { require: true })
    .then(res.json.bind(res))
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

const destroy = (req, res, next) => {
  return res.locals.models.user
    .destroy({ id: req.params.id, require: true })
    .then(() => {
      res.sendStatus(204)
    })
    .catch((error) => {
      res.status(400)
      res.json(R.pick(['message'], error))
    })
}

const show = (req, res) => {
  return res.locals.models.user
    .findOne(
      { id: req.params.id },
      { require: true }
    )
    .then(res.json.bind(res))
    .catch((error) => {
      res.sendStatus(404)
    })
}

const update = (req, res, next) => {
  const user = res.locals.models.user
  const params = R.pick(['firstName', 'lastName'], req.body)

  return user
    .update(params, { id: req.params.id })
    .then(res.json.bind(res))
    .catch((error) => {
      console.log("Error!", error.message, error.stack)
      res.sendStatus(404)
    })
}

module.exports = {
  create,
  destroy,
  index,
  show,
  update,
}
