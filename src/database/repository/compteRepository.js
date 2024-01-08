const Compte = require('../model/compte')


class CompteRepository {

    async create(data) {
        try {
            const instance = new Compte(data);
            const created = await instance.save()
            return {data: created}
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async update(data, id) {
        try {
            await Compte.findByIdAndUpdate(id, {...data});
            const updated = await Compte.findById(id);
            return {data: updated}
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async getOneById(id) {
        try {
            const item = await Compte.findById(id);
            return item;
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async getByAccountNumber(acc) {
        try {
            const item = await Compte.findOne({acc_number: acc});
            return {data: item};
        } catch (error) {
            console.log('Error  : ', error)
        }
    }



    async getAll() {
        try {
            const list = await Compte.find({});
            return list
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async remove(id) {
        try {
            const updated = await Compte.findByIdAndDelete(id);
            return updated
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

}

module.exports = CompteRepository