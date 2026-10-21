## 1.1 Curriculum requirements

Describe the basic concepts of relational databases, including entity, relationship, attribute, domain, index, keys (primary key, foreign key and candidate key) and integrity (entity integrity, referential integrity and domain integrity), and identify these basic elements in examples taken from everyday applications; create a simple relational database, organising data differently but sensibly and establishing the required relationships among the tables; describe the purposes of rollback.

This topic extends topic b "Data Organisation and Data Control" of Module A. For the hierarchy of data, the basic requirements of a primary key and data validation, see sections 2.3 to 2.8 of [Module A Topic b](../core-a/b.html); they are not repeated here.

## 1.2 Databases and relational databases

A **database** is an organised collection of related data. A **database management system** (DBMS) is the software that creates, maintains and gives access to a database; it controls who may access the data, checks that data follow the rules, and backs up and restores the data. A **relational database** stores data in several **tables** linked by keys.

| Term | Meaning | Example (a student table) |
|---|---|---|
| Table | A collection of records about one kind of thing, arranged in rows and columns | STUDENT |
| Record | One row of a table, describing one instance | All the data of student S2401 |
| Field | One column of a table, describing one characteristic | NAME, DOB |

HKEAA papers sometimes say "database table" where the C&A Guide says "table"; the two terms mean the same thing.

**Why use several tables instead of putting everything in one?** Take a school library. If students' names and classes are stored in the same table as every loan, the name and class are stored again each time a student borrows a book. With separate STUDENT and LOAN tables linked by the student ID, each student's details are stored only once:

- data redundancy is reduced and storage space is saved;
- a change to a student's details is made in one place only, so the data stay consistent;
- a student who has never borrowed a book can still have a record.

For data redundancy and normalisation in detail, see sections 3.7 to 3.9 of [Topic c](c.html).

## 1.3 Entities, attributes, relationships and domains

| Concept | Meaning | Example (a library system) |
|---|---|---|
| Entity | A person, object, place or event about which data are stored; entities of the same kind form a table | Member, book, loan |
| Instance | One individual entity, i.e. one record in the table | The member Chan Tai Man |
| Attribute | A characteristic of an entity, i.e. a field in the table | Member ID, name, phone number |
| Relationship | An association between entities | A member "borrows" books |
| Domain | All the acceptable values of an attribute | Member type can only be A (adult) or J (junior); a month can only be 1 to 12 |

An entity may be a physical thing (a student, a computer) or a concept or event (an order, a payment, an exam result).

<figure class="erd">
<svg viewBox="0 0 640 200" role="img" aria-label="The entity Student and its attributes"><line class="link" x1="370.3" y1="127" x2="444.6" y2="159.5"/><line class="link" x1="269.7" y1="127" x2="195.4" y2="159.5"/><line class="link" x1="378" y1="87" x2="487.7" y2="53.1"/><line class="link" x1="320" y1="83" x2="320" y2="45"/><line class="link" x1="262" y1="87" x2="152.3" y2="53.1"/><rect class="shape" x="262" y="83" width="116" height="44"/><text x="320" y="110">Student</text><ellipse class="shape" cx="110" cy="40" rx="56.0" ry="20.0"/><text x="110" y="45">Student ID</text><line class="link" x1="66" y1="49" x2="154" y2="49"/><ellipse class="shape" cx="320" cy="25" rx="56.0" ry="20.0"/><text x="320" y="30">Name</text><ellipse class="shape" cx="530" cy="40" rx="56.0" ry="20.0"/><text x="530" y="45">Birth date</text><ellipse class="shape" cx="160" cy="175" rx="56.0" ry="20.0"/><text x="160" y="180">Class</text><ellipse class="shape" cx="480" cy="175" rx="56.0" ry="20.0"/><text x="480" y="180">Class no.</text></svg>
<figcaption>The entity Student and its attributes. The key attribute Student ID is underlined.</figcaption>
</figure>

**NULL** means that a field has no value or the value is unknown. It is different from 0 and from an empty string. For example, the return date of a loan is NULL until the book is returned.

