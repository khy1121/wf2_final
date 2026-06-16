# REST API 개론 (Part 1)

## 1. REST란 무엇인가?

**REST = REpresentational State Transfer**
- 웹 서비스를 설계하는 **아키텍처 스타일**
- HTTP 프로토콜 기반으로 **리소스(Resource)를 URI로 식별**하고 **HTTP 메서드로 조작**한다.

### REST 3가지 핵심 구성요소
- **Resource** : 조작 대상 (예: `/users`, `/orders`)
- **Method** : 수행 동작 (GET, POST, PUT, DELETE)
- **Message** : 요청/응답 데이터 (주로 JSON)

> REST API 요청 = HTTP Method(동작) + URI(리소스 식별) + Message(데이터)

## 2. HTTP Methods와 CRUD

| HTTP 메서드 | CRUD | URI 예시 | 응답 코드 |
| --- | --- | --- | --- |
| GET | Read | `/api/users`, `/api/users/1` | 200 OK |
| POST | Create | `/api/users` | **201 Created** |
| PUT | Update | `/api/users/1` | 200 OK |
| DELETE | Delete | `/api/users/1` | 200 / 204 |

### 시험 포인트 — URI에는 동사를 쓰지 않는다
- 동작은 **HTTP 메서드**가 표현한다.
- `GET /getUser/1` ❌ → `GET /users/1` ✅

## 3. URI 설계 원칙
- **복수 명사** 사용 : `/api/user` ❌ → `/api/users` ✅
- **동사 사용 금지** : `/api/getUser/1` ❌
- **소문자** 사용 : `/api/Orders` ❌ → `/api/orders` ✅
- 공백은 **하이픈(-)** : `/api/order-items`
- **계층 구조**로 하위 리소스 표현 : `/api/users/1/orders`

## 4. HTTP 상태 코드
- **2xx 성공** : 200 OK · 201 Created · 204 No Content
- **3xx 리다이렉션** : 301 Moved Permanently
- **4xx 클라이언트 오류** : 400 Bad Request · 401 Unauthorized · **404 Not Found**
- **5xx 서버 오류** : 500 Internal Server Error · 503 Service Unavailable

## 5. Statelessness (무상태성)
- 서버는 **클라이언트의 이전 요청 상태를 저장하지 않는다.** 모든 요청은 독립적이어야 한다.
- **Stateful(세션)** : 서버가 세션 저장 → 서버 확장(스케일아웃) 어려움, 장애 시 세션 손실
- **Stateless(토큰/JWT)** : 서버는 상태 저장 X → **확장 자유로움** (REST 권장)

### 시험 포인트 — 세션 vs JWT
- 세션 기반(Stateful) : `JSESSIONID` 쿠키로 인증, 저장소 필요 → 확장 어려움
- JWT 토큰 기반(Stateless) : `Authorization: Bearer <Token>` 헤더, 서버는 **토큰 서명만 검증** → 확장 쉬움

## 6. Caching (캐싱)
- 응답을 클라이언트/중간 서버에 임시 저장 → 동일 요청 시 서버 접근 없이 즉시 응답
- **Cache HIT** : 캐시에서 즉시 응답 (서버 부하 0)
- **Cache MISS** : 캐시에 없어 서버까지 요청

### Cache-Control 지시어 (시험에 자주 나옴)
- `max-age=N` : N초 동안 캐시 유효 (정적 리소스)
- `no-cache` : 저장은 하되 **사용 전 매번 서버에 재검증**
- `no-store` : **어떤 캐시에도 저장 금지** (로그인/결제 등 민감 정보)
- `private` : 브라우저(개인)만 캐시, 중간 서버는 저장 불가
- `public` : CDN·프록시 포함 모든 캐시 허용
- `must-revalidate` : 만료 후 반드시 서버 재검증

## 7. JSON & Jackson
- REST API 표준 데이터 형식. `{ }` 객체, `[ ]` 배열, 키는 **큰따옴표**, 숫자·불린은 따옴표 없이.
- **Jackson Databind** 가 Java ↔ JSON 자동 변환을 담당
  - **직렬화(Serialization)** : Java 객체 → JSON (`@ResponseBody`)
  - **역직렬화(Deserialization)** : JSON → Java 객체 (`@RequestBody`)

---

# Spring REST API 구현 (Part 2)

## 1. MVC Controller vs REST Controller
- 전통 MVC : `Controller → ModelAndView → ViewResolver → View(HTML)` 반환
- REST : `@RestController → MessageConverter(Jackson) → HTTP Response Body(JSON)` **데이터 직접 반환**

## 2. 핵심 어노테이션

### @RestController = @Controller + @ResponseBody
- 메서드 반환값을 HTTP 응답 Body에 직접 쓴다. (매번 `@ResponseBody` 안 붙여도 됨)
- 응답 `Content-Type: application/json` 자동 설정

### @PathVariable
- URL 경로의 `{id}` 값을 메서드 파라미터로 바인딩
- `@RequestParam` 과 비교 : `/users?id=1` → **@RequestParam**, `/users/1` → **@PathVariable**

### @RequestBody
- 요청 Body(JSON)를 Java 객체로 **역직렬화** (주로 POST/PUT)

### ResponseEntity\<T\>
- **상태코드 + 헤더 + 바디** 등 HTTP 응답 전체를 직접 제어
- 예 : `new ResponseEntity<>(user, HttpStatus.OK)` → 200 + JSON 바디
- 예 : `new ResponseEntity<>(HttpStatus.NOT_FOUND)` → 404

## 3. CRUD 매핑

| 메서드 | URI | 어노테이션 | 응답 |
| --- | --- | --- | --- |
| GET | `/api/users` | `@GetMapping` | 200 |
| GET | `/api/users/{id}` | `@GetMapping` | 200 / 404 |
| POST | `/api/users` | `@PostMapping` | 201 + Location |
| PUT | `/api/users/{id}` | `@PutMapping` | 200 |
| DELETE | `/api/users/{id}` | `@DeleteMapping` | 200 / 204 |

### 시험 포인트
- `@PathVariable` 은 GET·PUT·DELETE 에, `@RequestBody` 는 POST·PUT 에 사용
- POST 생성 성공 시 **201 Created** + `Location` 헤더에 생성된 리소스 URI
- **Jackson Databind** 의존성은 `pom.xml` 에 추가
