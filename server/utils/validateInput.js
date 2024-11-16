import { GraphQLError } from 'graphql';

export const validateInput = async (schema, value) => {
  const validationResult = await schema.safeParseAsync(value);
  if (!validationResult.success) {
    const validationErrors = validationResult.error.format();
    const path = Object.keys(validationErrors)[1];

    const error = new GraphQLError(validationErrors[path]._errors[0], {
      extensions: {
        status: 422,
        path,
      },
    });

    throw error;
  }
};
