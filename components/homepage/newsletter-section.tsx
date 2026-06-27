"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="mycontainer my-12 md:my-16">
      <div className="rounded-2xl border border-black/10 bg-muted/40 px-6 py-10 md:px-12 md:py-14 text-center">
        <h2 className="text-foreground text-2xl md:text-3xl font-semibold mb-2">
          Stay in the Loop
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto mb-6">
          Subscribe to our newsletter for exclusive deals, new arrivals, and
          style inspiration delivered to your inbox.
        </p>

        {submitted ? (
          <p className="text-primary font-medium text-sm" role="status">
            Thanks for subscribing! We&apos;ll keep you updated.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Email address"
              className="bg-background flex-1"
            />
            <Button type="submit" className="shrink-0">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

export default NewsletterSection;
