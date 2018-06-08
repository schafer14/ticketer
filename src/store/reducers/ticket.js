const INIT_STATE = {
  tickets: {}
}

function ticketReducer(state=INIT_STATE, action) {
  switch(action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: {
          ...state.tickets,
          [action.id]: action.payload,
        }
      }
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: {
          ...state.tickets,
          [action.id]: action.payload,
        }
      }
    default:
      return state;
  }
}


module.exports = ticketReducer;
