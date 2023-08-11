export const initialBacktrackMsgState = {
  backtrackMsgIndex: -1,
  backtrackMsgStatus: false
};

export function backtrackMsgReducer(state, action) {
  switch (action.type) {
    case "update_status": {
      return {
        ...state,
        backtrackMsgStatus: action.status,
      };
    }
    case "update_index": {
      return {
        ...state,
        backtrackMsgIndex: action.index,
      };
    }
    case "reset" : {
      return initialBacktrackMsgState
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
