import * as yup from 'yup';

export const SongSchema = yup.object().shape({
  songId: yup.number().integer(),
  title: yup.string(),
  url: yup.string().nullable(),
  author: yup.string().nullable(),
  key: yup.string().nullable(),
  tempo: yup.string().nullable(),
  songSelectId: yup.string().nullable(),
  isArchived: yup.boolean(),
  isDeleted: yup.boolean(),
  tags: yup.array().of(yup.string()),
});
