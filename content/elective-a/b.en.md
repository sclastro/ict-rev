## 2.1 Curriculum requirements

Use SQL to maintain a simple relational database, and manipulate its data or retrieve the required information in at most three tables. The skills involved are: modify the structure of tables; add, delete and modify the data in tables; view, sort and select contents by filtering, and create views; use appropriate operators and expressions, such as arithmetic operators, comparison operators, logical operators and the IN, BETWEEN and LIKE operators; use simple built-in functions such as aggregate and string functions; query multiple tables using equi-join, natural join and outer join; perform sub-queries (one sub-level only).

Module A has already covered SELECT, WHERE, GROUP BY, HAVING and ORDER BY on a single table; see section 4.10 of [Module A Topic d](../core-a/d.html). This topic extends that to modifying data, multiple tables, sub-queries, set operations and views.

## 2.2 Writing SQL and the HKEAA command list

The last page of the Paper 2 question book contains the HKEAA SQL list (based on the SQL-92 standard). The table below groups its contents:

| Category | Contents of the list |
|---|---|
| Constants | TRUE, FALSE |
| Operators | `+ - * / > < = >= <= <> % _ '`, AND, NOT, OR |
| Aggregate functions | AVG, COUNT, MAX, MIN, SUM |
| Numeric and string functions | ABSOLUTE (ABS), INT, ASC, AT, CHAR (CHR), CHAR_LENGTH (LEN), LOWER, TRIM, SPACE, SUBSTRING (SUBSTR / MID), UPPER, VALUE (VAL) |
| Date functions | DATE, DAY, MONTH, YEAR |
| Other keywords | ADD, ALL, ALTER, ANY, AS, ASC, BETWEEN, BY, CREATE, DELETE, DESC, DISTINCT, DROP, EXISTS, FROM, GROUP, HAVING, IN, INDEX, INNER JOIN, INSERT, INTEGER, INTERSECT, INTO, LEFT [OUTER] JOIN, LIKE, MINUS, NULL, RIGHT [OUTER] JOIN, FULL [OUTER] JOIN, ON, ORDER, SELECT, SET, TABLE, TO, UNION, UNIQUE, UPDATE, VALUES, VIEW, WHERE |

**Conventions**

- Keywords may be in upper or lower case; this site uses upper case for readability.
- Text and dates need quotes, for example `CLASS = '4A'`; **numbers have no quotes**, for example `JYEAR = 2012`.
- Dates in the papers are usually written as `'28/7/2023'` or `'26-3-2025'`; the marking schemes accept other date formats.
- Add brackets when you are unsure of the order of a compound condition.
- The semicolon at the end of a statement is optional.

**HKEAA style and MySQL style**

The examples on this site follow the HKEAA list and the marking schemes. The textbook and school computer rooms often use MySQL, which differs in places:

| Purpose | HKEAA list or marking scheme | MySQL |
|---|---|---|
| Change the data type of a field | `ALTER TABLE CAND ALTER COLUMN CNUM CHAR(12)` | `ALTER TABLE CAND MODIFY CNUM CHAR(12)` |
| Difference | `MINUS` | `EXCEPT` (MySQL 8.0.31 or later) |
| Full outer join | `FULL [OUTER] JOIN` | Not supported; take the UNION of a LEFT JOIN and a RIGHT JOIN |
| Length of a string | `CHAR_LENGTH` (or `LEN`) | `CHAR_LENGTH` (`LENGTH` counts bytes) |
| Dates | `'26-3-2025'` and other formats | Must be written as `'2025-03-26'` |

Natural join (NATURAL JOIN) is listed in the C&A Guide but not in the HKEAA list; see section 2.9. For creating and dropping indexes, see section 1.6 of [Topic a](a.html).

## 2.3 Modifying the structure of tables

| Operation | SQL |
|---|---|
| Add a field | `ALTER TABLE STAFF ADD EMAIL VARCHAR(40)` |
| Change the data type or length of a field | `ALTER TABLE STAFF ALTER COLUMN PHONE CHAR(12)` |
| Remove a field | `ALTER TABLE STAFF DROP COLUMN EMAIL` |
| Remove a whole table (structure and data) | `DROP TABLE STAFF` |

**DELETE and DROP are different.** `DELETE FROM STAFF` deletes all the records in the table, but the table structure remains and records can be inserted again; `DROP TABLE STAFF` removes the whole table together with its structure.

> ⚠ **[2024 P2A 1(f)] Complete the SQL statement to add a field MOB (character, length 8) to STAFF to store mobile phone numbers: `____ STAFF ADD ____`**
> ✔ `ALTER TABLE STAFF ADD MOB CHAR(8)` (CHR, VARCHAR and CHARACTER are also accepted).
> ✘ The HKEAA reported that weaker candidates were unable to provide the correct SQL keyword for adding a new column.

[Sample Paper P2 Section A 5(e)] Add a field BUSID to DRIVER to store a licence plate number of at most 6 characters: `ALTER TABLE DRIVER ADD (BUSID VARCHAR(6))`. [2012 Practice Paper P2A 1(c)(i)] Increase the width of CNUM to 12 and make sure CNUM is never empty: `ALTER TABLE CAND ALTER COLUMN CNUM CHAR(12) NOT NULL`.

> ⚠ **[2023 P2A 3(d)(iii)] To remove the table DOCTOR, two methods are suggested: `DELETE FROM DOCTOR` and `DROP TABLE DOCTOR`. What is the major difference between them?**
> ✔ DELETE deletes the records inside the table; DROP removes the whole table. The HKEAA reported that the majority of candidates used the DROP command correctly.

