 const validateUser = (req, res, next) => {
     const { nome, email } = req.body;

     if (!nome || typeof nome !== 'string') {
        // 400 -> Bad request
        return res.status(400).json({ msg: 'Campos inválidos'});
     }

     if (!email || typeof email !== 'string') {
        return res.status(400).json({ msg: 'Campos inválidos'})
     }

     // ! -> Diferente
     // arthur email
     if(!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({ msg: 'Campo inválido'})
     }

     //Retornar o next, para prosseguir na função
     next();
 }

 const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if(!id || typeof id !== 'string') {
        return res.status(400).json({ msg: 'Parametro ID inválido'});
    }

    next();
 }

module.exports = { validateUser, validateUserId};