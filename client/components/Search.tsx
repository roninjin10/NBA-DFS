import React, { FunctionComponent } from "react";

interface SearchProps { }

export const Search: FunctionComponent<SearchProps> = () => {
  return (
    <div className="search">
      <input type="text" />
    </div>
  )
}
