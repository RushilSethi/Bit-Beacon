import React from 'react';
import { Line } from 'react-chartjs-2';
import { Spin } from 'antd';
import { useGetExchangeVolumeQuery } from '../services/cryptoExchanges';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExchangeVolumeChart = ({ exchangeId }) => {
  const { data, isFetching, isError } = useGetExchangeVolumeQuery({ exchangeId });

  if (isFetching) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error fetching volume chart data</div>;
  }

  const chartConfig = {
    labels: data.map(item => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: '7d Volume',
        data: data.map(item => item[1]),
        fill: false,
        borderColor: '#D4A017',
        backgroundColor: '#FFBF00',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="volume-chart-container" style={{maxWidth:"20vw", height: 'auto', minHeight: '150px', paddingBottom: '10px' }}>
      <div style={{ whiteSpace: 'nowrap', width: 'max-content' }}>
        <Line data={chartConfig} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExchangeVolumeChart;
