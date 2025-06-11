export interface Form {
  id: string;
  name: string;
  fields: string[];
  dependencies: string[]; // IDs dos formulários dos quais este depende
}

export interface PrefillMapping {
  type: "form" | "global";
  sourceFormId?: string; // definido se type === "form"
  sourceField?: string;
  sourceGlobalKey?: string; // definido se type === "global"
}

export interface FormWithPrefill extends Form {
  prefillMapping: {
    [field: string]: PrefillMapping | null;
  };
}

