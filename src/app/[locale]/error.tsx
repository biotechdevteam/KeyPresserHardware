"use client";
import CustomError from "./CustomError";

export default function Error({ error }: { error: Error | string }) {
  return <CustomError error={error} />;
}