**Identifying the basic elements in everyday applications**: when analysing a system, first find the "things" to be recorded (entities), then list the data to be kept about each (attributes), and then the associations between them (relationships). For example, an online shopping platform has three entities: Customer, Product and Order. The attributes of Order include the order number, order date and quantity. The relationships include a customer "places" orders and an order "contains" products.

## 1.4 Keys

| Key | Meaning | Example |
|---|---|---|
| Candidate key | A field, or a minimal combination of fields, that uniquely identifies each record; a table may have several | Staff ID and HKID number in a staff table |
| Primary key | The candidate key chosen to identify records; its values must be unique and not null | Staff ID |
| Composite key | A primary key made up of two or more fields | Member ID + Book ID + Loan date in a loan table |
| Foreign key | A field in one table that refers to the primary key of another table, linking the two tables | Member ID in the loan table, referring to Member ID in the member table |

**Choosing the primary key**: from the candidate keys, choose the one with the fewest fields, whose values do not change and which is not sensitive personal data. An HKID number is unique, but it is sensitive personal data and some people (such as non-local students) may not have one, so it is generally not suitable. A name may be repeated, so it cannot be a primary key.

**A foreign key may refer to the same table.** For example, the REFER field in a member table stores the member ID of the person who referred the member [2023 P2A 1], and the LEADER field in a student table stores the student ID of the group leader [2024 P2A 4]. A foreign key may be NULL (for example, a member with no referrer), but when it is not NULL it must be an existing primary key value.

> ⚠ **[2024 P2A 1(a)] STAFF has SID (staff ID), HKID, SNAME (name) and DEPT (department); the primary key is SID. State a candidate key other than SID.**
> ✔ HKID. The HKEAA rated this "Excellent": nearly all candidates identified the correct candidate key. SNAME is not acceptable because names may be repeated.

> ⚠ **[2012 Practice Paper P2A 1(a)(ii)] The candidate table CAND has CNUM (candidate number), CNAME (name) and DOB (date of birth). Which can be a candidate key: CNUM or CNAME + DOB?**
> ✔ CNUM, because it is unique. CNAME + DOB is not guaranteed to be unique: two candidates may have the same name and the same date of birth.

**A composite key must contain enough fields.** If a member may borrow the same book on different days, Member ID + Book ID can repeat, so the loan date must be added. The marking schemes join the fields of a composite key with "+", for example `MID + BID + BDATE`.

## 1.5 Data types

When designing a table, choose a data type and length for each field. The data types commonly used in HKEAA questions are:

| Data type | SQL | Use | Example |
|---|---|---|---|
| Character | `CHAR(n)`, `VARCHAR(n)` | Names, codes, phone numbers and other data not used in calculation | Student ID, HKID |
| Integer | `INTEGER` | Whole numbers used in calculation | Quantity, year |
| Numeric (real) | `NUMERIC`, `REAL` | Numbers with decimals | Price |
| Date | `DATE` | Dates, which can then be compared, sorted and used in calculation | Date of birth |
| Boolean | `BOOLEAN` | Only two values | Paid or not |

`CHAR(n)` has a fixed length and `VARCHAR(n)` a variable length; in both, n is the maximum number of characters.

**Use the character type for codes.** Student IDs and customer IDs may begin with 0 (for example, 00018) or contain letters, and they are not used in calculation. With an integer type, the leading zeros would be lost.

> ⚠ **[2025 P2A 5(a)] In a booking table, an example of the guest ID GID is 00018. State the data type of GID. Explain briefly.**
> ✔ Character, because the guest ID contains leading zeros.
> ✘ "Character" without an explanation is not accepted. In a similar question [2024 P2A 4(a)], weaker candidates were unable to recognise the need to use the character type to handle leading zeros.

**Use a numeric type for values used in calculation.** Marks and quantities, for example, are used to find averages and totals, so they should be integer or numeric; this also ensures that only numbers can be entered.

## 1.6 Indexes

An **index** is a separate sorted list that the database builds for one or more fields, recording where each value is found in the table, much like the index at the back of a book.

