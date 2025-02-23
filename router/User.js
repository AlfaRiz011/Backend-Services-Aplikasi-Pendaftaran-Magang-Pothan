const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController'); 
const { uploadSingle } = require('../middlewares/uploadMiddlewares');

router.get('/:userId', UserController.getUser);

router.post('/upload/:userId', uploadSingle, UserController.upload);

router.post('/apply/:userId', UserController.applyJob);

module.exports = router; 