const express = require('express');

const partnerRoute = express.Router();
partnerRoute
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-type", "text/plain")
    next()
  })
  .get((req, res) => {
    res.end("Get All partners")
  })
  .post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`)
  })
  .put((req, res) => {
    res.statusCode = 403
    res.end(`Cannot perform this operation in ${req.route.path}`)
  })
  .delete((req, res) => {
    res.end("Deletes All partners")
  })


  // Partner By Id

  partnerRoute
    .route("/:partnerId")
    .all((req, res, next) => {
      res.statusCode = 200
      res.setHeader("Content-type", "text/plain")
      next()
    })
    .get((req, res) => {
      res.end("Get Single partner")
    })
    .post((req, res) => {
      res.statusCode = 403
      res.end(`Cannot perform this operation in ${req.route.path.replace(":", "")}`)
    })
    .put((req, res) => {
      res.status(200)
      res.json(`Will update the partner: ${req.body.name} with description: ${req.body.description}`)
    })
    .delete((req, res) => {
      res.end("Delete partner")
    })




module.exports = partnerRoute;