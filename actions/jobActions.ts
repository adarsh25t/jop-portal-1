import { connectToDB } from "@/lib/DB";
import { Job } from "../models/Job";

export const getAllJobs = async () => {
    try {
        await connectToDB();
        const jobs = await Job.find({});
        return jobs;
    } catch (error: any) {
        throw new Error(error);
    }
}

