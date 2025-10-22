# 독백 프론트엔드

독백은 캐스팅 디렉터와 배우를 연결해주는 양방향 플랫폼입니다. 캐스팅 디렉터는 배우의 프로필을 통해 오디션 및 작품에 적합한 배우를 찾을 수 있고, 배우는 오디션 공고를 확인하고 원하는 작품에 지원할 수 있는 웹 애플리케이션입니다. 이 프로젝트는 독백 서비스의 프론트엔드 부분으로, React와 Next.js를 기반으로 구축되었습니다.

## 개발 환경 시작하기

npm install

npm run dev

## 배포 환경 시작하기

npm install

npm run build

npm run start

## 자주 발생하는 오류

1. API 작동이 되지 않는다면 .env 파일이 없거나 최신 버전인지 확인해주세요.
2. 배포가 제대로 되지 않는다면 아래의 명령어로 기존 프로세스를 완전히 종료하고 다시 실행해주세요.
   
    pkill -f "next-server" 2>/dev/null || true

    pkill -f "npm.*start" 2>/dev/null || true
