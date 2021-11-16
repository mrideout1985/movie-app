import { table, minifyRecords } from "./utils/Airtable";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function (req, res) {
    const { name } = req.body;
    const { user } = getSession(req);
    try {
        const createdRecords = await table.create([
            { fields: { name, id: user.sub } },
        ]);
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
        };
        res.statusCode = 200;
        res.json(createdRecord);
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.json({ msn: "Something went wrong" });
    }
});
