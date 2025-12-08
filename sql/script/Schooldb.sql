create user school@'%' identified by 'Schooldb1!';

grant all privileges on schooldb.* to school@'%';

select 256 * 256 * 256 * 256;

create table T (
	id tinyint unsigned auto_increment primary key,
    name varchar(30) not null,
    score enum('A', 'B', 'C', 'F') default 'F' comment '학점'
);
create database schooldb;


desc T;

insert into T(name, score) values('Hong', 'A');
insert into T(name, score) values('Kim', 'B'), ('Lee', 'C');
use schooldb;
select * from T; 

insert into T(name) values('Park');

select * from T where score = 4;

insert into T(name, score) values('Choi');

alter table T modify column score enum('A', 'B', 'C', 'D', 'F') default 'F' comment '학점';

select * from T where score = 'F';

insert into T(name, score) values('Han', 'D');

select now(), sysdate(), curdate(), curtime(), unix_timestamp();
show variables like '%time_zone%'; 
set time_zone = 'Asia/Seoul'; 

select last_insert_id();

create table Student (
	id tinyint unsigned auto_increment,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    name varchar(30) not null,
    birthdt date not null,
    major varchar(10) not null,
    mobile varchar(11) not null,
    email varchar(255) not null,
    gender boolean not null default 0 comment '성별, 0:남 1:여',
    graduatedAt varchar(10) null,
    
	primary key (id),
    unique key unique_Student_email (email)	
);

create table Major(
	id tinyint unsigned auto_increment primary key,
    name varchar(15) not null,
    unique key unique_Major_name (name)
);

insert into Major (name) values('철학과'), ('컴퓨터공학과'), ('건축과');

insert into Student (name, birthdt, major, email, mobile) values('이정수', '2001-01-25', 5, 'lee@gmail.com', '0109888776');

select * from Student;
select * from Major;

alter table Student add constraint foreign key fk_Student_Major (major) references Major (id); 

/*
Error Code: 3780. Referencing column 'major' and referenced column 'id' in foreign key constraint 'Student_ibfk_1' are incompatible.
*/

select major from Student where major not in (select id from Major);
/*여기서 뭐가 나오면 그것 때문에 에러임것임.*/
select * from Major; 
select * from Student;

update Student set major = 1 where id = 1;-- 이정수 

show index from Student;

use schooldb;

create table Enroll(
	id int unsigned not null auto_increment primary key,
	createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    subject int unsigned not null, 
    student tinyint unsigned not null,
    foreign key fk_Enroll_Subject (subject) references Subject (id) on delete cascade on update cascade,
    foreign key fk_Enroll_Student (student) references Student (id) on delete cascade on update cascade,
	unique key uniq_Enroll_subject_student (subject, student)
);

create table Prof(
	id int unsigned not null auto_increment primary key,
	createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    name varchar(31) not null,
    likecnt int not null default 0
);

create table Subject(
	id int unsigned not null auto_increment primary key,
	createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    name varchar(20) not null,
    prof int unsigned null,
    
    foreign key fk_Subject_Prof (prof) references Prof (id) on delete set null on update cascade
);

show index from Major;

alter table Major add column updatedate timestamp default current_timestamp on update current_timestamp after id;

alter table Major add column building varchar(15) not null default '';

select * from Major;

update Major set name = '건축공학과' where id = 3;

update Major set building = '공학관' where name like '%공학과';
update Major set building = '인문관' where building = '';

SET SQL_SAFE_UPDATES = 0;

insert into Major(name, building) values('경제학과', '인문관');
insert into Major(name, building) values('사회복지학과', '인문관');

insert into Major(name, building) values('경제학과', '인문관') on duplicate key update building = '인문관';

alter table Major auto_increment = 7;

show create table Major;

select * from Student;
select * from testdb.Emp;

insert into Student(name, birthdt, major, email, mobile, gender)  
select ename, concat('2000-12-', id), dept % 4 + 1, concat('stu', id, '@gmail.com'), concat('0101234', id, id), id %2 from testdb.Emp where id between 10 and 31 limit 5;


select * from Prof;

insert into Prof(name, likecnt)
		select ename, id %50 from testdb.Emp limit 5;

select * from Subject;
delete from Subject;
insert into Subject (name, prof)
		select a.ename, b.id from testdb.Emp as a, Prof as b
        limit 5;
        
select * from Enroll;

insert into Enroll (student, subject) select a.id, b.id from Student as a, Subject as b;
-- insert into Enroll (student, subject) select Student.id, Subject.id from Student, Subject;


