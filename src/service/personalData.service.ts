import ExpiryFieldModel from '../models/ExpiryField.model'
import PersonalDataModel, { IPersonalDataFields , IPersonalField} from '../models/PersonalData.model'

function createExpiryField(id: string, field: IPersonalField){
  let expiryFieldModel = new ExpiryFieldModel()
  expiryFieldModel.fieldName = field
  expiryFieldModel.id = id


  
  expiryFieldModel.expireAt = new Date(new Date().getTime()+(80000));

  expiryFieldModel.save()
}

const personalDataService = {
  async findPersonalDataById(id: string) {
    return await PersonalDataModel.findById(id)
  },

  async findAllPersonalData() {
    return await PersonalDataModel.find()
  },
  async createPersonalData(personalDataFields: IPersonalDataFields) {
    let personalData = new PersonalDataModel(personalDataFields)

    for(let field in personalDataFields){
      createExpiryField( personalData.id ,field as keyof IPersonalDataFields,)
    }
    return await personalData.save()
  },

  async findByIdAndUpdateFields(
    id: string,
    personalDataFields: IPersonalDataFields
  ) {
    let updatedPersonalData = await PersonalDataModel.findByIdAndUpdate(
      id,
      personalDataFields,
      {
        new: true,
      }
    )

    return updatedPersonalData
  },

  async findByIdAndRemoveFields(id: string, personalDataFields: string[]) {
    let personalData = await PersonalDataModel.findById(id)

    if(personalData){
      for (let field of personalDataFields) {
        personalData?.set(field, undefined)
      }

      const nonNullKeys = Object.keys(personalData.toJSON()).filter(key => key != 'id')
      
      if(nonNullKeys.length == 0){
        await PersonalDataModel.findByIdAndRemove(id)
        return
      }
  
      return personalData?.save()
    }
    return personalData
  },
}

export default personalDataService
