import { defineConfig } from 'vitepress'
import kroki from '@kazumatu981/markdown-it-kroki'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

type SidebarItem = {
  text: string
  link: string
}

type SidebarGroup = {
  text: string
  link?: string
  items: Array<SidebarItem | SidebarGroup>
}

const docsRootDir = fileURLToPath(new URL('..', import.meta.url))

function titleFromSlug(slug: string): string {
  const words = slug
    .split('-')
    .map((w) => w.trim())
    .filter(Boolean)
    .map((w) => w.toLowerCase())

  const text = words.join(' ')
  if (!text) return slug
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function firstMarkdownH1Title(markdown: string): string | null {
  const lines = markdown.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('# ')) return trimmed.slice(2).trim()
  }
  return null
}

function sidebarItemsFromFolder(options: {
  folder: string
  baseLink: string
  order?: string[]
  exclude?: string[]
  includeDirIndex?: boolean
  indexText?: string
}): SidebarItem[] {
  const folderAbs = path.join(docsRootDir, options.folder)
  const entries = readdirSync(folderAbs, { withFileTypes: true })

  const exclude = new Set((options.exclude ?? []).map((s) => s.toLowerCase()))
  const order = options.order ?? []
  const includeDirIndex = options.includeDirIndex ?? true

  type EntryRef = {
    slug: string
    file: string
    kind: 'file' | 'dir'
  }

  const refs: EntryRef[] = entries.flatMap<EntryRef>((entry) => {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const slug = entry.name.replace(/\.md$/, '')
      return [{ slug, file: path.join(folderAbs, entry.name), kind: 'file' }]
    }

    if (includeDirIndex && entry.isDirectory()) {
      const indexFile = path.join(folderAbs, entry.name, 'index.md')
      try {
        readFileSync(indexFile, 'utf-8')
        return [{ slug: entry.name, file: indexFile, kind: 'dir' }]
      } catch {
        return []
      }
    }

    return []
  })

  const items: SidebarItem[] = refs
    .filter((ref) => !exclude.has(ref.slug.toLowerCase()))
    .map((ref) => {
      const md = readFileSync(ref.file, 'utf-8')
      const title = firstMarkdownH1Title(md) ?? ref.slug
      if (ref.slug === 'index') return { text: options.indexText ?? title, link: options.baseLink }
      const link = ref.kind === 'dir' ? `${options.baseLink}${ref.slug}/` : `${options.baseLink}${ref.slug}`
      return { text: title, link }
    })

  items.sort((a, b) => {
    const aSlug = a.link === options.baseLink ? 'index' : a.link.split('/').filter(Boolean).at(-1) ?? ''
    const bSlug = b.link === options.baseLink ? 'index' : b.link.split('/').filter(Boolean).at(-1) ?? ''

    const aIdx = order.indexOf(aSlug)
    const bIdx = order.indexOf(bSlug)
    if (aIdx !== -1 || bIdx !== -1) {
      if (aIdx === -1) return 1
      if (bIdx === -1) return -1
      return aIdx - bIdx
    }
    return a.text.localeCompare(b.text, 'fr')
  })

  return items
}

