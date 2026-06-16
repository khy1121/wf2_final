# Spring Boot 개요 (Overview)

## 1. Spring Boot란?
Spring Framework를 **더 빠르고 쉽게** 시작하기 위한 도구.
- **최소한의 설정** : Auto Configuration으로 반복 설정 제거
- **의존성 간소화** : Starter로 버전 충돌 없이 라이브러리 관리
- **내장 서버** : Tomcat 내장 → 별도 설치 없이 `java -jar` 로 실행

| 구분 | Spring Framework | Spring Boot 4.x |
| --- | --- | --- |
| 설정 | XML / Java Config 직접 작성 | Auto Configuration |
| 의존성 | 버전 수동 지정 | `spring-boot-starter-*` |
| 서버 | WAS 별도 설치(WAR) | 내장 Tomcat(JAR) |

## 2. Auto Configuration

### 동작 원리
`CLASSPATH 스캔 → @ConditionalOn* 조건 평가 → 조건부 Bean 자동 등록`
- JAR만 추가하면 Spring Boot가 알아서 Bean을 등록한다.

### @Conditional 조건 (AND 관계 — 하나라도 실패하면 건너뜀)
- `@ConditionalOnClass` : 해당 클래스가 **CLASSPATH에 있나?**
- `@ConditionalOnMissingBean` : 개발자가 직접 만든 Bean이 **없을 때만** 등록 → **개발자 설정이 항상 우선**
- `@ConditionalOnProperty` : `application.properties` 에 해당 속성이 있나?

### 시험 포인트 — @ConditionalOnMissingBean
- 개발자가 같은 타입 Bean을 등록하면 자동 설정은 **비활성화**된다. ("내가 만들면 자동 설정은 꺼진다")

## 3. Spring Boot Starters
- 검증된 버전 조합을 묶어 제공 → **버전 충돌 없이** 의존성 추가 (버전 명시 불필요)
- `spring-boot-starter-parent` 가 버전을 중앙 관리

| Starter | 포함 내용 |
| --- | --- |
| `spring-boot-starter-webmvc` | Spring MVC, Tomcat, Jackson |
| `spring-boot-starter-data-jpa` | Hibernate + Spring Data JPA, **HikariCP** |
| `spring-boot-starter-security` | Spring Security |
| `spring-boot-starter-test` | JUnit 5, Mockito, AssertJ |
| `spring-boot-starter-actuator` | 모니터링 엔드포인트 |

## 4. 내장 서버
- 기본 내장 서버는 **Tomcat** (Jetty, Undertow도 선택 가능)
- JAR 하나로 `java -jar myapp.jar` 실행 → 서버 별도 설치·배포 불필요

## 5. Spring Boot Actuator
- REST 엔드포인트로 실행 중인 앱 상태를 **모니터링/관리**
- 기본 노출은 `/actuator/health` 뿐, 나머지는 `management.endpoints.web.exposure.include` 설정 필요
- 주요 : `/health`, `/info`, `/metrics`, `/beans`, `/mappings`, `/loggers`

## 6. @SpringBootApplication
3가지 어노테이션 조합 :
- `@SpringBootConfiguration` (@Configuration 특수화)
- `@EnableAutoConfiguration` (CLASSPATH 기반 자동 설정 활성화)
- `@ComponentScan` (현재 패키지 + 하위 패키지 스캔)

### 시험 포인트
- 메인 클래스는 반드시 **루트 패키지**에 위치 → `@ComponentScan` 이 모든 하위 패키지를 탐색

## 7. 프로젝트 구조
```
src/main/java        → Controller, Service, Repository, Model
src/main/resources   → application.properties
  resources/static   → CSS, JS, 이미지 (정적 리소스)
  resources/templates→ Thymeleaf 템플릿
src/test/java        → 테스트 코드
pom.xml
```

## 8. application.properties 읽기
- `@Value("${app.name}")` : 단순 주입
- `@ConfigurationProperties(prefix="app")` : **타입 안전** (권장)
- Profile 분리 : `application-dev.properties` 등, `spring.profiles.active=dev` 로 활성화

## 9. Java 21 & Virtual Threads
- `spring.threads.virtual.enabled=true` **한 줄**로 가상 스레드 활성화 (코드 변경 없음)
- Virtual Thread : 가벼움(~1KB), JVM이 **M:N** 관리 → 수십만 동시 요청 처리
- Platform Thread : 무거움(~1MB), OS와 **1:1** 매핑
