# OPENPLAN

Web Example: https://openplan-ashy.vercel.app/

## PREPARE

Docker가 섩치되어 있어야 합니다.

Docker 없이 로컬에 turborepo와 pnpm, nextjs가 설치되어 있으면 실행할 수 있습니다.

## Get Started

### Build

```bash
## Image build
./openplan build

## node_module copy from container
./openplan sync
```

### Run

```bash
./openplan run
```

http://localhost:3000 - web

http://localhost:6006 - storybook

## Container 내부 접속

패키지 추가등의 작업은 container 내부에서 실행하는걸 권장합니다.

```bash
./openplan exec
```

## Trouble Shooting

### Local에서 권한 오류 발생 시

docker내 설치파일(node_modules 등) 접근 권한 오류

```bash
chmod -R 777 app
```

### Local에서 작업 원할 때 pnpm store 오류

pnpm 재설치 필요

```bash
## pwd = ./app
pnpm install
```