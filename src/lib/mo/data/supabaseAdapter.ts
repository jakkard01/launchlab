import type { MoDataAdapter } from "./types";

const notConfigured = () => {
  throw new Error(
    "Supabase backend no configurado: define URL y keys en entorno."
  );
};

export const supabaseAdapter: MoDataAdapter = {
  async getProducts() {
    return notConfigured();
  },
  async getAdminSnapshot() {
    return notConfigured();
  },
  async updateStock() {
    return notConfigured();
  },
  async updatePrice() {
    return notConfigured();
  },
  async updatePromo() {
    return notConfigured();
  },
  async updateHot() {
    return notConfigured();
  },
  async logOrder() {
    return notConfigured();
  },
  async removeOrder() {
    return notConfigured();
  },
  async logDailySales() {
    return notConfigured();
  },
  async getStats() {
    return notConfigured();
  },
};
