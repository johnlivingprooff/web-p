// Static fallback episodes — update with real data from Spotify for Podcasters
// Slug format: lowercase, hyphens only, used for route & Giscus data-term

export const episodes = [
  {
    slug: 'ep-1-where-fear-becomes-love',
    number: 1,
    title: 'Where Fear Becomes Love',
    date: '2024-01-15',
    duration: '42:18',
    description: 'The opening conversation. Why fear is the beginning of every meaningful story, and how love is always waiting on the other side of it. We start here.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '', // Fill in from Spotify: open.spotify.com/episode/XXXXX
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-2-on-becoming',
    number: 2,
    title: 'On Becoming',
    date: '2024-01-29',
    duration: '38:55',
    description: 'Identity isn\'t something you find. It\'s something you build, break, and rebuild. A raw conversation about who we are vs. who we\'re becoming.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-3-creative-solitude',
    number: 3,
    title: 'Creative Solitude',
    date: '2024-02-12',
    duration: '51:03',
    description: 'What happens when you stop performing for people and start creating for yourself? A deep dive into the sacred loneliness of making things.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-4-the-cost-of-caring',
    number: 4,
    title: 'The Cost of Caring',
    date: '2024-02-26',
    duration: '44:30',
    description: 'Empathy is expensive. Boundaries are necessary. And sometimes loving people well means accepting they won\'t understand your limits.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-5-grief-and-growth',
    number: 5,
    title: 'Grief and Growth',
    date: '2024-03-11',
    duration: '56:17',
    description: 'You can\'t grow without losing something. This episode sits with that tension — grief as a portal, not a prison.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-6-money-and-meaning',
    number: 6,
    title: 'Money and Meaning',
    date: '2024-03-25',
    duration: '49:42',
    description: 'The uncomfortable truth about money, hustle culture, and why chasing success without meaning leaves you emptier than you started.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-7-the-body-knows',
    number: 7,
    title: 'The Body Knows',
    date: '2024-04-08',
    duration: '47:11',
    description: 'Before the mind processes, the body already knows. A conversation about intuition, nervous systems, and what our bodies are trying to tell us.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
  {
    slug: 'ep-8-building-in-public',
    number: 8,
    title: 'Building in Public',
    date: '2024-04-22',
    duration: '53:08',
    description: 'Sharing the work before it\'s ready. The vulnerability of building something real in front of people who don\'t yet believe in it.',
    image: '/imgs/the podcast.png',
    spotifyEpisodeId: '',
    spotifyUrl: 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  },
];

/**
 * Converts an RSS item to the episode shape above.
 * Call this when merging RSS feed data with static fallback.
 */
function decodeHtml(html) {
  // Strip tags then decode HTML entities via a temporary textarea
  const stripped = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const txt = document.createElement('textarea');
  txt.innerHTML = stripped;
  return txt.value;
}

export function rssItemToEpisode(item, index, total) {
  const title = item.querySelector('title')?.textContent || '';
  const pubDate = item.querySelector('pubDate')?.textContent || '';
  const rawDesc = item.querySelector('description')?.textContent || '';
  const description = decodeHtml(rawDesc);
  const link = item.querySelector('link')?.textContent || '';
  const enclosure = item.querySelector('enclosure');
  const itunesImage = item.querySelector('itunes\\:image');
  const mediaThumbnail = item.querySelector('media\\:thumbnail');

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
    .replace(/-+$/, '');

  const durationEl = item.querySelector('itunes\\:duration');
  let duration = durationEl?.textContent || '';
  if (duration && !duration.includes(':')) {
    const secs = parseInt(duration);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    duration = `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Extract Spotify episode ID from URL if possible
  const spotifyMatch = link.match(/episode\/([A-Za-z0-9]+)/);
  const spotifyEpisodeId = spotifyMatch ? spotifyMatch[1] : '';

  return {
    slug: `ep-${total - index}-${slug}`,
    number: total - index,
    title,
    date: pubDate ? new Date(pubDate).toISOString().split('T')[0] : '',
    duration,
    description,
    image: itunesImage?.getAttribute('href') || mediaThumbnail?.getAttribute('url') || '/imgs/the podcast.png',
    audioUrl: enclosure?.getAttribute('url') || '',
    spotifyEpisodeId,
    spotifyUrl: link || 'https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ',
  };
}
