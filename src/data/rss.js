import axios from 'axios';
import { episodes as staticEpisodes, episodeFromFields } from './episodes.js';

export const RSS_URL = 'https://anchor.fm/s/185e0d68/podcast/rss';

const ITEM_RE = /<item>[\s\S]*?<\/item>/gi;

function tag(name) {
  return new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i');
}

function cdataTag(name) {
  return new RegExp(`<${name}(?:\\s[^>]*)?><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${name}>`, 'i');
}

function attr(name, attribute) {
  return new RegExp(`<${name}[^>]*\\s${attribute}\\s*=\\s*["']([^"']*)["']`, 'i');
}

let cache = null;

/**
 * Parses the Anchor/Spotify RSS XML into the shared episode shape.
 * Pure string/regex based so it runs in both the browser and Node (SSG).
 */
export function parseRss(xml) {
  const channelImage = attr('itunes\\:image', 'href').exec(xml)?.[1] || '';
  const itemStrs = Array.from(xml.matchAll(ITEM_RE), (m) => m[0]);

  return itemStrs.map((str, i) => episodeFromFields({
    title: cdataTag('title').exec(str)?.[1] || tag('title').exec(str)?.[1]?.trim() || '',
    pubDate: tag('pubDate').exec(str)?.[1]?.trim() || '',
    description: cdataTag('description').exec(str)?.[1] ?? tag('description').exec(str)?.[1] ?? '',
    link: tag('link').exec(str)?.[1]?.trim() || '',
    enclosureUrl: attr('enclosure', 'url').exec(str)?.[1] || '',
    itunesImage: attr('itunes\\:image', 'href').exec(str)?.[1] || '',
    mediaThumbnailUrl: attr('media\\:thumbnail', 'url').exec(str)?.[1] || '',
    channelImage,
    durationRaw: tag('itunes\\:duration').exec(str)?.[1]?.trim() || '',
  }, i, itemStrs.length));
}

export async function fetchEpisodes(force = false) {
  if (cache && !force) return cache;
  try {
    const res = await axios.get(RSS_URL, { timeout: 15000 });
    cache = parseRss(res.data);
  } catch (err) {
    console.error('[rss] failed to fetch feed, using static fallback', err);
    cache = staticEpisodes;
  }
  return cache;
}

export function getCachedEpisodes() {
  return cache;
}

export function setCachedEpisodes(list) {
  cache = list;
}
