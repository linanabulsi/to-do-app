import React from "react";

const actionTypes = {
  ON_CHANGE_VALUES: "ON_CHANGE_VALUES",
  ON_CHANGE_TOUCHED: "ON_CHANGE_TOUCHED",
  ON_BLUR: "ON_BLUR",
  ON_SUBMIT: "ON_SUBMIT",
  ON_INITIAL_VALUES: "ON_INITAL_VALUES",
};

function asyncReducer(prevState, action) {
  switch (action.type) {
    case actionTypes.ON_CHANGE_VALUES:
      return {
        ...prevState,
        values: { ...prevState.values, [action.field]: action.value },
      };
    case actionTypes.ON_CHANGE_TOUCHED:
      return {
        ...prevState,
        touched: { ...prevState.touched, [action.field]: action.value },
      };
    case actionTypes.ON_BLUR:
      return {
        ...prevState,
        errors: { ...prevState.errors, [action.field]: action.value },
      };
    case actionTypes.ON_SUBMIT:
      return {
        ...prevState,
        errors: action.errors,
        touched: action.touched,
      };
    case actionTypes.ON_INITIAL_VALUES:
      return {
        ...prevState,
        values: action.initial,
      };
    default:
      throw new Error("action not defined");
  }
}

const initializer = (initialState, validationScheme) => {
  const errors = Object.assign(
    {},
    ...Object.keys(validationScheme).map((key) => ({ [key]: null }))
  );
  const touched = Object.assign(
    {},
    ...Object.keys(validationScheme).map((key) => ({ [key]: false }))
  );
  return { values: initialState, errors, touched };
};

export const useForm = (initialState, validationScheme, onSubmit) => {
  const [state, dispatch] = React.useReducer(asyncReducer, initialState, () =>
    initializer(initialState, validationScheme)
  );

  const setInitialState = () => {
    dispatch({
      type: actionTypes.ON_INITIAL_VALUES,
      initial: initialState,
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: actionTypes.ON_CHANGE_VALUES,
      field: [e.target.name],
      value: e.target.value,
    });
    e.target.type === "text" &&
      dispatch({
        type: actionTypes.ON_CHANGE_TOUCHED,
        field: [e.target.name],
        value: true,
      });
  };

  const handleBlur = (e) => {
    const error = validationScheme[e.target.name](e.target.value);
    dispatch({
      type: actionTypes.ON_BLUR,
      field: [e.target.name],
      value: state.touched[e.target.name] ? error : null,
    });
  };

  const handleSubmit = () => {
    const formValidation = Object.keys(validationScheme).reduce(
      (acc, key) => {
        const newError = validationScheme[key](state.values[key]);
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
        errors: { ...state.errors },
        touched: { ...state.touched },
      }
    );
    dispatch({
      type: actionTypes.ON_SUBMIT,
      errors: formValidation.errors,
      touched: formValidation.touched,
    });
    if (
      Object.values(formValidation.errors).every((t) => t === null) &&
      Object.values(formValidation.touched).length ===
        Object.values(validationScheme).length &&
      Object.values(formValidation.touched).every(Boolean)
    ) {
      onSubmit(state.values);
    }
  };

  return { ...state, handleSubmit, handleBlur, handleChange, setInitialState };
};
