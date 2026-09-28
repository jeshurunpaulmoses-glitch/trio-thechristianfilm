import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { OVERVIEW_METRICS } from "@/lib/funding-data";
import { AlertCircle } from "lucide-react";

export function BudgetUtilizationChart() {
  const { totalFunding, totalSpent, remainingBalance } = OVERVIEW_METRICS;

  // Checking the math exactly as user requested
  const trueDifference = totalFunding - totalSpent;
  // 36200 - 24400 = 11800
  // Listed balance = 10801
  const containsDifference = trueDifference !== remainingBalance;
  const differenceAmount = Math.abs(trueDifference - remainingBalance);

  // Since we shouldn't mathematically force reconciliation in the visualization,
  // a cleaner robust visual is a semi-circle radial or distinct bars.
  // Let's use a two-part radial/pie to show Used vs Remaining Balance, out of (Spent + Remaining)
  // Or better yet, render "Spent" and "Remaining" as separate items to avoid forcing a 100% donut
  // that implies Spent + Remaining = Total, because they don't exactly equal total.

  // We'll plot Spent and Remaining. Together they don't exactly sum to Total.
  const data = [
    { name: "Total Spent", value: totalSpent, color: "#ef4444" },
    { name: "Remaining Balance", value: remainingBalance, color: "#10b981" },
  ];

  return (
    <div className="w-full glass-soft p-8 rounded-xl border border-primary/10 flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        How Was The Budget Utilized?
      </h3>

      <div className="w-full max-w-[600px] flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        {/* Visual Chart */}
        <div className="w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `₹${new Intl.NumberFormat("en-IN").format(value)}`}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown Values */}
        <div className="flex flex-col gap-6 flex-1 w-full">
          <div className="border-l-2 border-primary pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">TOTAL BUDGET</p>
            <p className="text-2xl font-display">
              ₹{new Intl.NumberFormat("en-IN").format(totalFunding)}
            </p>
          </div>
          <div className="border-l-2 border-red-500 pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">RECORDED SPENDING</p>
            <p className="text-2xl font-display text-red-500">
              ₹{new Intl.NumberFormat("en-IN").format(totalSpent)}
            </p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-4">
            <p className="text-xs tracking-[0.2em] text-muted-foreground">REMAINING BALANCE</p>
            <p className="text-2xl font-display text-emerald-500">
              ₹{new Intl.NumberFormat("en-IN").format(remainingBalance)}
            </p>
          </div>
        </div>
      </div>

      {containsDifference && (
        <div className="max-w-[600px] flex items-start gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200/80 text-xs tracking-wide leading-relaxed">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-orange-400" />
          <p>
            Source figures contain a ₹{differenceAmount} reconciliation difference. Values are
            displayed exactly as recorded.
          </p>
        </div>
      )}
    </div>
  );
}
