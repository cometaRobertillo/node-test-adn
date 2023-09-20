#!/usr/bin/env node

import request from 'supertest';
import app from '../../index';
import dotenv from "dotenv";

dotenv.config();

describe('Test initial server', () => {

  it('Should get mutation data', async() => {

    const res = await request(app).get('/api/stats');

    expect(res.status).toEqual(200);

    expect(res.body).toMatchObject<{count_mutations: number, count_no_mutation: number, ratio: number}>(res.body);
  });

  it('Reject request - invalid format', async() => {

    const res = await request(app)
      .post('/api/mutation')
      .send({
        dna: ['EEGDHH', 'EEGDHH', 'EEGDHH', 'EEGDHH', 'EEGDHH', 'EEGDHH']
      }
    );

    expect(res.status).toEqual(500);

  });

  it('Should not be a mutation', async() => {

    const res = await request(app)
      .post('/api/mutation')
      .send({
        dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG']
      }
    );

    expect(res.status).toEqual(403);
    
  });

  it('Should be a mutation', async() => {

    const res = await request(app)
      .post('/api/mutation')
      .send({
        dna: ['ATGCGA', 'CAGTGC', 'TTTTTT', 'AGACGG', 'GCGTCA', 'TCACTG']
      }
    );

    expect(res.status).toEqual(200);
    
  });
})