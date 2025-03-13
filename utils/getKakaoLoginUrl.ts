const getKakaoLoginUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri =
    process.env.NEXT_PUBLIC_REDIRECT_URI ||
    process.env.NEXT_LOCAL_REDIRECT_URI ||
    'https://mirujima-fe-deploy-mimi0506.vercel.app/auth/callback' ||
    'http://localhost:3000/auth/callback';

  if (!clientId || !redirectUri) {
    throw new Error('Kakao OAuth 환경 변수가 설정되지 않았습니다.');
  }

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=kakao`;

  return kakaoAuthUrl;
};

export default getKakaoLoginUrl;
