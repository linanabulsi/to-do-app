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
import { useBetterAsync } from "../../hooks/useAsync";
import { AddIcon } from "@chakra-ui/icons";
import { DragDropContext } from "react-beautiful-dnd";
import { queryCache, useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const progress = {
  to_do: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export function Home() {

  const location = useLocation();
  console.log(location);

  // const { data, status, error, run: runFetch } = useBetterAsync(
  //   "http://localhost:5000/todos",
  //   // {onSuccess}
  //   {}
  // );

  const { data, status, error, isFetching, refetch } = useQuery(
    "fetchData",
    () => fetch("http://localhost:5000/todos").then((res) => res.json())
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedToDo, setSelectedToDo] = React.useState(null);

  // const {
  //   run,
  //   status: mutationStatus,
  //   error: mutationError,
  // } = useBetterAsync();

  // const onSubmit = (todo) => {
  //   mutatePostTodo(todo);
  //   run(async () => {
  //     try {
  //       const data = await fetch("http://localhost:5000/todos", {
  //         method: "POST",
  //         body: JSON.stringify(todo),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       const result = await data.json();
  //       // runFetch(async () => {
  //       //   const data = await fetch("http://localhost:5000/todos");
  //       //   const result = await data.json();
  //       //   return result;
  //       // });
  //       return result;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // };

  const { mutatePostTodo, mutationStatus, mutationError } = useMutation(
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
        queryCache.invalidateQueries("fetchData");
      },
      onError: err => console.log(err),
    }
  );

  const onSubmit = (todo) => {
    mutatePostTodo(todo);
  };

  // const {
  //   run: runUpdate,
  //   status: updateStatus,
  //   error: updateError,
  // } = useBetterAsync();

  // const onUpdate = (todo) => {
  //   runUpdate(async () => {
  //     try {
  //       const data = await fetch(`http://localhost:5000/todos/${todo.id}`, {
  //         method: "PUT",
  //         body: JSON.stringify(todo),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       const result = await data.json();
  //       setSelectedToDo(null);
  //       onClose();
  //       // runFetch(async () => {
  //       //   const data = await fetch("http://localhost:5000/todos");
  //       //   const result = await data.json();
  //       //   return result;
  //       // });
  //       return result;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // };

  const { mutate, updateStatus, updateError } = useMutation(
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
        // queryCache.invalidateQueries("fetchData");
        refetch()
      },
      onError: (err) => console.log(err),
    }
  );

  const onUpdate = (todo) => {
    mutate(todo);
  };

  const onCardClick = (todo) => {
    setSelectedToDo(todo);
    onOpen();
  };

  // React.useEffect(() => {
  // runFetch(async () => {
  //   const data = await fetch("http://localhost:5000/todos");
  //   const result = await data.json();
  //   return result;
  // });
  // }, []);

  React.useEffect(() => {
    refetch();
  }, []);

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
      // onUpdate(todo);

      // runUpdate(async () => {
      //   try {
      //     const data = await fetch(`http://localhost:5000/todos/${todo.id}`, {
      //       method: "PUT",
      //       body: JSON.stringify(todo),
      //       headers: { "Content-Type": "application/json" },
      //     });
      //     const result = await data.json();
      //     return result;
      //   } catch (err) {
      //     console.log(err);
      //   }
      // });

      mutate(todo);

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
