import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const severityColors = {
  Important: "orange",
  Normal: "green",
  Urgent: "red",
};

const ToDoCard = React.forwardRef(function ToDoCard(
  { title, id, severity = "Important", date, onClick, ...rest },
  ref
) {
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
      onClick={onClick}
      cursor="pointer"
      ref={ref}
      {...rest}
    >
      <Text>{title}</Text>
      <Flex direction="column" h="full" justify="space-between">
        <Text bg={`${severityColors[severity]}.300`} borderRadius="md">
          {severity}
        </Text>
        <Text>{date}</Text>
      </Flex>
    </Flex>
  );
});

export default ToDoCard;
