const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.io = io;
  next();
})
app.use(index);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



// CONNECT DATABASE MONGODB
mongoose.connect('mongodb+srv://labiebhn:OWlUbRjZLjMlutjc@cluster0.8wb86.mongodb.net/chat-app?retryWrites=true&w=majority')
.then(() => {
  const port = process.env.PORT || 4001;
  server.listen(port, () => console.log(`Listening on port ${port}`));
})
.catch(err => console.log(err));