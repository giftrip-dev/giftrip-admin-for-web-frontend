# Giftrip 웹 관리자 - 정보 구조 계층도

이 디렉토리에는 Giftrip 웹 관리자 프로젝트의 정보 구조 계층도(Information Architecture Diagram)가 포함되어 있습니다.

## 생성된 파일

1. **information-architecture-diagram.png** - 전체 정보 구조 계층도 (상세 버전)
   - 모든 레벨의 페이지와 메뉴 구조를 포함
   - 고해상도 (300 DPI) 이미지
   
2. **information-architecture-diagram-simplified.png** - 간소화된 정보 구조 계층도
   - 1-2단계 메뉴만 표시
   - 전체 구조를 한눈에 파악하기 좋은 버전

3. **information-architecture-diagram.mmd** - Mermaid 다이어그램 파일
   - 온라인 Mermaid 편집기에서 편집 가능
   - [Mermaid Live Editor](https://mermaid.live/)에서 열어서 이미지로 export 가능

## 정보 구조 개요

### 주요 섹션

1. **홈 (/)**
   - 로그인 후 체험 상품 관리 페이지로 리다이렉트

2. **상품 관리**
   - 체험 상품
   - 체험단 상품
   - 숙소 상품
   - 쇼핑 상품

3. **예약 관리**
   - 체험 예약
   - 체험단 예약
   - 숙소 예약

4. **주문 관리**
   - 주문 목록 및 상세

5. **회원 관리**
   - 회원 목록 및 상세

6. **배너 관리**
   - 메인 배너
   - 서브 배너

7. **게시판 관리**
   - 공지사항 관리

8. **쿠폰 관리**
   - 쿠폰 생성, 수정, 조회

9. **리뷰 관리**
   - 체험/체험단/숙소/상품 리뷰

10. **관리자 계정**
    - 계정 관리 및 비밀번호 변경

11. **정책 관리**
    - 서비스 이용약관
    - 개인정보 처리방침
    - 환불 정책

## 이미지 재생성 방법

다음 명령어를 실행하여 정보 구조 계층도를 다시 생성할 수 있습니다:

```bash
# 가상 환경 활성화 (처음 한 번만)
python3 -m venv venv
source venv/bin/activate
pip install matplotlib

# 이미지 생성
source venv/bin/activate
python3 generate-ia-diagram.py
```

## Mermaid 다이어그램 사용 방법

1. **온라인에서 보기/편집하기**
   - [Mermaid Live Editor](https://mermaid.live/)에 접속
   - `information-architecture-diagram.mmd` 파일 내용을 복사하여 붙여넣기
   - 이미지로 다운로드 가능 (PNG, SVG)

2. **VS Code에서 보기**
   - Mermaid 확장 프로그램 설치
   - `.mmd` 파일을 열면 미리보기 가능

## 레벨별 색상 구분

- **빨간색** (#FF6B6B): 루트 (홈)
- **청록색** (#4ECDC4): 1단계 메뉴 (메인 카테고리)
- **파란색** (#45B7D1): 2단계 메뉴 (서브 카테고리)
- **연두색** (#96CEB4): 3단계 메뉴 (페이지)
- **노란색** (#FFEAA7): 4단계 메뉴 (상세 페이지)

## 참고사항

- 이미지는 고해상도(300 DPI)로 생성되어 인쇄나 문서화에 적합합니다.
- 프로젝트 구조가 변경되면 `generate-ia-diagram.py` 파일의 `ia_structure` 딕셔너리를 수정한 후 다시 실행하세요.

