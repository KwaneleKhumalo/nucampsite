const express = require("express")
const promotionsRouter = express.Router()

promotionsRouter.route('/').all((req, res, next) => {
  res.statusCode = 200
  res.setHeader("Content-type", "text/plain")
  next();
}).get((req, res) => {
  res.end('Get All promotions')
}).post((req, res) => {
  res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`)
}).put((req, res) => {
  res.statusCode = 403
  res.end(`Cannot perform this operation in ${req.route.path}`)
}).delete((req, res) => {
  res.statusCode = 200;
  res.end(`Will Delete all Promotions`)
})

// Promotions By Id

promotionsRouter.route('/:promotionId').all((req, res, next) => {
  res.statusCode = 200
  res.setHeader("Content-type", "text/plain")
  next();
}).get((req, res) => {
  res.end(`Will get a promotion with the id of ${req.params.promotionId}`)
}).post((req, res) => {
  res.statusCode = 403;
  res.end(`Cannot perform this operation in ${req.route.path.replace(":", "")}`)
}).put((req, res) => {
  res.statusCode = 200;
  res.json(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`)
}).delete((req, res) => {
  res.end(`Will Delete promotions with the id: ${req.params.promotionId}`)
})



module.exports =  promotionsRouter;
