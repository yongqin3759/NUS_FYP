import SchemaBuilder from "@pothos/core"
import { IPersonalData, IPersonalInfo } from "../models/PersonalData.model"
import { Date } from "graphql-scalars/typings/mocks";
import ErrorsPlugin from '@pothos/plugin-errors'



const builder = new SchemaBuilder<{
  Objects: {
    PersonalData: IPersonalData,
    PersonalInfo: IPersonalInfo;
  }
  Scalars: {
    ID: {
      Input: string
      Output: string
    }
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [ErrorsPlugin],
  errorOptions: {
    defaultTypes: [Error],
  },
})

const ErrorInterface = builder.interfaceRef<Error>('Error').implement({
  fields: (t) => ({
    message: t.exposeString('message'),
  }),
});

builder.objectType(Error, {
  name: 'BaseError',
  interfaces: [ErrorInterface],
});

class LengthError extends Error {
  minLength: number;

  constructor(minLength: number) {
    super(`string length should be at least ${minLength}`);

    this.minLength = minLength;
    this.name = 'LengthError';
  }
}

builder.objectType(LengthError, {
  name: 'LengthError',
  interfaces: [ErrorInterface],
  fields: (t) => ({
    minLength: t.exposeInt('minLength'),
  }),
});




export default builder
