import express from 'express';
import User from '../models/userModel.js';
const router = express.Router();


router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, password });
            await user.save();
        }
        res.status(200).json({ user }); 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async(req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (user.password !== password) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        res.json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;