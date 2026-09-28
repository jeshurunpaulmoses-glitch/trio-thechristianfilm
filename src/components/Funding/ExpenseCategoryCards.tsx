import { useState, useMemo } from "react";
import { TRANSACTIONS, CATEGORIES } from "@/lib/funding-data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExpenseCategoryCards() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categoryData = useMemo(() => {
    return CATEGORIES.map((category) => {
      const txs = TRANSACTIONS.filter((t) => t.category === category);
      const total = txs.reduce((sum, t) => sum + t.amount, 0);
      return {
        category,
        total,
        count: txs.length,
        transactions: txs,
      };
    }).sort((a, b) => b.total - a.total);
  }, []);

  const formatCurrency = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(val)}`;

  return (
    <div className="w-full glass-soft p-4 md:p-8 rounded-xl border border-primary/10">
      <h3 className="text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        Where Was The Money Spent?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryData.map((data, i) => {
          const isOpen = openCategory === data.category;

          return (
            <div key={data.category} className="flex flex-col">
              <button
                type="button"
                onClick={() => setOpenCategory(isOpen ? null : data.category)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-t-lg transition-colors border border-primary/10",
                  isOpen ? "bg-primary/10 border-b-0" : "bg-white/5 hover:bg-white/10 rounded-b-lg",
                )}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium tracking-wider uppercase text-sm">
                    {data.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {data.count} transaction{data.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-lg">{formatCurrency(data.total)}</span>
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-black/40 border border-t-0 border-primary/10 rounded-b-lg"
                  >
                    <div className="p-4 space-y-3">
                      {data.transactions.map((t, idx) => (
                        <div
                          key={`${t.date}-${idx}`}
                          className="flex justify-between items-start text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0"
                        >
                          <div className="flex flex-col gap-1 w-2/3">
                            <span className="text-muted-foreground text-xs">{t.date}</span>
                            <span className="text-white/80">{t.notes}</span>
                          </div>
                          <span className="font-mono text-white/90">
                            {formatCurrency(t.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
