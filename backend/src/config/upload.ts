import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

const tempFolder = resolve(__dirname, "..", "..", "temp");

export default {
    directory: tempFolder,
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
