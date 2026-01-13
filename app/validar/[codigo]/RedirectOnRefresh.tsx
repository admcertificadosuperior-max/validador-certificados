"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectOnRefresh() {
  const router = useRouter();

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];

    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      router.replace("/");
    }
  }, [router]);

  return null;
}
