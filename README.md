<div align="center">

# MIRUJIMA

 <img src="https://github.com/user-attachments/assets/533c8fd3-2c30-400d-8113-f383194e5d0b" alt="Image" style="width: 50%; height: auto;" />

[Deployment](https://mirujima-fe-deploy.vercel.app/) | [Report Bug](https://desert-share-9a5.notion.site/184a915822ac813eb508e86635d7423d?pvs=4) | [Request Feature](https://desert-share-9a5.notion.site/c1810df35eeb4f1c948baee096d0b538?pvs=4)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-FF6B6B?style=for-the-badge&logo=Zustand&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/Tanstack%20Query-FF3B4D?style=for-the-badge&logo=Tanstack%20Query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6F61?style=for-the-badge&logo=Recharts&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12A5F4?style=for-the-badge&logo=Motion&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white)

</div>

<br/>
<br/>

## 🍅 프로젝트 소개

사용자가 **다양한 콘텐츠**(아티클, 강의 영상, 줌 미팅 일정, 강의 PDF 등)를 **할 일 목록으로 관리**하고, **학습 진도 및 프로젝트 진행 상황을 대시보드에서 한눈에 확인**할 수 있도록 도와줍니다.

또한, 각 할 일에 대해 **노트를 작성 및 관리**할 수 있어 체계적인 학습 및 프로젝트 진행이 가능합니다.

<br/>
<br/>

## 📆 개발 일정 및 진행방식

- **개발 기간**: 2025.02.05 ~ 2025.03.18
- **진행 방식**: 애자일, 데일리 스크럼

<br/>
<br/>

## ⚙ 테스트 계정
 ```
ID: test@gmail.com 
PW: 11111111
```


<br/>
<br/>

## 💡 주요 기능

- **할 일 관리**: 다양한 학습 콘텐츠를 할 일로 등록하고 관리
- **대시보드 제공**: 학습 진도 및 프로젝트 진행 상황을 그래프로 시각화
- **목표 설정 및 관리**: 목표별 할 일과 진행 상황 한눈에 확인
- **노트 기능**: 각 할 일에 대한 상세 노트 작성 및 저장
- **뽀모도로 타이머**: 집중력 향상을 위한 작업 및 휴식 시간 관리하는 타이머 제공

<br/>
<br/>

## 🧩 깃 플로우

> `main` - `develop` - `feature`

- **`main` 브랜치**: 배포 가능한 상태 유지
- **`develop` 브랜치**: 다음 릴리스 개발을 위한 브랜치
- **`feature` 브랜치**: 특정 기능이나 작업을 위한 브랜치
- **`hotfix` 브랜치**: 배포 후 버그 작업을 위한 브랜치
- **배포 주기**: 스프린트 주기로 배포

<br/>
<br/>

## ⛑ 개발 컨벤션
### 커밋 컨벤션

| 커밋 유형  | 설명          |
| ---------- | ------------- |
| `feat`     | 기능 구현     |
| `fix`      | 버그 수정     |
| `chore`    | 설정 변경     |
| `refactor` | 코드 리팩토링 |
| `test`     | 테스트        |
| `docs`     | 문서 수정     |
| `style`    | 스타일 수정   |

### 함수, 변수 컨벤션

> **카멜 케이스 (camelCase)** 적용  
> 함수 이름은 길어도 괜찮으니 최대한 상세하게 작성

| 컨벤션                     | 설명             |
| -------------------------- | ---------------- |
| `on + 동사 + 이름`         | 기본 함수        |
| `handle + 이벤트명 + 이름` | 이벤트 관련 함수 |
| `create + 이름`            | API 관련 함수    |
| `read + 이름`              | API 관련 함수    |
| `update + 이름`            | API 관련 함수    |
| `delete + 이름`            | API 관련 함수    |
| `is + 이름`                | 불리언 값        |
| 복수 표현은 `List` 사용    | 복수 표현        |

<br/>
<br/>

## 🗂 디렉토리 구조

```bash
📦apis
┣ 📂(clientActions)
┣ 📂(serverActions)
📦app
┣ 📂_components
┣ 📂(auth)
┃ ┣ 📂login 
┃ ┗ 📂signup 
┣ 📂(workspace)
┃ ┣ 📂(note)
┃ ┃ ┣ 📂noteList
┃ ┃ ┃ ┗ 📂[goalId]
┃ ┃ ┣ 📂notes
┃ ┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┗ 📂create
┃ ┃ ┃      ┗ 📂[todoId]
┃ ┣ 📂goals
┃ ┃ ┣ 📂[id]
┃ ┣ 📂todoList
┣ 📂@note
┃  ┣ 📂(.)notes
┃  ┗ 📂[...catchAll]
┣ 📂dashboard
📦components
📦constant
📦hooks
📦modals
📦provider
📦public
📦schema
📦stores
📦types
📦utils
```

<br/>
<br/>

## 🎬 주요 기능 시연영상
[📺 YouTube에서 보기](https://youtu.be/jOvbl1b1UX0)

<br/>
<br/>

## 🎨 디자인 컨셉

🍅 **뽀모도로** 컨셉 UI와 브랜드 컬러

![03_리소스_디자인](https://github.com/user-attachments/assets/20f414dd-5da1-4ab1-8dd6-1e6577cc600f)


<br/>
<br/>

## 🧑‍💻 팀원 소개

| 이름   | 역할       | 깃허브                                 | 담당 작업        |
| ------ | ---------- | -------------------------------------- | --------------------- |
| 박혜미 | 프론트엔드 | [GitHub](https://github.com/mimi-0506) | 프로젝트 리딩 및 스케줄링 / 네비게이션 바 / 미들웨어 및 라우팅 / 할 일 생성 및 수정 모달 / 뽀모도로 타이머 |
| 김지윤 | 프론트엔드 | [GitHub](https://github.com/kirnjiyun) | 로그인/회원가입 페이지 / SNS 및 자동 로그인 / 목표 상세 페이지 / 목표 수정 및 삭제 모달 / 전체 타입 정리 |
| 노진철 | 프론트엔드 | [GitHub](https://github.com/jinoc-git) | 노트 작성/수정 페이지 / 노트 상세 페이지 / 노트 리스트 페이지 / 노트 관련 기능 / PWA 기능 |
| 이송아 | 프론트엔드 | [GitHub](https://github.com/soma0078)  | 프로젝트 초기 세팅 및 문서화 / 대시보드 페이지 / 모든 할 일 페이지 / 할 일 아이템 컴포넌트 / 비밀번호 암호화 |
| 정철훈 | 백엔드     | [GitHub](http://github.com/huneeJung)  | 서버 설계 및 API 개발 |
| 이주희 | 디자이너   |               -                        | UI 디자인 및 프로토타입 제작 |