delete from Prof;
select * from Prof;
insert into Prof(name) values ('김교수'), ('박교수'), ('최교수'), ('이교수'), ('한교수');


delete from Subject;
select * from Subject;
insert into Subject(name, prof)
select concat('과목', id), id from Prof;

delete from Enroll;
select * from Enroll;
insert into Enroll(subject, student) 
select id, (select id from Student order by rand() limit 1)
 from Subject order by rand();
-- 이러헤 하면 Subject의 개수가 기준

insert into Enroll(student, subject) 
select id, (select id from Subject order by rand() limit 1)
 from Student order by rand();

-- 짝꿍 만들기 (조인 연습) 근데 이제 조인 안 쓰고 한번 해보자
select s.id as x, (select id from Student where s.id < id order by rand() limit 1) y from Student s order by s.id;
-- 관례 상 as를 from 뒤에서는 잘 안쓰고 select에서는 쓴다.
 -- 잘 안됨.alter
 
 select x.id, y.id
	from Student x join Student y on x.id <> y.id;
    
select * from Student s1;

select s1.id, (case when s1.id = s2.id then '-' else s2.id end), if(s1.id = s2.id, 'X', 'Y') from Student s1 join 
(select s2.id, (@rownum := @rownum + 1) rn
	from Student s2, (select @rownum := 0) rnum ) s2 on s1.id = s2.rn;


select m.*, (case building when '인문관' then 1 
						when '공학관' then 2
						else 0 end) building_conde from Major m;

select *, if(building = '인문관', 1, if(building = '공학관', 2, 0)) building_code from Major;

select * from Prof;
select * from Subject;

update Subject set prof = null 
	where id = 18;
    
-- 서브쿼리는 쉽지만 비효율적이다.


select s.*, ifnull((select name from Prof where id = s.prof), '공석')
	from Subject s;
-- select s.*, (select isnull(name), '공석') from Prof where id = s.prof)
-- from Subject s;
-- 이거슨 안된다. null이 된건 select를 거쳐서 없으니까 
    
-- 이 ifnull 함수 디게디게 많이 쓴다. 
-- 서브쿼리는 무조건 성능이 좋지 않다. 왜냐면 계속 select를 중첩하기 때문에! (중첩 반복문처럼)
-- preprocessor 가 ~~~~~ 실행 계획은 세울 때까지 계속 반복하게 된까alter

select * from Subject;
select * from Subject where prof in (270, 271); -- prof = 2 or prof = 4
-- Any하고 OR은 같다.
select * from Subject where prof in (select id from Prof where id % 2 = 0);
-- in을 써야 1 : 1. 만일 in을 쓸ㅅ없다면 any를 쓰자.

select id from Prof where id % 2 = 0;

select * from Subject where prof < any(select id  from Prof where id % 2 = 0);
-- 이 중에 하나보다 크면 돼.
-- all은 모두가 가장 큰 것보다 더 커야 함.
select * from Subject where prof< (select max(id) from Prof where id % 2); 
 
-- 왼쪽이 select를 돌면서 오른쪽과 맞는 것들만 추출하는 것.a

select * from Student;
select * from Student where name like '%지%';
select * from Student where name like '%나';
-- % 이게 맨 앞에 잇으면 무시함.. 어차피 full texxt index

select * from Student where name like '_윤%';
select * from Major;

select distinct building from Major;
select building, count(*) from Major group by building;



select distinct building, count(*) from Major;
-- 삑. 이건 실행 안 됨. 집계 함수  

select building, count(*), group_concat(name order by name separator ', ') from Major group by building;

-- 페이지네이션 
select * from Student order by id desc limit 3; -- page 1 
select * from Student order by id desc limit 3, 3; -- offset을 준다. 이걸로 페이지네이셔 가능 page 2

-- 스크롤
select * from Student where id > ? order by id desc limit 5;
-- 이런식으로 클라이언트에서 보내주는 마지막 값보다 큰 데이터들을 보내부는 것.  

use schooldb;

select * from Subject s inner join Prof p on s.prof = p.id;
-- 이러면 null이 안나뫄.alter
-- 그래서 나온게 outer join

select * from Subject s left outer join Prof p on s.prof = p.id; 
-- 데이터가 전제 다 보여야 하는 쪽으로 걸면 된다.


show create table Student;

select id, name, birthdt, gender from Student;

-- 위 sql문에서 성별(gender)을 '여', '남'으로 표시하시오.
-- case when 문 사용.
-- elt 문 사용.
-- 정렬을 id / name / birthdt 3개 컬럼 랜덤으로 수행하시오.


