const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const compteSchema = new Schema(
  {
    acc_solde_histo: {type: Number, required: true, default: 0}, 
    acc_number: {type: String, required: true,  required: true}, 
    acc_balance: {type: Number, required: true, default: 0}, 
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


module.exports = mongoose.model("compte", compteSchema);

