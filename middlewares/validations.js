import { validationResult } from "express-validator";

const validationFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};

export default validationFields;