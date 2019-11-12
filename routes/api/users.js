const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', [
    check('name', "name is required").not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', "Min length 6 chars").isLength({min:6})

], 
async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({msg: errors.array()})
    }
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        //See if user exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors: [{msg:"user already exists"}]})
        }
        //Get Users gravatar
        const avatar = gravatar.url(email,{
            s: "200",
            r: "pg",
            d: "mm"

        })
        user = new User({
            name,
            email,
            avatar,
            password
        })
        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save();
        //Return jwt
        //res.send("User Registered")

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtToken'),
            {expiresIn: 360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token})
            })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
});

module.exports = router; 
