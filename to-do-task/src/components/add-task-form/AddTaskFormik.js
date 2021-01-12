import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const initialState = {
  title: "",
  severity: "Normal",
  progress: "to_do",
  date: new Date().toDateString(),
  description: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, "Too Short! Title needs to be between six to ten characters")
    .max(10, "Too Long! Title needs to be between six to ten characters")
    .required("Title is required"),
  description: Yup.string()
    .min(8, "Too Short! Description needs to be at least eight characters")
    .max(50, "Too Long!")
    .required("Description is required"),
});

export default function AddTaskFormik({
  onSubmitt,
  // isSubmitting,
  isSuccess,
  currentState,
  buttonName,
}) {
  const [todo, setTodo] = React.useState(currentState || initialState);

  return (
    <Formik
      initialValues={todo}
      validationSchema={validationSchema}
      onSubmit={(values, {resetForm, setSubmitting}) => {
        onSubmitt(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Field name="title">
            {({ field, form }) => (
              <FormControl>
                <FormLabel pt="10px">Name</FormLabel>
                <Input {...field} bg="gray.50" name="title" />
                {form.errors.title && form.touched.title ? (
                  <Text color="red.500">{form.errors.title}</Text>
                ) : null}
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({ field, form }) => (
              <FormControl>
                <FormLabel pt="10px">Description</FormLabel>
                <Input {...field} bg="gray.50" name="description" />
                {form.errors.description && form.touched.description ? (
                  <Text color="red.500">{form.errors.description}</Text>
                ) : null}
              </FormControl>
            )}
          </Field>
          <Field name="severity">
            {({ field, form }) => (
              <FormControl>
                <FormLabel pt="10px">Severity</FormLabel>
                <Select {...field} bg="gray.50" name="severity">
                  <option>Normal</option>
                  <option>Important</option>
                  <option>Urgent</option>
                </Select>
              </FormControl>
            )}
          </Field>

          <Button type="submit" disabled={isSubmitting}>
            {buttonName}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
