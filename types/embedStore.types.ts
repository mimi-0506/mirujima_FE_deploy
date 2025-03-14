export type EmbedState = {
  isEmbedContentOpen: boolean;
  embedUrl: string;
};

type EmbedActions = {
  setEmbedContentOpen: (now: boolean) => void;
  setEmbedUrl: (url: string) => void;
};
export type EmbedStore = { state: EmbedState; actions: EmbedActions };
