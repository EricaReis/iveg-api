// Formata resposta para o padrão
module.exports = function formatResponse(docs, options) {
    const formatedResponse = {};
    const meta = {};
    let records = [];

    meta.server = process.env.SERVER_URL;
    meta.offset = options.offset;
    meta.limit = options.limit;
    meta.recordCount = docs.length;
    records = docs;
    formatedResponse.meta = meta;
    formatedResponse.records = records;

    return formatedResponse;
};