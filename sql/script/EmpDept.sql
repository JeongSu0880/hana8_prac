use testdb;
show tables;

select * from Dept;

select * from Emp;

select current_user();



-- alter table Emp add column auth tinyint(1) not null default 9 comment '1:admin, 3: manager, 5:employee, 7:temporary, 9:guest';
alter table Emp add column auth enum('admin', 'manager','employee','temporary','guest') not null default 'guest';

desc Emp;
alter table Dept add column captain int unsigned null;
alter table Dept add constraint foreign key fk_Dept_captain_Emp (captain)
			references Emp (id) on update cascade on delete set null;
            
            
create table EmailLog(
	id int unsigned not null auto_increment primary key,
    sender int unsigned not null, 
    receivers varchar(1024),
    subject varchar(255),
    body text,
    foreign key fk_EmailLog_sender_Emp (sender) references Emp (id) on delete no action on update cascade
);

show create table EmailLog;

select * from EmailLog;

alter table EmailLog drop constraint EmailLog_ibfk_1;
alter table EmailLog drop index fk_EmailLog_sender_Emp;
show index from EmailLog;

alter table EmailLog engine = MyISAM;

alter table Major;

use testdb;

-- alter는 테이블 구조를 바꾸는 것, update는 테이블 데이터를 밖는 것
select * from Emp;
update Emp set outdt = '2025-11-30'
where id in (3, 5); 

select * from Dept;

select dept, min(ename), group_concat(ename order by ename) from Emp group by dept;
update Dept set captain = (select min(ename) from Emp where dept = d.id);

select d.id, d.dname, (select min(ename) from Emp where dept = d.id) from Dept d;

select e.ename from Dept d inner join Emp e on d.idh = e.dept
	group by d.id;
    
-- ggroup byf로 업데이트 하는 것 지양 왜?? 죽어놓은 것을 

select d.*, e.* 
from Dept d inner join Emp e on d.captain = e.id;

select * from Emp where id in(14, 36);

select d.*, e.*, (e.id = d.captain) from Dept d inner join Emp e on d.id = e.dept;

update Emp e inner join Dept d on e.dept  = d.id
	set e.outdt = now(), d.captain = (case when captain then null else d.captain end) where e.id in(14, 26);

select * from Emp;

update Emp e inner join Dept d on e.dept  = d.id
	set e.outdt = current_date(), d.captain = (case when e.id = d.captain then null else d.captain end) where e.id in(14, 26);
-- 왜 위의 current_date는 되고 안되는거야?
 
desc Emp;

select @@sql_mode;

update Emp set outdt = null where id in(14, 26);
update Dept set captain = null where id = 1;

select * from Dept;

update Emp e inner join Dept d on e.dept = d.id
	set e.outdt = current_date(), d.captain = e.id
where e.id in (14, 26);


select * from Emp e left outer join Dept d on e.id = d.captain
where e.id in (14, 26);

update Emp e left outer join Dept d on e.id = d.captain
	set e.outdt = curdate(), d.captain = null
    where e.id in (14, 26);
    
select * from dept;
use testdb;
select * from Dept;
update Dept set captain = null where Dept.id = 1;
call sp_emps_by_deptid(2);
call sp_emps_by_deptid(1);
call sp_emps_by_deptid(-1);

call sp_depts_by_cursor();

select * from Emp where id in (3, 5);
select * from Emp;
select * from Dept;

update Dept set captain = null where id > 0;

select min(ename) from Emp group by dept having dept = 4;
update Dept set captain = (select id from Emp where Dept.id = Emp.dept order by ename limit 1) where id > 0;

select current_date();
update Emp e left outer join Dept d on e.id = d.captain set e.outdt = current_date(), d.captain = null where e.id in (14, 26);


update Emp e left outer join Dept d on e.id = d.captain
	set e.outdt = curdate(), d.captain = null
    where e.id in (14, 26);
