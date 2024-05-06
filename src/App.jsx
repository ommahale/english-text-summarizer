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
  const [count, setCount] = useState(0)
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(50); // Initial slider value (e.g., 50%)

  const handleSlideChange = (value) => {
    setSliderValue(value);
  };


  const handleSubmit = () => {
    setIsLoading(true)
    const percentage = sliderValue;
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
    <div>
      <h1 className='title'>पाठ सारांश</h1>
      {/* <SimpleGrid
        spacing={8}
        templateColumns='1fr 1fr'
        sx={{
          margin: '50px 0px 0px 200px'
        }}
      >
        <Card className='card' height='80vh'>
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
              onClick={() => { handleSubmit() }}
            >
              Summarize
            </Button>
          </CardFooter>
        </Card>

        <Card className='card' height='40vh'>
          <CardHeader>
            <Heading size='md'> Headline Text</Heading>
          </CardHeader>
          <Divider orientation='horizontal' />
          <CardBody>
            {isLoading ? ( // Show Spinner while loading
              <Spinner size='lg' color='blue.500' />
            ) : (
              <Textarea
                className='inputText'
                readOnly
                value={summary}
              />
            )}
          </CardBody>
        </Card>

        <Card className='card' height='40vh'>
          <CardHeader>
            <Heading size='md'> Summary</Heading>
          </CardHeader>
          <Divider orientation='horizontal' />
          <CardBody>
            {isLoading ? ( // Show Spinner while loading
              <Spinner size='lg' color='blue.500' />
            ) : (
              <Textarea
                className='inputText'
                readOnly
                value={summary}
              />
            )}
          </CardBody>
        </Card>
      </SimpleGrid> */}


      <HStack 
      spacing={12}
        sx={{
          margin: '50px 0px 0px 100px',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Card className='card' width={'45%'} height='80vh'>
          <CardHeader>
            <Heading size='md'> मूलपाठ</Heading>
          </CardHeader>
          <Divider orientation='horizontal' />
          <CardBody>
            <Textarea
              placeholder='टेक्स्ट दर्ज करें और "संक्षेप" बटन पर क्लिक करें'
              className='inputText'
              value={text}
              onChange={handleTextChange}
            />
          </CardBody>
          <CardFooter>
            <Button
              className='button'
              onClick={() => { handleSubmit() }}
            >
              संक्षेप
            </Button>
          </CardFooter>
        </Card>

        <VStack width={'45%'} height={'80vh'} sx={{ justifyContent: 'space-between' }}>
          <Card className='card' width={'full'}  height='38vh'>
            <CardHeader>
              <Heading size='md'> सुझाया गया शीर्षक</Heading>
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
                />
              )}
            </CardBody>
          </Card>

          <Card className='card' width={'full'} height='38vh'>
            <CardHeader>
              <Heading size='md'> सारांश</Heading>
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
