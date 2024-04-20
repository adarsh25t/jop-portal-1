import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { jobTypes } from '@/lib/jobtypes'
import Select from './ui/select'
import FormSubmitButton from './FormSubmitButton'
import { connectToDB } from '@/lib/DB'
import { jobFilterSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'

function JobFilterSidebar() {


    async function filterJobs(formData: FormData) {
        "use server"

        const values = Object.fromEntries(formData.entries());
        connectToDB();

        const {
            q,
            type,
            remote,
            location
        } = jobFilterSchema.parse(values);

        const searchParams = new URLSearchParams({
            ...(q && {q: q.trim()}),
            ...(type && {type}),
            ...(remote && {remote: "true"}),
            ...(location && {location}),
        });

        redirect(`/?${searchParams.toString()}`);
    }


    return (
        <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
            <form className='flex flex-col gap-4' action={filterJobs}>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="q">Search</Label>
                    <Input
                        id="q"
                        name="q"
                        placeholder="Title, company, etc."
                    // defaultValue={defaultValues.q}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                        id="type"
                        name="type"
                    //defaultValue={defaultValues.type || ""}
                    >
                        <option value="">All types</option>
                        {jobTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* <div className="flex flex-col gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Select
                        id="location"
                        name="location"
                       // defaultValue={defaultValues.location || ""}
                    >
                        <option value="">All locations</option>
                        {distinctLocations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </Select>
                </div> */}
                <div className="flex items-center gap-2">
                    <input
                        id="remote"
                        name="remote"
                        type="checkbox"
                        className="scale-125 accent-black"
                       // defaultChecked={defaultValues.remote}
                    />
                    <Label htmlFor="remote">Remote jobs</Label>
                </div>
                <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
            </form>
        </aside>
    )
}

export default JobFilterSidebar