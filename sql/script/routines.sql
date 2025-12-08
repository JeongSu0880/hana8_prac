select * from Subject;

create view v_subject AS
	select s.*, p.name
		from Subject s left outer join Prof p on s.prof = p.id;
        
        
use testdb;

select * from Dept;

create view v_dept AS
	select d.*, e.ename from Dept d left outer join Emp e on e.id = d.captain;

select * from v_subject;

-- 쪼인하기 귀찮아서 이렇게 뷰를 만들어 놓기도 함. 
