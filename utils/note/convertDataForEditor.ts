import type { PartialBlock } from '@blocknote/core';

export const convertDataForEditor = async (defaultContent: string | undefined) => {
  if (!defaultContent) return undefined;

  const parsedValue = JSON.parse(defaultContent) as PartialBlock[];

  // editor에 값을 추가하지 않았을 때 초기 Block, 값이 있을 때 다음 빈 블록 제거
  if (Array.isArray(parsedValue) && parsedValue.length > 0) parsedValue.pop();

  return parsedValue;
};
