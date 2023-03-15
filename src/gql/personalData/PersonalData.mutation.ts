import builder from '../builder'
import personalDataService from '../../service/personalData.service'
import PersonalDataModel, { IPersonalData, IPersonalDataFields, IPersonalInfo, PERSONAL_DATA_FIELDS } from '../../models/PersonalData.model'


export const PersonalInfoInput = builder.inputType('PersonalInfoInput', {
  fields: (t) => ({
    value: t.string({required: true}),
    expiry: t.string({required: true}),
  })
})


function generatePersonalDataInputFields(t: PothosSchemaTypes.InputFieldBuilder<PothosSchemaTypes.ExtendDefaultTypes<any>, "InputObject">){ 
  let res: {[key: string]: any } = {}
  for(let fields of PERSONAL_DATA_FIELDS){
    res[fields] = t.field({
      type: PersonalInfoInput,
      required: false
    }) 
  }
  return res
}

export const PersonalFields = builder.enumType('PersonalFields', {
  values: PERSONAL_DATA_FIELDS,
})

const PersonalDataInput= builder.inputRef<IPersonalDataFields>('PersonalDataInput').implement({
  fields: (t) => generatePersonalDataInputFields(t)
})



builder.mutationType({
  fields: (t) => ({
    createPersonalData: t.field({
      type: 'PersonalData',
      args: {
        personalDataInput: t.arg({type: PersonalDataInput, required: true})
      },
      resolve: (root, args) => {
        let personalData = args.personalDataInput
        

        if(Object.keys(personalData).length == 0 ){
          throw new Error('No Compatible category found')
        }

        let createdPersonalData = personalDataService.createPersonalData(personalData)

        return createdPersonalData
      }
    }),
    updateOnePersonalData: t.field({
      type: 'PersonalData',
      args: {
        personalDataInput: t.arg({type: PersonalDataInput, required: true}),
        id: t.arg.string({required: true})
      },
      nullable: true,
      resolve: (root, args) => {
        let personalData = args.personalDataInput

        let id = args.id

        let updatedPersonalData = personalDataService.findByIdAndUpdateFields(id, personalData)
        return updatedPersonalData
      } 
    }),

    removeFieldFromOnePersonalData: t.field({
      type: 'PersonalData',
      args: {
        removalFields: t.arg({type: [PersonalFields], required: true}),
        id: t.arg.string({required: true})
      },
      nullable: true,
      resolve: (root,args) => {
        let fieldsToRemove = args.removalFields
        let id = args.id

        let removedPersonalData = personalDataService.findByIdAndRemoveFields(id, fieldsToRemove)
        return removedPersonalData
      }
    })
  }),
})

export default builder