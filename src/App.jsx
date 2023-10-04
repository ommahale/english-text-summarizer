import { useState } from 'react'
import {
  Divider, Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Input, Box, Textarea, Spinner, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,

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
      percentage, // Include the calculated word count in the request data
    };

    axios.post('http://localhost:8000/summarize', requestData)
      .then(response => {
        // Handle the response from the server here
        setIsLoading(false)
        console.log(response.data);
        console.log(response.data[0]?.summary_text);
        setSummary(response.data[0]?.summary_text || '');


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
      <h1 className='title'>Text Summarizer</h1>
      <SimpleGrid
        spacing={8}
        templateColumns='repeat(5, 1fr)'
        sx={{
          margin: '50px 0px 0px 200px'
        }}
      >

        <Card className='card' gridColumn="span 2" height='80vh'>
          <CardHeader>
            <Heading size='md'> Input Text (set the length of summary you need)</Heading>

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
          <CardFooter >
            <Button
              className='button'
              onClick={() => { handleSubmit() }}
            >
              Summarize
            </Button>
            {/* <div> */}
            <Slider
              className='slider'
              aria-label='slider-ex-4'
              value={sliderValue}
              onChange={handleSlideChange}
              min={0}
              max={100}
              step={1}
              focusThumbOnChange={false}>
              <SliderTrack bg='red.100'>
                <SliderFilledTrack bg='tomato' />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color='tomato' />
              </SliderThumb>
            </Slider>
            <Text ml={4} fontWeight="bold">
              {sliderValue}%
            </Text>
            {/* </div> */}
          </CardFooter>
        </Card>


        <Card className='card' gridColumn="span 2">
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
      </SimpleGrid>
    </div>
  )
}

export default App
