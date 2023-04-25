 const mongoose = require('mongoose');
 const { Schema } = mongoose;

 const materialSchema = new Schema({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    color: { type: String, required: true },
    volume: { type: Number, required: true },
    date:{type:String}
 });

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;