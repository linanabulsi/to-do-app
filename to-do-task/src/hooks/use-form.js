import React from "react";

export const useForm = (initialState, validate, onSubmit) => {
  const [todoCard, setTodoCard] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = (name, value, type) => {
    setTodoCard((todo) => ({
      ...todo,
      [name]: value,
    }));

    type === "text" &&
      setTouched({
        ...touched,
        [name]: true,
      });
  };

  const handleBlur = (name, value) => {
    const { [name]: removedError, ...rest } = errors;
    const error = validate[name](value);
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  const handleSubmit = () => {
    const formValidation = Object.keys({
      title: todoCard.title,
      description: todoCard.description,
    }).reduce(
      (acc, key) => {
        const newError = validate[key](todoCard[key]);
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
          title: todoCard.title,
          description: todoCard.description,
        }).length &&
      Object.values(formValidation.touched).every((t) => t === true)
    ) {
      onSubmit(todoCard);
    }
  };

  return { todoCard, setTodoCard, errors, touched, handleSubmit, handleBlur, handleChange };
};
