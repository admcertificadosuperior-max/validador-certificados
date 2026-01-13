"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectOnRefresh() {
  const router = useRouter();

  useEffect(() => {
    const navegacaoValida = sessionStorage.getItem("validacao_navegacao");

    if (!navegacaoValida) {
      router.replace("/");
    } else {
      sessionStorage.removeItem("validacao_navegacao");
    }
  }, [router]);

  return null;
}
