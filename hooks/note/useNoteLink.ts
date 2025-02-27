import React from 'react';
import toast from 'react-hot-toast';

import { URL_REGEX } from '@/constant/regex';
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
      toast.success('링크를 삭제했습니다');
      return;
    }

    const isWrongURL = URL_REGEX.test(linkValue) === false;
    if (isWrongURL) {
      toast.error('유효하지 않은 링크입니다', { duration: 1500 });
      return;
    }

    setEmbedUrl(decodeURI(linkValue));
    setLinkUrl(decodeURI(linkValue));
    setNoteLinkModalOpen(false);
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
