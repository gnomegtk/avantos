import React, { useEffect, useState } from 'react';
import { getActionBlueprintGraph } from './services/api';
import { FormWithPrefill } from './types';
import FormList from './components/FormList';
import PrefillMapping from './components/PrefillMapping';

const App: React.FC = () => {
  const [forms, setForms] = useState<FormWithPrefill[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the forms from the simulated API
    getActionBlueprintGraph().then((data) => {
      setForms(data);
      if (data.length > 0) {
        setSelectedFormId(data[0].id);
      }
    });
  }, []);

  const handleSelectForm = (formId: string) => {
    setSelectedFormId(formId);
  };

  const handleUpdatePrefill = (
    formId: string,
    field: string,
    mapping: FormWithPrefill['prefillMapping'][string] | null
  ) => {
    setForms((prevForms) =>
      prevForms.map((form) => {
        if (form.id === formId) {
          return {
            ...form,
            prefillMapping: {
              ...form.prefillMapping,
              [field]: mapping,
            },
          };
        }
        return form;
      })
    );
  };

  const selectedForm = forms.find((f) => f.id === selectedFormId);

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Forms</h2>
        <FormList
          forms={forms}
          selectedFormId={selectedFormId}
          onSelectForm={handleSelectForm}
        />
      </div>
      <div className="content">
        {selectedForm ? (
          <PrefillMapping
            form={selectedForm}
            allForms={forms}
            onUpdateMapping={handleUpdatePrefill}
          />
        ) : (
          <p>Please select a form.</p>
        )}
      </div>
    </div>
  );
};

export default App;

