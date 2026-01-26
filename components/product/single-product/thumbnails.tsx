"use client";

import { Thumbnail } from "@/lib/types/product.types";
import Image from "next/image";
import { useState } from "react"

function Thumbnails({ thumbnails, className }: { className?: string; thumbnails: Thumbnail[] }) {
  const [current, setCurrent] = useState(thumbnails[0])
  return (
    <section className={`bg-muted/20 rounded-md shadow-lg ${className}`}>
      <div className="mb-2 relative p-2 h-[calc(3*100dvh/5)] w-full block object-cover">
        <Image src={current.url} fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority alt="" />
      </div>
      <div className="flex gap-2 w-full overflow-auto p-2 [&::-webkit-scrollbar]:hidden">
        {
          thumbnails.map(thumb =>
            <button key={thumb.id}
              className={`size-24 min-w-24 min-h-24 bg-white shadow-md relative border-2 ${current.id === thumb.id ? "border-blue-300" : "border-transparent"} cursor-pointer duration-150 rounded-md`}
              onClick={() => setCurrent(thumbnails.find(thumbnail => thumbnail.id === thumb.id) || thumbnails[0])}>
              <Image src={thumb.url} fill sizes="96px" alt={thumb.alt || ""} className="rounded-md w-full h-full object-cover" />
            </button>)
        }
      </div>
    </section>
  )
}

export default Thumbnails