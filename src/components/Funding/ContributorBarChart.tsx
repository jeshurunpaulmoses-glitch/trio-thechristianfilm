import { CONTRIBUTORS } from "@/lib/funding-data";
import { useMemo } from "react";
import { motion } from "framer-motion";

export function ContributorBarChart() {
  const data = useMemo(() => {
    const specified = CONTRIBUTORS.filter((c) => c.amount !== null) as {
      name: string;
      amount: number;
    }[];
    const total = specified.reduce((sum, c) => sum + c.amount, 0);

    return specified
      .sort((a, b) => b.amount - a.amount)
      .map((c) => ({
        ...c,
        percentage: ((c.amount / total) * 100).toFixed(1),
      }));
  }, []);

  // Use the highest value to scale the bars, so the top contributor fills the container width
  const maxAmount = data[0]?.amount || 1;
  const formatCurrency = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(val)}`;

  return (
    <div className="w-full glass-soft p-4 md:p-8 rounded-xl border border-primary/10 mb-8 mt-2 overflow-hidden">
      <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-6 uppercase">
        Contributor Breakdown
      </h3>

      <div className="flex flex-col gap-6 w-full">
        {data.map((contributor, i) => {
          const barWidth = `${(contributor.amount / maxAmount) * 100}%`;

          return (
            <motion.div
              key={contributor.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              className="flex flex-col gap-2 w-full"
            >
              <div className="flex justify-between items-end text-sm px-1 w-full">
                <span className="font-medium text-white/95 truncate pr-2">{contributor.name}</span>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-muted-foreground text-xs hidden sm:inline-block">
                    {contributor.percentage}%
                  </span>
                  <span className="font-mono text-primary/90">
                    {formatCurrency(contributor.amount)}
                  </span>
                </div>
              </div>

              <div className="w-full h-8 sm:h-10 bg-black/40 rounded-sm overflow-hidden border border-white/5 relative">
                <motion.div
                  className="h-full rounded-sm"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(var(--primary-rgb, 59, 130, 246), 0.2) 0%, rgba(var(--primary-rgb, 59, 130, 246), 0.6) 100%)",
                    boxShadow: "0 0 15px rgba(var(--primary-rgb, 59, 130, 246), 0.2)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: barWidth }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
