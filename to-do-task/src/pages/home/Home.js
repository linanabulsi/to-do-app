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
import { useAsync, useBetterAsync } from "../../hooks/useAsync";
import { AddIcon } from "@chakra-ui/icons";

export function Home() {
  const { data, status, error, run: runFetch } = useBetterAsync(
    "http://localhost:5000/todos",
    {}
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    run,
    status: mutationStatus,
    error: mutationError,
  } = useBetterAsync();

  const onSubmit = (todo) => {
    run(async () => {
      const data = await fetch("http://localhost:5000/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      const result = await data.json();
      return result;
    });
  };

  React.useEffect(() => {
    runFetch(async () => {
      const data = await fetch("http://localhost:5000/todos");
      const result = await data.json();
      return result;
    });
  }, []);

  return (
    <Flex justify="space-around" m="3">
      {status === "error" && <Box>{error}</Box>}
      {(status === "idle" || status === "loading") && <Box>Loading ...</Box>}

      {status === "success" && (
        <>
          <ToDoContainer
            title="To Do"
            todos={data.filter((todo) => todo.progress === "to-do")}
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
          />
          <ToDoContainer
            title="Done"
            todos={data.filter((todo) => todo.progress === "done")}
          />
        </>
      )}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTaskForm
              onSubmit={onSubmit}
              isSubmitting={mutationStatus === "loading"}
              isSuccess={mutationStatus === "success"}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
