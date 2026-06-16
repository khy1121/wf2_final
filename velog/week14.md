
객관식 + 주관식 단답형 (단답형은 정확하게 작성, 대소문자는 상관 x , 스펠링이나 글자 하나라도 틀리면 오답이다) 
(중간고사 : 평균 78)

# 로깅에 사용하는것 
SLF4J / Logback

# 왜 로깅이 필요할까 ? 
![](https://velog.velcdn.com/images/kimse3283/post/df4cce39-26df-4212-815a-0a5c871cab7f/image.png)

- 로깅 프레임워크를 사용하면 장점 
- __레벨 기반 선택 출력__ (환경별 레벨만 변경, 레벨엔 우선순위가 있는데 __가장 낮은게 Trace , 가장 높은게 Error__) 이를 통해 개발 시엔 풍부한 정보, 운영 시엔 선택해서 환경에 맞게 확인 가능
- Logger Named Entity : 어떤 클래스, 메서드에서 문제가 생겼는지 알 수 있다. __패키지-클래스 명으로 식별__ 하고 -> 특정 패키지만 상세 로그 확인 가능. 
- 자유로운 출력 형식 : 날짜, 레벨, 스레드, 클래스명 등 원하는 포멧을 설정하는 것이 가능 (원하는대로 출력 가능한거임, 다른 소프트웨어에서 파싱해서 분석하는 것도 가능해지는거야. 분석에 용이한 포맷을 설정해 )
- 다양한 출력 목적지 : 콘솔, 파일, db, 원격 서버 동시 출력 가능, 파일은 자동 로테이션 가능 ( 파일 저장하면 계속 쌓여 너무 많아지므로, 날짜별로 정리 가능) 
- 결론 : 로깅 프레임워크로 다양한 컨트롤이 가능해진다는 장점

# 로깅 프레임워크 생태계
![](https://velog.velcdn.com/images/kimse3283/post/ff0def08-294c-4022-ab8b-3d4b943d8f59/image.png)

- __스프링 부트 디폴트 : LogBack__ 사용
- __자바 표준 : Log4J__
- 하지만 로깅 프레임워크 종류가 너무 많으니 이것들을 __추상화한 객체를 사용하는데 이를 SLF4j__ 라고 하고 이걸 사용한다. 즉 인터페이스임. (앞단에 존재하는걸 facade라고 하는데, 이건 다양한 구현체에 대한 통일 인터페이스를 제공하고 있는거임) 
- 바꾸고싶으면 얼마든지 교체 가능
- __Spring boot에서는 SLF4J(API)와 Logback을 사용한다__

# SLF4J - facade 패턴 아키텍쳐 
![](https://velog.velcdn.com/images/kimse3283/post/da9c8c3a-2c3e-4e7a-9e4e-338d6b250738/image.png)

- 코드에서는 제공하는 API 를 사용한다. 
- 코드에서 Logger 나 LoggerFactory는 slf4j가 제공한다. 

# 출력 예시
![](https://velog.velcdn.com/images/kimse3283/post/30e4bd9b-3383-422f-9a75-8972588bbf20/image.png)

- [날짜] 로그레벨 Pid 스레드명 Logger이름(로거이름에서 길어지면 축약함) 메시지

# 로그레벨 (반드시 외워라 시험에 무조건 나옴)
![](https://velog.velcdn.com/images/kimse3283/post/185c1b67-01b7-4a0c-9871-323b2e83dcf1/image.png)

- Trace : 운영에선 금지
- Debug : 운영에선 금지
- __INFO__ : __중요함__ __운영환경__에서 일반적인 __기본값__ (__스프링부트 기본 레벨__)
- Warn : 경고 (성능 저하 등)
- Error : 오류 (예외)

# SLF4J
![](https://velog.velcdn.com/images/kimse3283/post/6cac535b-a4f4-475b-8722-8c5fcbab4d51/image.png)

- spring-boot-starter에 포함되어있음 . app은 __slf4j를 사용하고 컴파일 시__ 에 필요함 , __런타임 시엔 로그백__ 사용

# Logback
![](https://velog.velcdn.com/images/kimse3283/post/18877aea-eed2-4345-82e9-7225348c236e/image.png)

- 스프링부트의 디폴트
- 3가지는 설정해줘야함 
(Logger : 로그 메시지를 __생성__ 하는 주체, 항상 __이름__ 이 부여되어야함, __최소허용 레벨 지정__ )
(appender : __어디에 출력__ 할지 결정 )
( Layout/encoder : __어떤 형식__ 으로 출력할것인가)

# 코드 예시 
![](https://velog.velcdn.com/images/kimse3283/post/98177e02-f24b-4327-8cff-cad9c9a4acd9/image.png)

- logger에서 이름 지정하고 사용하며 메시지를 출력하게 해줌 (5개) (메시지가 다 출력될까 ? 아니 최소허용레벨에 따라서 달라짐)
- 만약 최소허용 레벨은 INfo일 경우 info 이후에 대한 내용만 나옴 (최소 허용 레벨 이후로 출력됌)

# Logger - 이름을 가진 엔티티
![](https://velog.velcdn.com/images/kimse3283/post/8b73da23-208f-40a2-9585-6754c9d7cfe0/image.png)

- 로거의 이름은 : 패키지 경로를 포함한 클래스명 
- ex : kr.ac.hansung.HelloSpring

# Logger - 계층 구조
![](https://velog.velcdn.com/images/kimse3283/post/637d65e3-ba73-4b0a-9ec9-eaf845f47ea9/image.png)

- 계층 구조로 이루어지면 장점이 무엇이냐 ? __상속__ 을 사용할 수 있다
- 로거에 레벨이 지정되지 않으면 가장 가까운 조상의 레벨을 상속받음
### 레벨 상속 부분 무조건 시험에 나옴 빈칸 뚫고 이거의 유효 레벨은 ?
- 정답 예시 ( 가장 가까운 부모의 최소 허용 레벨, 상속 받기 때문에) 
- root 엔 일반적으로 __Info__ 레벨로 지정

# 로그 요청 레벨
![](https://velog.velcdn.com/images/kimse3283/post/ddb53d77-5d08-48bd-bb56-a578528f3ab1/image.png)

### 로그 요청 레벨 >= logger 유효 레벨 -> 로그 출력
### 시험 예상 문제 : 이 중에서 로그 출력이 안되는 경우는 ? 
![](https://velog.velcdn.com/images/kimse3283/post/dc18f649-3663-49a5-90f2-de2a348bd90e/image.png)

# 어디에 출력하지 ? - appender
![](https://velog.velcdn.com/images/kimse3283/post/9d2a77b2-a558-4194-9622-2f19309873d8/image.png)

- rollingfileAppender : 조건에 따라 파일 전환

# 계층구조 - Appender
![](https://velog.velcdn.com/images/kimse3283/post/d418bb02-79a2-4e98-b95e-295b0cd2d3f9/image.png)

- __fileAppender__ 가 중요
- ex : 어떤 일을 하는 어펜더는 무엇인가 ? 

# 누적전달 - Appender
![](https://velog.velcdn.com/images/kimse3283/post/22aeb0b0-d807-4891-8a85-6bfc1352cc93/image.png)

- logger의 로그 요청은 자신에 연결된 것 뿐만 아니라 상위 로거의 Appender에도 전달된다
- 이때 기본값은 additivity = true 이고 이를 선택하면 상위에도 전달
### 표 관련된건 시험에 나옴 , 빈칸 뚫고 고르기

# 어펜더 종류 코드 
![](https://velog.velcdn.com/images/kimse3283/post/67812519-cd8b-4dc6-969b-90705793fbdc/image.png)

![](https://velog.velcdn.com/images/kimse3283/post/fd37836a-b976-453b-8769-2b58d3ad1eda/image.png)

- 그냥 fileAppender 사용 시 파일이 계속 누적되므로 롤링파일어펜더로 최대 보관 일자 및 날짜별로 파일을 전환하도록 사용한다. 0시 0분이 되면 날짜가 변경되면서 새로운 로그 파일 생성

# 실전 로그백 예제
![](https://velog.velcdn.com/images/kimse3283/post/fa1c0692-2819-4d8b-a9c7-f2231e414da9/image.png)

- 로거의 종류는 콘솔과 데일리파일 두가지이고 Additivity 가 false이므로 콘솔에 로그가 두번 찍히는걸 방지할 수 있어요

# spring profile
![](https://velog.velcdn.com/images/kimse3283/post/b45e73d0-9b01-44d2-b6c6-541e7412c4ec/image.png)

개발환경과 운영환경에서 각각 따로 설정할 수 있음

# 설정 전체 요약 
![](https://velog.velcdn.com/images/kimse3283/post/efdcd015-e976-44fa-afd2-a7f7055e046f/image.png)

- 간단한 설정은 app.properties, 세밀한 제어 xml

# MDC (스레드 로컬 저장 공간, key-value)
![](https://velog.velcdn.com/images/kimse3283/post/b2e40a7b-6bda-4fd2-ac31-23337cfa702b/image.png)

- 어떤 사용자에게 발생한 에러인지 보고싶은데 안나올때 request를 가로채는 security filter chain에서 나온 __filter 를 하나 등록해두면 mdc라는 저장공간__ (스레드가 갖는 로컬저장소) 을 확인해서 __key - value쌍으로 이루어진 데이터를 컨트롤러__ 에게 보내고 이 __값을 바탕으로해서 로깅__ 을 한다. -> 그럼 __리퀘스트 아이디와 유저아이디가 함께 로그에 출력__ 할 수 있음 -> 이후 clear로 날림

# MDC - 구현 및 출력 결과
![](https://velog.velcdn.com/images/kimse3283/post/4f828125-25e1-4197-8cf9-aac7f8eb3002/image.png)

### 필터를 설정해서 mdc를 저장하고 포멧을 지정하여 값을 받아옴

# 가장 좋은 방식
![](https://velog.velcdn.com/images/kimse3283/post/bbf93278-5bf5-4719-8479-aa04dd4fd9cd/image.png)

- lombok 에서 매 클래스마다 로거팩토리를 입력하지 않고 어노테이션을 이용하여 사용할 수 있고, 
__파라미터 값을 사용할때는 placeholder를 사용해서 생성__ 한다. 


# 개념을 이해하는 것이 중요함. 



