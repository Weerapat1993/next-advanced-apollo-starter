import type { Response } from 'express';
import { codeStatus } from "./code-status";

export const getFailure = (res: Response) => (code: number, error: any) => {
  console.error(error)
  return res.status(code).json({
    error,
    code,
    status: codeStatus(code)
  });
}

export const getSuccess = (res: Response) => (code: number, data: any) => {
  return res.status(code).json({
    data,
    code,
    status: codeStatus(code)
  });
}