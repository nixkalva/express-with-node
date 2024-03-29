const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongo DB is successfully connected!');
        

    }
    catch(error){
        console.log(error.message);
        //Exit process
        process.exit(1);

    }
}
module.exports = connectDB;