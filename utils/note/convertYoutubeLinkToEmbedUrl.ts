const YOUTUBE_DOMAINS = ['www.youtube.com', 'youtube.com', 'm.youtube.com'];
const SHORT_YOUTUBE = 'youtu.be';
const prefix = 'https://www.youtube.com/embed/';

const convertYoutubeLinkToEmbedUrl = (link: string | undefined) => {
  if (!link) return '';

  try {
    const url = new URL(link);
    let videoId = '';

    const isYoutubeDomain = YOUTUBE_DOMAINS.includes(url.hostname);
    if (isYoutubeDomain && url.searchParams.has('v')) {
      videoId = url.searchParams.get('v') as string;
      return prefix + videoId;
    } else if (url.hostname === SHORT_YOUTUBE) {
      videoId = url.pathname.slice(1);
      return prefix + videoId;
    }

    return link;
  } catch (error) {
    return '';
  }
};

export default convertYoutubeLinkToEmbedUrl;
