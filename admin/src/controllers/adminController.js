const adminService = require("../services/adminService");
const jwt = require("jsonwebtoken");

const AdminController = {
    create: async (req, res) => {
        try {
            const adminCriado = await adminService.create(req.body);
            return res.status(200).json({ msg: "Admin criado com sucesso!", admin: adminCriado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const adminAtualizado = await adminService.update(id, req.body);

            if (!adminAtualizado) {
                return res.status(404).json({ msg: "Admin não encontrado" });
            }

            return res.status(200).json({ msg: "Admin atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    getOne: async (req, res) => {
        try {
            const admin = await adminService.getById(req.params.id);
            if (!admin) {
                return res.status(404).json({ msg: "Admin não encontrado" });
            }
            return res.status(200).json({ msg: "Usuário encontrado com sucesso!", admin });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    getAll: async (req, res) => {
        try {
            const admins = await adminService.getAll();
            return res.status(200).json({ msg: "Usuários encontrados!", admins });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    delete: async (req, res) => {
        try {
            const adminDeletado = await adminService.delete(req.params.id);
            if (!adminDeletado) {
                return res.status(404).json({ msg: "Admin não encontrado" });
            }
            return res.status(200).json({ msg: "Usuário deletado com sucesso!", admin: adminDeletado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const admin = await adminService.login(email, senha);

            if (!admin) {
                return res.status(400).json({ msg: "Email ou senha incorretos" });
            }

            const token = jwt.sign(
                { email: admin.email, nome: admin.nome },
                process.env.SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ msg: "Login realizado!", token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    esqueciSenha: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const admin = await adminService.resetPassword(email, senha);

            if (!admin) {
                return res.status(404).json({ msg: "Email não encontrado" });
            }

            return res.status(200).json({ msg: "Nova senha gerada com sucesso!", senha });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },
};

module.exports = AdminController;
