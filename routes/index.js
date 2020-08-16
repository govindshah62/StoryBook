const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest }=require('../middleware/auth');
const Story = require('../models/Story');

router.get('/',ensureGuest ,(req,res)=>{
    res.render('login',{
        layout:'login',
    });
});

router.get('/dashboard',ensureAuth, async(req,res)=>{
    try {
        const stories = await Story.find({user:req.user.id}).lean();
        let name=req.user.lastName;
        if(name=='Yogesh'){
            name='Taliban';
        }  
        if(name=='Kiran'){
            name='Kiran Aunty';
        } 
        if(name=='Karan'){
            name='Lalludi';
        }
        if(name=='Mitesh'){
            name='Mallu Rand';
        }
        res.render('dashboard',{
            name,
            stories
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
});


module.exports = router;
