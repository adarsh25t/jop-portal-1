import React from 'react'
import NewJobForm from './NewJobForm'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'post a new job',
    description: 'Create new Job',
}

function page() {
  return (
    <>
        <div className='flex flex-col justify-center items-center gap-3'>
            <h1 className='text-4xl font-bold text-gray-900'>Find Your Perfect Developer</h1>
            <h2 className='text-base text-slate-400 font-semibold'>Get your job posting seen by thousands of job seekers.</h2>
        </div>
        <NewJobForm />
    </>
  )
}

export default page