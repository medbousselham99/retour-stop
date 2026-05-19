import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { CHART_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';

Chart.register(...registerables);

export default function RetourChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { theme } = useApp();

  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    const dark = theme === 'dark';
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: CHART_DATA.labels,
        datasets: [{
          label: 'Retours',
          data: CHART_DATA.values,
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
  }, [theme]);

  return <canvas ref={canvasRef} height={120} />;
}
