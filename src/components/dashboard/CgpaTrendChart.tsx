"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import AccentCard from "./AccentCard";

interface TrendPoint {
  term: string;
  cgpa: number;
}

export default function CgpaTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <AccentCard title="Term-wise CGPA">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 24, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="term"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              domain={[2, 4]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceLine y={3} stroke="#cbd5e1" strokeDasharray="4 4" />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                borderColor: "#e2e8f0",
                fontSize: 12,
              }}
              labelStyle={{ color: "#1e293b", fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: "#f97316" }}
              formatter={(value) => [Number(value).toFixed(2), "CGPA"]}
            />
            <Line
              type="monotone"
              dataKey="cgpa"
              stroke="#f97316"
              strokeWidth={2.5}
              dot={{ r: 5, fill: "#10b981", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
              label={{ position: "top", fontSize: 11, fontWeight: 600, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AccentCard>
  );
}
