/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { FundingKPIs } from "./FundingKPIs";
import { FundingDonutChart } from "./FundingDonutChart";
import { ContributorBarChart } from "./ContributorBarChart";
import { BudgetUtilizationChart } from "./BudgetUtilizationChart";
import { ExpenseCategoryCards } from "./ExpenseCategoryCards";
import { ProductionTimelineChart } from "./ProductionTimelineChart";
import { TransactionHistoryTable } from "./TransactionHistoryTable";
import { OVERVIEW_METRICS } from "@/lib/funding-data";

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

export function FundingSection() {
  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp}
      id="funding"
      className="section-wrap relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-0 right-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <SectionLabel>TRANSPARENCY REPORT</SectionLabel>
      <div className="section-intro mb-16">
        <h2 className="display-heading mb-6 tracking-tight">
          <span className="block text-primary">FUNDING &</span>
          <span className="block text-white">CONTRIBUTION</span>
        </h2>
        <div>
          <p className="text-xl text-muted-foreground leading-relaxed font-light mb-6">
            Transparent Production Finance Overview
          </p>
          <p className="inline-block text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-4 bg-primary/5 p-4 rounded-r-md backdrop-blur-sm max-w-2xl mx-auto text-left">
            This section presents the actual TRIO production funding and expenditure data. Navigate
            from high-level summaries down to individual transaction records.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-12 w-full">
        {/* OVERVIEW */}
        <section className="space-y-4">
          <FundingKPIs {...OVERVIEW_METRICS} />
        </section>

        {/* FUNDING SOURCES & CONTRIBUTOR BREAKDOWN */}
        <section className="space-y-6">
          <FundingDonutChart />
          <ContributorBarChart />
        </section>

        {/* BUDGET UTILIZATION */}
        <section>
          <BudgetUtilizationChart />
        </section>

        {/* EXPENSE CATEGORIES */}
        <section>
          <ExpenseCategoryCards />
        </section>

        {/* PRODUCTION TIMELINE */}
        <section>
          <ProductionTimelineChart />
        </section>

        {/* FULL TRANSACTION HISTORY */}
        <section>
          <TransactionHistoryTable />
        </section>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-xs tracking-widest text-muted-foreground/50 pt-8 border-t border-white/5 font-mono">
        <p>TRIO PROCESS METRICS :: FINANCIAL SYS LOG</p>
        <p>ACCOUNTS CLOSED: {OVERVIEW_METRICS.accountsClosed}</p>
        <p className="mt-4">
          ALL FIGURES DISPLAYED ARE BASED ON THE RECORDED TRIO PRODUCTION BUDGET AND TRANSACTION
          RECORDS.
        </p>
      </div>
    </motion.section>
  );
}
