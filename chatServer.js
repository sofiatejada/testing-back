const server = require('./server');
const socket = require('socket.io');
const { get_Current_User, user_Disconnect, join_User } = require('./dummyuser');

const io = socket(server);

// initializing the socket io connection
io.on('connection', (socket) => {
  // create user
  const p_user = join_User(socket.id, username, roomname);
  console.log(socket.id, '=id');
  socket.join(p_user.room);

  // display a welcome message to the user that has joined a room
  socket.emit('message', {
    userId: p_user.id,
    username: p_user.username,
    text: `Welcome ${p_user.username}`,
  });

  // displays a joined room message to all others in room except new user
  socket.broadcast.to(p_user.room).emit('message', {
    userId: p_user.id,
    username: p_user.username,
    text: `${p_user.username} has joined the chat`,
  });
});

// user sends message
socket.on('chat', (text) => {
  const p_user = get_Current_User(socket.id);

  io.to(p_user.room).emit('message', {
    userId: p_user.id,
    username: p_user.username,
    text: text,
  });
});
