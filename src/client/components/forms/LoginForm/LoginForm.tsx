import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import validate from './validate';
import server from '../../../../apis/server';
import Loader from '../../Loader';
import Input from '../form-inputs/Input';
import { AuthContext } from '../../Auth';

interface FormValues {
  email?: string;
  password?: string;
}

interface Props {
  initialValues?: FormValues;
  onLogin?: (a?: FormValues) => void;
}

const LoginForm: React.FC<Props> = ({
  initialValues = { email: '', password: '' },
  onLogin,
}) => {
  const { login } = useContext(AuthContext);
  // if (user && !noRedirect) return <Redirect to="/" />;

  const onSubmit = async (values, actions) => {
    try {
      await login(values);
      if (onLogin) onLogin();
      actions.setSubmitting(false);
    } catch (e) {
      console.log(e);
      actions.setErrors({ hidden: e });
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
        <Form className="login-form" style={{ width: '100%', flex: 1 }}>
          <Input name="email" placeholder="email" />
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
