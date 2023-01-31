import express from "express";
import routes from './routes'
import dotenv from "dotenv";
import db from 'db'

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3001
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.use('/api', routes)

app.listen(PORT, async () => {
    console.log(`app running  on port ${PORT}`)
    await db.runMigrations();
    
  })
  