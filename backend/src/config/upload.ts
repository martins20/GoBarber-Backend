import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "temp"),
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