-- answer
select id, name, table Student;
select elf(1, '남', '여') ;
-- 싸거블?? 서츼어블??alter

select * from Student;
select id, name, birthdt, elt(field(gender, 0, 1), '남', '여') as gender from Student;
select id, name, birthdt, case when gender = 0 then '남' else '여' end as gender from Student;
select id, name, birthdt, elt(field(gender, 0, 1), '남', '여') as gender from Student order by (elt(field(mod(floor(rand() * 10), 3), 0, 1, 2), 'id', 'name', 'birthdt'));
select field(mod(rand(), 3), 0, 1, 2);
select elt(field(mod(floor(rand() * 10), 3), 0, 1, 2), 'id', 'name', 'birthdt');
SELECT REGEXP_LIKE('abc', 'ABC', 'c');
SELECT REGEXP_REPLACE('abc def ghi', '[a-z]+', 'X', 2, 2);
SELECT REGEXP_INSTR('aa aaa aaaa', 'a{4}');

-- select 'https://www.topician.com/lms/lectures'; 에서 도메인 부분만 추출하시오.
select substring_index(substring_index('https://www.topician.com/lms/lectures', '/', 3), '/', -1);  -- a,b (,를 기준으로 두번째까지)

-- select name from Student; 에서 name의 가운데 글자만 *로 변환해서 출력하시오.
select insert(name, 2, char_length(name) - 2, '*') from Student;                                                                                                                                                                                                                                                                                                                                                                                                                                    ) - 2, '*');

-- answer
select name, regexp_replace(name, '.', '*', 2, 1) from Student; 
select name, regexp_replace(name, '.{2}', '**', 2, 1) from Student;
select name, regexp_replace(name, '.{1}', '*', 2, 1) from Student; 
    
-- 전화번호가 '010-2323-4545', '010.2323.4545', '010 2323 4545' 등 다양한 형태로 되어있다. 숫자만 추출하시오.
select regexp_replace('010-2342-2452', '[^0-9]', '');
select regexp_replace('010.2342.2452', '[^0-9]', '');
select regexp_replace('010 2323 4545', '[^0-9]', '');

use schooldb;
-- answer 
select regexp_replace('010-2342-2452', '[^\\d]', '');

select @@autocommit; -- 알아서 commit을 해준다는 의미
show variables like '%commit%'; -- commit 관련 명령어들 쫘악 
use schooldb;
start transaction; -- 여기서부터 세션이 끝날 때까지 auto commit이 꺼짐.
update Student set birthdt = '20250909' where id = 4;
select * from Student;
rollback;

select * from Student; 



commit;
-- roll back은 DDL의 경우에는 적용이 안됨.

create table StudentBackup as select * from Student;
-- altering 
-- 그래서 개발DB따로 있어 

-- SavePoint x; 

drop table StudentBackup;


show table status;


use schooldb;

select * from Prof;
select * from Subject;
select prof, count(*) from Subject group by prof;
-- 교수별 과목 수 
-- 이런식으로 충분히 읽을 수 있는 데이터를 컬럼을 따로 두는 것은 데이터 중복으로 정규화 위배지만, 성능을 위해 두는 경우도 있다. 

alter table Prof add column subjectcnt tinyint unsigned not null default 0;

insert into Subject(name, prof) values('이', 273);

--  기준을 잘 생각해야함. Subject의 insert가 일어났을 때 prof의 담당 과목수를 증가시키려는 거니까 trigger Subject이다.
DELIMITER $$
create trigger tr_Subject_after_update after update on Subject for each row
begin
	IF NEW.prof <> OLD.prof THEN
		update Prof set subjectcnt = subjectcnt + 1
		where id = NEW.prof;
    
		update Prof set subjectcnt = subjectcnt - 1
		where id = OLD.prof;
	END IF;
end $$
delimiter ;
DELIMITER $$
create trigger tr_Subject_after_insert after insert on Subject for each row
begin
		update Prof set subjectcnt = subjectcnt + 1
		where id = NEW.prof;
end $$
delimiter ;


DELIMITER ;

show triggers;
show triggers like '%Subject%';

update Subject set name='과목222', prof=270 where id = 10;

DROP TRIGGER IF EXISTS tr_Subject_after_insert;
DROP TRIGGER IF EXISTS tr_Subject_after_update;

update Prof set subjectcnt=(select count(*) from Subject where Prof.id = Subject.prof group by prof) where id > 0;

select * from Subject where id < 5
UNION ALL
select * from Subject where id > 3;