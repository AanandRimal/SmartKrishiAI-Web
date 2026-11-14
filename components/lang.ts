export type Lang = 'ne' | 'en'

// Same pattern as the portal: every string is written in both languages at the call site.
export const translator = (lang: Lang) => (en: string, ne: string) => (lang === 'en' ? en : ne)

export const home = (lang: Lang) => (lang === 'en' ? '/en' : '/')
