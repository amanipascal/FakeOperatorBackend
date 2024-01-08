
const { CompteRepository, HistoRepository } = require('../database')

module.exports = (app) => {

    const compteRepo = new CompteRepository()
    const histoRepo = new HistoRepository()

    app.post('/account/create', async (req, res) =>{
        try {
            const { acc_number } = req.body;
            const {data}  =  await compteRepo.create({acc_number})
            return res.status(200).json(data);
        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    })

    app.get('/account/all', async (req, res) => {
        try {
            const list = await compteRepo.getAll()
            return res.status(200).json(list);
        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    })

    app.get('/account/:acc_number', async (req, res) =>{
        try {
            const { acc_number } = req.params
            const {data} = await compteRepo.getByAccountNumber(acc_number)
            return res.status(200).json(data);
        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    })

    

    app.put('/account/crediter/:acc_number', async (req, res) =>{
        try {
            const { acc_number } = req.params
            const { amount } = req.body
            const { data: old_data } =  await compteRepo.getByAccountNumber(acc_number)
            const old_objet = old_data.toJSON();
            const new_obj = { ...old_objet, acc_balance: old_objet.acc_balance + amount }
            const { data: new_data } = await compteRepo.update(new_obj, old_data._id)
            await histoRepo.create({lib: 'rechargement', compte: new_data.acc_number, mvt: 'C', montant: amount});
            return res.status(200).json(new_data);
        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    })


    app.post('/account/transfert', async (req, res) =>{
        try {
            const {amount, acc_payer, acc_payee} = req.body;
            const { data: payer } =  await compteRepo.getByAccountNumber(acc_payer)

            const new_payer_obj = { ...payer.toJSON(), acc_balance: payer.toJSON().acc_balance - amount }
            const { data: new_payer } = await compteRepo.update(new_payer_obj, payer._id)
            await histoRepo.create({lib: 'debit compte payeur', compte: new_payer.acc_number, mvt: 'D', montant: amount});

            const { data: payee } =  await compteRepo.getByAccountNumber(acc_payee)
            const new_payee_obj = { ...payee.toJSON(), acc_balance: payee.toJSON().acc_balance + amount }
            const { data: new_payee } = await compteRepo.update(new_payee_obj, payee._id)
            await histoRepo.create({lib: 'credit du compte beneficiare', compte: new_payee.acc_number, mvt: 'C', montant: amount});
            return res.status(200).json({new_payer, new_payee});  
        } catch (error) {
            return res.status(401).json({error: error.message});
        }
    })
   


}