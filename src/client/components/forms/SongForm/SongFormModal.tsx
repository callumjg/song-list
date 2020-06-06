import React from 'react';
import { useParams, useLocation } from 'react-router';
import qs from 'qs';
import Modal from '../../Modal';
import SongForm from './SongForm';
import history from '../../../constants/history';
import { useDispatch } from 'react-redux';
import {
  postSong,
  patchSong,
  postAndAddSong,
  patchAndAddSong,
} from '../../../actions/songs';
import Song from '../../../../types/Song';

const SongFormModal = () => {
  const { id } = useParams();
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const isEditForm = !!id;
  const dispatch = useDispatch();

  const onSubmit = async (values, actions, modalActions) => {
    const isSamePage = values.tags.find((t) => t === query.category);
    if (isSamePage) {
      isEditForm
        ? await dispatch(patchAndAddSong(values))
        : await dispatch(postAndAddSong(values));
    } else {
      isEditForm ? await patchSong(values) : await postSong(values);
    }

    actions.setSubmitting(false);
    modalActions.onDismiss();
  };

  const getInitialValues = () => {
    const iv: Partial<Song> = {};
    if (query.category) iv.tags = [query.category];
    return iv;
  };

  const getTitle = () => {
    let title = isEditForm ? `Edit Song` : 'New Song';
    if (query.category) title += ` (${query.category})`;
    return title;
  };

  return (
    <Modal title={getTitle()} isOpen={true} onDismiss={() => history.push('/')}>
      {({ wrapCallback }) => (
        <SongForm
          isEditForm={isEditForm}
          onSubmit={wrapCallback(onSubmit)}
          initialValues={getInitialValues()}
        />
      )}
    </Modal>
  );
};

export default SongFormModal;
