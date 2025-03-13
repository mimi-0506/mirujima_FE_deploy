import React from 'react';
import PWAButton from '../PWAButton/PWAButton';

export default function IntroText() {
  return (
    <div className="animate-slideupfade space-y-12">
      <div className="space-y-3 text-center md:space-y-4 desktop:text-left">
        <h2 className="md:text-[30px] md:leading-[41px] desktop:text-[38px]">
          언제 어디서나 손안에서
        </h2>
        <h2 className="text-head1 md:text-[51px] md:font-bold md:leading-[130%] desktop:text-[60px]">
          할 일을 더 쉽게, <br /> 편리하게 관리해요
        </h2>
        <p className="text-body2 text-gray400 md:text-head2">
          미루지마 앱에서 <br className="hidden desktop:block" /> 더 편하게 경험해 보세요
        </p>
      </div>
      <PWAButton className="hidden w-[322px] desktop:block" />
    </div>
  );
}
