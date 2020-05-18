import React, { useContext } from "react";
import { Formik, Form } from "formik";
import validate from "./validate";
import gpib from "../../apis/gpib";
import Loader from "../Loader";
import Input from "../form-inputs/Input";
import { AuthContext } from "../Auth";
import { Redirect } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = ({ initialValues = { username: "", password: "" } }) => {
  const { user, login } = useContext(AuthContext);
  if (user) return <Redirect to="/" />;

  const onSubmit = async (values, actions) => {
    try {
      const { data: user } = await gpib.open.post(
        "/user/authenticate",
        values
      );
      login(user);
    } catch (e) {
      console.log(e);
      actions.setErrors({
        password: "Unable to login. Please check your email or password."
      });
      actions.setSubmitting(false);
    }
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
          <Input name="username" placeholder="email" />
          <Input name="password" type="password" placeholder="password" />
          <button
            className="btn btn-primary btn-block relative d-flex justify-content-center"
            type="submit"
            disabled={isSubmitting}
          >
            <Loader
              loading={isSubmitting}
              noBackground
              noStretch
              light
              diameter="1.4rem"
            />
            <span className="mx-2">Login</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
