import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "../../hooks/use-form";

const initialState = {
  title: "",
  severity: "Normal",
  progress: "to-do",
  date: new Date().toDateString(),
  description: "",
};

export default function AddTaskForm({
  onSubmitt,
  isSubmitting,
  isSuccess,
  currentState,
  buttonName,
}) {
  const [todo, setTodo] = React.useState(currentState || initialState);

  React.useEffect(() => {
    // isSuccess && setTodo(initialState);
    isSuccess && setTodoCard(initialState);
  }, [isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const onChange = (e) => {
    handleChange(e.target.name, e.target.value, e.target.type);
  };

  const onBlur = (e) => {
    handleBlur(e.target.name, e.target.value);
  };

  const titleValidation = (title) => {
    if (title.trim() === "") {
      return "Title is required";
    }
    if (title.trim().length < 6 || title.trim().length > 10) {
      return "Title needs to be between six to ten characters";
    }
    return null;
  };

  const descriptionValidation = (description) => {
    if (description.trim() === "") {
      return "Description is required";
    }
    if (description.trim().length < 8) {
      return "Description needs to be at least eight characters";
    }
    return null;
  };

  const validate = {
    title: titleValidation,
    description: descriptionValidation,
  };

  const {
    todoCard,
    setTodoCard,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useForm(todo, validate, onSubmitt);

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <FormControl>
        <FormLabel pt="10px">Name</FormLabel>
        <Input
          value={todoCard.title}
          bg="gray.50"
          name="title"
          onChange={onChange}
          onBlur={onBlur}
          // isRequired
        />
        <Text color="red.500">{touched.title && errors.title}</Text>
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Description</FormLabel>
        <Input
          value={todoCard.description}
          bg="gray.50"
          name="description"
          onChange={onChange}
          onBlur={onBlur}
          // isRequired
        />
        <Text color="red.500">{touched.description && errors.description}</Text>
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Severity</FormLabel>
        <Select
          value={todoCard.severity}
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
