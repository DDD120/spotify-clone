"use client"

import MediaItem from "@/components/MediaItem"
import { Song } from "@/types"

interface Props {
  songs: Song[]
}

function SearchContent({ songs }: Props) {
  if (!songs.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song: Song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={() => {}} song={song} />
          </div>
          {/* TODO: Add Like Button Here */}
        </div>
      ))}
    </div>
  )
}

export default SearchContent
