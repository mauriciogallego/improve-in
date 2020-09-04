import { Response, Request, NextFunction } from "express";
import { getConnectionSate, connect } from "../core/database";

export function databaseConector(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let { connected }: { connected: Boolean } = getConnectionSate();
  if (!connected) {
    connect();
  }
  next();
}
