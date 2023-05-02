//Table of Contents
const router = require("express").Router();

const notes = require("./notes");

router.use("/notes", notes); //redirect all api traffic that is /api/notes to notes file



module.exports = router