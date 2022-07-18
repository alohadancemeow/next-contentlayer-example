import Link from 'next/link'
import React from 'react'

type Props = {}

const Menu = (props: Props) => {
    return (
        <>
            <h1 className="mb-4 text-3xl font-bold text-center">
                Next.js Example
            </h1>
            <div className="flex mb-6 space-x-4 justify-center items-center">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/tags">
                    <a>Tags</a>
                </Link>
            </div>
        </>
    )
}

export default Menu