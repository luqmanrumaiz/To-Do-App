import './App.css';
import {Box, Center, ChakraProvider} from "@chakra-ui/react"

function App() {
  return (
      <ChakraProvider>
        <Box>
            <Center bg="teal" h="120px" color="white">
                <h1>To-Do App</h1>
            </Center>
        </Box>
      </ChakraProvider>
  );
}

export default App;
