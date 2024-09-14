import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import path from "path";
import { v4 } from "uuid";
import fs from "fs/promises";
import sharp from "sharp";

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

interface File {
  data: Buffer;
  name: string;
  mv: (path: string, callback: (err: unknown) => void) => void;
}

interface SaveObjInterface {
  file: File;
  width?: number;
  height?: number;
}

export const saveFileToServer = (file: File) => {
  const fileName = `${v4()}${path.extname(file.name)}`;

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "files",
    fileName
  );

  file.mv(filePath, (err: unknown) => {
    if (err) {
      console.error(err);
      throw new AppError("Error uploading file", 500);
    }
  });

  return fileName;
};

export const saveImageToServer = async ({
  file,
  width,
  height,
}: SaveObjInterface) => {
  const fileName = `${v4()}.webp`;

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "files",
    fileName
  );

  await sharp(file.data)
    .resize({ width: width || 1000, height: height || 666 })
    .trim()
    .webp({ quality: 80 })
    .toFile(filePath);

  return fileName;
};

export const fileSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as { [key: string]: { size: number; name: string } };

  const filesOverLimit: string[] = [];

  Object.keys(files).forEach((key: string) => {
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
    const files = req.files as {
      [key: string]: { name: string; size: number };
    };

    const fileExtensions: string[] = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    const images = Array.isArray(files.images) ? files.images : [files.images];
    images.forEach((file) => {
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
  (location: string, allowdExtArray: string[], optional: boolean = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    if ((!req.files || !req.files[location]) && optional) return next();

    if (!req.files || !req.files[location])
      return next(new AppError(`Please upload ${location}`, 400));

    const file = req.files[location];
    const fileExtensions: string = path.extname(
      (file as { name: string }).name
    );

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
  (location: string, allowdExtArray: string[], optional: boolean = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    if ((!req.files || !req.files[location]) && optional) return next();

    if (!req.files || !req.files[location])
      return next(new AppError(`Please upload ${location}`, 400));

    if (!Array.isArray(req.files[location]))
      req.files[location] = [req.files[location]];

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

export const deleteFile = async (fileName: string) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "files",
    fileName
  );

  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
};
