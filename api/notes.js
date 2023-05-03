const router = require("express").Router();
var notesData = require("../db/notes.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); //npm package for unique id creation//
const uuid = require("../helpers/uuid"); 
const path = require("path");


//TODO:.get route to display note on click event

//If we've made it here, the route must have been /api/notes
//Next Step: load up the json file, send that data back as the response
router.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../db/notes.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data)
      return
    }
  }) //this is our response in json format for the getNotes() fetch req in client/assets/js/index.js
})

router.post("/", (req, res) => {
  console.info(`${req.method} request received to store note`); //receiving
  const { title, text } = req.body
  
  const newNote = {
    title,
    text,
    id: uuid(), 
  }

  let notesArray = []

  notesArray.push(newNote)
  notesData = notesData.concat(notesArray)

  const readAndAppend = (notesData) => {
    fs.readFile(path.resolve(__dirname, "../db/notes.json"), "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        fs.writeFile(path.resolve(__dirname, "../db/notes.json"), JSON.stringify(notesData), (err) =>
        err ? console.error(err) : console.info(`\nData written to database`)
        );  
        return
      }
    })
  }

  readAndAppend(notesData)

  const response = {
    status: "success",
    body: newNote,
  }

  console.log(activeNote)

  res.status(201).json(response);
})

module.exports = router