// Composant SalesChart : courbe d’évolution des ventes (CA) sur 30 jours
// Clean code, ultra commenté, design extravagant
"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface SalesChartProps {
  labels: string[];
  data: number[];
}

export default function SalesChart({ labels, data }: SalesChartProps) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-2xl p-8 my-8 animate-fadein w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">Évolution du chiffre d’affaires (30 jours)</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Chiffre d’affaires (€)",
              data,
              borderColor: "#ec4899",
              backgroundColor: "rgba(236,72,153,0.1)",
              pointBackgroundColor: "#f59e42",
              pointBorderColor: "#ec4899",
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#a21caf", font: { weight: "bold" } },
            },
            y: {
              grid: { color: "#f3e8ff" },
              ticks: { color: "#0f3460", font: { weight: "bold" } },
            },
          },
        }}
      />
    </div>
  );
}
