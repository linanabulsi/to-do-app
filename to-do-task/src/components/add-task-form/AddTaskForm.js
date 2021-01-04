import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React from "react";

const initialState = {
  title: "",
  severity: "Normal",
  progress: "to-do",
  date: new Date().toDateString(),
  description: "",
};

export default function AddTaskForm({ onSubmit, isSubmitting, isSuccess }) {
  const [todo, setTodo] = React.useState(initialState);

  const handleSumbit = (e) => {
    e.preventDefault();
    onSubmit(todo);
  };

  React.useEffect(() => {
    isSuccess && setTodo(initialState);
    console.log(isSuccess);
  }, [isSuccess]);

  return (
    <form onSubmit={handleSumbit}>
      <FormControl>
        <FormLabel pt="10px">Name</FormLabel>
        <Input
          value={todo.title}
          bg="gray.50"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Description</FormLabel>
        <Input
          value={todo.description}
          bg="gray.50"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Severity</FormLabel>
        <Select
          value={todo.severity}
          bg="gray.50"
          onChange={(e) => setTodo({ ...todo, severity: e.target.value })}
        >
          <option>Normal</option>
          <option>Important</option>
          <option>Urgent</option>
        </Select>
      </FormControl>
      <Button type="submit" disabled={isSubmitting}>
        Add to-do
      </Button>
    </form>
  );
}