## 2.4 Adding, deleting and modifying data

**Sample table PRODUCT**

| PID | PNAME | CATEGORY | PRICE |
|---|---|---|---|
| P1 | Notebook | Stationery | 25 |
| P2 | Pen | Stationery | 8 |
| P3 | Calculator | Electronics | 160 |
| P4 | Earphones | Electronics | 299 |
| P5 | Water bottle | Living | 60 |

```sql
-- Insert a complete record: the values follow the order of the fields in the table
INSERT INTO PRODUCT VALUES ('P6', 'Speaker', 'Electronics', 450)

-- Insert some fields only: the other fields are NULL
INSERT INTO PRODUCT (PID, PNAME) VALUES ('P7', 'Mouse pad')

-- Modify records: 10% off all electronic products
UPDATE PRODUCT SET PRICE = PRICE * 0.9 WHERE CATEGORY = 'Electronics'

-- Delete records: delete products without a price
DELETE FROM PRODUCT WHERE PRICE IS NULL
```

Afterwards the prices of the calculator, earphones and speaker are 144, 269.1 and 405, and the mouse pad record has been deleted.

- Without WHERE, `UPDATE` and `DELETE` change or delete **all records**.
- To change several fields, separate them with commas, for example `SET PRICE = 30, CATEGORY = 'Stationery'`.
- To add to a numeric field, write `SET POINT = POINT + 10`, not just `SET POINT + 10`.

> ⚠ **[2025 P2A 3(a)] An input form inserts the customer "So Siu Ming", identity code "ABF218" and year of first use 2012 into the table CUS (field order: CCODE, CNAME, JYEAR). Write the missing part after `INSERT INTO CUS VALUES`.**
> ✔ `("ABF218", "So Siu Ming", 2012)`: the values follow the order of the fields in the table, not the order on the form; JYEAR is an integer, so 2012 has no quotes.
> ✘ The HKEAA reported that a high proportion of candidates incorrectly used the INSERT INTO command, often misapplying the quotation marks for data values; `'2012'` is not accepted.

> ⚠ **[2024 P2A 3(c)(ii)] SQL2 changes member 00083's name to Chan Tai Man with `DELETE FROM MEMBER WHERE MID = '00083'` followed by `INSERT INTO MEMBER VALUES (…)`. Complete SQL3, which does the same: `UPDATE ____ SET ____ WHERE MID = '00083'`.**
> ✔ `UPDATE MEMBER SET MNAME = 'Chan Tai Man' WHERE MID = '00083'`. UPDATE changes only one field without re-entering the whole record; if other tables refer to the member through a foreign key, DELETE may also violate referential integrity.

> ⚠ **[2023 P2A 1(e)(ii)] Give 10 reward points to members who have referred more than 5 persons: `UPDATE ____ SET ____ = ____ WHERE MID IN (SELECT MID FROM V1 WHERE REFERRAL > 5)`.**
> ✔ `UPDATE MEMBER SET POINT = POINT + 10 WHERE MID IN (…)`.
> ✘ The HKEAA reported that weaker candidates misused a "PLUS" operator.

## 2.5 Selecting, filtering and sorting

**Sample table CAMP (summer camps)**

| CID | CNAME | DISTRICT | DAYS | FEE |
|---|---|---|---|---|
| C01 | Photography Camp | Sha Tin | 3 | 900 |
| C02 | Robotics Camp | Kwun Tong | 5 | 1500 |
| C03 | Climbing Camp | Sha Tin | 2 | 600 |
| C04 | Coding Camp | Kwun Tong | 4 | 1500 |
| C05 | Camping | Sai Kung | 2 | 450 |

| SQL | Result | Explanation |
|---|---|---|
| `SELECT CNAME, FEE FROM CAMP WHERE DISTRICT = 'Sha Tin'` | Photography Camp 900<br>Climbing Camp 600 | WHERE filters records |
| `SELECT CNAME, FEE FROM CAMP ORDER BY FEE DESC, CNAME` | Coding Camp 1500<br>Robotics Camp 1500<br>Photography Camp 900<br>Climbing Camp 600<br>Camping 450 | First by FEE descending; equal fees by CNAME ascending (ASC is the default) |
| `SELECT DISTINCT DISTRICT FROM CAMP` | Sha Tin<br>Kwun Tong<br>Sai Kung | DISTINCT removes duplicate rows |
| `SELECT CNAME, FEE / DAYS AS DAILY FROM CAMP WHERE DAYS >= 4` | Robotics Camp 300<br>Coding Camp 375 | Outputs an expression, named with AS |

The clauses always appear in the order `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY …`.

> ✔ **[2024 P2A 1(b)]** List the identity codes of staff who have entered room L502 in ascending order of TDATE: `SELECT SID FROM TRAN WHERE RID = 'L502' ORDER BY TDATE`. The HKEAA rated this "Good".

> ✔ **[2023 P2A 1(a)]** List the identity codes of Silver members with more than 20 reward points in descending order of joining date: `SELECT MID FROM MEMBER WHERE MTYPE = 'S' AND POINT > 20 ORDER BY JDATE DESC`. The HKEAA rated this "Good".

> ⚠ **[2025 P2A 5(b)(i)] List the booking records whose booking ID begins with B88, in descending order of the check-in date SD.**
> ✔ `SELECT * FROM BK WHERE BID LIKE 'B88%' ORDER BY SD DESC` (`SUBSTRING(BID, 1, 3) = 'B88'` is also accepted).
> ✘ The marking principles reject improper structure, such as `WHERE BID LIKE 'B88%' AND ORDER BY SD DESC`: ORDER BY is a separate clause and cannot follow AND.

