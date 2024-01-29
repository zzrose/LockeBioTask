import React from 'react'
import Image from 'next/image'

async function getMovie(movieId:string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`)
  return await res.json()
}

export default async function PharmacyPage({params}: { params: { id: string }}) {
  const movieId = params.id
  const movie = await getMovie(movieId)

  return (
    <div className='w-full'>

    </div>
  )
}
