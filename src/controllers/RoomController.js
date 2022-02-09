const Database = require("../db/config")

module.exports = {

    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = ""
        let exists = true

        while(exists){
            // cria um id aleatorio
            for(var i = 0; i < 6; i++){

                roomId += Math.floor(Math.random() * 10).toString()
            }
            
            // verifica se ja existe o id
            const roomsExistId = await db.all(`SELECT id FROM rooms WHERE id = ${parseInt(roomId)}`)

            if(!roomsExistId[0]){
                //insere a sala no db
                await db.run(`INSERT INTO rooms (
                    id, 
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)

                exists = false
            }   
        }

        await db.close()
        
        res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room_id = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room_id = ${roomId} AND read = 1`)
        let isNoQuestions
        
        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        } 
        
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(req,res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
}