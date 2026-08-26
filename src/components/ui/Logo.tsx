import { cn } from '@/lib/cn'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const hasHeight = className?.match(/\bh-\d/) ?? false
  const hasTextColor = className?.match(/\btext-/) ?? false
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 200 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(!hasHeight && 'h-6 w-auto', !hasTextColor && 'text-black', className)}
    >
      {/* DARTEX text — currentColor = biela na čiernom pozadí, čierna na bielom (cez text-black) */}
      <path
        d="M71.18,17.17H58.06V37.5H71.62s7.76-.44,7.76-10.61S71.18,17.17,71.18,17.17Zm-5,14.75v-10s6-1,6,5.46C72.16,32.91,66.15,31.92,66.15,31.92Z"
        fill="currentColor"
      />
      <path
        d="M106.6,17.17h15.85s4.15.43,4.15,5.68-4.15,6.34-4.15,6.34l3.71,8.31h-8l-3-11.7s4.92.66,4.92-2.19S118.29,21,118.29,21h-4.48V37.5H106.6Z"
        fill="currentColor"
      />
      <polygon
        points="127.47 22.19 127.47 17.16 147.48 17.16 147.48 22.19 141.47 22.19 141.47 37.5 133.6 37.5 133.6 22.19 127.47 22.19"
        fill="currentColor"
      />
      <polygon
        points="149.34 17.16 149.34 37.5 165.84 37.5 165.84 32.58 156.44 32.58 156.44 29.19 164.86 29.19 164.86 24.6 156.99 24.6 156.99 21.86 166.94 21.86 166.94 17.16 149.34 17.16"
        fill="currentColor"
      />
      <polygon
        points="168.9 17.16 175.03 26.46 166.94 37.5 174.7 37.5 178.41 32.25 181.91 37.5 189.56 37.5 182.57 26.46 190 17.16 182.35 17.16 179.4 20.88 176.66 17.16 168.9 17.16"
        fill="currentColor"
      />
      <path
        d="M97.74,17.17H88.23L78,37.5h8.2l2.07-5h7.65l1.53,5h8.31ZM89.43,27.88l3-7,2.18,7Z"
        fill="currentColor"
      />
      {/* Jewel akcent #A62431 — fixná farba z palety */}
      <circle cx="17.62" cy="27.33" r="10.17" fill="#A62431" />
      <path
        d="M28.77,6.89a20.44,20.44,0,0,1,0,40.88H8.55L18,37.39l10.71.11a10.17,10.17,0,0,0,.11-20.33H18.06L8.55,6.89Z"
        fill="currentColor"
      />
    </svg>
  )
}
