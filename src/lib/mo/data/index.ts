import { localAdapter } from "./localAdapter";
import type { MoDataAdapter } from "./types";

export const getMoDataAdapter = async (): Promise<MoDataAdapter> => {
  const backend = process.env.DATA_BACKEND ?? "local";

  if (backend === "sheets") {
    const module = await import("./sheetsAdapter");
    return module.sheetsAdapter;
  }

  if (backend === "supabase") {
    const module = await import("./supabaseAdapter");
    return module.supabaseAdapter;
  }

  return localAdapter;
};
