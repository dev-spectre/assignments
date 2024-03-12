const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://spectre:jp7WwBISLdpMuGRQ@spectre.qmv29oc.mongodb.net/todo?retryWrites=true&w=majority");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = {
  Todo
};