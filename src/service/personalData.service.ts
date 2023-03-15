import PersonalDataModel, { IPersonalDataFields } from '../models/PersonalData.model'

const personalDataService = {
  async findPersonalDataById(id: string) {
    return await PersonalDataModel.findById(id)
  },

  async findAllPersonalData() {
    console.log('All Personal Data')
    console.log(await PersonalDataModel.find())
    return await PersonalDataModel.find()
  },
  async createPersonalData(personalDataFields: IPersonalDataFields) {
    let personalData = new PersonalDataModel(personalDataFields)
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
