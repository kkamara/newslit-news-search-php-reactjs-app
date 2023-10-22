import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { searchNews, } from '../../redux/actions/newsActions'

import "./NewsSearchComponent.scss"

export default function NewsSearchComponent() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
    news: state.news,
  }))

  useEffect(() => {
    if (state.auth.error) {
      localStorage.removeItem('user-token')
      window.location.href = '/user/login'
    }
  }, [state.auth,])

  const onQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(searchNews(query))
  }

  const renderList = () => {
    if (!state.news.data) {
      return null;
    }
    return state.news
      .data
      .results
      .stories
      .map(({ 
        title, 
        author,
        image_url,
        publication_date,
        language,
        source,
        excerpt,
        url
      }, key) => {
        return <li 
          className="list-group-item"
        >
          <a 
            href={url} 
            target="_blank" 
            className="btn btn-lg btn-link"
          >
            {title}
          </a>
        </li>
      })
  }

  if (!state.auth.loading && typeof state.auth.data === 'object' && null !== state.auth.data) {
    console.log('authenticated', state.auth.data)
  }
  if (state.auth.loading || state.news.loading) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <div className='container news-search-container'>
        <br />
        <br />
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form className="form" onSubmit={onSubmit}>
              {state.news.error ? 
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  {state.news.error.response.data.errors.query[0] ||
                    state.news.error.message || 
                    state.news.error}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              : null}
              <div className="form-group">
                <label htmlFor="query">Query</label>
                <input 
                  type="text"
                  name="query"
                  id="query"
                  placeholder="Search News..."
                  value={query}
                  onChange={onQueryChange}
                  className="form-control"
                />
              </div>
              <input 
                type="submit" 
                value="Search"
                id="submit"
                className="btn btn-lg btn-success"
              />
            </form>
          </div>
        </div>
        {renderList()}
      </div>
    </>       
  )
}
