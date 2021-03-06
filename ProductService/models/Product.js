const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3, maxlength: 100 },
    description: { type: String, required: true, minlength: 5, maxlength: 1000 },
    price: { type: Currency, required: true, min: 100, max: 2000000 }
});

ProductSchema.methods.toDisplay = function() {    
    return {
        name: this.name,
        description: this.description,
        price: (this.price / 100).toFixed(2),
    };
};

module.exports = mongoose.model('Product', ProductSchema);