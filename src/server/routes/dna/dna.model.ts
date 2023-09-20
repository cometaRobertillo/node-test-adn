#!/usr/bin/env node

import mongoose, { Schema } from 'mongoose';

const MDna: Schema = new Schema({
  sequence: {type: String, required: true},
  mutation: {type: Boolean, required: true}
});

export default mongoose.connection.model('dna', MDna);