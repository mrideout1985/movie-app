/* eslint-disable import/no-anonymous-default-export */
import { table, minifyRecords } from "./utils/Airtable";

export default async function (req, res) {
    try {
        const records = await table.select({}).firstPage();
        const minifiedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(minifiedRecords);
    } catch (err) {
        res.statusCode = 500;
        res.json({ msn: "Something went wrong" });
    }
}
