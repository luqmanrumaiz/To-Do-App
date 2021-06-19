import './App.css';
import {
    Box,
    Center,
    ChakraProvider,
    Stack,
    Tag,
    TagLabel,
    CloseButton,
    Badge,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Switch,
    Flex,
    Spacer,
    FormControl,
    FormLabel,
    Skeleton,
    useDisclosure
} from "@chakra-ui/react"
import AddIcon from '@material-ui/icons/Add';
import {useEffect, useState} from "react";
import {db} from "./firebase";
import firebase from "firebase";
import React from "react";

function App() {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [tasks, setTasks] = useState([]);
    const [checked, setChecked] = useState(false);
    const [value, setValue] = React.useState("");
    const handleChange = (event) => setValue(event.target.value);

    const addTask = (event) => {
        event.preventDefault();

        console.log(tasks.length)

        db.collection("tasks").add({
            task: value,
            important: checked,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setChecked(false);
        onClose();
    }

    useEffect(() => {

        db
            .collection("tasks")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                setTasks(snapshot.docs.map(doc => ({id: doc.id, task: doc.data()})))
            })
    }, []);

    return (
        <ChakraProvider className="tasks">
            <Box>
                <Center bg="teal" h="120px" color="white">
                    <h1>To-Do App</h1>
                </Center>
            </Box>

            {tasks.length === 0 ? (
                <Skeleton isLoaded className="tasks__skeleton">
                    <h1>No Tasks added</h1>
                </Skeleton>
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
                                <CloseButton onClick={
                                    event => {
                                        event.preventDefault();

                                        db.collection("tasks").doc(task.id).delete().then(() => {
                                            console.log("Document successfully deleted!");
                                        }).catch((error) => {
                                            console.error("Error removing document: ", error);
                                        });
                                    }
                                } color="red"/>

                                <TagLabel className="tasks__taskTitle">
                                    {task.task.task}
                                </TagLabel>
                                {task.task.important ?
                                    <Badge colorScheme="red">Important</Badge> : <></>
                                }
                            </Tag>
                        </Stack>
                    ))}
                </div>
            )}

            <a onClick={onOpen} className="float">
                <AddIcon className="my-float"/>
            </a>

            <Modal isOpen={isOpen} onClose={() => {
                onClose();
                setChecked(false);
            }}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add a Task</ModalHeader>

                    <ModalCloseButton/>

                    <ModalBody>
                        <Input
                            placeholder="Task Description"
                            size="lg"
                            value={value}
                            onChange={handleChange}
                        />
                    </ModalBody>

                    <Flex padding="20px">
                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="email-alerts" mb="0">
                                Important
                            </FormLabel>
                            <Switch
                                colorScheme="red"
                                id="importantSwitch"
                                onChange={() => setChecked(true)}
                                checked={checked}
                            />
                        </FormControl>
                        <Spacer/>
                        <Button colorScheme="red" mr={3} onClick={() => {
                            onClose();
                            setChecked(false);
                        }}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={(event) => addTask(event)}>Add</Button>
                    </Flex>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
}

export default App;
