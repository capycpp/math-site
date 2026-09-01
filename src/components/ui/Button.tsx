import React from 'react'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
}

export default function Button({ variant = 'primary', className, ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none'
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-primary-500 to-purple-400 text-white shadow-md',
    ghost: 'bg-white/10 text-white',
    outline: 'border border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-200',
  }
  return <button className={clsx(base, variants[variant], className)} {...props} />
}
