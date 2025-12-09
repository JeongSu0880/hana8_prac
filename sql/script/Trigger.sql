use testdb;

select * from Dept;
alter table Dept add column empcnt smallint not null default 0;

create trigger tr_emp_after_insert after insert on Emp for each row
	update Dept set empcnt = empcnt + 1 where id = NEW.dept;

create trigger tr_emp_after_delete after delete on Emp for each row
	update Dept set empcnt = empcnt - 1 where id = OLD.dept;

show triggers;

delimiter $$    
create trigger tr_emp_after_update after update on Emp for each row
begin
	IF NEW.dept <> OLD.dept THEN
		update Dept set empcnt = empcnt + if(id = NEW.dept, 1, -1)
		where id in (NEW.dept, OLD.dept);
	END IF;
end $$
delimiter ;

-- 요즘에는 가독성이 좋은 것을 쿼리 한방에 짜는 것보다 선호하는 경우가 있다. 워낙 하드웨어 성능이 좋아져서
-- update는 id를 가지고 하는 거라 성능이 안나올 수가 없다.