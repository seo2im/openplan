# OPENPLAN

## PREPARE

Docker가 섩치되어 있어야 합니다.


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

## Container 내부 접속

패키지 추가등의 작업은 container 내부에서 실행하는걸 권장합니다.

```bash
./openplan exec
```