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
  for(let field of PERSONAL_DATA_FIELDS){
    res[field] = t.exposeString(field)
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
