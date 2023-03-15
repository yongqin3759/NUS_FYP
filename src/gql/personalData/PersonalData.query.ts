import builder from '../builder'
import personalDataService from '../../service/personalData.service'

builder.queryType({
  fields: (t) => ({
    personalData: t.field({
      description: 'Retrieve all Personal Data',
      type: ['PersonalData'],
      resolve: () => {
        return personalDataService.findAllPersonalData()
      },
    }),
    getOnePersonalData: t.field({
      description: 'Retrieve one Personal Data',
      type: 'PersonalData',
      nullable: true,
      args: {
        id: t.arg.id({
          required: true,
          description: 'The Id of the cart ',
        }),
      },
      resolve: async (_, {id}) => {
        const data = await personalDataService.findPersonalDataById(id)
        if(!data){
          throw new Error(`No Personal Data with ID: ${id}`)
        }
        return data
      },
    }),
  }),
})

export default builder
