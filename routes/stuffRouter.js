const express = require('express');
const stuffRouter = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const stuffCtrl = require('../controllers/stuffController');

stuffRouter.post('/', auth, multer, stuffCtrl.createThing);

stuffRouter.get('/:id', auth, stuffCtrl.getOneThing);

stuffRouter.delete('/:id', auth, multer, stuffCtrl.deleteThing);

stuffRouter.put('/:id', auth, multer, stuffCtrl.modifyThing);

stuffRouter.get('/', auth, stuffCtrl.getAllThings);

module.exports = stuffRouter;