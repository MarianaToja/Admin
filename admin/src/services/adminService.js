const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

const adminService = {
    create: async (admin) => {
        try {
            admin.senha = await bcrypt.hash(admin.senha, 10);
            return await Admin.create(admin);
        } catch (error) {
            throw new Error('Erro ao criar admin');
        }
    },

    update: async (id, adminToUpdate) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) return null;

            if (adminToUpdate.senha) {
                adminToUpdate.senha = await bcrypt.hash(adminToUpdate.senha, 10);
            }

            await admin.update(adminToUpdate);
            return admin;
        } catch (error) {
            throw new Error('Erro ao atualizar admin');
        }
    },

    getById: async (id) => {
        try {
            return await Admin.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao buscar admin');
        }
    },

    getAll: async () => {
        try {
            return await Admin.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar admins');
        }
    },

    delete: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) return null;

            await admin.destroy();
            return admin;
        } catch (error) {
            throw new Error('Erro ao deletar admin');
        }
    },

    login: async (email, senha) => {
        try {
            const admin = await Admin.findOne({ where: { email } });
            if (!admin || !(await bcrypt.compare(senha, admin.senha))) return null;

            return admin;
        } catch (error) {
            throw new Error('Erro ao fazer login');
        }
    },

    resetPassword: async (email, senha) => {
        try {
            const admin = await Admin.findOne({ where: { email } });
            if (!admin) return null;

            admin.senha = await bcrypt.hash(senha, 10);
            await admin.save();
            return admin;
        } catch (error) {
            throw new Error('Erro ao redefinir senha');
        }
    },
};

module.exports = adminService;
