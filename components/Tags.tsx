import Link from 'next/link'
import React from 'react'

type Props = {
    tags: string[]
}

const Tags = ({ tags }: Props) => {
    return (
        <div className="flex space-x-2 mt-2 mb-2 text-sm">
            {tags.map((tag, idx) => (
                <div key={idx} className="bg-blue-100 py-1 px-2 rounded">
                    <Link href={`/tags/${tag.split(' ').join('-')}`}>
                        <a className='text-blue-500 hover:text-blue-700'>{tag}</a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Tags