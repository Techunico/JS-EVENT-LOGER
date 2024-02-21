import mongoose from 'mongoose';

const connect = await mongoose.connect('mongodb://127.0.0.1/my_database');

console.log(connect)