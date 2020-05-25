const express = require('express')
const conectarDB = require('./config/database')
const cors = require('cors')
const app = express ()

conectarDB()

// cors
app.use(cors())

app.use(express.json({extended:true}))

const PORT = process.env.PORT || 4000 

/*app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
 
    next();

})*/

//RUTAS
app.use('/api/auth',require('./routes/auth'))
app.use('/api/teams',require('./routes/teams'))
//app.use('/api/users',require('./routes/users'))
app.use('/api/players',require('./routes/players'))
app.use('/api/organizers',require('./routes/organizers'))
app.use('/api/tournaments',require('./routes/tournaments'))

app.listen(PORT,()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})

