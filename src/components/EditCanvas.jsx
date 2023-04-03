import React from "react";

export default function EditCanvas() {
  return(
    <section className="editCanvas">
      <label for="canvasName">CanvasName</label>
      <input name="canvasName" id="canvasName" type="text" />
      <label for="canvasDescription">CanvasDescription</label>
      <input name="canvasDescription" id="canvasDescription" type="text" />
      <label for="canvasConstraint">CanvasConstraint</label>
      <input name="canvasConstraint" id="canvasConstraint" type="text" />
      <label for="canvasDSA">CanvasDSA</label>
      <input name="canvasDSA" id="canvasDSA" type="text" />
      <label for="canvasCode">CanvasCode</label>
      <textarea name="canvasCode" className="markdown-input" id="canvasCode" placeholder="Enter markdown here"></textarea>
      <label for="canvasTest">CanvasTest</label>
      <input name="canvasTest" id="canvasTest" type="text" />
      <button className="createCanvas">Submit</button>
    </section>
  )
}