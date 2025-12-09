explain select * from Emp where ename like '김%' and dept = 2;

explain select * from Emp where id > 0 and ename = '';

explain select * from Emp where ename like '%김%' and dept = 2;

explain select * from Emp where substring(ename, 2) = '신신';
select substring(ename, -2) from Emp;
show index from Emp;

use schooldb;
select substring(mobile, -4) from Student;
alter table Student add index (
	(substring(mobile, -4))
);

explain select * from Student where substring(mobile, -4) = '1012';

-- 이제 이렇게 되면 전화번호 4자리 인덱스 추가하자. 아니다 테이블을 따로 두자. 로 나뉜다.
-- 이때 기준 인덱스는 총 데이블의 10 % 정도가 적당하다. 그래서 인덱스가 너무 많아질 것 같다? 찢어! 
-- 인덱스는 데이터를 쓸 때 계속 인덱스 파일에 접근해야하는 것이 부담이 될 때가 있다 데이터가 매우매우 많을 때 

-- insert를 할 때에도 page spliting 이 일어남. 이 부분이 부담이 될 수 있는 것. 

-- 그래서 실무에서 10만개의데이터가 쌓인 테이블은 뭐가 됐든 함부로 건들면 안 됨.  