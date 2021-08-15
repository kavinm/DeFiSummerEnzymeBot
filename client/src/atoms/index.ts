import { atom } from "jotai";

type Holdings = { id: string; [x: string]: any }[];

export const reloadBuySellLimitHoldingsAtom = atom<boolean>(false);
export const vaultHoldingsAtom = atom<Holdings>([]);
export const holdingsChoicesAtom = atom<Holdings>([]);
export const availableTokensAtom = atom<
  {
    value: string;
    label: string;
  }[]
>([]);
