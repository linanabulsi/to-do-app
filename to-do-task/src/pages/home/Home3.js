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
import AddTaskFormik from "../../components/add-task-form/AddTaskFormik";
import ToDoContainer from "../../components/to-do-container/ToDoContainer";
import { AddIcon } from "@chakra-ui/icons";
import { DragDropContext } from "react-beautiful-dnd";
import { useQueryClient, useMutation } from "react-query";

const progress = {
  to_do: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export function Home3() {
  const queryClient = useQueryClient();

  const queryState = queryClient.getQueryState("todos");
  const { data, status, error } = queryState;

  //  const queryCache = new QueryCache({
  //   onError: error => {
  //     console.log(error)
  //   },
  // })

  // const query = queryCache.find('fetchData')
  // console.log('query', query);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedToDo, setSelectedToDo] = React.useState(null);

  const {
    mutate: mutatePostTodo,
    status: mutationStatus,
    error: mutationError,
  } = useMutation(
    async (todo) => {
      const data = await fetch("http://localhost:5000/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      const result = await data.json();
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
      onError: (err) => console.log(err),
    }
  );

  const onSubmit = (todo) => {
    mutatePostTodo(todo);
  };

  const {
    mutate: mutateUpdateTodo,
    status: updateStatus,
    error: updateError,
  } = useMutation(
    async (todo) => {
      const data = await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      const result = await data.json();
      return result;
    },
    {
      onSuccess: () => {
        setSelectedToDo(null);
        onClose();
        queryClient.invalidateQueries("todos");
        // queryCache.invalidateQueries("todos");
        // refetch()
      },
      onError: (err) => console.log(err),
    }
  );

  const onUpdate = (todo) => {
    mutateUpdateTodo(todo);
  };

  const onCardClick = (todo) => {
    setSelectedToDo(todo);
    onOpen();
  };

  const onFormClose = () => {
    onClose();
    setSelectedToDo(null);
  };

  // const onSuccess = (data) => {
  //   const items = Array.from(data);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  // };

  function handleOnDragEnd(result) {
    console.log(result);
    const { source, destination } = result;
    if (!destination) return;

    // if (source.droppableId === destination.droppableId) {
    //   const items = Array.from(data);
    //   const [reorderedItem] = items.splice(result.source.index, 1);
    //   items.splice(result.destination.index, 0, reorderedItem);

    //   set(items);
    // }

    if (source.droppableId !== destination.droppableId) {
      const todo = data.find(
        (todo) => todo.id === parseInt(result.draggableId)
      );
      todo.progress = Object.keys(progress).find(
        (key) => progress[key] === destination.droppableId
      );

      mutateUpdateTodo(todo);

      const [reorderedItem] = data.splice(result.source.index - 1, 1);
      data.splice(result.destination.index - 1, 0, reorderedItem);
    }
  }

  return (
    <Flex justify="space-around" m="3">
      {status === "error" && <Box>{error}</Box>}
      {(status === "idle" || status === "loading") && !data && (
        <Box>Loading ...</Box>
      )}

      {(status === "success" || data) && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <ToDoContainer
            title="To Do"
            todos={data.filter((todo) => todo.progress === "to_do")}
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
            todos={data.filter((todo) => todo.progress === "in_progress")}
            onCardClick={onCardClick}
          />
          <ToDoContainer
            title="Done"
            todos={data.filter((todo) => todo.progress === "done")}
            onCardClick={onCardClick}
          />
        </DragDropContext>
      )}
      <Modal onClose={onFormClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTaskFormik
              onSubmitt={selectedToDo ? onUpdate : onSubmit}
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
