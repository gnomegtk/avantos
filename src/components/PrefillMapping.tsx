// src/components/PrefillMapping.tsx
import React, { useState } from 'react';
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

const PrefillMapping: React.FC<PrefillMappingProps> = ({
  form,
  allForms,
  onUpdateMapping,
}) => {
  const [modalField, setModalField] = useState<string | null>(null);

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

  // Utilize a função getDependentForms (válida mesmo se dependencies for vazio)
  const dependentForms = getDependentForms(form, allForms);

  return (
    <div className="prefill-mapping">
      <h2>Prefill fields for {form.name}</h2>
      <ul>
        {(form.fields || []).map((field) => {
          const mapping =
            (form.prefillMapping || {})[field] || null;
          return (
            <li key={field} className="prefill-field">
              <span
                className="field-name"
                onClick={() => {
                  // Se o campo não tiver mapeamento, abre o modal
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
                <span className="no-mapping"> (Click to map)</span>
              )}
              {mapping && (
                <button
                  className="clear-btn"
                  onClick={() => onUpdateMapping(form.id, field, null)}
                >
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

