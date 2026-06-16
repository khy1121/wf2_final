# Spring REST API 단위 테스트

JUnit 5 · Mockito · MockMvc · JsonPath

## 1. 왜 단위 테스트인가? (통합 vs 단위)

| 항목 | 통합 테스트 (@SpringBootTest) | 단위 테스트 (MockMvc + Mockito) |
| --- | --- | --- |
| Spring 컨텍스트 | 전체 로딩 (느림) | 불필요 ✅ |
| DB 연결 | 실제 DB 필요 | 불필요 ✅ |
| 서버 기동 | Tomcat 필요 | 불필요 ✅ |
| 속도 | 느림(수십 초) | 빠름(< 1초) ✅ |
| 범위 | 시스템 전체 | 컨트롤러 단독 격리 ✅ |

## 2. 세 도구의 역할
- **JUnit 5** : 테스트를 정의·실행하는 프레임워크 (`@Test`, `@BeforeEach`, `@ExtendWith`)
- **Mockito** : 실제 의존 객체 대신 **가짜(mock) 객체**를 만들어 의존성 격리
- **MockMvc** : 실제 서버 없이 **HTTP 요청/응답을 시뮬레이션**

## 3. JUnit 5 핵심 어노테이션
- `@Test` : 테스트 메서드 표시
- `@DisplayName` : 테스트에 읽기 좋은 이름 부여
- `@BeforeEach` : 각 테스트 실행 **전** `setUp()` 호출
- `@Nested` : 테스트를 HTTP 메서드별 등 **계층 구조로 그룹화**
- `@ExtendWith(MockitoExtension.class)` : Mockito 확장 등록 (필수)

## 4. Mockito

### @Mock & @InjectMocks
- `@Mock` : 가짜 객체 생성 (예: `ProductService`) → 실제 DB 호출 없음
- `@InjectMocks` : 만든 mock 을 테스트 대상(Controller)에 **자동 주입**

### Stubbing & verify()
```
// Stubbing - 반환값 미리 정의 (Given)
when(productService.getAllProducts()).thenReturn(List.of(p1, p2));
when(productService.getProductById(999L)).thenReturn(Optional.empty()); // 404 유발

// void 메서드 스텁
doNothing().when(productService).deleteProduct(1L);

// verify - 호출 횟수 검증
verify(productService, times(1)).deleteProduct(1L);
verify(productService, never()).deleteProduct(anyLong());
```

### 시험 포인트 — verify 인자
- `times(n)` : 정확히 n번 / `never()` : 한 번도 호출 안 됨 / `atLeast(n)` / `atMost(n)`
- 없는 데이터 → `Optional.empty()` 반환으로 **404 상황 시뮬레이션**

## 5. MockMvc

### 요청 처리 흐름
1. `standaloneSetup(controller)` : Spring Context 없이 컨트롤러만 등록
2. `perform()` : HTTP 요청 전송 (get/post/put/delete)
3. `andDo(print())` : 요청/응답 콘솔 출력
4. `andExpect()` : 상태코드/바디 검증
5. `verify()` : 서비스 호출 최종 확인

```
mockMvc.perform(get("/api/products").accept(MediaType.APPLICATION_JSON))
    .andExpect(status().isOk())
    .andExpect(jsonPath("$.data", hasSize(2)))
    .andExpect(jsonPath("$.data[0].name").value("노트북"));
```
- POST/PUT 본문은 `objectMapper.writeValueAsString(form)` 으로 JSON 변환해 `.content()` 에 담는다.

## 6. JsonPath
- JSON 응답 바디를 **XPath처럼 쿼리**하는 표현식 언어
- `$.success` → true / `$.data[0].name` → 첫 요소 / `$.data` + `hasSize(2)` → 배열 크기
- `hasSize`, `hasItem` 등은 **Hamcrest 매처** (`import static org.hamcrest.Matchers.*`)

## 7. GWT 패턴 (BDD)
- **Given** : 사전 조건 — `when().thenReturn()` 으로 Mock 정의
- **When** : 동작 실행 — `mockMvc.perform(...)`
- **Then** : 결과 검증 — `andExpect(...)`

### 시험 포인트
- 단위 테스트는 서버·DB·네트워크 없이 **컨트롤러 로직만 격리**해서 빠르게 검증한다.
- `@ExtendWith(MockitoExtension.class)` 가 있어야 `@Mock`·`@InjectMocks` 가 동작한다.
