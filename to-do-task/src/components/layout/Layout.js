import { Flex, ListItem, UnorderedList, Link, Button } from "@chakra-ui/react";
import React from "react";
import "./style.css";
// import { BrowserRouter as Link } from "react-router-dom";
import { Link as ReactLink, NavLink, useHistory } from "react-router-dom";

export default function Layout({ children }) {
  const history = useHistory();
  return (
    <Flex direction="column">
      <Flex justify="space-between" border="2px solid black">
        <UnorderedList styleType="none">
          <ListItem px="30px" py="6px" border="2px solid black">
            <Link as={NavLink} to="/">
              LOGO
            </Link>
          </ListItem>
          <ListItem>My To Do App</ListItem>
          <ListItem>
            <Link as={NavLink} to="/barchart">
              Bar Chart
            </Link>
          </ListItem>
          <ListItem>
            <Link as={ReactLink} to="/piechart">
              Pie Chart
            </Link>
          </ListItem>
          <ListItem>
            <Button onClick={() => history.push("/piechart")}>Pie Chart</Button>
          </ListItem>
        </UnorderedList>
      </Flex>

      {children}
    </Flex>
  );
}
