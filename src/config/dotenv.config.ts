import path from "path";
import dotenv from "dotenv";

const config = dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (config.error) {
    throw config.error
}
