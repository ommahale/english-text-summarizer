import { useState } from 'react'
import { Divider, Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Input, Box, Textarea } from '@chakra-ui/react'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:8000/summarize', { text })
      .then(response => {
        // Handle the response from the server here
        console.log(response.data); // You can replace this with your logic
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleTextChange = event => {
    setText(event.target.value);
  };

  return (
    <div>
      <SimpleGrid
        spacing={8}
        templateColumns='repeat(5, 1fr)'
        sx={{
          margin: '100px 0px 0px 200px'
        }}
      >
        <Card className='card' gridColumn="span 2" height='80vh'>
          <CardHeader>
            <Heading size='md'> Input Text</Heading>
          </CardHeader>
          <Divider orientation='horizontal' />

          <CardBody>
            <Textarea
              placeholder='Enter Text and click on the button "Summarize"'
              className='inputText'
              value={text}
              onChange={handleTextChange}
            />
          </CardBody>
          <CardFooter>
            <Button 
              className='button'
              onClick={()=>{handleSubmit()}}
              >
                Summarize
              </Button>
          </CardFooter>
        </Card>


        <Card className='card' gridColumn="span 2">
          <CardHeader>
            <Heading size='md'> Summary</Heading>
          </CardHeader>
          <Divider orientation='horizontal' />

          <CardBody>
            <Textarea
              className='inputText'
            />
          </CardBody>

        </Card>
      </SimpleGrid>
    </div>
  )
}

export default App
