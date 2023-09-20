#!/usr/bin/env node

import dna from './dna.model';

/**
 * @returns get every dna record
 */
const getStats = async(): Promise<{sequence: string, mutation: number}[]> => {
  return (await dna.find({}));
}

/**
 * @param {string[]} sequence: Input - DNA Sequence
 * @param {boolean} hasMutation: Has or not mutation
 */
const saveMutation = async(sequence: string[], hasMutation: boolean): Promise<void> => {
  try {
    const newDna = new dna({
      sequence: JSON.stringify(sequence),
      mutation: hasMutation
    });
  
    await newDna.save();
  } catch(err: any) {
    throw new Error(err);
  }
}

export default {
  getStats,
  saveMutation
}