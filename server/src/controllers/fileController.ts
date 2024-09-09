import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import path from "path";

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export const fileSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.filterYourHistory;

  const filesOverLimit: string[] = [];

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(key);
    }
  });

  if (filesOverLimit.length) {
    return next(
      new AppError(
        `The following files are over the ${MB}MB limit: ${filesOverLimit.join(
          ", "
        )}`,
        400
      )
    );
  }

  next();
};

export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next(new AppError("No files were uploaded", 400));

  next();
};

export const fileExtLimiter = (allowdExtArray: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files = req.files;

    const fileExtensions: string[] = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    files.images.forEach((file) => {
      fileExtensions.push(path.extname(file.name));
    });

    const allowed = fileExtensions.every((ext) => allowdExtArray.includes(ext));

    if (!allowed)
      return next(
        new AppError(
          "Only please provide a valid format files are allowed",
          400
        )
      );

    next();
  };
};

export const fileExtLimiterOne =
  (location: string, allowdExtArray: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.files[location])
      return next(new AppError(`Please upload ${location}`, 400));

    const file = req.files[location];
    const fileExtensions: string = path.extname(file.name);

    const allowed = allowdExtArray.includes(fileExtensions);

    if (!allowed)
      return next(
        new AppError(
          `Please provide ${location} in one of the following formats: ${allowdExtArray.join(", ")}`,
          400
        )
      );

    next();
  };

export const fileExtLimiterArr =
  (location: string, allowdExtArray: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.files[location])
      return next(new AppError(`Please upload ${location}`, 400));

    const fileArr = req.files[location];

    const fileExtensions: string[] = [];

    fileArr.forEach((file) => {
      fileExtensions.push(path.extname(file.name));
    });

    const allowed = fileExtensions.every((ext) => allowdExtArray.includes(ext));

    if (!allowed)
      return next(
        new AppError(
          `Please provide ${location} in one of the following formats: ${allowdExtArray.join(", ")}`,
          400
        )
      );

    next();
  };
