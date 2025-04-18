// Composant PaymentMethodsChart : répartition des moyens de paiement (admin dashboard)
// Clean code, ultra commenté, design extravagant
"use client";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PaymentMethodsChartProps {
  labels: string[];
  data: number[];
}

export default function PaymentMethodsChart({ labels, data }: PaymentMethodsChartProps) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-yellow-400 to-pink-600">Répartition des moyens de paiement</h2>
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              label: "Nombre de paiements",
              data,
              backgroundColor: [
                "#ec4899",
                "#f59e42",
                "#6366f1",
                "#fbbf24",
                "#a21caf",
              ],
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "bottom", labels: { color: "#0f3460", font: { weight: "bold" } } },
            tooltip: { mode: "index", intersect: false },
          },
        }}
      />
    </div>
  );
}
