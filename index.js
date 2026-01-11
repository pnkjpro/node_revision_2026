const express = require('express');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// app.get('/user/info', (req, res) => {
    //     return res.status(200).json({ name: "Pankaj Pandey"})
// })
    
app.use('/user',userRoutes);
    
const PORT = 3000
app.listen(PORT, () => {
    console.log("server running on port 3000");
})