import React, { useState } from "react";
import { Button, Text, Tag, Heading, Stack, StackDivider, Box, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import CanvasDetail from './CanvasDetail';

export default function CanvasList({ canvasList }) {
  const [choseIndex, setChoseIndex] = useState(-1);
  const [showDetail, setShowDetail] = useState(false);
  function handleClick(index) {
    setChoseIndex(index)
    console.log('点击了卡片', index);
    setShowDetail(true)
  }

  function handleClose() {
    setShowDetail(false)
  }

  const handleDataUpdate = (updatedCanvas) => {
    console.log(updatedCanvas, ' ', choseIndex);
  }

  return (
    <div className="cardLists">
      <div className="cardArea">
        {canvasList.map((canvas, index) => {
          return (
            <Card key={index}
              style={{ marginBottom: 10, backgroundColor: 'lightsteelblue' }}
              onClick={() => handleClick(index, canvas)}>
              <CardHeader>
                {canvas.name}
                <div>
                  {canvas.tags.split(",").map((tag, index) => (
                    <Tag variant='solid' colorScheme='teal' size='lg' key={index} className="tag-label">{tag}</Tag>
                  ))}
                </div>
                <p>{canvas.description}</p>
              </CardHeader>
              {/* <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    constraints
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {canvas.constraints}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    DSA
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {canvas.dsa}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Complexity
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {canvas.complexity}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Code
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {canvas.code}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Test
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {canvas.test}
                  </Text>
                </Box>
              </Stack>
            </CardBody> */}
              <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                <Button flex='1' variant='ghost' >
                  Like
                </Button>
                <Button flex='1' variant='ghost' >
                  Comment
                </Button>
                <Button flex='1' variant='ghost' >
                  Share
                </Button>
              </CardFooter>
            </Card>
          )
        })}
        <div>
          {showDetail && <CanvasDetail canvas={canvasList[choseIndex]} closeDetail={handleClose} onDataUpdate={handleDataUpdate}></CanvasDetail>}
        </div>
      </div>
    </div>
  )
}