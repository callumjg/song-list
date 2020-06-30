import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import validate from './validate';
import Loader from '../../Loader';
import Input from '../form-inputs/Input';
import { AuthContext } from '../../Auth';
import ErrorMessage from '../../ErrorMessage';

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
      {({ isSubmitting, errors }) => (
        <Form className="login-form" style={{ width: '100%', flex: 1 }}>
          <Input name="email" placeholder="email" />
          <Input name="password" type="password" placeholder="password" />
          <ErrorMessage error={errors.hidden as any} className="mb-3" />
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
