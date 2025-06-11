import React, { useState } from 'react';
import { FormWithPrefill, PrefillMapping as PrefillMappingType } from '../types';
import { GLOBAL_OPTIONS } from '../constants';

interface MappingModalProps {
  fieldName: string;
  dependentForms: FormWithPrefill[];
  onClose: () => void;
  onSelectMapping: (mapping: PrefillMappingType) => void;
}

const MappingModal: React.FC<MappingModalProps> = ({
  fieldName,
  dependentForms,
  onClose,
  onSelectMapping
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Global options filtered by search term
  const filteredGlobalOptions = GLOBAL_OPTIONS.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dependent forms options: filtering the fields for each form
  const filteredDependentOptions = dependentForms
    .map((form) => ({
      form,
      fields: form.fields.filter((f) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter((item) => item.fields.length > 0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Select data element to map for "{fieldName}"</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="modal-section">
          <h4>Global Data</h4>
          <ul>
            {filteredGlobalOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onSelectMapping({
                    type: 'global',
                    sourceGlobalKey: option.sourceGlobalKey
                  });
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-section">
          <h4>Dependent Forms</h4>
          {filteredDependentOptions.map(({ form, fields }) => (
            <div key={form.id}>
              <strong>{form.name}</strong>
              <ul>
                {fields.map((f) => (
                  <li
                    key={f}
                    onClick={() =>
                      onSelectMapping({ type: 'form', sourceFormId: form.id, sourceField: f })
                    }
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default MappingModal;

