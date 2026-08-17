import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { DiscoverItem } from '../types'

export default function Discovery({ items }: { items: DiscoverItem[] }) {
  const [preview, setPreview] = React.useState<string | undefined>(undefined)

  return (
    <div className="discover-root" aria-label="Descoberta">
      {items.map((i, idx) => (
        <Link
          key={i.to}
          to={i.to}
          className="discover-item"
          onMouseEnter={() => setPreview(i.image)}
          onFocus={() => setPreview(i.image)}
          onMouseLeave={() => setPreview(undefined)}
          onBlur={() => setPreview(undefined)}
        >
          <div className="discover-item-inner">
            <div>
              <div className="discover-number">0{idx + 1}</div>
              <div className="discover-label">{i.label}</div>
            </div>
          </div>

          <div className="discover-preview" aria-hidden>
            {i.image && (
              <motion.img
                src={i.image}
                alt=""
                className="discover-preview-img"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: preview === i.image ? 1 : 0 }}
                transition={{ duration: 0.22 }}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
