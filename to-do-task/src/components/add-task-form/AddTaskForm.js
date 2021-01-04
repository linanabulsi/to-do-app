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

export default function AddTaskForm({
  onSubmit,
  isSubmitting,
  isSuccess,
  currentState,
  buttonName,
}) {
  const [todo, setTodo] = React.useState(currentState || initialState);

  const handleSumbit = (e) => {
    e.preventDefault();
    onSubmit(todo);
  };

  React.useEffect(() => {
    isSuccess && setTodo(initialState);
  }, [isSuccess]);

  const onChange = (e) => {
    setTodo((todo) => ({
      ...todo,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSumbit}>
      <FormControl>
        <FormLabel pt="10px">Name</FormLabel>
        <Input
          value={todo.title}
          bg="gray.50"
          name="title"
          onChange={onChange}
          isRequired
        />
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Description</FormLabel>
        <Input
          value={todo.description}
          bg="gray.50"
          name="description"
          onChange={onChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Severity</FormLabel>
        <Select
          value={todo.severity}
          bg="gray.50"
          name="severity"
          onChange={onChange}
        >
          <option>Normal</option>
          <option>Important</option>
          <option>Urgent</option>
        </Select>
      </FormControl>

      <Button type="submit" disabled={isSubmitting}>
        {buttonName}
      </Button>
    </form>
  );
}
