use testdb;

select max(d.dname), avg(e.salary) as avgsal
	from Dept d inner join Emp e on d.id = e.dept
	group by d.id
    order by avgsal desc; 

-- 이럴 경우에 중간 부서를 빼고 제일 높고 제일 작은 부서를 한방의 쿼리로 읽을 방법이 없다. 그래서 procedure가 필요한다, With절로도 가능!
-- 여기서 d.dname은 max로 감싸지 않아도 에러가 나진 않는다. 하지만 정석은 아니다 (groupby에 없는 컬럼은 무조건 집계함수로)

with AvgSal AS (
	select max(d.dname) dname, avg(e.salary) avgsal
		from Dept d inner join Emp e on d.id = e.dept
		group by d.id
),
MaxSal AS (select * from AvgSal order by avgsal desc limit 1),
MinSal AS (select * from AvgSal order by avgsal limit 1)
select * from MaxSal
UNION ALL
select * from MinSal
UNION ALL
select 0, '평균차액', (select avgsal from MaxSal) - (select avgsal from MinSal);



with AvgSal AS (
	select d.id, max(d.dname) dname, avg(e.salary) avgsal
		from Dept d inner join Emp e on d.id = e.dept
		group by d.id
),
MaxSal AS (select * from AvgSal order by avgsal desc limit 1),
MinSal AS (select * from AvgSal order by avgsal limit 1),
SumUp AS (
	select '최고', dname, avgsal from MaxSal
    UNION ALL
    select '최저', dname, avgsal from MinSal 
)
select * from SumUp
UNION
select '', '평균 차액', max(avgsal) - min(avgsal) from SumUp;

-- 솔직히 성능 면에서는 좋지 않지만 가독성은 좋다. 
-- 사실 성능을 요하는 것은 with 안의 절인데, 그 외에는 어차피 앞의 임시 테이블을 읽으므로 괜찮음.
-- 대신 메모리를 많이 잡아먹을 것임.   

-- recursive 사용하기
-- 0  1  1  2  3  5  8  13  21  34  55 

with recursive fibonacci (n, prev ,next) AS (
	select 1, 0, 1 -- 이게 초기화 문 -> finbonacci 뷰가 하나 생김. acc처럼 쌓여감
    UNION ALL
    select n + 1, next, prev + next from fibonacci where n < 10
)
select * from fibonacci;

insert into Dept(pid, dname)
  values(6, '인프라셀'), (6, 'DB셀'), (7, '모바일셀');

select * from Dept;

select p.dname parent, d.dname me
	from Dept p inner join Dept d on p.id = d.pid;

-- Dept 테이블에 아래와 같이 서버팀과 클라팀 아래에 추가 셀(파트)을 등록한 후,
--  부서의 트리 계층구조(hierarchy)를 표현하시오. (순서에 맞게 트리 형태 그대로 출력)
-- insert into Dept(pid, dname)
--   values(6, '인프라셀'), (6, 'DB셀'), (7, '모바일셀');


select * from Dept;
select id, pid, concat(pid, '-', id) from Dept;
select id, pid, id from Dept where pid = 0;
with recursive DeptHierachy (id, dname, pid, h) AS (
	select id, dname, pid, concat(pid, '-', cast(id as char(10))) from Dept where pid = 0 -- casting을 하지 않아서 생긴 문제 
    UNION ALL
    select d.id, d.dname, d.pid, concat(p.h, '-', d.id) from Dept d inner join DeptHierachy p on p.id = d.pid where d.id <= 10 and d.pid <> 0
)
select pid, dname, id from DeptHierachy order by h;

-- answer
select p.dname, d.dname, concat(p.id, '-', d.id) h 
	from Dept p inner join Dept d on p.id = d.pid
    order by h;
    
-- 한번에 한세대를 읽겠다!
with recursive CteDept (id, dname, depth, h) AS (
	select id, dname, 0, cast(id as char(10)) from Dept where pid = 0
    UNION ALL
    select d.id, d.dname, cte.depth + 1, concat(cte.h, '-', d.id)
		from Dept d inner join CteDept cte on d.pid = cte.id
        where d.pid = cte.id
)
select concat(repeat(' -> ', depth), dname) from CteDept order by h;
    
select row_number() over (order by dept, salary desc) '순번', e.*,
    avg(salary) over w '급여 평균',
    sum(salary) over w '급여 누적치'
  from Emp e
 where ename like '박%'
 window w as (partition by dept order by salary desc);

select p.id pid, d.id did, 
		(case when p.id is not null then max(p.dname) else '소계' end) pname,
        (case when d.id is not null then max(d.dname) else '소계' end) dname, 
        format(sum(e.salary), 0)
	from Dept p inner join Dept d on p.id = d.pid
				inner join Emp e on e.dept = d.id
	group by d.id, p.id
    with rollup ;

select p.id pid, d.id did, 
		max(p.dname) pname,
        max(d.dname) dname, 
        format(sum(e.salary), 0)
	from Dept p inner join Dept d on p.id = d.pid
				inner join Emp e on e.dept = d.id
	group by d.id, p.id
    with rollup ;

-- 뭔가 셀프 조인은... 내 레코드 말고 디른 레코드가 필요할 때,, 


select d.id, max(d.dname), avg(e.salary), sum(e.salary)
	from Dept d inner join Emp e on d.id = e.dept
    group by d.id
    order by d.id;

select avg(if(dept = 5,salary, null)) from Emp; 
select avg(if(dept = 4, salary, null)) from Emp;
select '평균급여' as '구분',
		avg(case when dept = 3 then salary end) as '영업1팀', 
        avg(if(dept = 4, salary, null)) '영업2팀',
        avg(if(dept = 5, salary, null)) '영업3팀',
        avg(if(dept = 6, salary, null)) '서버팀',
        avg(if(dept = 7, salary, null)) '클라이언트팀'
	from Emp
UNION
select '총 급여',
		sum(case when dept = 3 then salary end) as '영업1팀', 
        sum(if(dept = 4, salary, null)) '영업2팀',
		sum(if(dept = 5, salary, null)) '영업3팀',
        sum(if(dept = 6, salary, null)) '서버팀',
        sum(if(dept = 7, salary, null)) '클라이언트팀'
	from Emp;


-- 요령 -> 구조를 만들어놓고 하는 것. 












