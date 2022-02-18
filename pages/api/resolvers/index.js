import { v4 } from 'uuid';
let fieldsData = [];

export const resolvers = {
  Query: {
    fields(parent, args, context, info) {
      return fieldsData;
    }
  },

  Mutation: {
    createFields(parent, args, context, info) {
      console.log({ args });
      const lastId = v4();

      const newTable = { id: lastId, ...args.input };

      fieldsData.push(newTable);
      console.log({ fieldsData });

      return newTable;
    },
    deleteField: (_, { id }) => {
      console.log(id);
      fieldsData = fieldsData.filter(field => field.id !== id);
      console.log({ fieldsData });
      return id;
    },
    updateField: (_, { id, input }) => {
      const existingField = fieldsData.find(field => field.id === id);
      existingField.status = input.status;

      console.log({ fieldsData });
      return existingField;
    }
  }
};
