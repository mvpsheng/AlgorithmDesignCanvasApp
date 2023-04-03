import React from "react";

export default function CanvasPage() {
  return(
    <section className="canvasPage">
      <header className="canvasPageHeader">
        <h2>canvas basic info</h2>
      </header>
      <main className="canvasPageMainContent">
        <h2>main content of the canvas</h2>
        <label className="canvasName">CanvasName</label>
        <span className="canvasDesc">Description</span>
        <span className="canvasTag">tag</span>
        <label className="canvasName">CanvasConstraint</label>
        <label className="canvasName">CanvasDSA</label>
        <label className="canvasName">CanvasCode</label>
        <label className="canvasName">CanvasTest</label>
      </main>
      <button>Edit the canvas</button>
    </section>  
  )
}
