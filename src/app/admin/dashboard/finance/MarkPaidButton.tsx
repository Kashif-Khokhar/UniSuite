"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { markFeePaid } from "../actions";

export default function MarkPaidButton({ feeId }: { feeId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await markFeePaid(feeId);
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline disabled:opacity-50 disabled:no-underline"
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      Mark as Paid
    </button>
  );
}
