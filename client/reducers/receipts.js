import {
  ADD_RECEIPT,
  DELETE_RECEIPT,
  RECEIPTS_ERROR,
  RECEIVE_RECEIPTS,
  REQUEST_RECEIPTS,
  UPDATE_RECEIPT,
} from '../actions/receipts'

const initialState = {
  data: [],
  // loading: false,
  errorMessage: null,
}

const receiptsReducer = (state = initialState, action) => {
  const { type, payload, errorMessage } = action
  switch (type) {
    case REQUEST_RECEIPTS:
      return {
        ...state,
        // loading: true,
      }
    case RECEIVE_RECEIPTS:
    case ADD_RECEIPT:
    case UPDATE_RECEIPT:
    case DELETE_RECEIPT:
      return {
        ...state,
        data: payload,
        // loading: false,
      }
    case RECEIPTS_ERROR:
      return {
        ...state,
        // loading: false,
        errorMessage: errorMessage,
      }
    default:
      return state
  }
}

export default receiptsReducer
