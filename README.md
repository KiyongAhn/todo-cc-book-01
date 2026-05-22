# TODO 앱

React + Vite로 만든 단순한 할 일 관리 웹 앱. `localStorage`에 데이터를 저장하므로 별도의 서버나 데이터베이스가 필요 없습니다.

## 기능

- **추가**: 빈 문자열·공백만 입력은 거부
- **완료 토글**: 체크박스 클릭
- **인라인 수정**: `수정` 버튼 또는 텍스트 더블 클릭 → `Enter` 저장 / `Esc` 취소 / 빈 값이면 삭제 (TodoMVC 관례)
- **삭제**: `삭제` 버튼
- **필터**: 전체 / 진행 중 / 완료, 항목별 통계 표시
- **영속화**: 새로고침해도 목록 유지 (`localStorage`)

## 시작하기

요구사항: Node.js 18 이상.

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173/ 접속.

### 그 외 명령

```bash
npm run build     # 프로덕션 빌드 (dist/)
npm run preview   # 빌드 결과 미리보기
```

## 파일 구조

```
todo-cc-book-01/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── hooks/
    │   └── useTodos.js          # localStorage 영속화 + CRUD
    └── components/
        ├── TodoInput.jsx
        ├── TodoList.jsx
        ├── TodoItem.jsx         # 인라인 수정 (Enter 저장 / Esc 취소)
        └── FilterBar.jsx        # 전체 / 진행 중 / 완료 + 통계
```

## 기술 스택

- [React 18](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- 순수 CSS (CSS 변수로 테마 변수 정의)

## 데이터 모델

`localStorage`의 `todo-cc-book-01:todos` 키에 다음 형태의 배열로 저장됩니다.

```js
{
  id: string,        // crypto.randomUUID()
  text: string,
  completed: boolean,
  createdAt: number, // Date.now()
}
```
