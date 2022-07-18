import { allPosts } from 'contentlayer/generated'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import Menu from '../../components/Menu'
import TagsCompenent from '../../components/Tags'

type Props = {}

type Tags = {
    [key: string]: number
}

export const getStaticProps: GetStaticProps = async () => {
    const tags: Tags = {}
    allPosts.forEach(post => (
        post.tags.forEach(tag => {
            if (!tags[tag]) {
                tags[tag] = 1
            } else {
                tags[tag]++
            }
        })
    ))

    return {
        props: {
            tags
        }
    }
}

const Tags: NextPage = ({ tags }: Tags) => {

    return (
        <div className="max-w-xl py-8 mx-auto">
            <Menu />
            <div className="space-y-8">
                <div className="flex space-x-2 flex-wrap">
                    {Object.keys(tags).map((tag, i) => {
                        return (
                            <div className='bg-blue-100 py-1 px-2 rounded'>
                                <Link key={i} href={`/tags/${tag.split(" ").join("-")}`}>
                                    <a className=" inline-block">
                                        <span className="text-blue-500">{tag}</span>{" "}
                                        <span>({tags[tag]})</span>
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Tags