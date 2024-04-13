import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { TExpenses } from '../../../service/type';

interface ChartProps {
  expensesData: TExpenses[];
}

const Chart: React.FC<ChartProps> = ({ expensesData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User`s Expenses 2023',
      },
    },
  };

  const datasets = expensesData.map((item: any) => {
    return {
      label: item.label,
      backgroundColor: item.backgroundColor,
      borderColor: item.borderColor,
      borderWidth: 1,
      hoverBackgroundColor: 'white',
      hoverBorderColor: 'black',
      data: item.totalExpensesPerMonth.map((exp: any) => exp.expenses)
    }
  });

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: datasets
  };

  // backgroundColor: 'rgba(255, 255, 0, 0.5)',
  // borderColor: 'rgba(255, 255, 0, 1)',

  const chartHeight = '400';
  const chartWidth = '1024';

  return (
    <div className="w-full mx-auto mt-4">
      <Bar data={data} options={options} width={chartWidth} height={chartHeight} />
    </div>
  );
};

export default Chart;
