import { Flex, Text } from "@chakra-ui/react";
import {
  Button,
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
import { useBetterAsync } from "../../hooks/useAsync";

const severityColors = {
  Important: "orange",
  Normal: "green",
  Urgent: "red",
};

export default function ToDoCard({
  title,
  severity = "Important",
  progress,
  date,
  description,
  id,
}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentState = {
    title,
    severity,
    progress,
    date,
    description,
    id
  };

  const {
    run,
    status,
    error,
  } = useBetterAsync();
  

  const onUpdate = (todo) => {
    run(async () => {
      const data = await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      const result = await data.json();
      return result;
    });
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      w="full"
      h="80px"
      bg={`${severityColors[severity]}.100`}
      borderRadius="md"
      p="8px"
      border="2px solid"
      borderColor={`${severityColors[severity]}.300`}
      onClick={onOpen}
    >
      <Text>{title}</Text>
      <Flex direction="column" h="full" justify="space-between">
        <Text bg={`${severityColors[severity]}.300`} borderRadius="md">
          {severity}
        </Text>
        <Text>{date}</Text>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTaskForm
            onSubmit={onUpdate}
            currentState={currentState}
            buttonName="Update"
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
