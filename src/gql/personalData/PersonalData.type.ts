import { PERSONAL_DATA_FIELDS } from '../../models/PersonalData.model';
import { IPersonalData } from '../../models/PersonalData.model';
import builder from '../builder'


builder.objectType('PersonalData',{
  fields: (t) => generatePersonalDataObjectFields(t)
})

function generatePersonalDataObjectFields(t:any){
  let res: {[key: string]: any } = {
    id: t.exposeID('id')
  }
  for(let fields of PERSONAL_DATA_FIELDS){
    res[fields] = t.field({
      type: 'PersonalInfo',
      nullable: true,
      resolve: (data: IPersonalData) => {
        return data[fields as keyof IPersonalData];
      }
    }) 
  }
  return res
}




builder.objectType('PersonalInfo', {
  fields: (t) => ({
    value: t.exposeString('value'),
    expiry: t.string({
      resolve: (parent) => {
        return new Date(parent.expiry).toISOString()
      }
    })
  }),
})

export default builder
