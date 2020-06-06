import React from 'react';
import { useField, FieldConfig } from 'formik';
import ErrorMessage from '../../ErrorMessage';

interface Props extends React.InputHTMLAttributes<any> {
  label?: string;
  skinny?: boolean;
  onChange?: (...args: any[]) => void;
}

const FormGroupWrap: React.FC<{ isWrapped: boolean }> = ({
  isWrapped,
  children,
}) =>
  isWrapped ? <div className="form-group">{children}</div> : <>{children}</>;

const Input: React.FC<Props> = ({ label, onChange, skinny, ...props }) => {
  const [field, meta, helpers] = useField(props as FieldConfig);
  if (onChange) field.onChange = (e) => onChange(e, helpers);
  return (
    <FormGroupWrap isWrapped={!skinny}>
      <div className="d-flex align-items-center">
        {label && <div style={{ flex: 10, flexGrow: 1 }}>{label}</div>}
        <div style={{ width: '75%' }}>
          <input className="form-control" {...props} {...field} />
        </div>
      </div>
      <ErrorMessage error={meta.error} isHidden={!meta.touched} />
    </FormGroupWrap>
  );
};

export default Input;
