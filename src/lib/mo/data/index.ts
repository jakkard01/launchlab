import { localAdapter } from "./localAdapter";
import type { MoDataAdapter } from "./types";

export const getMoDataAdapter = async (): Promise<MoDataAdapter> => {
  const backend = process.env.DATA_BACKEND ?? "supabase";

  if (backend === "sheets") {
    const adapterModule = await import("./sheetsAdapter");
    return adapterModule.sheetsAdapter;
  }

  if (backend === "supabase") {
    const adapterModule = await import("./supabaseAdapter");
    return adapterModule.supabaseAdapter;
  }

  return localAdapter;
};
