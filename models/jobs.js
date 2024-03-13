import { Schema } from "mongoose";
import mongoose from "mongoose";

const jobsSchema = new Schema(
    {
        id: String,
        company: String,
        logo: String,
        logoBackground: String,
        position: String,
        postedAt: String,
        contract: String,
        location: String,
        website: String,
        apply: String,
        description: String,
        requirements: {
            content: String,
            items: [],
        },
        role: {
            content: String,
            items: [],
        }
    },
    {
        timestamps: true,
    }
);

const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", jobsSchema);

export default Jobs;