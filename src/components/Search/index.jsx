import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

import './search.css'
 
const Search = () => {
  return (
    <div className="search">
        <SearchIcon className="search_icon"/>
        <input className="search_field" type="text" placeholder="Search..."/>
    </div>
  )
}
 
export default Search