const Histo = require('../model/histo')


class HistoRepository {

    async create(data) {
        try {
            const instance = new Histo(data);
            const created = await instance.save()
            return created
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async update(data, id) {
        try {
            await Histo.findByIdAndUpdate(id, {...data});
            const updated = await Histo.findById(id);
            return updated
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async getOneById(id) {
        try {
            const item = await Histo.findById(id);
            return item;
        } catch (error) {
            console.log('Error  : ', error)
        }
    }



    async getAll() {
        try {
            const list = await Histo.find({});
            return list
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

    async remove(id) {
        try {
            const updated = await Histo.findByIdAndDelete(id);
            return updated
        } catch (error) {
            console.log('Error  : ', error)
        }
    }

}

module.exports = HistoRepository