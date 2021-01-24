import { Request, Response } from 'express';
import { ICryptoService } from '../../types/crypto';

export interface ICryptoController {
  getHistoricalBalances(req: Request, res: Response): Promise<Response>;
  health(req: Request, res: Response): Promise<Response>;
}

export default class CryptoController implements ICryptoController {
  private cryptoService: ICryptoService;

  constructor(cryptoService: ICryptoService) {
    this.cryptoService = cryptoService;
  }

  getHistoricalBalances = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { address }: { address?: string } = req.params;

    try {
      const transactionsMatrix = await this.cryptoService.getHistoricalBalances(
        {
          address,
        },
      );
      return res.status(200).json(transactionsMatrix);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  health = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({});
  };
}
