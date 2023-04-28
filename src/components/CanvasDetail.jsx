import React, { useState } from "react";
import {
    Text,
    Textarea, Input, InputGroup, InputLeftAddon, Tag,
    TagLabel,
    TagCloseButton,
    Flex,
    Box, Stack, StackDivider, Heading, Card, CardHeader, CardBody, CardFooter, Center, Button
} from '@chakra-ui/react'

export default function CanvasDetail({ canvas, closeDetail, onDataUpdate }) {

    const [showingCanvas, setShowingCanvas] = useState(canvas)
    const [isEditing, setIsEditing] = useState(false)
    const [canvasTags, setCanvasTags] = useState(showingCanvas.tags.split(","))
    const [newTagInput, setNewTagInput] = useState('')
    const [showNewTagInput, setShowNewTagInput] = useState(false)
    const [canvasName, setCanvasName] = useState(canvas.name)
    const [canvasDesc, setCanvasDesc] = useState(canvas.description)
    const [canvasConstraints, setCanvasConstraints] = useState(canvas.constraints)
    const [canvasDsa, setCanvasDsa] = useState(canvas.dsa)
    const [canvasComplexity, setCanvasComplexity] = useState(canvas.complexity)
    const [canvasCode, setCanvasCode] = useState(canvas.code)
    const [canvasTest, setCanvasTest] = useState(canvas.test)

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
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        // 取消之前，先设置一下刚才编辑的内容
        setIsEditing(false);
    };


    function handleClose() {
        console.log('点击了x');
        closeDetail()
    }

    const handleChange = (event) => {
        setContent(event.target.value);
    }

    const handleTagDelete = (index) => {
        console.log('tags delete click');
        const newTags = [...canvasTags];
        newTags.splice(index, 1);
        setCanvasTags(newTags);
    }
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
          id: canvas.id,
          name: canvasName,
          description: canvasDesc,
          tags: canvasTags.join(),
          constraints: canvasConstraints,
          dsa: canvasDsa,
          complexity: canvasComplexity,
          code: canvasCode,
          test: canvasTest
        }
        try {
          const response = await fetch(`http://localhost:8080/canvas`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
          });
          const updatedCanvas = await response.json();
          onDataUpdate(updatedCanvas);
          setShowingCanvas(updatedCanvas)
          console.log(updatedCanvas);
        } catch (error) {
          console.error('Error updating canvas:', error);
        }
        setIsEditing(false)
      }

    function handleDelete(id) {
        fetch(`http://localhost:8080/canvas/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('delete successfully id: ', id);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                // handle error
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            {isEditing ? (
                <div style={{
                    position: "fixed",
                    top: 50,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "whitesmoke"
                }}>
                    <div className="canvasTitleBar">
                        <InputGroup>
                            <InputLeftAddon children='CanvasName' />
                            <Input type='text' defaultValue={showingCanvas.name} id='canvasName'
                                onChange={(event) => { setCanvasName(event.target.value) }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='Description' />
                            <Textarea type='text' defaultValue={showingCanvas.description} id='description'
                                onChange={(event) => { setCanvasDesc(event.target.value) }} />
                        </InputGroup>
                        <div style={{ display: "flex" }}>
                            {canvasTags.map((tag, index) => (
                                <Tag
                                    key={index}
                                    size='lg'
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                >
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => handleTagDelete(index)} />
                                </Tag>
                            ))}
                            {showNewTagInput ? (
                                <Input
                                    value={newTagInput}
                                    onChange={handleNewTagInputChange}
                                    onKeyDown={handleNewTagInputKeyDown}
                                    style={{ width: '150px' }}
                                />
                            ) : (
                                <Button onClick={handleAddNewTagClick}>Add New Tag</Button>
                            )}
                        </div>
                    </div>
                    <div className="canvasMainForm">
                        <InputGroup>
                            <InputLeftAddon children='Constraint' />
                            <Textarea type='text' id='constraint' defaultValue={showingCanvas.constraints} onChange={(event) => { setCanvasConstraints(event.target.value) }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='DSA' />
                            <Textarea type='text' id='dsa' defaultValue={showingCanvas.dsa} onChange={(event) => { setCanvasDsa(event.target.value) }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='Complexity' />
                            <Textarea type='text' id='complexity' defaultValue={showingCanvas.complexity} onChange={(event) => { setCanvasComplexity(event.target.value) }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='Code' />
                            <Textarea type='text' id='code' defaultValue={showingCanvas.code} onChange={(event) => { setCanvasCode(event.target.value) }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='Test' />
                            <Textarea type='text' id='test' defaultValue={showingCanvas.test} onChange={(event) => { setCanvasTest(event.target.value) }} />
                        </InputGroup>
                    </div>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={() => handleCancelClick()}>
                        Cancel
                    </Button>
                </div>
            ) : (
                <div className="cardArea">
                    <Card
                        style={{
                            position: "fixed",
                            top: 50,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}>
                        <CardHeader>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Heading size='md'>{showingCanvas.name}</Heading>
                                    <Button onClick={() => handleClose()}>X</Button>
                                </div>
                                <div>
                                    {showingCanvas.tags.split(",").map((tag, index) => (
                                        <Tag
                                            key={index}
                                            size='lg'
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='green'
                                        >
                                            <TagLabel>{tag}</TagLabel>
                                        </Tag>
                                    ))}
                                    <p>{showingCanvas.description}</p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Constraints
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {showingCanvas.constraints}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        DSA
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {showingCanvas.dsa}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Complexity
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {showingCanvas.complexity}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Code
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {showingCanvas.code}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Test
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {showingCanvas.test}
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={() => handleEditClick(canvas.id)}>编辑</Button>
                            <Button onClick={() => handleDelete(canvas.id)}>删除</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </form>

    )
}