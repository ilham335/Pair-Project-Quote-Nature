// // Endpoint untuk mendapatkan kutipan dari API
// app.get('/', async (req, res) => {
//   try {
//     const quote = await getQuote();
//     // console.log(quote);
//     res.json(quote);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server berjalan pada port 3000");
// });

const express = require('express');
const app = express();
const routes = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: 'whehe',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))
app.use(routes)

app.listen(3000, () => {
  console.log("Server berjalan pada port 3000");
});
