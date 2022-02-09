const express = require("express")

const route = express.Router()
const QuestionController = require("./controllers/QuestinController")
const RoomController = require("./controllers/RoomController")

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-room', (req, res) => res.render("index", {page: 'create-room'}))

route.post('/create-room-id', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)

route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index)

module.exports = route