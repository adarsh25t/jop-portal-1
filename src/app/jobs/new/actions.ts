"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validations";
import {nanoid} from "nanoid"
import {put} from "@vercel/blob";
import path from "path";
import { connectToDB } from "@/lib/DB";
import { Job } from "../../../../models/Job";
import { redirect } from "next/navigation";


export async function createJobPosting(formData: FormData) {

    const values = Object.fromEntries(formData.entries());
    connectToDB()
    let { 
        title,
        type,
        companyName,
        companyLogoUrl,
        locationType,
        location,
        applicationEmail,
        applicationUrl,
        description,
        salary
    } = createJobSchema.parse(values);

    const slug = `${toSlug(title)}-${nanoid(10)}`;

    let companyLogoUrlBlobId: string | undefined = undefined;

    if (companyLogoUrl) {
        const blob = await put(
            `company_logos/${slug}${path.extname(companyLogoUrl.name)}`,
            companyLogoUrl,
            {
                access: "public",
                addRandomSuffix: false
            }
        );
        companyLogoUrlBlobId = blob.url;
    }

    if (applicationUrl == undefined) {
        applicationUrl = ""
    }

    await Job.create({
        title,
        slug,
        type,
        companyName,
        companyLogoUrl: companyLogoUrlBlobId,
        locationType,
        location,
        applicationEmail,
        applicationUrl,
        description,
        salary,
        updatedAt: new Date(),
        createdAt: new Date(),
    });

    redirect("/job-submitted")
}