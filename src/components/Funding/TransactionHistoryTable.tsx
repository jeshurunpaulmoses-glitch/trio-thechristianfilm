import { TRANSACTIONS } from "@/lib/funding-data";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TransactionHistoryTable() {
  const [expanded, setExpanded] = useState(false);

  // Show only a subset if not expanded to save space, but let user expand
  const displayedTransactions = expanded ? TRANSACTIONS : TRANSACTIONS.slice(0, 5);

  const formatCurrency = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(val)}`;

  return (
    <div className="w-full glass-soft p-4 md:p-8 rounded-xl border border-primary/10 mt-8">
      <h3 className="text-xl md:text-2xl font-display tracking-widest text-center mb-8 uppercase text-primary/90">
        Transaction History
      </h3>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead className="text-xs tracking-[0.2em] text-muted-foreground uppercase bg-white/5 border-b border-primary/20">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-right">
                Amount
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-right">
                Production Day / Notes
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {displayedTransactions.map((tx, idx) => (
                <motion.tr
                  key={`${tx.date}-${tx.notes}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{tx.date}</td>
                  <td className="px-6 py-4 font-medium">{tx.category}</td>
                  <td className="px-6 py-4 font-mono text-right text-primary/90">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground/80">{tx.notes}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-primary/40 bg-black/40"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : `View Full History (${TRANSACTIONS.length} Records)`}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
