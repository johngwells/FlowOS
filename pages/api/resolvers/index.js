import { v4 } from 'uuid';
let fieldsData = [];

class UpdatedField {
  constructor(id, { title, status }) {
    this.id = id;
    this.title = title;
    this.status = status;
  }
}

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

      // const newTable = args.input;
      // newTable.id = lastId;
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
      console.log({ id });
      console.log({ input });

      const existingField = fieldsData.find(field => field.id === id);
      console.log({ existingField });
      existingField.status = input.status;

      // fieldsData.push(updateStatus);
      console.log({ fieldsData });
      return existingField;
    }
  }
};
