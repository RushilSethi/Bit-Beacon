import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from "react-chartjs-2";
  import { Col, Row, Typography } from "antd";
  
  // Register necessary components
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ChartTitle,
    Tooltip,
    Legend
  );
  
  const { Title } = Typography;
  
  const LineChart = ({ coinHistory, currentPrice, coinName }) => {
      const coinPrice = [];
      const coinTimestamp = [];
  
      for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
          coinPrice.push(coinHistory?.data?.history[i].price);
          coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
      }
  
      const data = {
          labels: coinTimestamp,
          datasets: [
              {
                  label: 'Price in USD',
                  data: coinPrice,
                  fill: false,
                  backgroundColor: '#0071bd',
                  borderColor: '#0071bd',
              }
          ]
      };
  
      const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                reverse: true,
                grid: {
                    color: '#303135'
                },
                ticks: {
                    color: '#303135'
                }
            },
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    beginAtZero: true,
                    color: '#303135'
                },
                grid: {
                    color: '#303135'
                }
            },
        },
    };
    
    
  
      return (
          <>
              <Row className='chart-header'>
                  <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                  <Col className='price-container'>
                      <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
                      <Title level={5} className='current-price'>Current {coinName} Price: ${currentPrice}</Title>
                  </Col>
              </Row>
              <Line data={data} options={options} />
          </>
      );
  };
  
  export default LineChart;
  