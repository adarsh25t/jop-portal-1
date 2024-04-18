"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validations";
import {nanoid} from "nanoid"
import {put} from "@vercel/blob";
import path from "path";

export async function createJobPosting(formData: FormData) {

    const values = Object.fromEntries(formData.entries());

    const { 
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
}