import { apiAdapter } from "./apiAdapter";
import type { MoDataAdapter } from "./types";

// Single backend path: MO client -> /api/mo/* -> Google Sheets store.
export const getMoDataAdapter = async (): Promise<MoDataAdapter> => apiAdapter;
