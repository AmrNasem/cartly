import { APIError } from "./errors";

export function errorHandler(error: unknown) {
  console.log(error);
  let message = "Internal Server Error",
    status = 500;
  if (error instanceof APIError) {
    message = error.message;
    status = error.status;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return new Response(JSON.stringify({ error: true, message }), {
    status,
  });
}
