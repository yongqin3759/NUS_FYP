import personalDataService from '../service/personalData.service'
import { IPersonalDataFields } from '../models/PersonalData.model'

const MAX_SIZE = 500

const createData = async () => {
  const personalDataPromises = []
  for(let i = 0; i < 50; i++){
    let personalData: IPersonalDataFields = {
      fullName: `john${i}`,
      address: `1000${i}`,
      race: `alien`,
      email: `alien@gmail.com`
    }
    personalDataPromises.push(personalDataService.createPersonalData(personalData))
    
  }

  let ids:string[] = [];
  Promise.all(personalDataPromises).then(values => {
    values.forEach(item => {
      ids.push(item.id)
    })
  })

}