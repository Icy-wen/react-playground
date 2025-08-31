import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'

interface FileNameItemProps {
  value: string,
  actived: boolean,
  onClick: () => void,
  onEditComplete: (name: string) => void,
  creating: boolean,
  onRemove: (e: React.MouseEvent) => void,
}

export default function FileNameItem(props: FileNameItemProps) {
  const { value, actived = false, onClick, onEditComplete, creating = false, onRemove } = props
  const [name, setName] = useState(value)
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setName(value)
  }, [value])

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus()
    }
  }, [creating])

  return (
    <div
      className={classnames(styles['tab-item'], actived ? styles.actived : null)}
      onClick={onClick}
    >
      {
        editing ?
          (
            <input
              ref={inputRef}
              type="text"
              className={styles['tabs-item-input']}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                setEditing(false)
                onEditComplete(name)
              }}
            />
          ) :
          (
            <>
              <span onDoubleClick={handleDoubleClick}>{name}</span>
              <span style={{ marginLeft: 5, display: 'flex' }} onClick={onRemove}>
                <svg width='12' height='12' viewBox='0 0 24 24'>
                  <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                  <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </span>
            </>
          )
      }
    </div>
  )
}
