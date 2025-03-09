// utils/getKakaoLoginUrl.ts
const getKakaoLoginUrl = () => {
  const clientId = '792136902f7722527ab5d74d8bb1d803'; // 백엔드에서 준 REST API 키
  const redirectUri = 'https://api.mirujima.shop/mirujima/auth/kakao'; // 백엔드 REDIRECT URL
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  return kakaoAuthUrl;
};

export default getKakaoLoginUrl;
