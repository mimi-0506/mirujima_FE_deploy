import GoogleIcon from '@/public/images/sns/google-icon.svg';
import KaKaoIcon from '@/public/images/sns/kakao-icon.svg';
import getGoogleLoginUrl from '@/utils/getGoogleLoginUrl';
import getKakaoLoginUrl from '@/utils/getKakaoLoginUrl';
import Button from '../_components/Button';

export default function SocialLoginButtons() {
  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  const handleKakaoLogin = () => {
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <div className="mt-[40px] gap-4">
      <label className="font-semibold text-gray500">간편 로그인</label>
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleGoogleLogin}
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 text-gray500"
        >
          <GoogleIcon />
          <span className="text-[16px] font-semibold leading-[22px]">구글 계정으로 로그인</span>
        </Button>
        <Button
          onClick={handleKakaoLogin}
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 text-gray500"
        >
          <KaKaoIcon alt="카카오 로고" />
          <span className="text-[16px] font-semibold leading-[22px]">카카오 계정으로 로그인</span>
        </Button>
      </div>
    </div>
  );
}
