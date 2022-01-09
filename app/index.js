// Importing express module
const express = require("express")

// Importing express-session module
const session = require("express-session")

// Importing file-store module
const filestore = require("session-file-store")(session)

const path = require("path")

// Setting up the server
var app = express()

// Server setup
app.listen(3000, () => {
	console.log("Server is Starting")
})