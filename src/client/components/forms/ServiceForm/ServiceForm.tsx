import React from 'react';
import { Form, Formik } from 'formik';
import Loader from '../../Loader';
import Input from '../form-inputs/Input';
import InputArray from '../form-inputs/InputArray';
import Service from '../../../../types/Service';
import validate from './validate';

interface Props {
  isEditForm?: boolean;
  onSubmit?: (values, actions) => void;
  initialValues?: Partial<Service>;
}

const defaultValues = {
  date: '',
  songs: [],
  notes: [],
};

const parseInitialValues = (iv) => {
  const notes = {
    current: '',
    values: iv.notes || defaultValues.notes,
  };
  const songs = {
    current: '',
    values: iv.songs || defaultValues.songs,
  };
  return { ...defaultValues, ...iv, notes, songs };
};

const parseSubmitValues = (v) => {
  const notes = [...v.notes.values];
  const songs = [...v.songs.values];
  if (v.notes.current) notes.push(v.notes.current);
  return { ...v, notes, songs };
};

// Component
const ServiceForm: React.FC<Props> = ({
  initialValues: iv = {},
  isEditForm,
  onSubmit,
}) => {
  const initialValues = parseInitialValues(iv);
  const isAddForm = !isEditForm || !iv.serviceId;
  const submitText = isAddForm ? 'Submit' : 'Save';
  const wrapOnSubmit = (values, actions) => {
    onSubmit(parseSubmitValues(values), actions);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={wrapOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
          <Input label="Date" name="date" type="date" notInline />

          <InputArray label="Songs" name="songs" />
          <InputArray label="Notes" name="notes" />
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
            <span className="mx-2">{submitText}</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceForm;
