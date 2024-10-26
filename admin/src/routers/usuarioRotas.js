const { Router } = require("express");
const userController = require('../controllers/userController')
const router = Router();
const { validateUser, validateUserId } = require("../middlewares/validateUser")

//Função de criar
router.post('/', validateUser, userController.create);

//Funçãon de editar
router.put('/:id', validateUser, validateUserId, userController.update ); //Parametro id

//Função de deletar
router.delete('/:id', validateUserId, userController.delete ); //Parametro id

//Função buscar único
router.get('/:id', validateUserId,  userController.getOne ); //Parametro id

router.get('/', userController.getALL ); //Função buscar todos

// Clean code -> MongoDB -> TypeScript -> Tests...

module.exports = router;

