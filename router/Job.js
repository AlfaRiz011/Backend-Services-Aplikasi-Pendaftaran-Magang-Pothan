const express = require('express');
const router = express.Router();
const JobController = require('../controller/JobController');

router.get('/', JobController.getAllJob); 

router.get('/regis/:userId', JobController.getRegisJob); 

router.get('/admin', JobController.getJobFull); 

router.get('/regis/verif/:regisId', JobController.getVerifRegis); 

router.post('/make', JobController.makeJob) 

router.put('/verif/regis/:regisId', JobController.verifRegis); 

router.put('/tolak/regis/:regisId', JobController.tolakRegis); 

module.exports = router; 