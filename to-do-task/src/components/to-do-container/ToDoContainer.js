import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import ToDoCard from "../to-do-card/ToDoCard";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function ToDoContainer({ title, todos, children, onCardClick }) {
  return (
    <Flex
      flexDirection="column"
      borderRadius="md"
      border="2px solid rgb(34, 112, 214)"
      w="250px"
    >
      <Box
        bg="rgb(209, 220, 235)"
        h="35px"
        borderBottom="2px solid rgb(34, 112, 214)"
      >
        <Text>{title}</Text>
      </Box>
      <Droppable droppableId={title}>
        {(provided) => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            direction="column"
            p={2}
            mt={2}
            sx={{ "& > div + div": { mt: 2 } }}
          >
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <ToDoCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={todo.id}
                    id={todo.id}
                    severity={todo.severity}
                    title={todo.title}
                    date={todo.date}
                    onClick={() => onCardClick(todo)}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {children}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
}
