import React from 'react';
import { Form, Formik } from 'formik';
import Loader from '../../Loader';
import Input from '../form-inputs/Input';
import InputArray from '../form-inputs/InputArray';
import Song from '../../../../types/Song';
import validate from './validate';

interface Props {
  isEditForm?: boolean;
  onSubmit?: (values, actions) => void;
  initialValues?: Partial<Song>;
}

const defaultValues = {
  title: '',
  url: '',
  author: '',
  key: '',
  tempo: 120,
  songSelectId: '',
  tags: [],
  notes: [],
};

const parseInitialValues = (iv) => {
  const notes = {
    current: '',
    values: iv.notes || defaultValues.notes,
  };
  const tags = {
    current: '',
    values: iv.tags || defaultValues.tags,
  };
  return { ...defaultValues, ...iv, notes, tags };
};

const parseSubmitValues = (v) => {
  const notes = [...v.notes.values];
  const tags = [...v.tags.values];
  if (v.notes.current) notes.push(v.notes.current);
  if (v.tags.current) tags.push(v.tags.current);
  return { ...v, notes, tags };
};

// Component
const SongForm: React.FC<Props> = ({
  initialValues: iv = {},
  isEditForm,
  onSubmit,
}) => {
  const initialValues = parseInitialValues(iv);
  const isAddForm = !isEditForm || !iv.songId;
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
          <Input label="Title" name="title" />
          <Input label="Author" name="author" />
          <Input label="Key" name="key" />
          <Input label="Tempo" name="tempo" />
          <Input label="Song Select ID" name="songSelectId" />
          <Input label="URL" name="url" />
          <InputArray label="Tags" name="tags" />
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

export default SongForm;