function sidebarGroupsFromFolder(options: {
  folder: string
  baseLink: string
  rootGroupText: string
  order?: string[]
  exclude?: string[]
  indexText?: string
}): SidebarGroup[] {
  const exclude = new Set((options.exclude ?? []).map((s) => s.toLowerCase()))
  const order = options.order ?? []
  const folderAbs = path.join(docsRootDir, options.folder)
  const entries = readdirSync(folderAbs, { withFileTypes: true })

  const sortByOrderThenText = <T extends { slug: string; text: string }>(a: T, b: T) => {
    const aIdx = order.indexOf(a.slug)
    const bIdx = order.indexOf(b.slug)
    if (aIdx !== -1 || bIdx !== -1) {
      if (aIdx === -1) return 1
      if (bIdx === -1) return -1
      return aIdx - bIdx
    }
    return a.text.localeCompare(b.text, 'fr')
  }

  const rootItems = sidebarItemsFromFolder({
    folder: options.folder,
    baseLink: options.baseLink,
    order,
    exclude: options.exclude,
    includeDirIndex: false,
    indexText: options.indexText
  })

  const groups: SidebarGroup[] = [
    {
      text: options.rootGroupText,
      items: rootItems
    }
  ]

  const buildGroupFromDir = (dirAbs: string, dirSlug: string, dirBaseLink: string): SidebarGroup | null => {
    if (exclude.has(dirSlug.toLowerCase())) return null

    const indexFile = path.join(dirAbs, 'index.md')
    let indexMd: string
    try {
      indexMd = readFileSync(indexFile, 'utf-8')
    } catch {
      return null
    }

    const groupText = titleFromSlug(dirSlug)
    const groupEntries = readdirSync(dirAbs, { withFileTypes: true })

    const fileItems: Array<{ slug: string; item: SidebarItem; text: string }> = []
    const dirGroups: Array<{ slug: string; group: SidebarGroup; text: string }> = []

    for (const entry of groupEntries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const slug = entry.name.replace(/\.md$/, '')
        if (slug.toLowerCase() === 'index') continue
        if (exclude.has(slug.toLowerCase())) continue

        const filePath = path.join(dirAbs, entry.name)
        const md = readFileSync(filePath, 'utf-8')
        const title = firstMarkdownH1Title(md) ?? slug
        fileItems.push({
          slug,
          text: title,
          item: { text: title, link: `${dirBaseLink}${slug}` }
        })
        continue
      }

      if (entry.isDirectory()) {
        const childSlug = entry.name
        const childAbs = path.join(dirAbs, childSlug)
        const childBase = `${dirBaseLink}${childSlug}/`
        const childGroup = buildGroupFromDir(childAbs, childSlug, childBase)
        if (childGroup) {
          dirGroups.push({ slug: childSlug, text: childGroup.text, group: childGroup })
        }
      }
    }

    fileItems.sort(sortByOrderThenText)
    dirGroups.sort(sortByOrderThenText)

    return {
      text: groupText,
      items: [
        { text: options.indexText ?? 'Vue d’ensemble', link: dirBaseLink },
        ...fileItems.map((x) => x.item),
        ...dirGroups.map((x) => x.group)
      ]
    }
  }

  const subdirGroups = entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const slug = e.name
      const abs = path.join(folderAbs, slug)
      const base = `${options.baseLink}${slug}/`
      const group = buildGroupFromDir(abs, slug, base)
      if (!group) return null
      return { slug, text: group.text, group }
    })
    .filter((x): x is { slug: string; text: string; group: SidebarGroup } => x !== null)

  subdirGroups.sort(sortByOrderThenText)
  groups.push(...subdirGroups.map((x) => x.group))

  return groups
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My SmartHub",
  description: "My smart home ecosystem, for my connected house.",
  markdown: {
    config: (md) => {
      md.use(kroki, {
        entrypoint: process.env.KROKI_ENDPOINT ?? 'https://kroki.io',
        imageFormat: 'png',
        useImg: true
      })
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Le projet', link: '/projet/' },
      { text: 'Infrastructure', link: '/infrastructure/' },
    ],

    // Sidebar contextuelle (par préfixe d’URL)
    sidebar: {
      '/infrastructure/': [
        ...sidebarGroupsFromFolder({
          folder: 'infrastructure',
          baseLink: '/infrastructure/',
          rootGroupText: 'Infrastructure',
          order: ['index'],
          indexText: 'Vue d’ensemble'
        })
      ],
      '/projet/': [
        ...sidebarGroupsFromFolder({
          folder: 'projet',
          baseLink: '/projet/',
          rootGroupText: 'Projet',
          order: ['index', 'design-guide', 'inspiration'],
          exclude: ['diagrammes'],
          indexText: 'Vue d’ensemble'
        })
      ],
      '/': [
        ...sidebarGroupsFromFolder({
          folder: 'projet',
          baseLink: '/projet/',
          rootGroupText: 'Projet',
          order: ['index', 'design-guide', 'inspiration'],
          exclude: ['diagrammes'],
          indexText: 'Vue d’ensemble'
        })
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fslef/smarthub' }
    ],

    search: {
      provider: 'local'
    }
  },
  locales: {
    root: {
      label: 'French',
      lang: 'fr'
    },
    fr: {
      label: 'English',
      lang: 'en', // optional, will be added  as `lang` attribute on `html` tag
      link: '/en/'

      // other locale specific properties...
    }
  }
})
