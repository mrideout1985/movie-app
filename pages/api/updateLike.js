import { table, getMinifiedRecord } from "./utils/Airtable";

export default async function (req, res) {
    const { id, fields } = req.body;
    try {
        const updatedRecords = await table.update([{ id, fields }]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(updatedRecords[0]));
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msn: "Something went wrong" });
    }
}
