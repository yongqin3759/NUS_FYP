import mongoose, { Schema } from "mongoose"
import { IPersonalField } from "./PersonalData.model"

export interface IFieldExpiry {
  id: string
  personalDataId: string
  fieldName: IPersonalField
  expiry: Date
}

const fieldExpirySchema = new Schema<IFieldExpiry>({
  id: String!,
  personalDataId: String!,
  fieldName: String!,
  expiry: Date!
});


fieldExpirySchema.set("toJSON", {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default mongoose.model<IFieldExpiry>("FieldExpirySchema", fieldExpirySchema);

