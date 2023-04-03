import React from "react";

export default function Header() {
  return (
    <section className="header">
      <label className="icon">AlgorithmDesignCanvas</label>
      <div>
        <input value="search Here"></input>
        <button className="searchBtn">search</button>
      </div>
      <button className="addCanvasBtn">add Canvas</button>
    </section>
  )
}