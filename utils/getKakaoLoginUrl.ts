// utils/getKakaoLoginUrl.ts
const getKakaoLoginUrl = () => {
  const clientId = '792136902f7722527ab5d74d8bb1d803';
  const redirectUri = 'http://localhost:3000/auth/callback';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=kakao`;
  return kakaoAuthUrl;
};

export default getKakaoLoginUrl;
