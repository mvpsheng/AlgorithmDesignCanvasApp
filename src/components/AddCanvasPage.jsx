import React, { useState, useRef } from "react";
import {
  Textarea, Input, InputGroup, InputLeftAddon, Tag,
  TagLabel,
  TagCloseButton,
  Button, ButtonGroup, Flex, Center
} from '@chakra-ui/react'


export default function CanvasPage({cancelAdd}) {

  const [canvasTags, setCanvasTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const inputRef = useRef(null);

  const handleDelete = (index) => {
    const newTags = [...canvasTags];
    newTags.splice(index, 1);
    setCanvasTags(newTags);
  };

  const handleNewTagInputChange = (event) => {
    setNewTagInput(event.target.value);
  };

  const handleNewTagInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newTagInput) {
        const newTags = [...canvasTags, newTagInput];
        setCanvasTags(newTags);
      }
      setNewTagInput('');
      setShowNewTagInput(false);
    }
  };

  const handleAddNewTagClick = () => {
    setShowNewTagInput(true);
    const inputRef = useRef(null);
    inputRef.current.focus();
  };

  function handleCancle() {
    cancelAdd()
  }

  function handleSubmit(event) {
    console.log('提交添加请求');
    const name = document.querySelector('#canvasName').value;
    const description = document.querySelector('#description').value;
    const constraints = document.querySelector('#constraint').value;
    const dsa = document.querySelector('#dsa').value;
    const complexity = document.querySelector('#complexity').value;
    const code = document.querySelector('#code').value;
    const test = document.querySelector('#test').value;
    const tags = canvasTags.join();
    const data = {
      name,
      description,
      constraints,
      dsa,
      complexity,
      code,
      test,
      tags
    };
    fetch('http://localhost:8080/canvas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
        event.preventDefault();
        // ...submit form data
        event.target.reset(); // clear all input fields
  }

  return (
    <section className="canvasPage">
      <div className="canvasTitleBar">
        <InputGroup>
          <InputLeftAddon children='CanvasName' />
          <Input type='text' placeholder='Canvas Name' id='canvasName'  />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='Description' />
          <Textarea type='text' placeholder='Description' id='description'  />
        </InputGroup>
        <div style={{ display: Flex, justifyContent: Center }}>
          <div>
            {canvasTags.map((tag, index) => (
              <Tag
                key={index}
                size='lg'
                borderRadius='full'
                variant='solid'
                colorScheme='green'
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleDelete(index)} />
              </Tag>
            ))}
            {showNewTagInput ? (
              <Input
                value={newTagInput}
                onChange={handleNewTagInputChange}
                onKeyDown={handleNewTagInputKeyDown}
                style={{ width: '150px' }}
                ref={inputRef}
              />
            ) : (
              <Button onClick={handleAddNewTagClick}>Add New Tag</Button>
            )}
          </div>
        </div>
      </div>
      <div className="canvasMainForm">
      <InputGroup>
          <InputLeftAddon children='Constraint' />
          <Textarea type='text' placeholder='Constraint' id='constraint' />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='DSA' />
          <Textarea type='text' placeholder='DSA' id='dsa' />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='Complexity' />
          <Textarea type='text' placeholder='Complexity' id='complexity' />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='Code' />
          <Textarea type='text' placeholder='Code' id='code' />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children='Test' />
          <Textarea type='text' placeholder='Test' id='test' />
        </InputGroup>
        <ButtonGroup>
          <Button onClick={handleCancle}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </ButtonGroup>
      </div>
    </section>
  )
}
