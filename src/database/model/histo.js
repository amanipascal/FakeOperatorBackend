const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const histoSchema = new Schema(
  {
    lib: {type: String},
    compte: {type: String, required: true},
    mvt: {type: String, required: true}, // mouvement (credit / debit)
    montant: {type: Number, default:0},
  },
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v;
      }
    },
    timestamps: true
  }
);


module.exports = mongoose.model("histo", histoSchema);
