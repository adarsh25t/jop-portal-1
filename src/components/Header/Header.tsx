import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function Header() {
    return (
        <div>
            <div className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
                <Link 
                    href={'/'}
                >
                    <Image
                        src={'/image/logo.png'}
                        width={40}
                        height={40}
                        alt="logo"
                    />
                </Link>
                <div className="">
                    <Button asChild>
                        <Link href={'/jobs/new'}>Post a Job</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header