## 2.6 Operators and expressions

**Sample table STAFF**

| SID | SNAME | DEPT | SALARY | PHONE |
|---|---|---|---|---|
| S01 | Chan Siu Ming | IT | 29000 | 91234567 |
| S02 | Lee Ka Yan | HR | 28000 | (NULL) |
| S03 | Wong Chi Hang | IT | 45000 | 62345678 |
| S04 | Ho Mei Lam | Sales | 26000 | 97778888 |
| S05 | Cheung Wai | Sales | 38000 | (NULL) |

| Category | Operator | Example | Result |
|---|---|---|---|
| Arithmetic | `+ - * /` | `SELECT SNAME, SALARY * 12 AS ANNUAL FROM STAFF WHERE NOT DEPT = 'IT'` | Lee Ka Yan 336000 and two other rows |
| Comparison | `= <> > < >= <=` | `WHERE SALARY >= 38000` | Wong Chi Hang, Cheung Wai |
| Logical | AND, OR, NOT | See below | |
| IN | Equal to any value in the list | `WHERE DEPT IN ('HR', 'Sales')` | Lee Ka Yan, Ho Mei Lam, Cheung Wai |
| BETWEEN | Between two values, **inclusive** | `WHERE SALARY BETWEEN 28000 AND 38000` | Chan Siu Ming, Lee Ka Yan, Cheung Wai |
| LIKE | `%` stands for zero or more characters; `_` for exactly one | `WHERE SNAME LIKE '_o%'` | Wong Chi Hang, Ho Mei Lam |
| IS NULL | The field is NULL | `WHERE PHONE IS NULL` | Lee Ka Yan, Cheung Wai |

**AND is evaluated before OR**:

```sql
SELECT SNAME FROM STAFF WHERE DEPT = 'IT' OR DEPT = 'Sales' AND SALARY > 30000
-- Same as DEPT = 'IT' OR (DEPT = 'Sales' AND SALARY > 30000)
-- Result: Chan Siu Ming, Wong Chi Hang, Cheung Wai

SELECT SNAME FROM STAFF WHERE (DEPT = 'IT' OR DEPT = 'Sales') AND SALARY > 30000
-- Result: Wong Chi Hang, Cheung Wai
```

- Test for NULL with `IS NULL` or `IS NOT NULL`, never `= NULL`.
- Write `<=`, `>=` and `<>`, not ≤, ≥ or ≠. The marking principles reject ≤ in place of `<=`.
- When dates are compared, a later date is greater.

> ⚠ **[2023 P2A 1(b)] List the identity codes of members, without duplication, who booked services in September 2022.**
> ✔ `SELECT DISTINCT MID FROM BOOKING WHERE BDATE BETWEEN '01/09/2022' AND '30/09/2022'`, or `MONTH(BDATE) = 9 AND YEAR(BDATE) = 2022`.
> ✘ The HKEAA reported that weaker candidates were not able to provide the correct expression of the "September 2022" condition.

> ⚠ **[2025 P2A 5(b)(ii)] List the room numbers of the rooms booked for 26-3-2025. BK records the check-in date SD and check-out date ED.**
> ✔ `SELECT RN FROM BK WHERE SD <= '26-3-2025' AND '26-3-2025' <= ED`, or `WHERE '26-3-2025' BETWEEN SD AND ED`.
> ✘ Only one of the two conditions scores one mark. The HKEAA briefing rated this part "Fair". Writing `SD = '26-3-2025'` misses rooms whose guests checked in earlier and have not yet checked out.

## 2.7 Built-in functions

**Aggregate functions** calculate one value from a group of records:

| Function | Purpose | With STAFF in section 2.6 |
|---|---|---|
| `COUNT(*)` | Number of records | 5 |
| `COUNT(field)` | Number of records where the field is **not NULL** | `COUNT(PHONE)` = 3 |
| `COUNT(DISTINCT field)` | Number of different values | `COUNT(DISTINCT DEPT)` = 3 |
| `SUM`, `AVG` | Total, average | `SUM(SALARY)` = 166000; `AVG(SALARY)` = 33200 |
| `MAX`, `MIN` | Largest, smallest; also work on text and dates | `MAX(SALARY)` = 45000 |

**String functions**

| Function | Purpose | Example | Result |
|---|---|---|---|
| `CHAR_LENGTH(s)` (`LEN`) | Number of characters | `CHAR_LENGTH('Chan Siu Ming')` | 13 |
| `SUBSTRING(s, start, length)` (`SUBSTR`, `MID`) | Extracts part of a string; the first character is position 1 | `SUBSTRING('ABF218', 1, 3)` | `'ABF'` |
| `UPPER(s)`, `LOWER(s)` | Convert to upper or lower case | `UPPER('Chan')` | `'CHAN'` |
| `TRIM(s)` | Removes leading and trailing spaces | `TRIM('  Lam ')` | `'Lam'` |
| `SPACE(n)` | Returns n spaces | `SPACE(3)` | `'   '` |

In the list, ASC returns the ASCII code of a character, CHAR (CHR) converts an ASCII code to a character, VALUE (VAL) converts a string of digits to a number, AT finds the position of a substring, INT takes the integer part and ABS the absolute value.

**Date functions**: `YEAR(d)`, `MONTH(d)` and `DAY(d)` return the year, month and day of a date, for example `WHERE YEAR(JDATE) < 2019`; `DATE(…)` returns the date part of a date-time value.

