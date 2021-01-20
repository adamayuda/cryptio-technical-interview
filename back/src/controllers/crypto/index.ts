import { Request, Response } from 'express';
import { ICryptoService } from '../../types/crypto';

export interface ICryptoController {
  health(req: Request, res: Response): Promise<Response>;
}

export default class CryptoController implements ICryptoController {
  private cryptoService: ICryptoService;

  constructor(cryptoService: ICryptoService) {
    this.cryptoService = cryptoService;
  }

  health = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({});
  };
}
