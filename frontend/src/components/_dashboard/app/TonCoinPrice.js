import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { BaseOptionChart } from '../../charts';

const getPriceValues = (data) => {
  return data.map((value) => {
    return !!value.mean ? value.mean.toFixed(4) : 0;
  });
}

const getPriceLabels = (data) => {
  return data.map((value) => {
    return value.time;
  });
}


const formatChartData = (data, label) => {
  return [{
      name: label,
      type: 'column',
      data: getPriceValues(data)//[23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 0]
  }];
}

const formatChartOptions = (data) => {
  return merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: getPriceLabels(data),
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(4)} $`;
          }
          return y;
        }
      }
    }
  });
}


export default function TonCoinPrice(props) {
  console.log(props);
  const {priceData} = props;
  const chartOptions = formatChartOptions(priceData);

  return (
    <Card>
      <CardHeader title="TONCoin Price" subheader="(+43%) than last week" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={ formatChartData(priceData, 'Ton.sh') } options={ chartOptions } height={ 364 } />
      </Box>
    </Card>
  );
}
