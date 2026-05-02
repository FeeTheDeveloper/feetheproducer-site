"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-ink-elevated/70 p-8 shadow-panel md:p-14">
          <div
            className="absolute inset-0 -z-10 bg-stage-glow opacity-90"
            aria-hidden
          />
          <div
            className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-red-gradient opacity-30 blur-3xl"
            aria-hidden
          />

          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
                Drop Day List
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[0.95] text-bone md:text-5xl">
                Get the next beat pack.
                <br />
                <span className="text-gold-gradient">First in line.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
                Join the FTP list for early access to new beats, free packs,
                exclusive discounts, and release drops before anyone else.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3"
              noValidate
            >
              <label className="block">
                <span className="sr-only">Email address</span>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full border bg-ink/60 p-1.5 backdrop-blur transition",
                    status === "error"
                      ? "border-red-bright"
                      : "border-white/10 focus-within:border-gold"
                  )}
                >
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="flex-1 bg-transparent px-4 py-2 text-sm text-bone placeholder:text-white/40 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    size="sm"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Join"}
                  </Button>
                </div>
              </label>

              {status === "success" ? (
                <p className="text-xs font-semibold uppercase tracking-widerx text-gold">
                  You're in. Check your inbox for the welcome drop.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-xs font-semibold uppercase tracking-widerx text-red-bright">
                  Enter a valid email address.
                </p>
              ) : null}
              {status === "idle" || status === "submitting" ? (
                <p className="text-[10px] uppercase tracking-widerx text-white/40">
                  No spam. Unsubscribe any time.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
