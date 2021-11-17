import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { table } from "../utils/Airtable";

const ownsRecord = (handler) =>
    withApiAuthRequired(async (req, res) => {
        const { user } = await getSession(req);
        const { id } = req.body;

        try {
            const existingRecord = await table.find(id);
            if (!existingRecord || user.sub !== existingRecord.fields.id) {
                res.statusCode = 404;
                return res.json({ msg: "Record not found" });
            }
            req.record = existingRecord;
            return handler(req, res);
        } catch (error) {
            console.error(err);
            res.statusCode = 500;
            res.json({ msg: "Something went wrong" });
        }
    });

export default ownsRecord;
