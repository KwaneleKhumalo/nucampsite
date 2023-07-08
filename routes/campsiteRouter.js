const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-type", "text/plain")
    next()
  })
  .get((req, res) => {
    res.end("Will send all the campsites to you")
  })
  .post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
  })
  .put((req, res) => {
    res.statusCode = 403
    res.end(`Cannot perform this operation in ${req.route.path}`)
  })
  .delete((req, res) => {
    res.end("Deleting all campsites")
  })

  // Campsite By Id

campsiteRouter
  .route("/:campsiteId")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-type", "text/plain")
    next()
  })
  .get((req, res) => {
    res.end("Get Single Campsite")
  })
  .post((req, res) => {
    res.statusCode = 403
    res.end(`Cannot perform this operation in ${req.route.path.replace(":", "")}`)
  })
  .put((req, res) => {
    res.json(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
  })
  .delete((req, res) => {
    res.end("Delete Camp")
  })

module.exports = campsiteRouter;