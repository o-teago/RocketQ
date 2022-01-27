const express = require("express")

const route = express.Router()
const QuestionController = require("./controllers/QuestinController")
const RoomController = require("./controllers/RoomController")

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-room', (req, res) => res.render("index", {page: 'create-room'}))
route.get('/room/:room', (req, res) => res.render("room"))

route.post('/question/:room/:question/:action', QuestionController.index)
route.post('/create-room-id', RoomController.create)

module.exports = route