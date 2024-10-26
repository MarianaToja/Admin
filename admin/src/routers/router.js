const { Router } = require("express");
const AdminController = require("../controllers/adminController");
userRoutes = require("./usuarioRotas");
adminRoutes = require("./adminRotas");

const router = Router();

router.use('/user', userRoutes);

router.use('/admin', adminRoutes);

router.post('/login', (req, res) => {
    AdminController.login(req, res)
});

router.post('/recuperarSenha', (req, res) => {
    AdminController.esqueciSenha(req, res);
});

module.exports = router;