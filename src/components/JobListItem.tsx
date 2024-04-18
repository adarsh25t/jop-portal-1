import React from 'react'
import { IJob } from '../../models/Job'

interface JobListItemProps {
    job: IJob
}

function JobListItem() {



  return (
    <div className='flex gap-3 rounded-lg border p-4'>
        Front end developer
    </div>
  )
}

export default JobListItem