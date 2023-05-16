import mongoose, { Schema } from "mongoose"
import { IPersonalField } from "./PersonalData.model"


export interface IFieldExpiry {
  id: string
  personalDataId: string
  fieldName: IPersonalField
  value: string
  expireAt: Date
}

const fieldExpirySchema = new Schema<IFieldExpiry>({
  id: String!,
  personalDataId: String!,
  fieldName: String!,
  value: String!,
  expireAt: {
    type: Date,
    default: Date.now() + 10 * 60 * 1000,   // expires in 10 minutes
    index: { expires: '0s' }
  }
});


fieldExpirySchema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default mongoose.model<IFieldExpiry>("FieldExpirySchema", fieldExpirySchema);

