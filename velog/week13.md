# Spring Boot Security (Session 기반 인증)

## 1. Spring Security 핵심 3요소
- **Authentication(인증)** : *Who are you?* — 사용자 신원 확인
- **Authorization(인가)** : *What can you do?* — 인증된 사용자의 접근 권한 확인
- **Protection(보호)** : CSRF, XSS, Session Fixation 등 웹 공격 자동 방어

> 인증 없이는 인가가 의미 없다. (인증 → 인가 순서)

## 2. Session 기반 인증 동작
1. 로그인 시 서버가 **세션 생성** → `JSESSIONID` 쿠키 발급
2. 이후 요청마다 브라우저가 쿠키 자동 전송 → 서버가 세션 조회로 인증
- **Stateful** : 세션은 서버 메모리에 저장, 브라우저는 JSESSIONID만 보관

`spring-boot-starter-security` 추가 시 자동 : 모든 URL 차단 → `/login` 리다이렉트, 기본 로그인 페이지, **CSRF 보호 활성화**

## 3. SecurityFilterChain (필터 7개 순서)
1. **SecurityContextHolderFilter** : 세션에서 SecurityContext 꺼내 ThreadLocal 저장
2. **CsrfFilter** : POST/PUT/DELETE 시 `_csrf` 토큰 검증
3. **LogoutFilter** : `/logout` → 세션 무효화 + 쿠키 삭제
4. **UsernamePasswordAuthenticationFilter** ★ : POST `/login` → AuthenticationManager에 인증 위임
5. **AnonymousAuthenticationFilter** : 미인증자에 anonymous 권한 부여
6. **ExceptionTranslationFilter** : 인증 예외 → /login, 인가 예외 → 403
7. **AuthorizationFilter** ★ : URL 접근 권한 확인 → 통과해야 컨트롤러로 전달

### 시험 포인트 — 개발자가 직접 구현하는 것
- **UserDetailsService** 구현 + **PasswordEncoder(BCrypt) Bean** 등록
- 나머지(AuthenticationManager 등)는 Spring Security가 자동 처리

## 4. 인증 처리 흐름
`POST /login → UsernamePasswordAuthenticationFilter → AuthenticationManager → AuthenticationProvider → UserDetailsService.loadUserByUsername() → SecurityContext 저장`
- `UserDetailsService.loadUserByUsername(email)` : DB 조회 후 `UserDetails` 반환, 실패 시 `UsernameNotFoundException`

## 5. RBAC (Role-Based Access Control)
- **User ↔ Role : N:N** 관계 (`@ManyToMany`)
- 권한 이름엔 **`ROLE_` 접두사** 필수 (예: `ROLE_USER`, `ROLE_ADMIN`)
- 인증 시 Role이 필요하므로 `@ManyToMany(fetch = FetchType.EAGER)` 로 **즉시 로딩**

## 6. BCrypt — 비밀번호 암호화
- `BCryptPasswordEncoder` 사용
- `encode()` 는 **매번 다른 salt** → 같은 입력도 다른 해시
- 비교는 반드시 `matches(raw, hash)` 로! **`==` 비교 절대 금지**, 복호화 불가(단방향)

### 시험 포인트
- `passwordEncoder.encode("test")` 를 두 번 호출하면 결과가 **다르다** → 반드시 `matches()` 로 비교

## 7. CSRF (Cross-Site Request Forgery)
- **공격 원리** : 브라우저가 쿠키(JSESSIONID)를 **모든 요청에 자동 전송** → 악성 사이트의 위조 요청에도 인증 쿠키가 첨부됨
- **방어** : `CsrfFilter` 가 POST/PUT/DELETE/PATCH 에 `_csrf` 토큰 검증 (GET/HEAD/OPTIONS는 생략)
- Thymeleaf `th:action` 사용 시 `_csrf` hidden 토큰 자동 삽입

### 시험 포인트 — CSRF 설정
- **Session 방식** : CSRF **활성화 필수** (절대 disable 금지)
- **JWT 방식** : 세션이 없으므로 `csrf.disable()` 가능

## 8. SecurityConfig 예시
```
@Configuration @EnableWebSecurity @EnableMethodSecurity
public class SecurityConfig {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(authz -> authz
        .requestMatchers("/css/**","/js/**").permitAll()
        .requestMatchers("/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated())
      .formLogin(form -> form.loginPage("/login").defaultSuccessUrl("/home").permitAll())
      .logout(logout -> logout.logoutSuccessUrl("/login?logout"));
    return http.build();
  }
  @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}
```
- `requestMatchers()` 는 **선언 순서가 우선순위** → 구체적 규칙을 먼저 선언
- 메서드 보안 : `@EnableMethodSecurity` + `@PreAuthorize`(실행 전) / `@PostAuthorize`(반환값 기반 실행 후)
