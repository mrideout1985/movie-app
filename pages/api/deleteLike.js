import { table, getMinifiedRecord } from "./utils/Airtable";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import ownsRecord from "./middleware/OwnsRecord";

export default ownsRecord(async function (req, res) {
    const { id } = req.body;
    const { user } = getSession(req);

    try {
        const deletedRecords = await table.destroy([id]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(deletedRecords[0]));
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msn: "Something went wrong" });
    }
});
