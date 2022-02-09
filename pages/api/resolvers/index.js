const fieldsData = [];

export const resolvers = {
  Query: {
    fields(parent, args, context, info) {
      return fieldsData;
    }
  },

  Mutation: {
    createFields(parent, args, context, info) {
      console.log({ args });
      const newTable = args;

      fieldsData.push(newTable);
      console.log({ fieldsData });

      return newTable;
    }
  }

  // Query: {
  //   fields: () => [
  //     {
  //       id: 1,
  //       title: 'Mobile app loading time',
  //       reporter: 'Bilbo',
  //       severity: ['Low', 'Mid', 'High'],
  //       status: ['New', 'Dev Needed', 'In progress'],
  //       devAssigned: 'John Wells'
  //     },
  //     {
  //       id: 2,
  //       title: 'Broken link in footer',
  //       reporter: 'Froto',
  //       severity: ['Low', 'Mid', 'High'],
  //       status: ['New', 'Dev Needed', 'In progress'],
  //       devAssigned: 'John Wells'
  //     },
  //     {
  //       id: 3,
  //       title: 'Dropdown issues for users',
  //       reporter: 'Sam',
  //       severity: ['Low', 'Mid', 'High'],
  //       status: ['New', 'Dev Needed', 'In progress'],
  //       devAssigned: 'John Wells'
  //     }
  //   ]
  // }
};
