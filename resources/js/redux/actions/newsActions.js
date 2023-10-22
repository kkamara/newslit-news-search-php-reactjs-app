
import HttpService from '../../services/HttpService'
import { news, } from '../types'

export const searchNews = (query) => {
  return async dispatch => {
  const http = new HttpService()
        
  dispatch({ type: news.SEARCH_NEWS_PENDING, })

    const tokenId = "user-token"
    const path = 'v1/news/search'
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.postData(path, { query }, tokenId).then(res => {
          resolve(dispatch({
            type: news.SEARCH_NEWS_SUCCESS,
            payload: res.data.data,
          }))                
        }, error => {
          reject(dispatch({ 
            type : news.SEARCH_NEWS_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : news.SEARCH_NEWS_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
