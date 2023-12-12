import { GraphQLError } from 'graphql';

export const validateInput = (schema, value) => {
  const validationResult = schema.validate(value);
  if (validationResult.error) {
    const error = new GraphQLError(validationResult.error.message, {
      extensions: { status: 422, payload: validationResult.error.details },
    });

    throw error;
  }
};
