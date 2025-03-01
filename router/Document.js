const express = require('express');
const router = express.Router();
const DocumentController = require('../controller/DocumentController');

router.get('/:userId', DocumentController.getUserDokum); //GenericResponse<List<Document>>

router.get('/', DocumentController.getAllDokum);

router.get('/dokum/:dokumId', DocumentController.getVerifDokum); //GenericResponse<Document>

router.put('/verif/dokum/:dokumId', DocumentController.verifDokum); //GenericResponse<Document>

router.put('/tolak/dokum/:dokumId', DocumentController.tolakDokum); //GenericResponse<Document>

module.exports = router; 