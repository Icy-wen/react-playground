import React from 'react'
import logoSvg from './icons/logo.svg'
import style from './index.module.scss'

export default function Header() {
  return (
    <div className={style.header}>
        <div className={style.logo}>
            <img src={logoSvg} alt=""  />
            <span >React Playground</span>
        </div>
    </div>

  )
}
