import React from 'react';
import { useField } from 'formik';
import ErrorMessage from '../../ErrorMessage';
interface Props {
  label?: string;
  name: string;
  includeInputValue?: boolean;
}

const InputArray: React.FC<Props> = ({
  label,
  name,
  includeInputValue = true,
  ...props
}) => {
  const [{ value }, meta, helpers] = useField(name);
  const hash = String(Date.now() + Math.random());
  const addCurrent = () => {
    if (!value.current) return;
    if (meta.error) return helpers.setTouched(true);
    helpers.setValue({
      current: '',
      values: [...value.values, value.current],
    });
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

  return (
    <div className="mb-3">
      {label && <label htmlFor={hash}>{label}</label>}
      {value.values.map((v, i) => (
        <div key={i} className="d-flex justify-content-between">
          {v}
          <button
            type="button"
            onClick={() => removeByIndex(i)}
            className="btn btn-sm btn-link"
          >
            <ion-icon name="close" />
          </button>
        </div>
      ))}
      <input
        className="form-control"
        onChange={(e) => setCurrent(e.target.value)}
        value={value.current}
        onKeyDown={onKeyDown}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      <ErrorMessage error={meta.error} isHidden={!meta.touched} />
    </div>
  );
};

export default InputArray;
