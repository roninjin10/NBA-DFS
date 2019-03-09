import React, { FunctionComponent } from 'react'

interface SearchProps {}

export const Search: FunctionComponent<SearchProps> = () => (
  <div className="search">
    <input type="text" />
  </div>
)