> ⚠ **[2012 Practice Paper P2A 1(c)(ii)] The first three characters of the candidate number CNUM are the school code. List all candidate names and their school codes.**
> ✔ `SELECT CNAME, SUBSTR(CNUM, 1, 3) FROM CAND`; SUBSTRING, MID or LEFT is also accepted.

## 2.8 Grouping: GROUP BY and HAVING

**Sample table DONATE (flag day records)**

| DID | CLASS | HOUSE | AMT |
|---|---|---|---|
| D1 | 4A | Red | 50 |
| D2 | 4B | Blue | 20 |
| D3 | 4A | Blue | 30 |
| D4 | 4C | Red | 100 |
| D5 | 4B | Blue | 40 |
| D6 | 4A | Red | 30 |

| SQL | Result |
|---|---|
| `SELECT CLASS, COUNT(*), SUM(AMT) FROM DONATE GROUP BY CLASS` | 4A 3 110<br>4B 2 60<br>4C 1 100 |
| `SELECT CLASS, SUM(AMT) FROM DONATE GROUP BY CLASS HAVING SUM(AMT) >= 80` | 4A 110<br>4C 100 |
| `SELECT CLASS, SUM(AMT) FROM DONATE WHERE AMT >= 30 GROUP BY CLASS` | 4A 110<br>4B 40<br>4C 100 |
| `SELECT CLASS, HOUSE, COUNT(*) FROM DONATE GROUP BY CLASS, HOUSE` | 4A Red 2<br>4A Blue 1<br>4B Blue 2<br>4C Red 1 |

**Order in which the database processes the clauses**: FROM (get the tables) → WHERE (filter records) → GROUP BY (form groups) → HAVING (filter groups) → SELECT (output fields) → ORDER BY (sort).

- **WHERE** filters individual records **before** grouping; **HAVING** filters groups **after** grouping.
- Aggregate functions cannot appear in WHERE, because grouping has not happened yet when WHERE is processed; `WHERE COUNT(*) > 1` is wrong.
- With GROUP BY, every field in SELECT must either be in GROUP BY or be inside an aggregate function. `SELECT DID, CLASS, SUM(AMT) FROM DONATE GROUP BY CLASS` is wrong: each class has several DIDs, and the database cannot decide which one to output.

> ⚠ **[2023 P2A 1(d)] List the identity codes of the fitness centres that have more than 500 booking records on 30/09/2022.**
> ✔ `SELECT C.CID FROM BOOKING B, CENTRE C WHERE C.CID = B.CID AND BDATE = '30/09/2022' GROUP BY C.CID HAVING COUNT(B.BID) > 500`. The date condition goes in WHERE (before grouping) and the count condition in HAVING (after grouping). Using BOOKING alone is also acceptable.
> ✘ The HKEAA reported that candidates demonstrated weakness in using the aggregate functions GROUP BY and HAVING.

[2023 P2A 4(b)(i)] List the number of VIP tickets sold for each show time: `SELECT CID, MTIME, COUNT(*) FROM TINFO WHERE SNO <= 10 GROUP BY CID, MTIME`.

## 2.9 Querying multiple tables

**Sample tables**

STUDENT

| SID | SNAME | CLASS |
|---|---|---|
| S1 | Chan Hiu Ming | 4A |
| S2 | Li Ka Kei | 4B |
| S3 | Wong Tsz Hin | 4A |
| S4 | Ho Wing Sze | 5C |

