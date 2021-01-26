import BlockchainService from '.';
import { ICryptoService } from '../../types/crypto';
import axios from 'axios';

jest.mock('../../config', () => ({
  config: {
    BLOCKCHAIN_URL: 'url',
  },
}));

describe('BlockchainService', () => {
  let blockchainService: ICryptoService;

  beforeEach(() => {
    blockchainService = new BlockchainService();
  });

  it('should be defined', () => {
    expect(blockchainService).toBeDefined();
  });

  it('should getHistoricalBalances', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        hash160: 'aa6df93c2b4571233dc35c5bafb9d94271e8b2db',
        address: '1GY9ci8L4EK2U3baXnuvNtpFEiL4CMsVob',
        n_tx: 2,
        total_received: 49373204,
        total_sent: 49373204,
        final_balance: 0,
        txs: [
          {
            ver: 1,
            inputs: [
              {
                sequence: 4294967295,
                witness: '',
                prev_out: {
                  spent: true,
                  spending_outpoints: [
                    {
                      tx_index: 0,
                      n: 0,
                    },
                  ],
                  tx_index: 0,
                  type: 0,
                  addr: '1BfCKnXpjS2Kb9wodGiKjnrgHLEMDtcZsU',
                  value: 1905690,
                  n: 1,
                  script: '76a91474ea845fa6f7fbf4906b5100dbb6296e7a182e2288ac',
                },
                script:
                  '483045022100bc4234e6f597452b39724a710b275bf976e4f11c41ff289c5d5b87b0c5f563570220628f5bb16c27b2e69a2a1b4e80e8335c1e91201c0ca03fe37714c8ac3c6e630b0121031072e8b5620aef0e61545f2f327a690c400abb1a77ad0e10e28b5361eaec2ec9',
              },
              {
                sequence: 4294967295,
                witness: '',
                prev_out: {
                  spent: true,
                  spending_outpoints: [
                    {
                      tx_index: 0,
                      n: 0,
                    },
                  ],
                  tx_index: 0,
                  type: 0,
                  addr: '1GY9ci8L4EK2U3baXnuvNtpFEiL4CMsVob',
                  value: 49373204,
                  n: 0,
                  script: '76a914aa6df93c2b4571233dc35c5bafb9d94271e8b2db88ac',
                },
                script:
                  '483045022100ebe498cd55355a26ca25b4ec09eaa9dbd09554d7b7dbd603babb036534decab102203403f0e10dd7adf4db33e01f74905deff16c30311f7bef6e5badf293200920740121037069d4c86609a64e9943c5c4fd15bf4898c4242421954d33713cf298c2c5c93b',
              },
            ],
            weight: 1488,
            block_height: 664501,
            relayed_by: '0.0.0.0',
            out: [
              {
                spent: true,
                spending_outpoints: [
                  {
                    tx_index: 0,
                    n: 1,
                  },
                ],
                tx_index: 0,
                type: 0,
                addr: '1NfpHDbCU9HyfwK55zB81LCSXCFLVrqoUK',
                value: 21252254,
                n: 0,
                script: '76a914edb1ea3fa4e70c2c7268c707aa3366eebc42009088ac',
              },
              {
                spent: true,
                spending_outpoints: [
                  {
                    tx_index: 0,
                    n: 2,
                  },
                ],
                tx_index: 0,
                type: 0,
                addr: '37NKES781CysJ6joirHbgbb3kYY8h9dMpy',
                value: 30000000,
                n: 1,
                script: 'a9143e474cbf332bfbcb364689e44093dc9d2b8cefd787',
              },
            ],
            lock_time: 0,
            result: -49373204,
            size: 372,
            block_index: 0,
            time: 1609781396,
            tx_index: 0,
            vin_sz: 2,
            hash:
              'da6fac585dfe796151905a9f9884e6fa1e0cb907b9b0ad2f502c16dc597e2384',
            vout_sz: 2,
          },
          {
            ver: 1,
            inputs: [],
            weight: 1488,
            block_height: 664501,
            relayed_by: '0.0.0.0',
            out: [
              {
                spent: true,
                spending_outpoints: [
                  {
                    tx_index: 0,
                    n: 1,
                  },
                ],
                tx_index: 0,
                type: 0,
                addr: '1GY9ci8L4EK2U3baXnuvNtpFEiL4CMsVob',
                value: 49373204,
                n: 0,
                script: '76a914aa6df93c2b4571233dc35c5bafb9d94271e8b2db88ac',
              },
            ],
            lock_time: 0,
            result: -49373204,
            size: 372,
            block_index: 0,
            time: 1609781396,
            tx_index: 0,
            vin_sz: 2,
            hash:
              'da6fac585dfe796151905a9f9884e6fa1e0cb907b9b0ad2f502c16dc597e2384',
            vout_sz: 2,
          },
        ],
      },
    });
    await expect(
      blockchainService.getHistoricalBalances({
        address: '1GY9ci8L4EK2U3baXnuvNtpFEiL4CMsVob',
      }),
    ).resolves.toEqual({
      balance: 0,
      transactions: [
        {
          amount: -49373204,
          hash:
            'da6fac585dfe796151905a9f9884e6fa1e0cb907b9b0ad2f502c16dc597e2384',
          time: 1609781396,
        },
        {
          amount: 49373204,
          hash:
            'da6fac585dfe796151905a9f9884e6fa1e0cb907b9b0ad2f502c16dc597e2384',
          time: 1609781396,
        },
      ],
    });
  });
});
