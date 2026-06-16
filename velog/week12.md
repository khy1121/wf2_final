Spring Data JPA : 리포지토리 인터페이스 선언만으로 crud 구현체 자동 생성
-> 인터페이스 : 메서드들이 정리되어있어서, 이 인터페이스가 알아서 구현해줌

## 1. 기존 전통 방식

![](https://velog.velcdn.com/images/kimse3283/post/9cd86276-a844-4896-86c0-2c06407de6bc/image.png)

## 1-1. 전통 DAO 방식의 문제점 (반복되는 코드)

![](https://velog.velcdn.com/images/kimse3283/post/4e7f25c8-08c5-4007-a4b6-33840445411a/image.png)
- 엔티티 타입만 다르고 코드는 동일 ( 재사용을 안하고 있음 )

## 1-2. 반복되는 문제 해결 

![](https://velog.velcdn.com/images/kimse3283/post/e99af931-76da-4c51-a833-46cd5ea39aa3/image.png)
- 엔티티 타입과 pk 타입만 알려주면 spring 이 대신 DAO를 만들어준다. 


# 2. spring data jpa 개요
![](https://velog.velcdn.com/images/kimse3283/post/2df69e0f-eec8-47a4-9827-f696804dab66/image.png)

- jpa 기반 데이터 접근 모듈
- 다양한 리포지토리 인터페이스 제공 ( CrudRepository : crud 생성 , PagingAndSortingRepository : 한번에 전부 불러오는것이 아니라 페이지 단위별로 조회하고 정렬 , JpaRepository )
- curd + 페이징 / 정렬 자동 제공 

# 3. repository 인터페이스 계층구조
![](https://velog.velcdn.com/images/kimse3283/post/6ad7f3c8-4b3d-4bcd-9733-5fd5cd01a07e/image.png)

T: 엔티티 타입
id : 아이디 타입을 의미함

# 3.1 crud 리포 주요 메서드
![](https://velog.velcdn.com/images/kimse3283/post/5d64a769-bc20-4a98-ad3c-e802bd81ad1b/image.png)

__save__ : id 가 없다면 저장, id 가 존재한다면 수정
__findById__ : id 기반 조회 , 단건 조회, __없다면 optional 빈 값__

# 3.2 pagingAndSorting
![](https://velog.velcdn.com/images/kimse3283/post/0293aa7c-49a2-47af-899a-bb8dd0cc6f08/image.png)
'
findAll 메소드 두가지 
- findAll(Sort sort) : 정렬된 목록
- findAll(Pageable pageable) : 페이징 + 정렬된 목록 

### PageRequest.of() 구성요소
- (페이지 번호 (시작할 페이지번호), 페이지 크기 (한페이지 건수), sort.by(정렬조건, 생략가능) )
```
Sort sort = Sort.by(Sort.Direction.DESC, "price");      // 내림차순 정렬
Iterable<Product> sorted = productRepository.findAll(sort);          // 정렬만
Pageable pageable = PageRequest.of(0, 5, Sort.by(Direction.ASC, "name"));
Page<Product> page = productRepository.findAll(pageable);  // 페이징 + 정렬
``` 

### 페이지네이션 개념

![](https://velog.velcdn.com/images/kimse3283/post/12606f6b-f572-41f8-b6ce-2ff34eb29c2f/image.png)

- Page<타입> 제공정보
  Page<타입> 에서 getContent(), getTotalElements() 등 메타정보까지 볼 수 있음
  
  # 3.3 jpa 리포
  ![](https://velog.velcdn.com/images/kimse3283/post/0d32d82e-4c7a-446f-a777-d9bd7dc96e73/image.png)
- crud 리포+ pagingAndSorting 리포 상속받음 
- crud 리포+ pagingAndSorting 리포+ jpa 전용 메서드까지 포함 
- deleteAllInBatch() : 전체 삭제가 빠름 

### 구현 방법 
![](https://velog.velcdn.com/images/kimse3283/post/19522ec0-68d4-44bc-ad0d-cd2549a2af38/image.png)

```
이거면 dao 생성됨
public interface ProductRepository
    extends JpaRepository<Product, Long> { }
```

# 4. 쿼리 메서드 개념
![](https://velog.velcdn.com/images/kimse3283/post/19faf070-c23d-41d7-a926-eca4d226b0bd/image.png)

- 정의 : __메서드 이름 규칙__ 만 따르면 spring data jpa 가 해당 쿼리를 실행하는 __메서드 구현체__ 를 자동으로 생성한다. 

- 쿼리 메서드 작명 규칙 : 동사 (find/get/read/count/exists/delete) + 구분자 by (필수) + 조건 필드명 (엔티티 필드명 , ex: name)

### 쿼리 메서드 예시 
![](https://velog.velcdn.com/images/kimse3283/post/bafcf985-289b-49d5-9896-a4d930caea5a/image.png)

### 쿼리 메서드 이름에 사용가능한 키워드 
![](https://velog.velcdn.com/images/kimse3283/post/6900327a-adf2-4aa5-86a3-7130cef951ac/image.png)

# 예상 시험 문제 : ~~~한 기능을 하는 쿼리 메서드를 작명하시오 ~  / 이번 시험은 단답형도 포함된다(한글자라도 틀리면 오답, 대소문자 구분 x ).

### 쿼리 메서드 활용 예시 
![](https://velog.velcdn.com/images/kimse3283/post/50a1722a-ea01-4f5e-984c-afb3f255901b/image.png)

- 제목 또는 내용에 특정 단어가 포함되는 글 목록 조회 : FindByTitleContainingOrContentContaining

### 페이지<T  반환 타입
![](https://velog.velcdn.com/images/kimse3283/post/e3536f5b-524f-483f-b2d7-c14900b8b809/image.png)

page<Board findBy~~~(stirg ~~)

# 5. 쿼리 어노테이션 ( @Query )
![](https://velog.velcdn.com/images/kimse3283/post/4f290c36-250f-42a1-9f41-c0454afd916c/image.png)

메서드 이름이 엄청 긴 경우엔 __@Query 를 직접 작성__ 해준다.

![](https://velog.velcdn.com/images/kimse3283/post/5b86534d-eef9-4d10-9839-5e851b5179ff/image.png)

- 위치 기반 / 이름 기반 작성법 숙지할 것 

### native query 
![](https://velog.velcdn.com/images/kimse3283/post/9f91ddea-8b81-4c00-beb2-946d987834cb/image.png)

- 언제 사용하는지 확인하자 


![](https://velog.velcdn.com/images/kimse3283/post/f031e436-5282-43be-83fb-b8816d43301c/image.png)

- 3, 4, 6 만 하면 spring 이 알아서 dao 다 만들어준다 ~~~~~~~~
- db 쿼리 직접 설정할 필요가 없다 

13주차는 sequrity 부분 할 예정 . 