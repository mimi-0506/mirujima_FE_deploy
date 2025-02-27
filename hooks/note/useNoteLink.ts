import React from 'react';
import toast from 'react-hot-toast';

import { URL_REGEX } from '@/constant/regex';
import { LINK_DELETE_SUCCESS, LINK_VALID_ERROR, LINK_VALID_LONG_ERROR } from '@/constant/toastText';
import { useEmbedStore, useModalStore } from '@/provider/store-provider';

const useNoteLink = (initLink: string | undefined) => {
  const [linkUrl, setLinkUrl] = React.useState(initLink);
  const linkInputRef = React.useRef<HTMLInputElement>(null);

  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);
  const { setEmbedUrl, setEmbedContentOpen } = useEmbedStore(({ actions }) => actions);

  const handleDeleteLink = () => {
    setLinkUrl('');
    setEmbedUrl('');
    setEmbedContentOpen(false);
  };

  const handleLinkSubmit = () => {
    if (!linkInputRef.current) return;

    const linkValue = linkInputRef.current.value.trim();
    if (linkValue === '') {
      handleDeleteLink();
      toast.success(LINK_DELETE_SUCCESS);
      return;
    }

    try {
      const link = new URL(linkValue);
      const isWrongURL = URL_REGEX.test(link.href) === false;
      if (isWrongURL) {
        toast.error(LINK_VALID_ERROR, { duration: 1500 });
        return;
      }

      const decodeLink = decodeURI(link.href);
      if (decodeLink.length > 254) {
        toast.error(LINK_VALID_LONG_ERROR);
        return;
      }

      setLinkUrl(decodeLink);
      setNoteLinkModalOpen(false);
      setEmbedUrl(decodeLink);
    } catch (error) {
      toast.error(LINK_VALID_ERROR, { duration: 1500 });
    }
  };

  const handleLinkModal = () => {
    setNoteLinkModalOpen(true, {
      defaultValue: linkUrl,
      onSubmit: handleLinkSubmit,
      linkInputRef
    });
  };

  const setLink = (url: string) => {
    setEmbedUrl(decodeURI(url));
    setLinkUrl(decodeURI(url));
  };

  React.useEffect(() => {
    return () => setEmbedUrl('');
  }, []);

  return { linkUrl, handleLinkModal, handleDeleteLink, setLink };
};

export default useNoteLink;
