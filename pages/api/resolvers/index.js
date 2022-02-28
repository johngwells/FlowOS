export const resolvers = {
  Query: {
    fields(_, __, ctx) {
      return ctx.prisma.fields.findMany();
    }
  },

  Mutation: {
    createFields(parent, args, ctx, info) {
      return ctx.prisma.fields.create({
        data: {
          title: args.input.title,
          reporter: args.input.reporter,
          severity: args.input.severity,
          status: args.input.status
        }
      });
    },
    deleteField: (_, { id }, ctx, info) => {
      return ctx.prisma.fields.delete({
        where: {
          id: Number(id)
        },
        select: {
          id: true
        }
      });
    },
    updateField: (_, { id, input }, ctx) => {
      return ctx.prisma.fields.update({
        where: {
          id: Number(id)
        },
        data: {
          status: input.status,
          severity: input.severity
        }
      })
    }
  }
};
