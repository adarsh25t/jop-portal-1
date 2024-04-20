import { connectToDB } from "@/lib/DB";
import { Job } from "../models/Job";
import { searchParamsProps } from "@/app/page";



export const getAllJobs = async (searchParamsProps: searchParamsProps) => {
    try {
        await connectToDB();


        // Constructing the filter object based on search parameters
        const filter: any = {};

        // If the query parameter 'q' is present, search in title or description
        if (searchParamsProps.q) {
            filter.$or = [
                { title: { $regex: searchParamsProps.q, $options: 'i' } }, // Case-insensitive regex match for title
                { description: { $regex: searchParamsProps.q, $options: 'i' } } // Case-insensitive regex match for description
            ];
        }

        // If the 'type' parameter is present, filter by type
        if (searchParamsProps.type) {
            filter.type = searchParamsProps.type;
        }

        // If the 'remote' parameter is true, filter by remote jobs
        if (searchParamsProps.remote === 'true') {
            filter.locationType = 'remote';
        }

        // Fetch jobs based on the constructed filter
        const jobs = await Job.find(filter);
        return jobs;
    } catch (error: any) {
        throw new Error(error);
    }
}

