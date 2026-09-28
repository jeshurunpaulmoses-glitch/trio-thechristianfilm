/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TRANSACTIONS } from "@/lib/funding-data";
import { useMemo } from "react";
import { motion } from "framer-motion";

export function ProductionTimelineChart() {
  const chartData = useMemo(() => {
    const grouped = new Map<
      string,
      {
        date: string;
        totalAmount: number;
        transactions: any[];
      }
    >();

    TRANSACTIONS.forEach((t) => {
      const key = t.date;
      if (!grouped.has(key)) {
        grouped.set(key, { date: key, totalAmount: 0, transactions: [] });
      }
      const dayData = grouped.get(key)!;
      dayData.totalAmount += t.amount;
      dayData.transactions.push(t);
    });

    return Array.from(grouped.values());
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 border border-t-[3px] border-t-cyan-500 border-white/10 rounded-lg p-4 backdrop-blur-md max-w-[280px] shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
            {label}
          </p>
          <p className="text-xl font-display text-cyan-400 mb-3">
            Total: ₹{new Intl.NumberFormat("en-IN").format(data.totalAmount)}
          </p>

          <div className="space-y-3 pt-2 max-h-[150px] overflow-y-auto custom-scrollbar">
            {data.transactions.map((t: any, i: number) => (
              <div key={i} className="text-xs flex flex-col gap-1">
                <div className="flex justify-between items-center text-white/95">
                  <span className="font-medium tracking-wide">{t.category}</span>
                  <span className="font-mono text-cyan-200">
                    ₹{new Intl.NumberFormat("en-IN").format(t.amount)}
                  </span>
                </div>
                <span className="text-white/40">{t.notes}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1 }}
      className="w-full glass-soft p-4 md:p-8 rounded-xl border border-primary/10 mt-8 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <h3 className="relative z-10 text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        Production Spending Timeline
      </h3>

      <div className="w-full h-[400px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(6,182,212,0.4)", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
              activeDot={{ r: 6, fill: "#06b6d4", stroke: "rgba(0,0,0,0.8)", strokeWidth: 2 }}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
