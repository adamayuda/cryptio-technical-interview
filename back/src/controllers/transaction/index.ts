import { Request, Response } from 'express';

export interface ITransactionController {
  health(req: Request, res: Response): Promise<Response>;
}

export default class TransactionController implements ITransactionController {
  health = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({});
  };
}
