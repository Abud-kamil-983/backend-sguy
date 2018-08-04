var express = require('express');
var userRouter = express.Router();
var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
//library to send mail
var fireMail = require('./../../libs/mail.js');
module.exports.controller = function(app){

	//route to save signup data
	userRouter.post('/register', function(req, res){
		var newUser = new userModel(req.body);
		newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
		newUser.save(function(err, user) {
			if (err) {
				return res.status(400).send({
					message: err
				});
			} else {
				return res.json(user);
			}
		});
	});

	// route to perform login operation

	userRouter.post('/login', function(req, res){
		userModel.findOne({'email':req.body.email, 'isAdmin':false}, function(err, user){
			if (err) throw err;
			if (!user) {
				res.status(401).json({ message: 'Authentication failed. User not found.' });
			} else if (user) {
				if (!user.comparePassword(req.body.password)) {
					res.status(401).json({ message: 'Authentication failed. Wrong password.' });
				} else {
					return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'mysecret', {expiresIn : 86400}), fullName:user.fullName});
				}
			}
		});
	});

	app.use('/users', userRouter);

}
