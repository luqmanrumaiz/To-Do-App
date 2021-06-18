import './App.css';
import {Avatar, Box, Center, ChakraProvider, Stack, Tag, TagLabel, CloseButton, Badge} from "@chakra-ui/react"
import AddIcon from '@material-ui/icons/Add';
import {useEffect, useState} from "react";
import {db} from "./firebase";
import firebase from "firebase";

function App() {

    const [tasks, setTasks] = useState([]);

    const deleteTask = (task) => {

    }

    const addTask = (event) => {
        event.preventDefault();

        db.collection("tasks").add({
            task: "Thank You",
            important: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    useEffect(() => {
        db
            .collection("tasks")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                setTasks(snapshot.docs.map(doc => doc.data()))
            })
    }, []);

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


            <a onClick={addTask} className="float">
                <AddIcon className="my-float"/>
            </a>
        </ChakraProvider>
    );
}

export default App;
