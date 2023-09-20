#!/usr/bin/env node

import dao from './dna.dao';

/**
 *
 * @returns count_mutations type number, count_no_mutation type number, ratio type number
 */
const getStats = async(): Promise<{count_mutations: number, count_no_mutation: number, ratio: number}> => {
  const result = {
    count_mutations: 0,
    count_no_mutation: 0,
    ratio: 0
  };

  const mutations = await dao.getStats();

  if(!(mutations.length > 0)) {
    return result;
  }


  for(let i = 0; i < mutations.length; i++) {
    if(mutations[i].mutation)
      result.count_mutations++;
    else
      result.count_no_mutation++;
  }

  result.ratio = (result.count_mutations / result.count_no_mutation) / 10;

  if(isNaN(result.ratio) || result.ratio === Number.POSITIVE_INFINITY || result.ratio === Number.NEGATIVE_INFINITY)
    result.ratio = 0;

  return result;
}

/**
 * @param {any} body: Expect dna sequences array
 * @returns {Object} hasMutation<boolean>: has mutation
 */
const checkMutation = async(body: any) => {
  if(!body.dna) {
    throw new Error('Missing params');
  }

  const dna: string[] = body.dna;

  if(isInvalidFormat(dna)){
    throw new Error('Wrong format');
  }

  const result = {
    sequence: dna,
    hasMutation: hasMutation(dna)
  };

  dao.saveMutation(dna, result.hasMutation);

  return result;
}

/**
 * @param {string[]} dna: Expect dna sequences array
 * @returns {boolean} evaluate dna body format
 */
const isInvalidFormat = (dna: string[]): boolean => {
  let hasError = false;

  for(let i = 0; i < dna.length; i++) {
    if(dna[i].length !== 6)
      break;

    if(!/^[acgt]+$/.test(dna[i].toLowerCase())) {
      hasError = true;
      break;
    }
  }

  return hasError;
}

/**
 * @param {string[]} dna: Evaluate mutation on dna sequences
 * @returns {boolean} evaluation result boolean
 */
const hasMutation = (dna:string[]): boolean => {

  let evaluation = false;

  const sumTop = [];
  const sumHex = [];
  let sumRight = 0;
  let previousDataSequence: string[] = [];

  for(let i = 0; i < dna.length; i++) {
    sumTop.push(0);
    sumHex.push(0);
    previousDataSequence.push('');
  }

  for(let i = 0; i < dna.length; i++) {

    const sequence: string[] = Object.assign([], dna[i].toLowerCase());
    let leftX = '';

    for(let j = 0; j < sequence.length; j++) {

      const x = sequence[j].toLowerCase();
      const y = previousDataSequence[j].toLowerCase();
      let z = '';

      if(j > 0)
        z = previousDataSequence[j-1].toLowerCase();

      leftX === x ? sumRight++ : sumRight = 0;
      x === y ? sumTop[j]++ : sumTop[j] = 0;
      x === z ? sumHex[j]++ : sumHex[j] = 0;

      leftX = x;

      if(sumRight === 3 || sumTop[j] === 3 || sumHex[j] === 3) {
        evaluation = true;
        break;
      }
    }
    if(evaluation)
      break;
      previousDataSequence = sequence;
  }
 return evaluation;
}

export default {
  getStats,
  checkMutation
}