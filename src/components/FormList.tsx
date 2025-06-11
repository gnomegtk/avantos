import React from 'react';
import { FormWithPrefill } from '../types';

interface FormListProps {
  forms: FormWithPrefill[];
  selectedFormId: string | null;
  onSelectForm: (formId: string) => void;
}

const FormList: React.FC<FormListProps> = ({ forms, selectedFormId, onSelectForm }) => {
  return (
    <ul className="form-list">
      {forms.map((form) => (
        <li
          key={form.id}
          className={form.id === selectedFormId ? 'selected' : ''}
          onClick={() => onSelectForm(form.id)}
        >
          {form.name}
        </li>
      ))}
    </ul>
  );
};

export default FormList;

