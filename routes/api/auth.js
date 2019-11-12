const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Tests users route
// @access  Public
router.get('/', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
});

// @route   POST api/users/test
// @desc    register users
// @access  Public
router.post('/',[
    check('email','email is required').isEmail(),
    check('password','pw is req').isLength({min:6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { email, password } = req.body;
    console.log(req.body);

    try {
        //See if user exists
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg:"user is invalid"}]})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({errors: [{msg:"user is invalid"}]})
        }
        
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


// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const User = require('../../models/user');

// const bcrypt = require('bcryptjs');
// const config = require('config');
// const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');

// // @route   GET api/auth
// // @desc    Tests users route
// // @access  Public
// router.get('/', auth , async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         res.json(user)
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('server error')
//     }
// });

// // @route   POST api/users/test
// // @desc    register users
// // @access  Public
// router.post('/',[
//     check('email','email is required').isEmail(),
//     check('password','pw is req').isLength({min:6})
// ],
// async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()})
//     }

//     const { email, password } = req.body;
//     console.log(req.body);

//     try {
//         //See if user exists
//         let user = await User.findOne({email});
//         if(!user){
//             return res.status(400).json({errors: [{msg:"user is invalid"}]})
//         }
//         const isMatch = await bcrypt.compare(password, user.password)
//         if(!isMatch){
//             return res.status(400).json({errors: [{msg:"user is invalid"}]})
//         }
        
//         //Return jwt
//         //res.send("User Registered")

//         const payload = {
//             user: {
//                 id: user.id
//             }
//         }
//         jwt.sign(
//             payload,
//             config.get('jwtToken'),
//             {expiresIn: 360000},
//             (err,token)=>{
//                 if(err) throw err;
//                 res.json({token})
//             })
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('server error')
//     }
// });

// module.exports = router; 