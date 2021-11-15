const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

const table = base("Liked");

const minifyRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
};

const getMinifiedRecord = (record) => {
    if (!record.fields.like) {
        record.fields.like = false;
    }
    return {
        id: record.id,
        fields: record.fields,
    };
};

export default async function (req, res) {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
}

export { table, getMinifiedRecord, minifyRecords };