JOINCLUB (students' club memberships)

| SID | CID |
|---|---|
| S1 | C1 |
| S1 | C2 |
| S2 | C2 |
| S3 | C1 |

CLUB

| CID | CNAME | TID |
|---|---|---|
| C1 | Astronomy Club | T1 |
| C2 | Photography Club | T2 |
| C3 | Debating Club | T1 |

**Equi-join**: compare the keys of two tables with `=`, usually a foreign key with a primary key. There are two ways of writing it, with the same result:

```sql
-- Method 1: the join condition in WHERE
SELECT SNAME, CID FROM STUDENT, JOINCLUB
WHERE STUDENT.SID = JOINCLUB.SID

-- Method 2: INNER JOIN … ON
SELECT SNAME, CID FROM STUDENT INNER JOIN JOINCLUB
ON STUDENT.SID = JOINCLUB.SID
```

| SNAME | CID |
|---|---|
| Chan Hiu Ming | C1 |
| Chan Hiu Ming | C2 |
| Li Ka Kei | C2 |
| Wong Tsz Hin | C1 |

An equi-join outputs only records that have a match on both sides: Ho Wing Sze has joined no club and does not appear.

**Joining three tables**: each additional table needs one more join condition.

```sql
SELECT S.SNAME, C.CNAME
FROM STUDENT S, JOINCLUB J, CLUB C
WHERE S.SID = J.SID AND J.CID = C.CID AND C.CNAME = 'Photography Club'
-- Result: Chan Hiu Ming Photography Club; Li Ka Kei Photography Club
```

- The S in `STUDENT S` is an **alias**; afterwards `S.SID` can be written instead of `STUDENT.SID`.
- When two tables have a field with the same name (such as SID), write "table.field"; otherwise the database cannot tell which one is meant.
- **If the join condition is left out**, the database pairs every record of one table with every record of the other: `SELECT * FROM STUDENT, JOINCLUB` outputs 4 × 4 = 16 rows, most of them meaningless. This set of all possible combinations is the Cartesian product; SQL's CROSS JOIN produces it deliberately, which is extension content.
- When a student joins several clubs, the student's name appears several times in the join result. If only the names are needed, add DISTINCT: `SELECT DISTINCT SNAME FROM STUDENT S, JOINCLUB J WHERE S.SID = J.SID` outputs Chan Hiu Ming, Li Ka Kei and Wong Tsz Hin once each.

**Natural join** (NATURAL JOIN) performs an equi-join automatically on the fields with the same name in the two tables, and each common field appears only once in the result:

```sql
SELECT * FROM STUDENT NATURAL JOIN JOINCLUB
-- Result fields: SID, SNAME, CLASS, CID
```

A natural join works only when the joining fields have the same name. If they have different names (for example CLUB.TID and TEACHER.TCODE), or the tables share other unrelated field names, use an equi-join. NATURAL JOIN is not in the HKEAA SQL list, and an equi-join is always acceptable in an answer.

**Self-join**: join a table to itself as if it were two tables, using different aliases. For example, in EMP (EID, ENAME, BOSS), BOSS is the staff ID of the employee's supervisor:

```sql
SELECT E.ENAME, B.ENAME AS BOSSNAME
FROM EMP E, EMP B
WHERE E.BOSS = B.EID
```

E stands for the employee and B for the supervisor; an employee without a supervisor (BOSS is NULL) does not appear in the result.

> ⚠ **[2024 P2A 1(c)] STAFF, ROOM and TRAN store staff, rooms and entry records. List the names of staff members who have entered rooms with names containing "Lab".**
> ✔ `SELECT DISTINCT SNAME FROM STAFF S, ROOM R, TRAN T WHERE S.SID = T.SID AND R.RID = T.RID AND R.RNAME LIKE '%Lab%'`; two levels of IN sub-queries are also accepted. Staff names and room names are not directly related, so the three tables must be joined through TRAN.
> ✘ The HKEAA reported that weaker candidates were unable to provide the correct expression of the pattern matching condition.

> ⚠ **[2025 P2A 3(b)] CUS stores customers and ACC stores accounts (a customer may have several accounts). Write the SQL statement to find the total account balance of the customer "So Siu Ming".**
> ✔ `SELECT SUM(BAL) FROM CUS, ACC WHERE CUS.CCODE = ACC.CCODE AND CUS.CNAME = 'So Siu Ming'`. One mark each for SUM, the join condition and the name condition.
> ✘ The HKEAA reported that weaker candidates failed to apply the SUM function properly.

[Sample Paper P2 Section A 5(a)] List the names and staff IDs of employees who can drive bus route 1A, in descending order of salary: `SELECT ENAME, EMPLOYEE.EID FROM EMPLOYEE, DRIVER WHERE EMPLOYEE.EID = DRIVER.EID AND BID = '1A' ORDER BY SALARY DESC`. Both tables have EID, so SELECT must say `EMPLOYEE.EID`.

> ⚠ **[2023 P2A 1(e)(i)] REFER in MEMBER is the member ID of the referrer. What is the purpose of this statement? `CREATE VIEW V1 AS SELECT M1.MID, COUNT(M1.MID) AS REFERRAL FROM MEMBER M1, MEMBER M2 WHERE M1.MID = M2.REFER GROUP BY M1.MID`**
> ✔ To show the members who have referred others and the total number of members each has referred. The answer needs both points: "who" and "how many".
> ✘ The HKEAA reported that candidates encountered difficulties in describing the purpose of the SQL statement.

## 2.10 Outer joins

An equi-join keeps only records that match on both sides. An **outer join** also keeps the unmatched records, filling the missing side with NULL.

| Join | Keeps |
|---|---|
| `LEFT [OUTER] JOIN` | All records of the left table |
| `RIGHT [OUTER] JOIN` | All records of the right table |
| `FULL [OUTER] JOIN` | All records of both tables |

Using the tables in section 2.9:

```sql
SELECT S.SNAME, J.CID
FROM STUDENT S LEFT JOIN JOINCLUB J ON S.SID = J.SID
```

| SNAME | CID |
|---|---|
| Chan Hiu Ming | C1 |
| Chan Hiu Ming | C2 |
| Li Ka Kei | C2 |
| Wong Tsz Hin | C1 |
| Ho Wing Sze | (NULL) |

**Finding unmatched records**: after an outer join, the fields from the other table are all NULL in an unmatched record.

```sql
-- Students who have joined no club: Ho Wing Sze
SELECT S.SNAME FROM STUDENT S LEFT JOIN JOINCLUB J ON S.SID = J.SID
WHERE J.SID IS NULL

-- Clubs that no student has joined: Debating Club
SELECT C.CNAME FROM JOINCLUB J RIGHT JOIN CLUB C ON J.CID = C.CID
WHERE J.CID IS NULL
```

The same results can be obtained with the sub-queries `NOT IN` or `NOT EXISTS`; see section 2.11.

**Full outer join** example: TEACHER has Mr Lam (T1), Ms Cheung (T2) and Mr Chan (T3); in CLUB, the Chess Club has no teacher in charge (TID is NULL). `SELECT T.TNAME, C.CNAME FROM TEACHER T FULL JOIN CLUB C ON T.TID = C.TID` gives the three matched rows plus two more: "Mr Chan, NULL" and "NULL, Chess Club".

> ⚠ **[2024 P2A 1(d)] List the names of staff members who have not entered any rooms: `SELECT SNAME FROM ____ LEFT JOIN ____ ON ____ WHERE ____`**
> ✔ `SELECT SNAME FROM STAFF S LEFT JOIN TRAN T ON S.SID = T.SID WHERE T.SID IS NULL`; the last condition may also use T.RID, T.TID or T.TDATE.
> ✘ The HKEAA reported that candidates demonstrated weakness in understanding the outer join operation and the NULL condition.

> ⚠ **[2023 P2A 1(c)] List the identity codes and joining dates of members who have no booking records.**
> ✔ `SELECT MID, JDATE FROM MEMBER WHERE MID NOT IN (SELECT MID FROM BOOKING)`, or an outer join.
> ✘ The HKEAA reported that less than half of the candidates provided the condition for "no booking records" properly.

[Sample Paper P2 Section A 5(b)] List the employees who cannot drive any bus route: `SELECT EMPLOYEE.EID, ENAME FROM EMPLOYEE LEFT OUTER JOIN DRIVER ON EMPLOYEE.EID = DRIVER.EID WHERE DRIVER.BID IS NULL`.

## 2.11 Sub-queries

A **sub-query** is a SELECT statement placed inside another SQL statement and enclosed in brackets. The curriculum requires one sub-level only: a sub-query does not contain another sub-query.

**Sample tables**

PRODUCT

| PID | PNAME | CATEGORY | PRICE |
|---|---|---|---|
| P1 | Notebook | Stationery | 25 |
| P2 | Pen | Stationery | 8 |
| P3 | Calculator | Electronics | 160 |
| P4 | Earphones | Electronics | 299 |
| P5 | Water bottle | Living | 60 |

ORDERS

| OID | PID | QTY |
|---|---|---|
| O1 | P1 | 10 |
| O2 | P3 | 2 |
| O3 | P1 | 5 |
| O4 | P4 | 1 |
| O5 | P2 | 30 |
| O6 | P3 | 1 |

| Use | SQL | Result |
|---|---|---|
| IN: in the sub-query result | `SELECT PNAME FROM PRODUCT WHERE PID IN (SELECT PID FROM ORDERS)` | Notebook, Pen, Calculator, Earphones |
| NOT IN: not in the sub-query result | `SELECT PNAME FROM PRODUCT WHERE PID NOT IN (SELECT PID FROM ORDERS)` | Water bottle |
| Comparison with an aggregate | `SELECT PNAME FROM PRODUCT WHERE PRICE = (SELECT MAX(PRICE) FROM PRODUCT)` | Earphones |
| Above the average | `SELECT PNAME FROM PRODUCT WHERE PRICE > (SELECT AVG(PRICE) FROM PRODUCT)` | Calculator, Earphones (average price 110.4) |
| Grouping in the sub-query | `SELECT PNAME FROM PRODUCT WHERE PID IN (SELECT PID FROM ORDERS GROUP BY PID HAVING COUNT(*) > 1)` | Notebook, Calculator |

- A sub-query used with IN may return **one field only**.
- In a comparison with `=`, `>` and so on, the sub-query must return **one value only**, usually the result of an aggregate function.
- `WHERE PRICE = MAX(PRICE)` is **wrong**: an aggregate function cannot be placed directly in WHERE and must be written as a sub-query.

**ANY and ALL**: compare with a set of values returned by a sub-query.

| Form | Meaning | Example (electronic products cost 160 and 299) | Result |
|---|---|---|---|
| `> ANY (…)` | Greater than **at least one** value, i.e. greater than the minimum | `PRICE < ANY (SELECT PRICE FROM PRODUCT WHERE CATEGORY = 'Electronics')`, i.e. less than 299 | Notebook, Pen, Calculator, Water bottle |
| `> ALL (…)` | Greater than **every** value, i.e. greater than the maximum | `PRICE < ALL (SELECT PRICE FROM PRODUCT WHERE CATEGORY = 'Electronics')`, i.e. less than 160 | Notebook, Pen, Water bottle |

`= ANY (…)` does the same as `IN (…)`.

**EXISTS and NOT EXISTS**: check whether a sub-query returns any record. The sub-query usually refers to a field of the outer query and runs once for each record the outer query processes.

```sql
-- Products with at least one order of 10 or more: Notebook, Pen
SELECT PNAME FROM PRODUCT P
WHERE EXISTS (SELECT * FROM ORDERS O WHERE O.PID = P.PID AND O.QTY >= 10)

-- Products that have never been ordered: Water bottle
SELECT PNAME FROM PRODUCT P
WHERE NOT EXISTS (SELECT * FROM ORDERS O WHERE O.PID = P.PID)
```

**Sub-queries and joins**: many queries can be written either way, and functionally equivalent methods score the same marks. But to output fields from several tables you need a join, and to compare with an aggregate result (such as the highest price) you need a sub-query.

> ⚠ **[2025 P2A 5(b)(iii)] List the identity codes of guests who have booked the hotel room with the highest room price. RM stores rooms and prices; BK stores bookings.**
> ✔ `SELECT DISTINCT GID FROM RM A, BK WHERE A.RN = BK.RN AND A.PRICE IN (SELECT MAX(PRICE) FROM RM)` (`IN` may be written as `=`).
> ✘ The HKEAA reported that more than half of the candidates encountered difficulties with sub-queries and the MAX aggregate function; the marking principles reject `WHERE PRICE = MAX(PRICE)`.

> ⚠ **[2024 P2A 1(e)] Some rooms have more than 100 entry records in TRAN. List the room types of these rooms.**
> ✔ `SELECT DISTINCT RTYPE FROM ROOM WHERE RID IN (SELECT RID FROM TRAN GROUP BY RID HAVING COUNT(*) > 100)`. The marking scheme gives one mark each for the join or sub-query, GROUP BY with HAVING, and overall correctness.
> ✘ The HKEAA reported that candidates generally had difficulties in providing proper sub-queries and using GROUP BY and HAVING correctly.

> ⚠ **[2025 P2A 2(b)] T1 and T2 have the same structure (CID, AID, AMT). After `UPDATE T1 SET T1.AMT = 0 WHERE T1.AMT > 0 AND (EXISTS (SELECT * FROM T2 WHERE T1.CID = T2.CID AND T2.AMT = 0))` is executed, list the updated record(s) in T1.**
> ✔ Check each record of T1: AMT must be greater than 0, and T2 must have at least one record with the same CID and AMT 0. The answer must give the updated record and its new AMT (0). The HKEAA rated this "Good".

## 2.12 Set operations

Set operations combine the results of two SELECT statements. The two SELECT statements must return **the same number of fields**, and the corresponding fields must have compatible data types.

**Sample tables**: SWIM records the students in the swimming gala, S1, S2 and S3; RUN records those in the athletics meet, S2, S4, S3 and S5.

| Operation | Meaning | Result of `SELECT SID FROM SWIM … SELECT SID FROM RUN` |
|---|---|---|
| `UNION` | Union, **removing duplicate** rows | S1, S2, S3, S4, S5 (5 rows) |
| `UNION ALL` | Union, keeping duplicate rows | 7 rows |
| `INTERSECT` | Intersection: rows in both results | S2, S3 |
| `MINUS` | Difference: rows in the first result but not in the second | S1 |

The order of the two statements in MINUS matters: `SELECT SID FROM RUN MINUS SELECT SID FROM SWIM` gives S4 and S5.

**Duplicate rows means all fields are the same.** When several fields are selected, UNION removes rows as duplicates, and INTERSECT keeps them, only if every field has the same value.

> ⚠ **[2025 P2A 2(a)] T1 and T2 each have four records with the same structure; exactly one record is the same in both. How many records are listed after `SELECT * FROM T1 UNION SELECT CID, AID, AMT FROM T2`?**
> ✔ 7. By default UNION keeps only distinct rows: 4 + 4 − 1 = 7.
> ✘ The HKEAA rated this "Poor": nearly all candidates were unable to use the UNION command, and weaker candidates did not understand that UNION selects only distinct values by default.

[2024 P2A 4(b)] The district tables D1 and D2 each have 5 records, and 3 student IDs appear in both. `SELECT SID FROM D1 UNION SELECT SID FROM D2` outputs 7 records; with UNION ALL it outputs 10.

> ⚠ **[2025 P2A 5(c)] Briefly describe the use of `SELECT RN FROM RM MINUS SELECT RN FROM BK`.**
> ✔ To find the hotel rooms that have no booking records.
> ✘ The HKEAA reported that weaker candidates confused MINUS and MIN.

> ⚠ **[2024 P2A 1(g)] What is the purpose of this statement? `SELECT SID FROM STAFF S WHERE DEPT = 'Physics' AND EXISTS (SELECT S.SID FROM TRAN T WHERE S.SID = T.SID) MINUS SELECT SID FROM TRAN WHERE TDATE = '28/7/2023'`**
> ✔ To list the staff of the Physics department who have entered rooms but did not enter any room on 28/7/2023. The answer must include both points: "Physics department" and "did not enter on that date". The HKEAA rated this "Good".

[2023 P2A 1(e)(iii)] List the identity codes of members who have not referred anyone: `SELECT MID FROM MEMBER MINUS SELECT MID FROM V1` (V1 is the view in section 2.9, which contains only members who have referred others).

## 2.13 Views

A **view** is a virtual table defined by a SELECT statement. A view stores no data itself; each time it is used, it takes the latest data from the underlying tables according to its definition.

```sql
CREATE VIEW SALES AS
SELECT PID, SUM(QTY) AS TOTALQTY FROM ORDERS GROUP BY PID

-- A view can be queried and joined like a table: find the best-selling product
SELECT PNAME, TOTALQTY FROM PRODUCT, SALES
WHERE PRODUCT.PID = SALES.PID
AND TOTALQTY = (SELECT MAX(TOTALQTY) FROM SALES)
-- Result: Pen 30

DROP VIEW SALES   -- removes the view; the data in the tables are not affected
```

(The data come from ORDERS in section 2.11.)

**Benefits of views**

- They simplify complex queries: joins and grouping are written once in the view and need not be repeated.
- They allow grouping first and comparing the results afterwards, such as finding each product's total sales and then the maximum in the example above.
- They protect data privacy: users access only the view, which hides sensitive fields or other users' records; see section 3.12 of [Topic c](c.html).

Modifying data through a view has many restrictions, so views are generally treated as read-only.

> ⚠ **[Sample Paper P2 Section A 5(d)] Views V1 and V2 calculate the average salaries (AVG1, AVG2) of drivers who started work before and on or after 1/1/2005. (i) What is the purpose of V1? (ii) Write an SQL statement to find AVG1 − AVG2.**
> ✔ (i) To find the average salary of drivers who joined the company before 1/1/2005; (ii) `SELECT AVG1 - AVG2 FROM V1, V2`. Each view has only one row, so listing both in FROM lets the subtraction be done in one row.

[2012 Practice Paper P2A 3(e)] List the name of the district with the most restaurants rated above 3: first create the view `CREATE VIEW DISTRICT_VIEW AS SELECT DISTRICT, COUNT(*) AS CNT FROM RES WHERE RATING > 3 GROUP BY DISTRICT`, then `SELECT DISTNAME FROM DISTRICT_VIEW, DIST WHERE CNT = (SELECT MAX(CNT) FROM DISTRICT_VIEW) AND DIST.DISTRICT = DISTRICT_VIEW.DISTRICT`.

## 2.14 Common SQL mistakes

Compiled from the 2025 Paper 2 Section A marking principles and the HKEAA comments on candidates' performance in 2023 to 2025:

- ✘ Numbers in quotes, such as `JYEAR = '2012'`, while quotes are missing around text and dates.
- ✘ ≤, ≥ or ≠ in place of `<=`, `>=` or `<>`.
- ✘ Improper structure, such as `… LIKE 'B88%' AND ORDER BY SD DESC`.
- ✘ Aggregate functions in WHERE, such as `WHERE PRICE = MAX(PRICE)` or `WHERE COUNT(*) > 1`; use a sub-query or HAVING instead.
- ✘ Testing for NULL with `= NULL` instead of `IS NULL`.
- ✘ Not knowing that UNION removes duplicate rows; confusing MINUS with MIN.
- ✘ Leaving out SUM when a total is needed, so that individual records are listed.
- ✘ Vague descriptions of the purpose of an SQL statement: state every condition, such as "Physics department" and "did not enter on that date".
- ✔ Functionally equivalent methods are accepted, such as a join instead of a sub-query, `LIKE 'B88*'` instead of `LIKE 'B88%'`, and redundant joins that do not change the result; very minor mistakes are also accepted.

**Practical suggestion**: in any SQL system (such as MySQL or SQLite), create the sample tables on this page, run each statement and compare the output with this page; then change the HKEAA style to that system's style (for example MINUS to EXCEPT, dates to `'2025-03-26'`) and note the differences.

## 2.15 Self-test

<details><summary>1. Write SQL to add a field EMAIL of at most 40 characters to the table CUST.</summary>

`ALTER TABLE CUST ADD EMAIL VARCHAR(40)`
</details>

<details><summary>2. What is the difference between <code>DELETE FROM CUST</code> and <code>DROP TABLE CUST</code>?</summary>

`DELETE FROM CUST` deletes all records in the table but the table structure remains; `DROP TABLE CUST` removes the whole table together with its structure.
</details>

<details><summary>3. The table NURSE has NID, NAME and PT (pay point). Write SQL to increase by 1 the pay point of every nurse whose pay point is below 18.</summary>

`UPDATE NURSE SET PT = PT + 1 WHERE PT < 18`
</details>

<details><summary>4. Using CAMP in section 2.5, write SQL to list the names of camps whose fee is from 500 to 1000 inclusive, in descending order of days. Give the result.</summary>

`SELECT CNAME FROM CAMP WHERE FEE BETWEEN 500 AND 1000 ORDER BY DAYS DESC`. Result: Photography Camp (3 days), Climbing Camp (2 days).
</details>

<details><summary>5. Using STAFF in section 2.6, what is the result of <code>SELECT COUNT(*), COUNT(PHONE) FROM STAFF</code>? Why are the two numbers different?</summary>

5 and 3. `COUNT(*)` counts all records; `COUNT(PHONE)` counts only records whose PHONE is not NULL, and two staff members have a NULL PHONE.
</details>

<details><summary>6. Find and correct the error: <code>SELECT CLASS, SUM(AMT) FROM DONATE WHERE SUM(AMT) > 80 GROUP BY CLASS</code></summary>

An aggregate function cannot be placed in WHERE. Correct version: `SELECT CLASS, SUM(AMT) FROM DONATE GROUP BY CLASS HAVING SUM(AMT) > 80`.
</details>

<details><summary>7. Using the tables in section 2.9, write SQL to list the names and classes of students who have joined the Astronomy Club.</summary>

`SELECT SNAME, CLASS FROM STUDENT S, JOINCLUB J, CLUB C WHERE S.SID = J.SID AND J.CID = C.CID AND C.CNAME = 'Astronomy Club'`. Result: Chan Hiu Ming 4A, Wong Tsz Hin 4A.
</details>

<details><summary>8. How many rows does <code>SELECT * FROM STUDENT, JOINCLUB</code> output? Why?</summary>

16 rows. There is no join condition, so each of the 4 records of STUDENT is paired with each of the 4 records of JOINCLUB: 4 × 4 = 16.
</details>

<details><summary>9. Write SQL in two ways to list the names of students who have joined no club.</summary>

Outer join: `SELECT SNAME FROM STUDENT S LEFT JOIN JOINCLUB J ON S.SID = J.SID WHERE J.SID IS NULL`. Sub-query: `SELECT SNAME FROM STUDENT WHERE SID NOT IN (SELECT SID FROM JOINCLUB)`.
</details>

<details><summary>10. Using the tables in section 2.11, write SQL to list the name of the cheapest product. Why can it not be written as <code>WHERE PRICE = MIN(PRICE)</code>?</summary>

`SELECT PNAME FROM PRODUCT WHERE PRICE = (SELECT MIN(PRICE) FROM PRODUCT)`; the result is Pen. An aggregate function cannot be placed directly in WHERE: MIN has not been calculated when WHERE is processed, so a sub-query must find the lowest price first.
</details>

<details><summary>11. SWIM has 3 student IDs and RUN has 4, of which 2 are the same. How many rows do <code>UNION</code>, <code>UNION ALL</code> and <code>INTERSECT</code> each output?</summary>

UNION: 3 + 4 − 2 = 5 rows; UNION ALL: 7 rows; INTERSECT: 2 rows.
</details>

<details><summary>12. State two benefits of using views.</summary>

They simplify complex queries, so joins and grouping need not be rewritten each time; they allow calculating first and comparing afterwards (such as finding each group's total and then the maximum); users see only the fields and records in the view, which protects data privacy. (Any two)
</details>
