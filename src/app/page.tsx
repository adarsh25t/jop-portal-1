import JobListItem from "@/components/JobListItem";
import { getAllJobs } from "../../actions/jobActions";
import Hero from "../components/Hero/Hero";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import { JobFilterValues } from "@/lib/validations";
import Link from "next/link";

export interface searchParamsProps {
  q?: string,
  type?: string,
  location?: string,
  remote?: string,
}

export default async function Home({ searchParams }: { searchParams: searchParamsProps }) {

  let jobs = await getAllJobs(searchParams);

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <Hero />

      <section className="flex flex-col justify-center gap-4 md:flex-row">
        <JobFilterSidebar />
        <div className="space-y-4">
          {
            jobs.map((job) => (
              <Link key={job._id} href={`/jobs/${job.slug}`} className="block">
                <JobListItem  job={job} />
              </Link>
            ))
          }
        </div>

      </section>
      {
        jobs.length <= 0 && (
          <div className="flex flex-col justify-center gap-4 md:flex-row ">
            <h1 className="border border-input px-6 py-2 min-w-[350px] rounded-lg text-center">No Jobs Found</h1>
          </div>
        )
      }
    </main >
  );
}
