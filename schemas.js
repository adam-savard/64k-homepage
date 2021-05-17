const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/64k');
const htmlDocSchema = new Schema({
    html : String,
    creatorKey : String, //used for modify/delete
    url : String
});
const htmlDoc = mongoose.model('htmlDoc', htmlDocSchema);

module.exports = {
    htmlDoc
}