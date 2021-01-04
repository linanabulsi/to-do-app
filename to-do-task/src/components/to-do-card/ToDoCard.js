import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const severityColors = {
  Important: "orange",
  Normal: "green",
  Urgent: "red",
};

export default function ToDoCard({ title, date, severity = "Important" }) {
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
}
