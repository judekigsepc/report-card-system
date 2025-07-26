import { Response } from "express";

const sanitiseData = (data:any) => {
    const raw = typeof data.toObject === 'function' ? data.toObject() : data;
    const {__v,password, ...cleaned} = raw
    return cleaned
}

export const sendSuccess = <T>(
  status: 200 | 201,
  message: string,
  result: T,
  res: Response,
  sanitise: boolean
): void => {
  const sanitisedData = sanitise? sanitiseData(result): result
  res.status(status).json({ message, result: sanitisedData });
};
