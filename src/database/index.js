const {connectDB, gfs} = require('./connection')

module.exports = {
    gfs,
    databaseConnection: connectDB,
    CompteRepository: require('./repository/compteRepository'),
    HistoRepository: require('./repository/histoRepository'),
}