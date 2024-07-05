const Admin = require('./models/Admin')
const Student = require('./models/Student')
const mongoose =require("mongoose")

const admins = [
  { name: 'Admin1', email: 'admin1@example.com', password: 'admin1pass' },
  { name: 'Admin2', email: 'admin2@example.com', password: 'admin2pass' },
];

const students = [
  { name: 'Student1', email: 'student1@example.com', password: 'student1pass', course: 'Math' },
  { name: 'Student2', email: 'student2@example.com', password: 'student2pass', course: 'Science' },
];

const rawDB = async () => {

  await Admin.insertMany(admins);
  await Student.insertMany(students);

  console.log('Database updated');
};

rawDB().then(() => {

});