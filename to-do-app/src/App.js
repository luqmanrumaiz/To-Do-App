import './App.css';
import {Box, Center, ChakraProvider} from "@chakra-ui/react"
import AddIcon from '@material-ui/icons/Add';
import {useState} from "react";

function App() {

    const [tasks, setTasks] = useState([]);

    

    return (
        <ChakraProvider>
            <Box>
                <Center bg="teal" h="120px" color="white">
                    <h1>To-Do App</h1>
                </Center>
            </Box>

            {tasks == null ? (
                <h1>No Tasks</h1>
            ) : (
                <h1>Tasks</h1>
            )}

            <a href="#" className="float">
                <AddIcon className="my-float"/>
            </a>
        </ChakraProvider>
    );
}

export default App;
