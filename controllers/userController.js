const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashResult) => {
                const newUser = new User({
                    email : req.body.email,
                    password: hashResult
                })
            newUser.save()
                .then(() => res.status(201).json({ message: 'Nouvel user a été crée'}))
                .catch((error) => res.status(404).json({ error }));
        }).catch((error) => res.status(500).json({ error }));

}
exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(!user){
            return res.status(404).json({ message: 'User n\est pas trouvé'})
        }else{
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                if(!valid){
                    return res.status(404).json({  message: 'Le mot de passe n\'est pas correct' })
                }else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_SECRET_TOKEN',
                            { expiresIn: '24h'}
                        )
                    })
                }
                })
                .catch((error) => res.status(500).json({ error }))
        }
        }).catch((error) => res.status(500).json({ error }))
}