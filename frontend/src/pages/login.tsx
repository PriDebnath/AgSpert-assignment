import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldProps, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/features/login/loginApi";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(2, "Password must be at least 2 characters")
    .required("Password is required"),
});

export const Login = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: any, actions: any) => {
    console.log("handle submit");
    try {
      await dispatch(login(values)).unwrap();
      navigate("/sale-order");
    } catch (error) {
      alert("Login failed: " + error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className="form-container">
      <div className="form-box ">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions);
          }}
        >
          {(props: FormikProps<FormValues>) => (
            <Form>
              <Field name="name">
                {({ field, form }: FieldProps<string>) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>
                      {typeof form.errors.name === "string"
                        ? form.errors.name
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: FieldProps<string>) => (
                  <FormControl
                    isInvalid={!!(form.errors.email && form.touched.email)}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="email" type="email" />
                    <FormErrorMessage>
                      {typeof form.errors.email === "string"
                        ? form.errors.email
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FieldProps<string>) => (
                  <FormControl
                    isInvalid={
                      !!(form.errors.password && form.touched.password)
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>
                      {typeof form.errors.password === "string"
                        ? form.errors.password
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
