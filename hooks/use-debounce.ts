import { useCallback, useRef, useTransition } from "react";

function useDebounce<T>(
  callback: (...args: T[]) => Promise<void>,
  delay = 500,
  {
    onSuccess,
    onFailure,
  }: { onSuccess?: () => void; onFailure?: () => void } = {},
) {
  const timeout = useRef<number>(null);
  const [isPending, startTransition] = useTransition();

  const execute = useCallback(
    (...args: T[]) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = window.setTimeout(() => {
        startTransition(async () => {
          try {
            await callback(...args);
            if (onSuccess) onSuccess();
          } catch (err) {
            // BUG: This block is not reached even if there is an error
            console.log(err);
            if (onFailure) onFailure();
          }
        });
      }, delay);
    },
    [callback, delay, onSuccess, onFailure],
  );

  const cancel = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  return { isPending, execute, cancel };
}

export default useDebounce;
