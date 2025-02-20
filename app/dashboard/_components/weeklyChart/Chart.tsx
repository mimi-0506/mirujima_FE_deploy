import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import useIsSmallScreen from '@/hooks/nav/useIsSmallScreen';

export type ChartDataType = {
  day: string;
  percentage: number;
};

export default function Chart({ data }: { data: ChartDataType[] }) {
  const { isSmallScreen } = useIsSmallScreen();

  const surfaceWidth = 600;
  const surfaceHeight = isSmallScreen ? 217 : 274;

  return (
    <ResponsiveContainer width="100%" height={surfaceHeight}>
      <BarChart
        width={surfaceWidth}
        height={surfaceHeight}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5
        }}
        barSize={30}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="5%" stopColor="#FBA5A5" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#F86969" />
          </linearGradient>
        </defs>

        <XAxis dataKey="day" scale="point" axisLine={false} tickLine={false} orientation="top" />

        <Bar
          dataKey="percentage"
          fill="url(#gradient)"
          background={{
            fill: '#F2EFEF',
            radius: 10
          }}
          radius={10}
          animationDuration={1000}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