| | Explanation |
|---|---|
| Benefit | Searching, filtering, sorting and joining on the indexed fields are faster, because the database does not have to check every record |
| Cost | The index takes extra storage space; every insertion, deletion or update must also update the index, so these operations become slower |
| Fields suitable for indexing | Fields often used in WHERE conditions, ORDER BY or joins, such as primary keys and foreign keys |

SQL for creating and dropping an index:

```sql
CREATE INDEX SHOWTIME ON TINFO (CID, MTIME)
DROP INDEX SHOWTIME ON TINFO
```

> ⚠ **[2023 P2A 4(b)(ii), (iii)] Create an index SHOWTIME on CID and MTIME for TINFO, and give a benefit of using it.**
> ✔ `CREATE INDEX SHOWTIME ON TINFO (CID, MTIME)`; searching is more efficient and takes a shorter time.
> ✘ The HKEAA reported that only about a third of the candidates were able to provide the correct INDEX statement.

> ⚠ **[2024 P2A 3(c)(i)] `SELECT MNAME, SEX, DOB FROM MEMBER WHERE DOB > '1/1/1988' ORDER BY MNAME`. Choose two of MNAME, SEX and DOB for an index MINDEX that gives this statement the best performance.**
> ✔ `CREATE INDEX MINDEX ON MEMBER (DOB, MNAME)`: first DOB, used for filtering in WHERE, then MNAME, used for sorting in ORDER BY.
> ✘ `(MNAME, DOB)` scores only one mark. The HKEAA reported that candidates in general were not familiar with the order of attributes in creating an index.

> ⚠ **[2024 P2A 3(c)(iii)] MID is indexed. Why will changing member 00083's name to Chan Tai Man by "DELETE, then INSERT" rebuild the index?**
> ✔ Because the method involves deleting and inserting records, the database must remove the old record from the index and add the new one; an UPDATE that changes only MNAME does not affect the index on MID. The HKEAA reported that weaker candidates were unable to give a good explanation.

## 1.7 Data integrity

**Data integrity** means that the data in a database are accurate, consistent and valid. A relational database has three integrity rules:

| Integrity | Rule | Example of a violation | Enforced by |
|---|---|---|---|
| Entity integrity | The primary key of every record must be unique and not null | Inserting a record whose staff ID already exists; leaving the primary key empty | `PRIMARY KEY` |
| Referential integrity | A foreign key value must be an existing primary key value in the table it refers to (or NULL) | A loan record whose member ID does not exist in the member table; deleting a member who still has loan records | `FOREIGN KEY … REFERENCES …` |
| Domain integrity | A field value must belong to the field's domain: data type, length, range and format must be correct | The date 30/2/2022; a mark of -5; month 13 | Data types, `NOT NULL`, `CHECK`, `UNIQUE` |

`NOT NULL` means that a field cannot be empty; `UNIQUE` means that its values cannot be repeated. `CHECK` can restrict a range, for example `CHECK (MARK BETWEEN 0 AND 100)`. It is not in the HKEAA SQL list, so in an answer you may describe it in words as a "range check".

> ⚠ **[2024 P2A 4(c)] The primary key of D1 is SID; LEADER is a foreign key referring to SID of the same table. Each new record below causes an integrity problem. State the problem and explain. (i) SID 012345 (already exists); (ii) registration date 30/2/2022; (iii) LEADER 023456 (no such student in the table).**
> ✔ (i) Entity integrity: SID is the primary key and 012345 is repeated in D1. (ii) Domain integrity: the date is invalid, out of range. (iii) Referential integrity: the leader's identity code does not exist in D1. In each part, state the type of integrity first, then the reason.
> ✘ The HKEAA reported that a high proportion of candidates answered one or two parts correctly but had difficulties in distinguishing the different types of integrity problems clearly.

> ⚠ **[2023 P2A 2(b)] Give a suitable database constraint for each invalid input: 9 entered for PREF1 (priority 1 to 3); "YY22" entered for YR (integer); a null value for SNO (student ID).**
> ✔ PREF1: data range; YR: data type; SNO: primary key / not null.
> ✘ The HKEAA reported that a very high proportion of candidates had difficulties in providing the constraint for SNO, and weaker candidates incorrectly gave "data format" as a constraint.

