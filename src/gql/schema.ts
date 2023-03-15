// Import the builder
import builder from './builder';

// Import your type definitions
import './personalData/PersonalData.type';
import './personalData/PersonalData.query'
import './personalData/PersonalData.mutation'


// Build and export the schema
export const schema = builder.toSchema();