import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useApp } from '../context/AppContext';

Chart.register(...registerables);

export default function RetourChart({ labels, data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { theme } = useApp();

  const chartLabels = labels || ['S-8', 'S-7', 'S-6', 'S-5', 'S-4', 'S-3', 'S-2', 'S-1'];
  const chartValues = data || [42, 38, 51, 47, 55, 49, 62, 58];

  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    const dark = theme === 'dark';
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Retours',
          data: chartValues,
          backgroundColor: '#dc2626',
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: dark ? '#334155' : '#e2e8f0' },
            ticks: { color: dark ? '#94a3b8' : '#64748b' },
          },
          x: {
            grid: { display: false },
            ticks: { color: dark ? '#94a3b8' : '#64748b' },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [theme, chartLabels, chartValues]);

  return <canvas ref={canvasRef} height={120} />;
}
