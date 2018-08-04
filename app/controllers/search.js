var express = require('express');
var searchRouter = express.Router();
var mongoose = require('mongoose');
var searchModel = mongoose.model('Search');
var verify = require('./../../middlewares/verify.js');

module.exports.controller = function(app){

	//route to save test
	searchRouter.post('/save', verify, function(req, res){
		var newSearch = new searchModel();
		newSearch.keyword = req.body.keyword;
		newSearch.no_of_results = req.body.no_of_results;
		newSearch.user = req.decoded._id;
		newSearch.save(function(err, search) {
			if (err) {
				return res.status(400).send({
					message: err
				});
			} else {
				return res.json(search);
			}
		});
	});
	
	searchRouter.get('/fetch', verify, function(req, res){
		searchModel.find({user:req.decoded._id}).sort({'date': -1}).limit(5).exec(function(err, result){
			if (err) {
				return res.status(400).send({
					message: err
				});
			} else {
				return res.json(result);
			}
		})
	});

	app.use('/search', searchRouter);

}
