import React, { cache } from 'react'
import { Job } from '../../../../models/Job'
import { notFound } from 'next/navigation';
import JobPage from '@/components/JobPage';
import { Button } from '@/components/ui/button';

interface JobParams {
    params: { slug: string }
}

const getJob = cache(async (slug: string) => {
    const job = await Job.findOne({ slug });

    if (!job) notFound();

    return job;
})

export async function generateMetadata({ params: { slug } }: JobParams) {
    const job = await getJob(slug);

    return {
        title: job.title,
        description: job.description
    }
}

async function page({ params: { slug } }: JobParams) {

    const job = await getJob(slug);

    const { applicationEmail, applicationUrl } = job;

    const applicationLink = applicationEmail
        ? `mailto:${applicationEmail}`
        : applicationUrl;

    return (
        <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
            <JobPage job={job} />
            <aside>
                <Button asChild>
                    <a href={applicationLink} className="w-40 md:w-fit">
                        Apply now
                    </a>
                </Button>
            </aside>
        </main>
    )
}

export default page