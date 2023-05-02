const express = require("express");
const fs = require("fs");
const path = require("path");
const api = require("./api");

const PORT = process.env.PORT || 3001;

//Application state ->
const db = require("./db/notes.json")

const app = express();

//Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("client"));

app.use("/api", api); //redirect api-related queries

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/notes.html"))
});

//Homepage route that points to index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/index.html"))
);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
)