export interface GlobalOption {
  id: string;
  label: string;
  sourceGlobalKey: string;
}

export const GLOBAL_OPTIONS: GlobalOption[] = [
  { id: "global1", label: "Action Property", sourceGlobalKey: "action_property" },
  {
    id: "global2",
    label: "Client Organisation Property",
    sourceGlobalKey: "client_org_property"
  }
];

