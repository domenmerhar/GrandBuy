import { NextFunction, Request, Response } from "express";
import APIFeatures from "../utils/ApiFeatures";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export const getOne = (
  Model: any,
  popOptions: { path: string; select?: string }[]
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let query = Model.findById(id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const getAll = (
  Model: any,
  popOptions?: { path: string; select?: string }[]
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);

    const doc = await features.query;

    if (!doc.length) return next(new AppError("No documents found", 404));

    res.json({
      stauts: "success",
      results: doc.length,
      data: { doc },
    });
  });
