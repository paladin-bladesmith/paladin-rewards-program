/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type WritableAccount,
} from '@solana/web3.js';
import { REWARDS_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type HarvestRewardsInstruction<
  TProgram extends string = typeof REWARDS_PROGRAM_ADDRESS,
  TAccountHolderRewardsPool extends string | IAccountMeta<string> = string,
  TAccountHolderRewards extends string | IAccountMeta<string> = string,
  TAccountTokenAccount extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountHolderRewardsPool extends string
        ? WritableAccount<TAccountHolderRewardsPool>
        : TAccountHolderRewardsPool,
      TAccountHolderRewards extends string
        ? WritableAccount<TAccountHolderRewards>
        : TAccountHolderRewards,
      TAccountTokenAccount extends string
        ? WritableAccount<TAccountTokenAccount>
        : TAccountTokenAccount,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export type HarvestRewardsInstructionData = { discriminator: number };

export type HarvestRewardsInstructionDataArgs = {};

export function getHarvestRewardsInstructionDataEncoder(): Encoder<HarvestRewardsInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 3 })
  );
}

export function getHarvestRewardsInstructionDataDecoder(): Decoder<HarvestRewardsInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getHarvestRewardsInstructionDataCodec(): Codec<
  HarvestRewardsInstructionDataArgs,
  HarvestRewardsInstructionData
> {
  return combineCodec(
    getHarvestRewardsInstructionDataEncoder(),
    getHarvestRewardsInstructionDataDecoder()
  );
}

export type HarvestRewardsInput<
  TAccountHolderRewardsPool extends string = string,
  TAccountHolderRewards extends string = string,
  TAccountTokenAccount extends string = string,
  TAccountMint extends string = string,
> = {
  /** Holder rewards pool account. */
  holderRewardsPool: Address<TAccountHolderRewardsPool>;
  /** Holder rewards account. */
  holderRewards: Address<TAccountHolderRewards>;
  /** Token account. */
  tokenAccount: Address<TAccountTokenAccount>;
  /** Token mint. */
  mint: Address<TAccountMint>;
};

export function getHarvestRewardsInstruction<
  TAccountHolderRewardsPool extends string,
  TAccountHolderRewards extends string,
  TAccountTokenAccount extends string,
  TAccountMint extends string,
>(
  input: HarvestRewardsInput<
    TAccountHolderRewardsPool,
    TAccountHolderRewards,
    TAccountTokenAccount,
    TAccountMint
  >
): HarvestRewardsInstruction<
  typeof REWARDS_PROGRAM_ADDRESS,
  TAccountHolderRewardsPool,
  TAccountHolderRewards,
  TAccountTokenAccount,
  TAccountMint
> {
  // Program address.
  const programAddress = REWARDS_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    holderRewardsPool: {
      value: input.holderRewardsPool ?? null,
      isWritable: true,
    },
    holderRewards: { value: input.holderRewards ?? null, isWritable: true },
    tokenAccount: { value: input.tokenAccount ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.holderRewardsPool),
      getAccountMeta(accounts.holderRewards),
      getAccountMeta(accounts.tokenAccount),
      getAccountMeta(accounts.mint),
    ],
    programAddress,
    data: getHarvestRewardsInstructionDataEncoder().encode({}),
  } as HarvestRewardsInstruction<
    typeof REWARDS_PROGRAM_ADDRESS,
    TAccountHolderRewardsPool,
    TAccountHolderRewards,
    TAccountTokenAccount,
    TAccountMint
  >;

  return instruction;
}

export type ParsedHarvestRewardsInstruction<
  TProgram extends string = typeof REWARDS_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Holder rewards pool account. */
    holderRewardsPool: TAccountMetas[0];
    /** Holder rewards account. */
    holderRewards: TAccountMetas[1];
    /** Token account. */
    tokenAccount: TAccountMetas[2];
    /** Token mint. */
    mint: TAccountMetas[3];
  };
  data: HarvestRewardsInstructionData;
};

export function parseHarvestRewardsInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedHarvestRewardsInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      holderRewardsPool: getNextAccount(),
      holderRewards: getNextAccount(),
      tokenAccount: getNextAccount(),
      mint: getNextAccount(),
    },
    data: getHarvestRewardsInstructionDataDecoder().decode(instruction.data),
  };
}