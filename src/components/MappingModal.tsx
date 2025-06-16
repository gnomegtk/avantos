import React, { useState, useRef } from 'react';
import { FormWithPrefill, PrefillMapping as PrefillMappingType } from '../types';
import { GLOBAL_OPTIONS } from '../constants';

interface MappingModalProps {
  fieldName: string;
  dependentForms: FormWithPrefill[];
  onClose: () => void;
  onSelectMapping: (mapping: PrefillMappingType) => void;
  selectedMapping?: PrefillMappingType | null;
}

const MappingModal: React.FC<MappingModalProps> = ({
  fieldName,
  dependentForms,
  onClose,
  onSelectMapping,
  selectedMapping = null,
}) => {
  // Local state for search input
  const [searchTerm, setSearchTerm] = useState('');
  // Create a ref array for the global options for arrow key navigation
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const filteredGlobalOptions = GLOBAL_OPTIONS.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number,
    option: typeof GLOBAL_OPTIONS[0]
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = index + 1 < optionRefs.current.length ? index + 1 : 0;
      optionRefs.current[nextIndex]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = index - 1 >= 0 ? index - 1 : optionRefs.current.length - 1;
      optionRefs.current[prevIndex]?.focus();
    } else if (event.key === 'Enter') {
      onSelectMapping({
        type: 'global',
        sourceGlobalKey: option.sourceGlobalKey,
      });
    }
  };

  // Handler to close the modal when the Escape key is pressed on the overlay
  const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      data-testid="modal-overlay"
      tabIndex={-1}
      onKeyDown={handleOverlayKeyDown}
      onClick={(e) => {
        // Only close the modal if the click is directly on the overlay
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal" role="dialog">
        <h3>Select data element to map for "{fieldName}"</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        <div className="modal-section">
          <h4 data-testid="global-data-header">Global Data</h4>
          {filteredGlobalOptions.length > 0 ? (
            <ul>
              {filteredGlobalOptions.map((option, index) => (
                <li
                  key={option.id}
                  role="button"
                  tabIndex={0}
                  ref={(el) => (optionRefs.current[index] = el)}
                  data-testid={
                    selectedMapping &&
                    selectedMapping.type === 'global' &&
                    selectedMapping.sourceGlobalKey === option.sourceGlobalKey
                      ? 'selected-option'
                      : undefined
                  }
                  className={
                    selectedMapping &&
                    selectedMapping.type === 'global' &&
                    selectedMapping.sourceGlobalKey === option.sourceGlobalKey
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    onSelectMapping({
                      type: 'global',
                      sourceGlobalKey: option.sourceGlobalKey,
                    })
                  }
                  onKeyDown={(e) => handleKeyDown(e, index, option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching global data found</p>
          )}
        </div>
        {dependentForms && dependentForms.length > 0 && (
          <div className="modal-section">
            <h4 data-testid="dependent-forms-header">Dependent Forms</h4>
            <ul>
              {dependentForms.map((form) => (
                <li key={form.id}>
                  <strong>{form.name}</strong>
                  <ul>
                    {form.fields.map((field) => (
                      <li
                        key={field}
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          onSelectMapping({
                            type: 'form',
                            sourceFormId: form.id,
                            sourceField: field,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onSelectMapping({
                              type: 'form',
                              sourceFormId: form.id,
                              sourceField: field,
                            });
                          }
                        }}
                      >
                        {field}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="close-btn" onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default MappingModal;

