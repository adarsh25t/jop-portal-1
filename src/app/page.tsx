import JobListItem from "@/components/JobListItem";
import { getAllJobs } from "../../actions/jobActions";
import Hero from "../components/Hero/Hero";


export default async function Home() {

  const jobs = await getAllJobs();

  console.log(jobs);
  

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <Hero />
        {/* {
          jobs.map((job) => (
            <JobListItem key={job._id} job={job} />
          ))
        } */}
        <JobListItem  />
    </main>
  );
}
