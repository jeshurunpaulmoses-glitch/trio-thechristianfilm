import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value, prefix = "" }: { value: number; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
    return undefined;
  }, [value, count, isInView]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      setDisplay(new Intl.NumberFormat("en-IN").format(v));
    });
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
    </span>
  );
}

export function FundingKPIs({
  totalFunding,
  totalSpent,
  remainingBalance,
  accountsClosed,
}: {
  totalFunding: number;
  totalSpent: number;
  remainingBalance: number;
  accountsClosed: string;
}) {
  const formatCurrency = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(val)}`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {[
          { label: "TOTAL FUNDING", value: totalFunding, color: "text-blue-400" },
          { label: "TOTAL SPENT", value: totalSpent, color: "text-red-400" },
          { label: "REMAINING BALANCE", value: remainingBalance, color: "text-green-400" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-medium p-6 rounded-lg border border-primary/20 relative overflow-hidden flex flex-col justify-center text-center"
          >
            {/* Subtle glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-2 font-medium">
              {kpi.label}
            </h3>
            <div
              className={cn(
                "text-4xl lg:text-5xl font-display tracking-tight font-bold",
                kpi.color,
              )}
            >
              <AnimatedCounter value={kpi.value} prefix="₹" />
            </div>

            {/* Accessible fallback exactly as recorded numbers */}
            <span className="sr-only">
              {kpi.label}: {formatCurrency(kpi.value)}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-1 text-xs text-muted-foreground/70 tracking-widest text-center mt-6"
      >
        <p>“Figures shown are based on the TRIO production budget and recorded accounts.”</p>
        <p>Accounts Closed: {accountsClosed}</p>
      </motion.div>
    </div>
  );
}
