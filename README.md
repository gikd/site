# Personal Intro Site

트렌디한 개인 소개 사이트를 위한 `Next.js + Vercel` 시작점입니다.

## 구조

- `app/page.tsx`: 랜딩 페이지 전체
- `app/globals.css`: 글로벌 스타일과 인터랙션 스타일
- `package.json`: Next.js 실행 스크립트

## 먼저 바꾸면 좋은 부분

`app/page.tsx`에서 아래 내용을 네 정보로 교체하세요.

- 이름과 메인 소개 문구
- YouTube / Instagram / 아카이브 링크
- 소개 문단
- 이메일 주소

## 설치와 실행

```bash
cd /Users/myobot/Documents/codex/personal-site
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. [Vercel](https://vercel.com/)에서 저장소를 연결합니다.
3. Next.js 프로젝트로 자동 인식됩니다.
4. 배포가 끝나면 공개 URL이 생성됩니다.
5. 원하면 `Settings > Domains`에서 커스텀 도메인을 연결합니다.

## 추천 다음 단계

- 실제 프로필 문구와 링크로 교체
- 대표 YouTube 영상 임베드 추가
- 프로젝트/채널 카드에 실제 썸네일 연결
- Analytics, 문의 폼, SEO 메타데이터 추가
