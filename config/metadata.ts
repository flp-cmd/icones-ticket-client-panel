import type { Metadata } from 'next';

// Base metadata configuration
const BASE_METADATA = {
  title: {
    default: 'Ícones - Painel Administrativo',
    template: '%s - Ícones',
  },
  description: 'Painel administrativo para gerenciar venda de ingressos',
  keywords: ['painel', 'administrativo', 'ingressos', 'eventos'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Ícones',
  },
};

// Types to facilitate usage
type PageMetadata = {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
  };
};

/**
 * Creates metadata for a page in a simplified way
 */
export function createPageMetadata(pageMetadata: PageMetadata = {}): Metadata {
  const { title, description, keywords = [], noIndex = false, noFollow = false, openGraph = {} } = pageMetadata;

  return {
    title: title ? { absolute: title } : BASE_METADATA.title,
    description: description || BASE_METADATA.description,
    keywords: [...BASE_METADATA.keywords, ...keywords],
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    openGraph: {
      ...BASE_METADATA.openGraph,
      title: openGraph.title || title || BASE_METADATA.title.default,
      description: openGraph.description || description || BASE_METADATA.description,
      images: openGraph.image ? [openGraph.image] : undefined,
      type: openGraph.type || 'website',
    },
  };
}

/**
 * Creates metadata for private pages (login, profile, etc.)
 */
export function createPrivatePageMetadata(pageMetadata: PageMetadata = {}): Metadata {
  return createPageMetadata({
    ...pageMetadata,
    noIndex: true,
    noFollow: true,
  });
}

/**
 * Creates dynamic metadata in a simplified way
 */
export async function createDynamicMetadata(
  dataFetcher: () => Promise<{
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
  }>,
  pageMetadata: PageMetadata = {}
): Promise<Metadata> {
  const data = await dataFetcher();

  return createPageMetadata({
    title: data.title,
    description: data.description,
    openGraph: {
      ...pageMetadata.openGraph,
      title: data.title,
      description: data.description,
      image: data.image,
      type: data.type,
    },
    ...pageMetadata,
  });
}
