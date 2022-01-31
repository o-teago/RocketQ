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
    }
}