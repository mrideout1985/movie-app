import { table, minifyRecords } from "./utils/Airtable";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function (req, res) {
    const { user } = getSession(req);
    try {
        const records = await table
            .select({
                filterByFormula: `id = '${user.sub}'`,
            })
            .firstPage();
        const minifiedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(minifiedRecords);
    } catch (err) {
        res.statusCode = 500;
        res.json({ msn: "Something went wrong" });
    }
});
