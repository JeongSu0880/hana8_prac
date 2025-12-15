use testdb;

select * from Emp;
select dept, count(*), avg(salary), sum(salary), std(salary), variance(salary) 
	from Emp group by dept;
    
select dept, count(*), avg(salary) from Emp
	where avg(salary)
    group by dept;
-- 이건 안된다는거죠. 순서가 where 다음이 group by라 아직 집계를 못해요

select dept, count(*), avg(salary) from Emp where dept < 5
	group by dept having avg(salary) > 500;
    
select dept, count(*) from Emp group by dept having count(*) >= 40;
select dept, count(*), (select dname from Dept where id = e.dept)
	from Emp e group by e.dept having count(*) >= 40;
    
select * from Emp;
    
select e.dept, count(*), d.* from Emp e join Dept d on e.dept = d.id
	group by e.dept;
    
-- 왜 count(*)를 쓰면 더 빨라?  

select * from Emp;
select * from Dept;
select d.id, e.salary from Emp e join Dept d on e.dept = d.id;
-- ex) 부서 별 급여 평균이 전체 평균보다 높은 부서의 id와 평균 급여를 구하시오.
select e.dept, avg(e.salary) from Emp e 
group by e.dept 
having avg(e.salary) > (
	select avg(a.salary) from Emp a
);

-- answer
select avg(salary) from Emp;
select dept, avg(salary) avgsal from Emp group by dept having avgsal > (select avg(salary) from Emp);
select dept, avg(salary) avgsal, Dept.dname from Emp join Dept on Emp.dept = Dept.id group by dept having avgsal > (select avg(salary) from Emp); -- 부서명 포함 버전 
-- 아! 평균을 구할 때 group by 뒤의 having 절에 조건으로 평균을 구하면 그 그룹의 평균을, where에서 평균을 구하는건 groupby 해서 추출된 부분들에 대한 평균이다. 

select dept, avg(salary) avgsal from Emp
  group by dept having avgsal > (select avg(salary) from Emp);

select avg(a.salary) from Emp a;

select d.id, avg(e.salary)
	from Emp e join Dept d on e.dept = d.id group by d.id having avg(e.salary);

-- 직원 목록에 부서명도 함께 출력하세요
select e.*, d.dname from Emp e join Dept d on e.dept = d.id order by e.id;


select e.*, d.dname from Emp e join Dept d on e.dept = d.id order by e.id;
select d.*, e.ename from Dept d join Emp e on e.dept = d.id order by d.id;

-- 전체 평균보다 더 높은 급여를 가진 직원 목록을 출력하시오.
-- (부서id, 부서명, 직원id, 직원명, 급여)
select avg(a.salary) from Emp a;
select a.salary from Emp a;

select e.id as emp_id, d.id as dept_id, d.dname, e.ename, e.salary from Emp e 
	join Dept d on e.dept = d.id 
    where e.salary >= (select avg(a.salary) from Emp a) 
    order by e.id;
    
-- answer
select * from Emp e inner join Dept d on e.dept = d.id
	where e.salary > (select avg(salary) from Emp);

-- 부서 별 최고 급여자 목록을 추출하시오.
-- (부서별 1명 씩)
-- dept dname id ename salary 

-- 조건 , 일단 이거 먼저 하세요~
update Emp set salary = 901 + dept
  where id in (152, 97,18,80,133,47,128);

select * from Emp
	  where id in (152, 97,18,80,133,47,128);

select e.dept, d.dname, max(e.salary) from Emp e
	join Dept d on e.dept = d.id
    group by e.dept;

-- answer
select e.* from Emp e inner join (select dept, max(salary) salary from Emp group by dept) d 
						on e.dept = d.dept and e.salary = d.salary
			order by e.dept; 
--  여기에 부서명 포함하려면 어차피 join 한번 더 해야하는거 아냐????? 
    
-- 항상 from 부터 

-- full join
select * from Emp, Dept;
-- 뭐랑 비슷하냐면
-- inner join은 뭐랑 비슷하냐면 
select * from Emp, Dept where Emp.dept = Dept.id;
select * from Emp inner join Dept on Emp.dept = Dept.id; 
-- optimizer가 똑똑해서 이걸 자동으로 join으로 변환해준다.  


select * from Dept;
select * from Emp where id in (26, 30);
-- 김나나, 김바순, 
select dept, min(ename), group_concat(ename order by ename) from Emp group by dept;
select d.id, d.dname, (select id from Emp where dept = d.id order by ename limit 1) from Dept d
-- update Dept d set d.captain = (select id from Emp where dept = d.id order by ename limit 1) 
where d.id > 0;
 
select d.*, e.ename
  from Dept d inner join Emp e on d.captain = e.id;
  
select d.id, d.dname, e.id eid, e.ename
  from Dept d inner join Emp e on d.id = e.dept;

alter table Emp add column outdt date null comment '퇴사일' after salary;

select * from Emp
-- update Emp set outdt = '2025-11-25'
 where id in (14, 26);
 
select * from Emp where id in (14, 26);
select * from Dept where captain in (14, 26);

select d.*, e.*
  from Dept d inner join Emp e on d.captain = e.id
 where e.id in (14, 26);
 
select current_date();
select e.*, d.*, (case when e.id = d.captain then null else d.captain end)
 from Emp e inner join Dept d on e.dept = d.id where e.id in (14, 26);
-- 
update Emp e inner join Dept d on e.dept = d.id
  -- set e.outdt = current_date(), d.captain = (case when e.id = d.captain then null else d.captain end)
  set e.outdt = current_date(), d.captain = (case when d.captain in (14, 26) then null else d.captain end)
 where e.id in (14, 26);
 
select * from Dept;

select d.id, d.dname, (select id from Emp where dept = d.id order by ename limit 1)  from Dept d
	-- update Dept d set d.captain = (select id from Emp where dept = d.id order by ename limit 1)
    where d.id > 0;