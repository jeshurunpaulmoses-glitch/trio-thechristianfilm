import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CONTRIBUTORS } from "@/lib/funding-data";
import { motion } from "framer-motion";

export function FundingDonutChart() {
  const specifiedContributions = CONTRIBUTORS.filter((c) => c.amount !== null) as {
    name: string;
    amount: number;
  }[];
  const unspecifiedContributions = CONTRIBUTORS.filter((c) => c.amount === null);

  const total = specifiedContributions.reduce((sum, c) => sum + c.amount, 0);

  // Group smaller contributions into "Others" for cleaner visualization if needed, but the prompt says
  // "For smaller contributions, avoid cluttering the chart with overlapping labels. Use an external legend."

  // Custom cool cinematic colors
  const COLORS = [
    "#3b82f6", // Blue
    "#8b5cf6", // Violet
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#ec4899", // Pink
    "#6366f1", // Indigo
    "#14b8a6", // Teal
    "#84cc16", // Lime
    "#64748b", // Slate
  ];

  return (
    <div className="w-full glass-soft p-8 rounded-xl border border-primary/10">
      <h3 className="text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        Where Did The Funding Come From?
      </h3>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-[400px] h-[400px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={specifiedContributions}
                cx="50%"
                cy="50%"
                innerRadius={110}
                outerRadius={160}
                paddingAngle={2}
                dataKey="amount"
                stroke="none"
              >
                {specifiedContributions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `₹${new Intl.NumberFormat("en-IN").format(value)}`}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Central Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-muted-foreground text-sm tracking-widest mb-1">TOTAL</span>
            <span className="text-3xl font-display font-bold">
              ₹{new Intl.NumberFormat("en-IN").format(total)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-sm w-full">
          <h4 className="text-sm tracking-[0.2em] text-muted-foreground border-b border-primary/20 pb-2 mb-2">
            CONTRIBUTOR LEGEND
          </h4>
          <div className="max-h-[300px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
            {specifiedContributions.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span
                    className="text-foreground/90 font-medium truncate w-[140px]"
                    title={entry.name}
                  >
                    {entry.name}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground w-12 text-right">
                    {((entry.amount / total) * 100).toFixed(1)}%
                  </span>
                  <span className="font-mono text-primary/80">
                    ₹{new Intl.NumberFormat("en-IN").format(entry.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {unspecifiedContributions.length > 0 && (
            <div className="mt-4 p-4 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground tracking-wide leading-relaxed">
              <span className="text-orange-400 font-semibold mb-1 block">NOTE:</span>
              {unspecifiedContributions.map((c) => c.name).join(", ")} &mdash; contribution amount
              not specified in source records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
