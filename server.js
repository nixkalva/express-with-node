const express = require('express');
const connectDB = require('./config/db');
const app = express();
//DB connection
connectDB()

//init Body parser
app.use(express.json({extended:false}))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
//app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
//app.use('/api/profile', require('./routes/api/profile'));

app.get('/',(req,res)=>res.send('app is running dev circles app'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`App is running on ${PORT}`))

