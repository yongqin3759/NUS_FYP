import mongoose, { Schema } from "mongoose"

export interface IPersonalInfo {
  value: string
  expiry: Date
}

export interface IPersonalDataFields{
  fullName?: string
  email?: string
  race?: string
  address?:string
}

export type IPersonalField = keyof IPersonalDataFields


export interface IPersonalData extends IPersonalDataFields {
  id: string
}

export class PersonalDataFieldsClass implements IPersonalDataFields{
  constructor(public fullName?: string, public email?: string, public race?: string, public address?: string){
  }
}


let personalDataFieldsObject = new PersonalDataFieldsClass();

export const PERSONAL_DATA_FIELDS: string[] = Object.keys(personalDataFieldsObject);

console.log('------------------------------------------')
console.log('Personal Data Fields', PERSONAL_DATA_FIELDS)
console.log('------------------------------------------')

const personalInfoSchema = new Schema<IPersonalInfo>({
  value: {type: String, required: true},
  expiry:{type: Date, required: true}, 
}, {_id: false})

const personalDataSchemaModel = PERSONAL_DATA_FIELDS.reduce((o, key) => Object.assign(o, {[key]: String}), {});



const personalDataSchema = new Schema<IPersonalData>(personalDataSchemaModel);



personalDataSchema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default mongoose.model<IPersonalData>("PersonalData", personalDataSchema);
