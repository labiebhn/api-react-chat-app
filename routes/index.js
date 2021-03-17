const express = require("express");
const router = express.Router();
const Chat = require('../models/index');

router.get('/', (req, res) => {
  Chat.find().then(result => {
    res.status(200).json({
      message: 'Get successed',
      data: result
    })
  }).catch(err => console.log(err));
});

router.post('/', (req, res) => {
  const { name, message } = req.body;
  const { io } = req;

  const Create = new Chat({
    name,
    message
  })

  Create.save().then(create => Chat.find()).then(result => {
    io.sockets.emit("ChatAPI", result);
    res.status(200).json({message: 'success'});
  }).catch(err => console.log(err));
})

let person = [];
router.post('/person', (req, res) => {
  const { name } = req.body;
  const { io } = req;
  if(!person.includes(name)) {
    person.push(name);
  }
  io.sockets.emit("PersonAPI", person);
  res.status(200).json({person});
})

router.delete('/person/:name', (req, res) => {
  const { name } = req.params;
  console.log(name);
  const { io } = req;
  person = person.filter(item => item !== name);
  io.sockets.emit("PersonAPI", person);
  res.status(200).json({person});
})

module.exports = router;