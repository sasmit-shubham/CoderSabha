require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const DbConnect = require('./database')
const PORT = process.env.PORT || 5500;
const cors = require('cors');
const cookieParser = require('cookie-parser');

DbConnect();
const router = require('./routes');
app.use(express.json({limit:'8mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
const corsoption = {
    credentials:true,
    origin: ['http://localhost:3000']
}
app.use(cors(corsoption));
app.use(router);
app.get('/',(req,res) =>{
    res.send("hello from the express js");
});
app.listen(PORT,()=>console.log(`Server is starting at ${PORT}`));
