import Header from './(auth)/_components/Header';
import HeroImages from './_components/heroImages/HeroImages';
import IntroText from './_components/introText/IntroText';
import PWAButton from './_components/PWAButton/PWAButton';

export default function Home() {
  return (
    <div className="custom-scrollbar h-full min-h-[calc(100vh-74px)] w-full overflow-y-scroll">
      <Header />
      <div className="mx-auto my-8 flex w-[calc(100vw-32px)] max-w-[1280px] flex-col space-y-[60px] rounded-[20px] border border-gray200 px-6 py-[40px] md:items-center desktop:flex-row desktop:justify-center desktop:gap-[120px]">
        <IntroText />
        <HeroImages />
        <PWAButton className="desktop:hidden" />
      </div>
    </div>
  );
}
