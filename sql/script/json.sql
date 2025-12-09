alter table Emp add column remark json;

select id, remark->'$.age', json_extract(remark, '$.age'),
	remark->'$.fam[0 to 2].name', 
    remark->>'$.fam[0].name', -- 화살표 머리 두개면 쌍따옴표 안 붙음.
    remark->'$.fam[*].name'
 from Emp where id <= 5;

update Emp set remark = '{"id": 2, "age": 30, "fam": [{"id": 1, "name": "유세차"}]}'
 where id = 2;

update Emp set remark = '{"id": 3, "age": 33, "fam": [{"id": 1, "name": "유세차"}, {"id":2, "name": "홍길숭"}]}'
 where id = 3;

update Emp set remark = '{"id": 4, "age": 34, "fam": [{"id": 1, "name": "유세차"}]}'
 where id = 4;

update Emp set remark = json_object( 'id', 5, 'age', 44, 
                          'fam', json_array(
                              json_object('id', 1, 'name', '지세차'),
                              json_object('id', 2, 'name', '지세창')   )  )
 where id = 5;

select  json_pretty(remark) from Emp where id <= 5;
  
select id, ename, remark->'$.age', remark->'$.fam' as family,
    json_unquote(remark->'$.fam[0].name'), remark->'$.fam[0 to 2]', remark->'$.fam[last - 1 to last].name',
    remark->>'$.fam[0].name',  remark->>'$.fam[last].name',  remark->>'$.fam[last - 1].name'
  from Emp where json_object('id', 1, 'name', '유세차') member of (remark->'$.fam');
select * from Emp where '유세차' member of (remark->'$.fam[*].name');


select json_seartch(remark,  null,  ' ');


select json_search(remark, 'one', '유세차'), -- one | all
    json_extract(remark, '$.fam', '$[*]'), remark->>'$.fam[0].name'
  from Emp where id <= 5;
  
select json_value(remark, json_search(remark, 'one', '유세차'))
  from Emp where json_search(remark, 'all', '유세차');

update Emp set remark = json_insert(remark, '$.addr', 'Seoul') where id = 2;
 
update Emp set remark 
   = json_insert(remark, '$.fam', json_array(json_object('id', 1, 'name', '유세홍')))
 where id = 2;
 
update Emp set remark
   = json_array_append(remark, '$.fam', json_object('id', 2, 'name', '유세이'))
 where id = 2;
 
update Emp set remark = json_set(remark, '$.fam[1].name', '새로이') where id = 2;
 
update Emp set remark = JSON_REMOVE(remark, '$.addr') where id = 2;
update Emp set remark = '[1,2,3]' where id = 4;
select * from Emp where 2 member of (remark->'$'); 

select * from Emp;
update Emp set remark = null where id = 6; 
update Emp set remark = json_object('id', 6) where id = 6;
update Emp set remark = json_object('id', 7) where id = 7;
update Emp set remark = json_insert(remark, '$.idd', 600) where id = 7;-- 기존에 존재하지 않는 json에 대해 추가하는 것. (이미 있으면 씹힘)
update Emp set remark = json_set(remark, '$.idd', 6900) where id = 7; -- 기존에 존재하는 값을 바꾸고 싶으면 set을 쓰기

select * from Emp where id = 2;
update Emp set remark = JSON_REMOVE(remark, '$.addr') where id = 2;
update Emp set remark = '[1,2,3]' where id = 4;
select * from Emp where 2 member of (remark->'$');

select e.*, d.dname
  from Emp e inner join Dept d on e.remark->'$.fam[0].id' = d.id
 where json_length(e.remark->'$.fam') > 0;
-- fam이 있는 사람을 구할 때


select JSON_OBJECTAGG(dname, id) from Dept d;
-- 이미 있는 데이터를 JSON OBJECT 화 해준다.
select JSON_OBJECTAGG(dname, (select count(*) from Emp where dept = d.id)) from Dept d;

