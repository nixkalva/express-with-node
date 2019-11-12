const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// Load Profile Model
const Profile = require('../../models/profile');
// Load User Model
const User = require('../../models/user');

// @route   GET api/Profile/me
// @desc    Tests users route
// @access  Public
router.get('/me',auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user",['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: "There is no profile for this user"})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
});

// @route   POST api/Profile
// @desc    Profile create, update, delete
// @access  Public
router.post('/',[auth,[
    check('status','status is required').not().isEmpty(),
    check('skills','skills required').not().isEmpty()
]],
async (req,res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;
    const profileFields = {};
    
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    console.log(skills);
    console.log(profileFields);
    res.send('hello')
})

module.exports = router; 