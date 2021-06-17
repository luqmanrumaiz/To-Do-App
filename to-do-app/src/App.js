import './App.css';
import {Avatar, Box, Center, ChakraProvider, Stack, Tag, TagLabel, CloseButton, Badge} from "@chakra-ui/react"
import AddIcon from '@material-ui/icons/Add';
import {useState} from "react";

function App() {

    const [tasks, setTasks] = useState([
        {important: false, task: "John Doe"},
        {important: true, task: "Victor Wayne"},
        {important: true, task: "Jane Doe"},
    ]);

    return (
        <ChakraProvider className="tasks">
            <Box>
                <Center bg="teal" h="120px" color="white">
                    <h1>To-Do App</h1>
                </Center>
            </Box>

            {tasks == null ? (
                <h1>No Tasks</h1>
            ) : (
                <div className="tasks__body">
                    {tasks.map((task) => (
                        <Stack className="tasks__task">
                            <Tag
                                padding="10px"
                                size="md"
                                colorScheme="teal"
                                borderRadius="full"
                            >
                                <CloseButton color="red"/>

                                <TagLabel className="tasks__taskTitle">
                                    {task.task}
                                </TagLabel>
                                {task.important ?
                                    <Badge colorScheme="red">Important</Badge> : <></>
                                }
                            </Tag>
                        </Stack>
                    ))}

                </div>
            )}


            <a href="#" className="float">
                <AddIcon className="my-float"/>
            </a>
        </ChakraProvider>
    );
}

export default App;
