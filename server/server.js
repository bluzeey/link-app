const express = require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser')
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({origin : process.env.CLIENT_URL}))

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('Database connected')
}).catch((err)=>{
    console.log(err)
})

// import routes
const authRoutes = require('./routes/auth');

// middlewares
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
