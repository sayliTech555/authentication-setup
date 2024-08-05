const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sayli555:sayli555@cluster0.9tsnrae.mongodb.net/eligere')
.then(()=>console.log("db connected"))
.catch((err)=>console.log("db error"))

