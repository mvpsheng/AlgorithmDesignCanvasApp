import './App.css'

import Header from "./components/Header";
import Canvas from "./components/Canvas";
import CanvasList from "./components/CanvasList";
import CanvasPage from "./components/CanvasPage";
import EditCanvas from "./components/EditCanvas";
import Tags from "./components/Tags";
export default function App() {
  return (
    <main className="canvasPage">
      <Header />
      <div className="mainContent">
{/*         <CanvasList />
        <Tags /> */}
        <CanvasPage />
      </div>
    </main>
  )
}
