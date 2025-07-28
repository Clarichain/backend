import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const folder = (req as any).folder || "contract_documents";
        return {
            folder,
            allowed_formats: ["doc", "docx", "pdf"], //document types
            resource_type: "raw"
        };
    }
});

const upload = multer({ storage });
export default upload
