const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const dataBase = require('../db/db.json')
const fs = require('fs');
const { json } = require('express/lib/response');

module.exports = function (router) {  
  router.get("/notes", function (req,res) {
    res.json(dataBase)
  })
  
  router.post("/notes", function (req,res) {
    req.body.id = uuidv4()
    dataBase.push(req.body)
    fs.writeFile("../db/db.json", JSON.stringify(dataBase), function(err){
      if(err) {
        throw error
      }
      res.json("saved")
    })
  })
}
