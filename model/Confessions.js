var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var confesionSchema = new Schema({
	content: String,
	forgive: Number,
	condemn: Number,
	created: {type: Date, default: Date.now }
});

mongoose.model('confession', confesionSchema);