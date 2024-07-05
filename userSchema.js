const mongoose = require('./conn');

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // In a real application, passwords should be hashed
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // In a real application, passwords should be hashed
  course: String,
});

const Admin = mongoose.model('Admin', adminSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Admin, Student };