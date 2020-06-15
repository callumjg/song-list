import React, { useRef } from 'react';
import { useField } from 'formik';
import Table, { Column } from '../../tables/Table';
import ErrorMessage from '../../ErrorMessage';

interface Props {
  label?: string;
  name: string;
}

const columns: Column[] = [
  {
    target: 'left',
    style: { verticalAlign: 'middle' },
  },
  { target: 'right', style: { verticalAlign: 'middle', width: '5%' } },
];

const InputArray: React.FC<Props> = ({ label, name, ...props }) => {
  const [{ value }, meta, helpers] = useField(name);
  const el = useRef(null);

  const addCurrent = () => {
    if (!value.current) return;
    if (meta.error) return helpers.setTouched(true);
    helpers.setValue({
      current: '',
      values: [...value.values, value.current],
    });
    window.setTimeout(() => el.current.querySelector('input').focus(), 0);
  };

  const removeByIndex = (index) => {
    const newValues = value.values.filter((v, i) => i !== index);
    helpers.setValue({
      current: value.current,
      values: newValues,
    });
  };

  const setCurrent = (current) => {
    helpers.setValue({
      current,
      values: value.values,
    });
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCurrent();
    }
  };

  const onChange = (e) => setCurrent(e.target.value);
  const onBlur = () => helpers.setTouched(true);

  // {id: number, key: left, value: right}
  const dataValues = value.values.map((v, id) => ({
    id,
    left: v,
    right: (
      <button
        type="button"
        onClick={() => removeByIndex(id)}
        className="btn btn-secondary btn-sm"
      >
        <ion-icon name="close" />
      </button>
    ),
  }));
  const data = [
    ...dataValues,
    {
      id: 'input',
      left: (
        <input
          className="form-control"
          onChange={onChange}
          value={value.current}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          {...props}
        />
      ),
      right: (
        <button
          type="button"
          onClick={addCurrent}
          className="btn btn-secondary btn-sm"
        >
          <ion-icon name="add" />
        </button>
      ),
    },
  ];
  return (
    <div ref={el} className="input-array">
      {label && <div className="py-2">{label}</div>}
      <Table
        data={data}
        keyId="id"
        columns={columns}
        noHeader
        className="table-bordered mt-1"
      />
      <ErrorMessage error={meta.error} isHidden={!meta.touched} />
    </div>
  );
};

export default InputArray;
