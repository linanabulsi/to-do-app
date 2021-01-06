import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
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
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleSumbit = (e) => {
    e.preventDefault();
    const formValidation = Object.keys({
      title: todo.title,
      description: todo.description,
    }).reduce(
      (acc, key) => {
        const newError = validate[key](todo[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);
    if (
      !Object.values(formValidation.errors).length &&
      Object.values(formValidation.touched).length ===
        Object.values({
          title: todo.title,
          description: todo.description,
        }).length &&
      Object.values(formValidation.touched).every((t) => t === true)
    ) {
      onSubmit(todo);
    }
  };

  React.useEffect(() => {
    isSuccess && setTodo(initialState);
  }, [isSuccess]);

  const onChange = (e) => {
    setTodo((todo) => ({
      ...todo,
      [e.target.name]: e.target.value,
    }));

    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleBlur = (e) => {
    const { [e.target.name]: removedError, ...rest } = errors;
    const error = validate[e.target.name](e.target.value);
    setErrors({
      ...rest,
      ...(error && { [e.target.name]: touched[e.target.name] && error }),
    });
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

  return (
    <form onSubmit={handleSumbit} autoComplete="off">
      <FormControl>
        <FormLabel pt="10px">Name</FormLabel>
        <Input
          value={todo.title}
          bg="gray.50"
          name="title"
          onChange={onChange}
          onBlur={handleBlur}
          // isRequired
        />
        <Text color="red.500">{touched.title && errors.title}</Text>
      </FormControl>
      <FormControl>
        <FormLabel pt="10px">Description</FormLabel>
        <Input
          value={todo.description}
          bg="gray.50"
          name="description"
          onChange={onChange}
          onBlur={handleBlur}
          // isRequired
        />
        <Text color="red.500">{touched.description && errors.description}</Text>
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
