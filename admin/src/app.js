require('dotenv').config(); // Arquivo => .env
const express = require('express');
const { sequelize } = require('./models');
const routes = require('./routers/router')

const app = express(); //Iniciando servidor

app.use(express.json());

/**
 * Criar -> POST /api/user/ -- {objeto}
 * Buscar -> GET /api/user/
 * Buscar unico -> GET /api/user/3322133
 * Deletar -> DELETE /api/user/4324322
 * Atualizar -> PUT /api/user/3213 -- {objeto}
 */
app.use('/api', routes);

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados deu certo");
    })
    .catch(err => {
        console.error("Error ao conectar no banco: ", err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // Listen -> Ouvir
    // Ouvindo na possível ou na porta 3000;
    console.log('-------------------------');
    console.log('Running on http://${PORT}');
    console.log('-------------------------');
});