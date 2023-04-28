import './App.css'
import { useState, useEffect } from 'react';
import AddCanvasPage from "./components/AddCanvasPage";
import Tags from "./components/Tags";
import { ChakraProvider, Input, Button, ButtonGroup } from '@chakra-ui/react'
import CanvasList from './components/CanvasList';

export default function App() {
  const [showAddCanvasForm, setshowAddCanvasForm] = useState(false)
  const [canvasList, setCanvasList] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/canvas')
      .then(response => response.json())
      .then(data => {
        setCanvasList(data)
        setSelectedCanvasList(data)
      } )
      .catch(error => console.error(error));
  }, []);

  const [selectedCanvasList, setSelectedCanvasList] = useState(canvasList)
  const [selectedTags, setSelectedTags] = useState([])

  const [searchValue, setSearchValue] = useState('')

  const toggleComponent = () => {
    setshowAddCanvasForm(!showAddCanvasForm)
  }

  function handleSearch(event) {
    if (event.key === "Enter") {
      console.log("Search for:", searchValue);
      // Perform search here
      const searchTerms = searchValue.split(" ");

    const filteredObjects = canvasList.filter(obj =>
      Object.values(obj).some(val =>
        val.toLowerCase().includes(searchTerms.toLowerCase())
      )
    );
 
      console.log("Filtered data:", filteredData);
    } else {
      console.log('search button works');
    }
  }
  useEffect(() => {
    console.log(selectedTags);
    setSelectedCanvasList(canvasList.filter((t) => selectedTags.every((selectedTag) => t.tags.includes(selectedTag))))
  }, [selectedTags]);

  function handleCloseAddForm() {
    setshowAddCanvasForm(false)
  }

  function selectByTags(tag) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    
  }

  const uniqueTags = [...new Set(canvasList.flatMap(obj => obj.tags.split(",")))]
  return (
    <ChakraProvider>
      <main className="homePage">
        <div className="header">
          <label className="icon">AlgorithmDesignCanvas</label>
          <div className="searchArea">
            <Input placeholder='search here' value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={handleSearch}
            size='md' />
            <Button colorScheme='blue' onClick={handleSearch} >search</Button>
          </div>
          <Button colorScheme='blue' onClick={toggleComponent}>add Canvas</Button>
        </div>
        <div className="mainContent">
          <Tags tags={uniqueTags} onTagClick={selectByTags}></Tags>
          <div>
            Selected Tags:
            <Tags tags={selectedTags} onTagClick={selectByTags}></Tags>
          </div>
          {showAddCanvasForm ? <AddCanvasPage cancelAdd={handleCloseAddForm} /> : <CanvasList canvasList = {selectedCanvasList} />}
        </div>
      </main>
    </ChakraProvider>
  )
}
