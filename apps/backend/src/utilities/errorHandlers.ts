/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  ValidationError, 
  NotFoundError, 
  DBError, 
  UniqueViolationError, 
  NotNullViolationError, 
  ForeignKeyViolationError, 
  CheckViolationError, 
  DataError 
} from 'objection';

// This class handles objection's error types, and sends the appropriate responses for each of the statuses
export const objectionErrorHandler = (err, request, response, next) => {
  const responseObject = {
    message: err.message,
    type: err.type,
    data: {}
  };


  // invalidContentError
  if (err?.type == 'InvalidContent') {
    response.json({
      ...responseObject,
      status: 400
    });
  }

  if (err instanceof ValidationError) {
    if (err.type == 'ModelValidation') {
      response.json({
        ...responseObject,
        data: err.data,
        status: 400
      });

    } else if (err.type == 'RelationExpression') {
      response.json({
        ...responseObject,
        type: 'RelationExpression'
      });

    } else if (err.type == 'UnallowedRelation') {
      response.json({
        ...responseObject,
        status: 400
      });

    } else if (err.type == 'InvalidGraph') {
      response.json({
        ...responseObject,
        status: 400
      });
    }

  } else if (err instanceof NotFoundError) {
    response.json({
      ...responseObject,
      type: 'NotFound',
      status: 404
    });

  } else if (err instanceof UniqueViolationError) {
    response.json({
      ...responseObject,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      },
      status: 409
    });

  } else if (err instanceof NotNullViolationError) {
    response.json({
      ...responseObject,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table
      },
      status: 400
    });

  } else if (err instanceof ForeignKeyViolationError) {
    response.json({
      ...responseObject,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      },
      status: 409
    });

  } else if (err instanceof CheckViolationError) {
    response.json({
      ...responseObject,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      },
      status: 400
    });

  } else if (err instanceof DataError) {
    response.json({
      ...responseObject,
      type: 'InvalidData',
      status: 400
    });

  } else if (err instanceof DBError) {
    response.json({
      ...responseObject,
      type: 'UnknownDatabaseError',
      status: 500
    });

  } else {
    response.json({
      ...responseObject,
      type: 'UnknownError',
      status: 500
    });
  }
  
  console.error('errorHandler: ', {responseObject});  
};