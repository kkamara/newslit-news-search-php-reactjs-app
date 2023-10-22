import { news, } from '../types'

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function newsReducer (state = initState, action) {
  switch (action.type) {
    
    case news.SEARCH_NEWS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case news.SEARCH_NEWS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case news.SEARCH_NEWS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
