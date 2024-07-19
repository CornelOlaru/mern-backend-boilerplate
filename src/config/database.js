require('dotenv').config(); // Asigura-te că variabilele de mediu sunt încărcate la început

const mongoose = require('mongoose');

// Suprimă avertizarea deprecației strictQuery
mongoose.set('strictQuery', true);

const dbURL = process.env.DB_URL;
console.log('DB_URL:', dbURL); // Verifică dacă DB_URL este definită

if (!dbURL) {
  console.error('DB_URL not defined in environment variables');
  process.exit(1);
}

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.error('Connection error:', error);
  process.exit(1);
});

database.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = database;
