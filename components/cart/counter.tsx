"use client";

import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { memo, useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

type CounterProps = {
  action: (value: number) => Promise<void>;
  value: number;
  className?: string;
  maximum?: number;
};

function Counter({ action, value = 1, className = "", maximum = 2 }: CounterProps) {
  const [counter, setCounter] = useState(value);
  const [confirmedCounter, setConfirmedCounter] = useState(counter);

  const handleSuccess = useCallback(() => {
    setConfirmedCounter(counter);
  }, [counter]);
  
  const handleFailure = useCallback(() => {
    setCounter(confirmedCounter);
  }, [confirmedCounter]);

  const options = useMemo(
    () => ({
      onSuccess: handleSuccess,
      onFailure: handleFailure,
    }),
    [handleSuccess, handleFailure],
  );

  const { execute, isPending } = useDebounce(action, 1000, options);

  const handleIncrement = useCallback(() => {
    setCounter((prev) => prev + 1);
    execute(counter + 1);
  }, [counter, execute]);

  const handleDecrement = useCallback(() => {
    if (counter === 1) return;
    setCounter((prev) => prev - 1);
    execute(counter - 1);
  }, [counter, execute]);

  return (
    <div
      className={cn(
        "flex border rounded-lg border-black/10",
        isPending ? "pointer-events-none opacity-50" : "",
        className,
      )}
    >
      <Button
        variant="ghost"
        className="cursor-pointer rounded-e-none"
        size="sm"
        disabled={isPending || counter === 1}
        onClick={handleDecrement}
      >
        <Minus className="size-3" />
      </Button>
      <span className="base px-4 py-1 border-x text-sm border-black/10 flex items-center justify-center">
        {counter}
      </span>
      <Button
        variant="ghost"
        className="cursor-pointer rounded-s-none"
        size="sm"
        disabled={isPending || counter >= maximum}
        onClick={handleIncrement}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}

export default memo(Counter);