> ⚠ **[2025 P2A 5(d)] `INSERT INTO BK VALUES ("B88332211", "R0068", "12345", "15-8-2025", "12-8-2025")`; the last two values are the check-in and check-out dates. Why does this statement cause an integrity problem?**
> ✔ The check-in date is later than the check-out date, which is invalid. The HKEAA rated this "Good".

[adapted from 2025 Mock P2A Q2] DEPTID in the employee table EMP refers to the department table DEPT. If a department that still has employees is deleted, those employees' DEPTID would refer to a department that does not exist. This violates referential integrity, so the database refuses the deletion.

Some DBMSs allow `ON DELETE CASCADE` on a foreign key: when the referenced record is deleted, the records referring to it are deleted automatically. This is extension content.

## 1.8 Creating a simple relational database

`CREATE TABLE` defines the fields, data types and constraints of a table:

```sql
CREATE TABLE MEMBER (
  MID    CHAR(6) PRIMARY KEY,
  MNAME  VARCHAR(40) NOT NULL,
  MTYPE  CHAR(1),
  JDATE  DATE
)

CREATE TABLE LOAN (
  MID    CHAR(6),
  BID    CHAR(8),
  LDATE  DATE,
  RDATE  DATE,
  PRIMARY KEY (MID, BID, LDATE),
  FOREIGN KEY (MID) REFERENCES MEMBER (MID),
  FOREIGN KEY (BID) REFERENCES BOOK (BID)
)
```

- A single-field primary key can be written after the field; a composite key needs a separate line, `PRIMARY KEY (field1, field2, …)`.
- The referenced tables (such as MEMBER and BOOK) must be created before the tables that refer to them.
- A field without `NOT NULL` may be empty, for example RDATE before the book is returned.

> ⚠ **[Sample Paper P2 Section A 2(a)] `CREATE TABLE TRAN (TRANID CHAR(7) ____, TYPE INTEGER, SIZE INTEGER)`. Fill in the blank so that two records with the same transaction ID cannot be entered into TRAN.**
> ✔ `UNIQUE` or `PRIMARY KEY`. In [2012 Practice Paper P2A 1(a)(i)], which asks for the CREATE TABLE statement of a candidate table, the marking scheme also accepts either keyword.

**Organising data differently but sensibly**: the same data can be designed in more than one way. For example, locker allocation can be recorded by adding the locker ID to the student table, or by adding the student ID to the locker table. Both are sensible; the choice depends on which side changes more often and which side may be empty. After the data are split into several tables, foreign keys establish the relationships among them. For converting ER diagrams to tables, see section 3.11 of [Topic c](c.html).

## 1.9 Transactions and rollback

A **transaction** is a group of database operations that must all be completed or not done at all. For example, an online transfer has two steps: "deduct from account A" and "add to account B". If the system fails after the deduction and before the deposit, the money simply disappears.

| Term | Function |
|---|---|
| Commit | After all the steps of a transaction succeed, the changes are written to the database permanently |
| Rollback | When an error occurs or the transaction is cancelled before it is committed, the changes already made are undone and the database returns to its state before the transaction |

**Purposes of rollback**:

- when an error occurs during a transaction (a system failure, a violation of an integrity rule, cancellation by the user), the completed part is undone so that the database is not left with half-finished, incorrect data, keeping the data consistent;
- during database development and testing, changes made in testing can be undone.

**Rollback and backup are different.** Rollback can undo only transactions that have **not yet been committed**. Committed data damaged by hardware failure, accidental deletion or ransomware must be restored from a **backup**. For example, if a teacher wrongly deducted ten marks from the whole class and the change has been committed, rollback no longer applies; the marks must be corrected with UPDATE or restored from a backup.

> ⚠ **[2025 P2A 1(b)] Describe a benefit of enabling the rollback in the database management system.**
> ✔ When errors occur during a transaction (especially when one transaction contains several operations), the database can be restored to its previous state; or, during database development, changes made in testing can be undone.
> ✘ The HKEAA reported that candidates were unfamiliar with the functions of rollback in a DBMS, and weaker candidates failed to articulate any benefit.

