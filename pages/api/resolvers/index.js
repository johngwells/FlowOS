import { v4 } from 'uuid';
const fieldsData = [];

export const resolvers = {
  Query: {
    fields(parent, args, context, info) {
      return fieldsData;
    }
  },

  Mutation: {
    createFields(parent, args, context, info) {
      console.log({ args })
      const lastId = v4();

      // const newTable = args.input;
      // newTable.id = lastId;
      const newTable = { id: lastId, ...args.input}

      fieldsData.push(newTable);
      console.log({ fieldsData });

      return newTable;
    }
  }
}
