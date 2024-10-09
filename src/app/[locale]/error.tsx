"use client"
import CustomError from "./CustomError";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <CustomError error={error} reset={reset} />;
}
