select conv('FF', 16, 10);
select conv('101001', 2, 10);

select CAST('2025-12-25 11:22:22.123' AS DATETIME);   -- cf. char, datetime
select CAST( 1.467 AS Signed Integer ), CONVERT(1.567, Signed Integer);
select str_to_date('2025-12-03', '%Y-%m-%d');  -- ←→ date_format 
select date_format(now(), '%m/%d %H:%i:%s'); -- 이건 반대로 ㅅ트링을 시간으로
-- cast는 날짜 바꿀 때 거의 대부분 사용

-- 암호화
-- 단방양 암호화, 양방향 암호화
-- 양방향 암호화는 복호화 가능, 
select dname, cast(aes_decrypt((AES_ENCRYPT(dname, '암호키')), '암호키') as char) from Dept;
select dname, HEX(AES_ENCRYPT(dname, '암호키')) from Dept; -- AES_DECRYPT
-- CAST(AES_DECRYPT(UNHEX(sub.enc), '암호키') as char)
select sha2('data', 256), sha2('data', 512); -- 단방향암호화(64, 128 length)
 -- 암호화 한 암호가 너무 커지면 막 64진수 이렇게 써서 길이르 팍 줄일 수 있다.
 
 -- select password('abcde');
 -- 아 이거 없어짐! 

select dname, HEX(AES_ENCRYPT(dname, '암호키')) from Dept; -- AES_DECRYPT
-- CAST(AES_DECRYPT(UNHEX(sub.enc), '암호키') as char)
select sha2('data', 256), sha2('data', 512); -- 단방향암호화(64, 128 length)

-- concat은 null이 있을 때 사용하면 안됨. -> 중간에 있으면 null이 됨 무조건alter

select concat('A', ',' , ifnull(null, ''), 'B', ':', 'C');

-- null if -> if가 찹아ㅕㄴ null로 할께

select char(65, 66); -- BloB으로 보인디ㅏ 그래서 캐스팅 필요
select CAST(char(65, 66) as char);

select length('AB한글');

select elt(2, 'str1', 'str2', 'str3'), field('s1', 's0', 's1'); -- 'str2', 2
select ELT(FIELD(didAgree, 'Y', 'N'), 'Active', 'Inactive');
-- 필드 didAgree가 'y'인가요 'n'인가요, 1번째면 Active 2번째면 inactive
-- 사실 쓸 일 별로 업슴 왜냐면 데이터를 이렇게 따로 가져오는 경우가 많이 없기 때문에  group concatㅇ르 쓰면 str1, str2 이런식으로 이어져어 들어옴alter

select find_in_set('s3', 's1,s2,s3,s4');    
select dept, min(ename), group_concat(ename) from Emp group by dept;

select group_concat(ename order by ename) from Emp group by dept;
select dept, find_in_set(min(ename), group_concat(ename order by ename)) from Emp group by dept;

select insert('125sssadf', 3, 2, '/woong');

select left('abc', 2), right('abc', 2), lpad('5', 2, '0'), rpad('15', 3, '0'); -- lpad rpad 많이 쓴다.

select reverse('abc'), repeat('x', 9), concat('|', space(4), '|'), replace('abcdefg', 'cde', 'xxx');

select substring('abcdefg', 2, 3);
select substring_index('a, b, c', ',', 2);
select substring_index('a, b, c', ',', -2);
select year(now()), month(now()), day(now()), month('2025-11-29'),
	   hour(now()), minute(now()), second(now()), quarter(now()), week(now());
       
       
select weekday('2025-12-25');   -- 월요일 0 ~ 6(일요일)
select dayofweek('2025-12-25'); -- 일요일 1 ~ 7(토요일)
-- MAKEDATE와 MAKETIME을c concat하면 DATE 타입으로 넣을 수 잇다.

select datediff('2025-12-01', '2025-03-11'), timediff('12:20:33', '11:30:20'); -- datediff 많이 쓴당

select '12' regexp '[a-z29]'; -- test(match)되면 1
SELECT REGEXP_INSTR('dog cat dog', 'dog', 2);
SELECT REGEXP_INSTR('aa aaa aaaa', 'a{4}');
SELECT REGEXP_LIKE('abc', 'ABC', 'c'); -- c: case sensitive
SELECT REGEXP_REPLACE('abc def ghi', '[a-z]+', 'X', 2, 2); -- space는 [a-z]에 해당이 안되게 때문에
-- 2번째 char(b) 부터 2번째 그룹을 X로 변경!

