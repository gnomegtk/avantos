export interface Form {
  id: string;
  name: string;
  fields: string[];
  dependencies: string[]; // IDs of forms this one depends on
}

export interface PrefillMapping {
  type: "form" | "global";
  sourceFormId?: string; // defined if type === "form"
  sourceField?: string;
  sourceGlobalKey?: string; // defined if type === "global"
}

export interface FormWithPrefill extends Form {
  prefillMapping: {
    [field: string]: PrefillMapping | null;
  };
}

