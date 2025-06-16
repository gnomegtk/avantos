import React, { useState, useEffect } from 'react';
import { FormWithPrefill, PrefillMapping as PrefillMappingType } from '../types';
import MappingModal from './MappingModal';
import { getDependentForms } from '../utils/dependency';

interface PrefillMappingProps {
  form: FormWithPrefill;
  allForms: FormWithPrefill[];
  onUpdateMapping: (
    formId: string,
    field: string,
    mapping: PrefillMappingType | null
  ) => void;
}

const PrefillMapping: React.FC<PrefillMappingProps> = ({ form, allForms, onUpdateMapping }) => {
  const [modalField, setModalField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const requiredFields = form.field_schema?.required || [];
    const errors: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      if (!form.prefillMapping?.[field]) {
        errors[field] = true;
      }
    });
    setValidationErrors(errors);
  }, [form]);

  const handleOpenModal = (field: string) => {
    setModalField(field);
  };

  const handleCloseModal = () => {
    setModalField(null);
  };

  const handleMappingSelect = (mapping: PrefillMappingType) => {
    if (modalField) {
      onUpdateMapping(form.id, modalField, mapping);
      setModalField(null);
    }
  };

  const dependentForms = getDependentForms(form, allForms);

  return (
    <div className="prefill-mapping">
      <h2>Prefill fields for {form.name}</h2>
      <ul>
        {(form.fields.filter(Boolean) as string[]).map((field) => {
          const mapping = form.prefillMapping?.[field] || null;
          const isRequired = form.field_schema?.required?.includes(field);
          const hasError = validationErrors[field];
          return (
            <li key={field} className="prefill-field">
              <span
                className="field-name"
                onClick={() => {
                  if (!mapping) handleOpenModal(field);
                }}
              >
                {field}
              </span>
              {mapping ? (
                <span className="mapping-info">
                  {mapping.type === 'form'
                    ? `${mapping.sourceFormId} ${mapping.sourceField}`
                    : `Global: ${mapping.sourceGlobalKey}`}
                </span>
              ) : (
                <span className="no-mapping">
                  (Click to map){hasError ? <span className="error-text"> {field} is required</span> : null}
                </span>
              )}
              {mapping && (
                <button className="clear-btn" onClick={() => onUpdateMapping(form.id, field, null)}>
                  X
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {modalField && (
        <MappingModal
          fieldName={modalField}
          dependentForms={dependentForms}
          onClose={handleCloseModal}
          onSelectMapping={handleMappingSelect}
        />
      )}
    </div>
  );
};

export default PrefillMapping;

