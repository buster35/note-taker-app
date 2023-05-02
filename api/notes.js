const router = require("express").Router();
// const notesData = require("../db/notes.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); //npm package for unique id creation//
const uuid = require("../helpers/uuid"); 
const path = require("path");

//TODO:find a way to display data in notes.json to notes.html
//TODO:find a way to add to notes.json without overwriting

//If we've made it here, the route must have been /api/notes
//Next Step: load up the json file, send that data back as the response
router.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../db/notes.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json({
        //index.js is firing, just need to find a way to pass in the correct information//
      })
      return
    }
  }) //this is our response in json format for the getNotes() fetch req in client/assets/js/index.js
})

router.post("/", (req, res) => {
  console.info(`${req.method} request received to store note`);
  const { title, text } = req.body
  const newNote = {
    title,
    text,
    notes_id: uuid(), 
  }
  const noteString = JSON.stringify(newNote);

  fs.writeToFile("../db/notes.json", noteString, (err) =>
    err ? console.error(err) : console.log(`"${newNote.title}" note has been written to JSON database`)
  );

  const response = {
    status: "success",
    body: newNote,
  }
  console.log(response)
  res.status(201).json(response);
})


module.exports = router