> ⚠ **[Sample Paper P2 Section A 2(b)(ii)] After a transaction record is entered for an online shoe shop, the shoes are found to be out of stock and the transaction is cancelled. What operation should be performed on the database? Describe its purpose briefly.**
> ✔ Rollback: the record just inserted is undone and the database returns to its previous state, keeping the data consistent.

`COMMIT` and `ROLLBACK` are not in the HKEAA SQL list. The questions ask you to describe the purpose of rollback, not to write the commands.

**Practical suggestion**: in any SQL system (such as MySQL or SQLite), create the MEMBER and LOAN tables on this page. Try entering a duplicate primary key and a member ID that does not exist, and watch how the database rejects data that violate integrity. MySQL dates must be written as `'2025-03-26'`, unlike the `'26-3-2025'` style common in HKEAA papers.

## 1.10 Self-test

<details><summary>1. Explain "entity" and "attribute", and give an example of each from a school library system.</summary>

An entity is a person, object or event about which data are stored, such as a member or a book. An attribute is a characteristic of an entity, such as a member's name or a book's title.
</details>

<details><summary>2. What is a "domain"? Give an example.</summary>

A domain is all the acceptable values of an attribute. For example, the domain of an exam mark is the integers from 0 to 100; sex can only be M or F.
</details>

<details><summary>3. A member table has member ID, email address, name and phone number. State two candidate keys, and explain what to consider when choosing the primary key.</summary>

Candidate keys: member ID and email address. The primary key should be unique, never null, rarely changed, not sensitive and have the fewest fields, so member ID is the better choice. (A phone number may be shared by a family and names may be repeated, so neither is a suitable candidate key.)
</details>

<details><summary>4. The loan table LOAN has MID, BID and LDATE. Why must the primary key be MID + BID + LDATE rather than MID + BID?</summary>

A member may borrow the same book on different days, so MID + BID can repeat and cannot uniquely identify a record; adding the loan date makes it unique.
</details>

<details><summary>5. An example of a staff ID is 00057. Why should the character type be used instead of an integer type?</summary>

The staff ID has leading zeros; with an integer type it would become 57 and the leading zeros would be lost. Also, the ID is not used in calculation.
</details>

<details><summary>6. State one benefit and one drawback of creating an index.</summary>

Benefit: searching, filtering or sorting on the indexed fields is faster. Drawback: it takes extra storage space; inserting, deleting and updating records are slower because the index must also be updated.
</details>

<details><summary>7. Which type of integrity does each case violate? (a) A new order record has a customer ID that does not exist in the customer table; (b) two student records have the same student ID; (c) a date of birth of 31/4/2010.</summary>

(a) Referential integrity; (b) entity integrity; (c) domain integrity.
</details>

<details><summary>8. Complete the SQL so that DEPTID refers to DEPTID of the DEPT table: <code>CREATE TABLE EMP (EMPID CHAR(5) PRIMARY KEY, DEPTID CHAR(5), ____ )</code></summary>

`FOREIGN KEY (DEPTID) REFERENCES DEPT (DEPTID)`
</details>

<details><summary>9. Can a foreign key be NULL? Give an example.</summary>

Yes. For example, REFER (the referrer's ID) in a member table refers to the member ID of the same table; for a member without a referrer, REFER is NULL. Only when a foreign key is not NULL must it be an existing primary key value.
</details>

<details><summary>10. What is a transaction? Give an example to show why rollback is needed.</summary>

A transaction is a group of operations that must all be completed or not done at all. For example, in a transfer the money has been deducted from account A, but the system fails while adding it to account B; the transaction is rolled back, the deduction is undone and the database returns to its state before the transfer.
</details>

<details><summary>11. A company's files are encrypted by ransomware. Should rollback or restoring from backup be used? Why?</summary>

Restoring from backup. Rollback can undo only uncommitted transactions; the encrypted data were committed long ago and can only be restored from a backup made before the attack.
</details>

<details><summary>12. Why does a relational database split data into several tables instead of keeping them in one large table? Give two reasons.</summary>

It reduces data redundancy and saves storage space; a change is made in one place only, so the data stay consistent; one kind of data (such as members who have never borrowed a book) can be stored on its own. (Any two)
</details>
