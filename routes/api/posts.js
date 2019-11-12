// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// // Load Profile Model
// const Profile = require('../../models/post');
// // Load User Model
// const User = require('../../models/user');

// router.get('/',async (res, req) => {
//     try {
//         const post = await Post.findOne({user: req.user.id}).populate("user",['name','email','blog']);
//         if(!post){
//             return res.status(400).json({msg: "There is no post for this user"})
//         }
//         res.json(profile)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server error')
//     }

//     router.post('/',[auth,[
//         check('name','name is required').not().isEmpty(),
//         check('email','email required').not().isEmpty()
//     ]],
//     async (req,res) => {
//         const errors= validationResult(req);
//         if(!errors.isEmpty()){
//             return res.status(400).json({errors:errors.array()})
//         }
//         const {
//            'blog'
            
//         } = req.body;
//         const blogPost = {};
        
        
//         if(blog){
//             blogPost
//         }
        
//         console.log(blogPost);
//         res.send('hello')
//     })
    
// module.exports = router;
