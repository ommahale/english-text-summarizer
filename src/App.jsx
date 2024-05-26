import { useState } from 'react';
import {
  Divider, Card, CardHeader, CardBody, CardFooter, Heading, Button, Textarea, Spinner, HStack, VStack
} from '@chakra-ui/react';
import './App.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false); // State to track whether a file has been uploaded

  const handleSubmit = () => {
    setIsLoading(true);

    if (fileContent) {
      const requestData = { text: fileContent };
      axios.post('http://localhost:8000/summarize', requestData)
        .then(response => {
          setIsLoading(false);
          setSummary(response.data[0]);
        })
        .catch(error => {
          setIsLoading(false);
          console.error('Error:', error);
        });
    } else {
      const requestData = { text };
      axios.post('http://localhost:8000/summarize', requestData)
        .then(response => {
          setIsLoading(false);
          setSummary(response.data[0]);
        })
        .catch(error => {
          setIsLoading(false);
          console.error('Error:', error);
        });
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    setFileContent(null); // Clear file content when text input is used
    setFileUploaded(false); // Enable the textarea again when text input is used
  };

  const onDrop = (acceptedFiles) => {
    console.log("Got the file in onDrop")
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFileContent(reader.result);
      setText(''); // Clear text input when file is uploaded
      setFileUploaded(true); // Disable the textarea when a file is uploaded
    };
    reader.readAsText(file);
  };

  const discardFile = () => {
    setFileContent(null);
    setFileUploaded(false); // Enable the textarea again when file is discarded
  };

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, accept: '.txt', noClick: true });

  return (
    <div style={{ backgroundColor: '#f7f7f7', color: '#333', paddingBottom: '35px', paddingTop: '20px' }}>
      <h1 className='title' sx={{ marginTop: '0px' }}>पाठ सारांश</h1>

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
          <CardBody {...getRootProps()}>
            <Textarea
              id='input_text'
              placeholder={fileUploaded ? 'फ़ाइल अपलोड की गई है' : 'टेक्स्ट दर्ज करें और "संक्षेप" बटन पर क्लिक करें या फ़ाइल खींचें और छोड़ें'}
              className='inputText'
              value={text}
              onChange={handleTextChange}
              bg="white"
              color="black"
              disabled={fileUploaded} // Disable textarea if file is uploaded
            />
          </CardBody>
          <CardFooter>
            <Button
              id='input'
              className='button'
              background='#2D3250'
              onClick={handleSubmit}
              sx={{ backgroundColor: "#4E9F3D" }}
            >
              संक्षेप
            </Button>

            {fileUploaded ? (
              <Button
                className='button'
                background='#2D3250'
                onClick={discardFile}
                sx={{ backgroundColor: "#4E9F3D", marginLeft: '10px' }}
              >
                फ़ाइल को खारिज करें
              </Button>

            ) : (
              <Button
                className='button'
                background='#2D3250'
                onClick={open}
                sx={{ backgroundColor: "#4E9F3D", marginLeft: '10px' }}
              >
                फ़ाइल चुनें
              </Button>
            )}
          </CardFooter>
        </Card>
        <input {...getInputProps()} style={{ display: 'none' }} />
        <VStack width={'45%'} height={'80vh'} sx={{ justifyContent: 'space-between' }}>
          <Card className='card' width={'full'} height='38vh' bg="white" color="black">
            <CardHeader bg='blue.700' borderTopRadius={'2xl'}>
              <Heading size='md' color={'white'}> सुझाया गया शीर्षक</Heading>
            </CardHeader>
            <Divider orientation='horizontal' />
            <CardBody>
              {isLoading ? (
                <Spinner size='lg' color='blue.500' />
              ) : (
                <Textarea
                  id='title'
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
              {isLoading ? (
                <Spinner size='lg' color='blue.500' />
              ) : (
                <Textarea
                  id='summary'
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
  );
}

export default App;
