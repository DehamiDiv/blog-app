import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://Dehami:Divya%402003@cluster0.i4x0qou.mongodb.net/blog-app-next"
        );

        console.log("DB Connected");
    } catch (error) {
        console.error("DB CONNECTION ERROR:", error);
    }
};
