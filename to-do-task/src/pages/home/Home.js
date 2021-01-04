import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AddTaskForm from "../../components/add-task-form/AddTaskForm";
import ToDoContainer from "../../components/to-do-container/ToDoContainer";
import { useBetterAsync } from "../../hooks/useAsync";
import { AddIcon } from "@chakra-ui/icons";

export function Home() {
  const { data, status, error, run: runFetch } = useBetterAsync(
    "http://localhost:5000/todos",
    {}
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedToDo, setSelectedToDo] = React.useState(null);

  const {
    run,
    status: mutationStatus,
    error: mutationError,
  } = useBetterAsync();

  const onSubmit = (todo) => {
    run(async () => {
      try {
        const data = await fetch("http://localhost:5000/todos", {
          method: "POST",
          body: JSON.stringify(todo),
          headers: { "Content-Type": "application/json" },
        });
        const result = await data.json();
        runFetch(async () => {
          const data = await fetch("http://localhost:5000/todos");
          const result = await data.json();
          return result;
        });
        return result;
      } catch (err) {
        console.log(err);
      }
    });
  };

  const {
    run: runUpdate,
    status: updateStatus,
    error: updateError,
  } = useBetterAsync();

  const onUpdate = (todo) => {
    runUpdate(async () => {
      try {
        const data = await fetch(`http://localhost:5000/todos/${todo.id}`, {
          method: "PUT",
          body: JSON.stringify(todo),
          headers: { "Content-Type": "application/json" },
        });
        const result = await data.json();
        setSelectedToDo(null);
        onClose();
        runFetch(async () => {
          const data = await fetch("http://localhost:5000/todos");
          const result = await data.json();
          return result;
        });
        return result;
      } catch (err) {
        console.log(err);
      }
    });
  };

  const onCardClick = (todo) => {
    setSelectedToDo(todo);
    onOpen();
  };

  React.useEffect(() => {
    runFetch(async () => {
      const data = await fetch("http://localhost:5000/todos");
      const result = await data.json();
      return result;
    });
  }, []);

  const onFormClose = () => {
    onClose();
    setSelectedToDo(null);
  };

  return (
    <Flex justify="space-around" m="3">
      {status === "error" && <Box>{error}</Box>}
      {(status === "idle" || status === "loading") && <Box>Loading ...</Box>}

      {status === "success" && (
        <>
          <ToDoContainer
            title="To Do"
            todos={data.filter((todo) => todo.progress === "to-do")}
            onCardClick={onCardClick}
          >
            <Button
              rightIcon={<AddIcon />}
              colorScheme="teal"
              variant="outline"
              mt="2"
              onClick={onOpen}
            >
              Add task
            </Button>
          </ToDoContainer>
          <ToDoContainer
            title="In Progress"
            todos={data.filter((todo) => todo.progress === "in-progress")}
            onCardClick={onCardClick}
          />
          <ToDoContainer
            title="Done"
            todos={data.filter((todo) => todo.progress === "done")}
            onCardClick={onCardClick}
          />
        </>
      )}
      <Modal onClose={onFormClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTaskForm
              onSubmit={selectedToDo ? onUpdate : onSubmit}
              isSubmitting={
                mutationStatus === "loading" || updateStatus === "loading"
              }
              isSuccess={
                mutationStatus === "success" || updateStatus === "success"
              }
              buttonName={selectedToDo ? "Update" : "Add to-do"}
              currentState={selectedToDo}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onFormClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
