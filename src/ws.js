const { store, observeStore } = require('./store');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');



function handler(wss) {
  wss.on('connection', handleConnection);
}

function handleConnection(socket) {
  console.log('I got a connection');

  socket.on('message', handleMessage.bind({socket}));
}

function handleMessage(rawMessage) {
  let message;
  try {
    message = JSON.parse(rawMessage);
  } catch (e) {
    return this.socket.send('Messages must be valid JSON');
  }

  if (!message.type) {
    return this.socket.send("Messages must have valid type");
  }

  switch (message.type) {
    case 'ADD_TICKET':
      let id = uuidv1();
      store.dispatch({ type: 'ADD_TICKET', payload: message.payload, id: id })

      observeStore(store, () => {
        return store.getState().tickets[id];
      }, () => {
        this.socket.send(JSON.stringify({ id: id, data: store.getState().tickets[id] }));
      })
    break;
    case 'UPDATE_TICKET':
      store.dispatch({ type: 'UPDATE_TICKET', payload: message.payload, id: message.id })
    break;
    case 'STORE':
      console.log(store.getState());
    break;
  }

}




module.exports = handler;
