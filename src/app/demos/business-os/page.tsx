"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { buildWhatsappLink } from "../../../lib/site";

const statusOptions = ["Pendiente", "En proceso", "Entregado"] as const;

type OrderStatus = (typeof statusOptions)[number];

type Order = {
  id: string;
  customer: string;
  product: string;
  quantity: number;
  status: OrderStatus;
  updatedAt: string;
};

type ActivityEvent = {
  id: string;
  timestamp: string;
  orderId: string;
  from: OrderStatus;
  to: OrderStatus;
};

const initialOrders: Order[] = [
  {
    id: "OS-1021",
    customer: "Grupo Luma",
    product: "Kit ecommerce",
    quantity: 3,
    status: "Pendiente",
    updatedAt: "2026-01-18 09:14",
  },
  {
    id: "OS-1022",
    customer: "Tienda Nova",
    product: "Dashboard pedidos",
    quantity: 1,
    status: "En proceso",
    updatedAt: "2026-01-18 11:32",
  },
  {
    id: "OS-1023",
    customer: "Cafe Norte",
    product: "Automatizacion soporte",
    quantity: 2,
    status: "Entregado",
    updatedAt: "2026-01-17 18:40",
  },
  {
    id: "OS-1024",
    customer: "Moda Mar",
    product: "Landing premium",
    quantity: 1,
    status: "Pendiente",
    updatedAt: "2026-01-18 12:05",
  },
  {
    id: "OS-1025",
    customer: "EcoBox",
    product: "Setup WhatsApp",
    quantity: 4,
    status: "En proceso",
    updatedAt: "2026-01-18 13:18",
  },
  {
    id: "OS-1026",
    customer: "Logistica Sur",
    product: "Panel operativo",
    quantity: 2,
    status: "Entregado",
    updatedAt: "2026-01-16 16:20",
  },
  {
    id: "OS-1027",
    customer: "Studio Alma",
    product: "Bot FAQ",
    quantity: 1,
    status: "Pendiente",
    updatedAt: "2026-01-18 14:48",
  },
  {
    id: "OS-1028",
    customer: "Tech Aria",
    product: "Integracion CRM",
    quantity: 2,
    status: "En proceso",
    updatedAt: "2026-01-18 15:10",
  },
];

const whatsappLink = buildWhatsappLink(
  "demo_business_os",
  "Hola, vengo desde poweredbyia.com. Quiero una demo de Business OS para pedidos."
);

export default function BusinessOSDemoPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState<ActivityEvent[]>([]);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "Todos" || order.status === statusFilter;
      const matchesSearch = normalizedSearch
        ? order.customer.toLowerCase().includes(normalizedSearch) ||
          order.product.toLowerCase().includes(normalizedSearch)
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const kpis = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((order) => order.status === "Pendiente").length;
    const inProgress = orders.filter((order) => order.status === "En proceso").length;
    const delivered = orders.filter((order) => order.status === "Entregado").length;

    return {
      total,
      pending,
      inProgress,
      delivered,
    };
  }, [orders]);

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId || order.status === newStatus) {
          return order;
        }

        const updatedOrder = {
          ...order,
          status: newStatus,
          updatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        };

        setActivity((prevActivity) => {
          const nextActivity: ActivityEvent = {
            id: `${orderId}-${Date.now()}`,
            timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
            orderId,
            from: order.status,
            to: newStatus,
          };

          return [nextActivity, ...prevActivity].slice(0, 8);
        });

        return updatedOrder;
      })
    );
  }

  return (
    <main className="min-h-screen w-full px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
          Demo Business OS
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Business OS mini: pedidos y operacion
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Panel simple para coordinar pedidos, etapas y actividad del equipo.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              Total pedidos
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {kpis.total}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              Pendientes
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {kpis.pending}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              En proceso
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {kpis.inProgress}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
              Entregados
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {kpis.delivered}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2.1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
                >
                  <option value="Todos">Todos los estados</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar cliente o producto"
                  className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white outline-none focus:border-cyan-300"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  className="rounded-full bg-emerald-400 px-5 py-2 text-center text-sm font-semibold text-black transition hover:bg-emerald-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <Link
                  href="/contact?source=business-os-demo"
                  className="rounded-full border border-white/20 px-5 py-2 text-center text-sm font-semibold text-white/80 transition hover:border-cyan-300/60"
                >
                  Reservar llamada
                </Link>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-200">
                <thead className="text-xs uppercase tracking-[0.25em] text-cyan-200/70">
                  <tr className="border-b border-white/10">
                    <th className="px-2 py-3">ID</th>
                    <th className="px-2 py-3">Cliente</th>
                    <th className="px-2 py-3">Producto</th>
                    <th className="px-2 py-3">Cantidad</th>
                    <th className="px-2 py-3">Estado</th>
                    <th className="px-2 py-3">Actualizado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5">
                      <td className="px-2 py-3 text-xs text-slate-400">
                        {order.id}
                      </td>
                      <td className="px-2 py-3 font-semibold text-white">
                        {order.customer}
                      </td>
                      <td className="px-2 py-3">{order.product}</td>
                      <td className="px-2 py-3">{order.quantity}</td>
                      <td className="px-2 py-3">
                        <select
                          value={order.status}
                          onChange={(event) =>
                            handleStatusChange(
                              order.id,
                              event.target.value as OrderStatus
                            )
                          }
                          className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white outline-none focus:border-cyan-300"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-3 text-xs text-slate-400">
                        {order.updatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">
              Actividad reciente
            </p>
            {activity.length === 0 ? (
              <p className="mt-4 text-sm text-slate-300">
                Aun no hay movimientos. Cambia un estado para registrar actividad.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {activity.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200"
                  >
                    <p className="text-xs text-slate-400">{event.timestamp}</p>
                    <p className="mt-2 font-semibold text-white">
                      Pedido {event.orderId}
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      {event.from} → {event.to}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
