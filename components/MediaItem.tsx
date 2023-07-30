"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"

interface Props {
  song: Song
  onClick?: (id: string) => void
}

function MediaItem({ song, onClick }: Props) {
  const imageUrl = useLoadImage(song)

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id)
    }

    // TODO Default turn on player
  }

  return (
    <div
      onClick={handleClick}
      className="flex gap-x-3 items-center cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "images/liked.png"}
          alt={`${song.title} 커버`}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {song.author}</p>
      </div>
    </div>
  )
}

export default MediaItem
