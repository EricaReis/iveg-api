module.exports = function createResponse(statusCode, result) {
    return {
      statusCode,
      result,
    };
  };