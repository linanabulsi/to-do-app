import { Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import "./style.css"
import { BrowserRouter as Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <Flex direction="column" border="2px solid black">
      <Flex justify="space-between" border="2px solid black">
        <UnorderedList styleType="none">
            <ListItem px="30px" py="6px" border="2px solid black">
              <Link to="/">LOGO</Link>
            </ListItem>
            <ListItem>My To Do App</ListItem>
            <ListItem>item3</ListItem>
        </UnorderedList>
      </Flex>

      {children}
    </Flex>
  );
}
