import { useState } from 'react'
import {
  Divider, Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Input, Box, Textarea, Spinner, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  HStack,
  VStack

} from '@chakra-ui/react'
import './App.css'
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = () => {
    setIsLoading(true)
    const requestData = {
      text,
    };

    axios.post('http://localhost:8000/summarize', requestData)
      .then(response => {
        // Handle the response from the server here
        setIsLoading(false)
        console.log(response.data);
        // console.log(response.data[0]?.summary_text);
        setSummary(response.data[0]);
        // setSummary(response.data[0]?.abstracted || '');
        console.log({summary})

      })
      .catch(error => {
        setIsLoading(false)
        console.error('Error:', error);
      });
  };
  const handleTextChange = event => {
    setText(event.target.value);
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', color: '#333', paddingBottom: '35px', paddingTop:"20px" }}>
      <h1 className='title' sx={{
        marginTop: '0px'
      }}>पाठ सारांश</h1>

      <HStack 
      spacing={12}
        sx={{
          margin: '50px 0px 0px 100px',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Card className='card' width={'45%'} height='80vh' bg="white" color="black">
          <CardHeader bg='blue.700' borderTopRadius={'2xl'}>
            <Heading size='md' color={'white'}> मूलपाठ</Heading>
          </CardHeader>
          <Divider orientation='horizontal' />
          <CardBody>
            <Textarea
              placeholder='टेक्स्ट दर्ज करें और "संक्षेप" बटन पर क्लिक करें'
              className='inputText'
              value={text}
              onChange={handleTextChange}
              bg="white"
              color="black"
            />
          </CardBody>
          <CardFooter>
            <Button
              className='button'
              background='#2D3250'
              onClick={() => { handleSubmit() }}
              sx={{
                backgroundColor: "#4E9F3D"
              }}
            >
              संक्षेप
            </Button>
          </CardFooter>
        </Card>

        <VStack width={'45%'} height={'80vh'} sx={{ justifyContent: 'space-between' }}>
          <Card className='card' width={'full'}  height='38vh' bg="white" color="black">
          <CardHeader bg='blue.700' borderTopRadius={'2xl'}>
          <Heading size='md' color={'white'}> सुझाया गया शीर्षक</Heading>
            </CardHeader>
            <Divider orientation='horizontal' />
            <CardBody>
              {isLoading ? ( // Show Spinner while loading
                <Spinner size='lg' color='blue.500' />
              ) : (
                <Textarea
                placeholder='शीर्षक यहां दिखाई देगा'
                  className='inputText'
                  readOnly
                  value={summary?.abstracted}
                  bg="white"
                  color="black"
                />
              )}
            </CardBody>
          </Card>

          <Card className='card' width={'full'} height='38vh' bg="white" color="black">
          <CardHeader bg='blue.700' borderTopRadius={'2xl'}>
          <Heading size='md' color={'white'}> सारांश</Heading>
            </CardHeader>
            <Divider orientation='horizontal' />
            <CardBody>
              {isLoading ? ( // Show Spinner while loading
                <Spinner size='lg' color='blue.500' />
              ) : (
                <Textarea
                placeholder='सारांश यहां दिखाई देगा'
                  className='inputText'
                  readOnly
                  value={summary?.summary_text}
                  bg="white"
                  color="black"
                />
              )}
            </CardBody>
          </Card>
        </VStack>

      </HStack>

    </div>
  )
}

export default App
