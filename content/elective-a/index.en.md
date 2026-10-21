> For: HKDSE Information and Communication Technology, new curriculum (examinations from 2025 onwards), Elective Part
> Sources: CDC–HKEAA *ICT Curriculum and Assessment Guide*; HKEAA exam briefing materials and comments on candidates' performance 2023–2025; the 2025 Sample Paper; the 2012 Practice Paper; past papers and marking schemes; the HKACE 2025 and 2026 mock examinations
> Labels: [2025 P2A 5(b)(iii)] means 2025 HKDSE Paper 2 Section A Question 5(b)(iii); [Sample Paper P2 Section A 2(a)] means Sample Paper, Paper 2 Section A Question 2(a); "⚠" marks a common mistake reported by the HKEAA; "✔" marks a high-scoring answer
> The 2023 and 2024 Paper 2A questions come from the old-curriculum elective "Databases" (Paper 2A, answer three out of four questions). This site cites only the parts that match the new curriculum

For the paper structure and the HKEAA's answering principles, see [Exam Strategies: Paper Structure and Answering Principles](../exam/structure.html).

## Elective A in the new curriculum
| Part | Module / option | Suggested hours |
|---|---|---|
| Compulsory (144 hours) | A Information Processing | 37 |
| | B Computer System Fundamentals | 20 |
| | C Internet and its Applications | 31 |
| | D Computational Thinking and Programming | 48 |
| | E Social Implications | 8 |
| Elective (76 hours, choose two) | **A Databases**, B Web Application Development, C Algorithm and Programming | 38 each |

Paper 2 has Section A (Databases), Section B (Web Application Development) and Section C (Algorithm and Programming); candidates answer all the questions in any two sections. In 2025 Section A had five questions, covering drawing ER diagrams, writing SQL, tracing the output of SQL, normalisation and conceptual questions.

This option builds on "Data Organisation and Data Control" and "Data Manipulation and Analysis" in Module A: Module A requires queries on a single table only, while this option extends to at most three tables, modifying data and table structures, and database design. It has three topics:

| Topic | Hours | Textbook chapters |
|---|---|---|
| a. Relational Database Concepts | 6 | Ch. 1 |
| b. Structured Query Language (SQL) | **18** | Ch. 2 & 3 |
| c. Database Design Methodology | 14 | Ch. 4 & 5 |

SQL takes up nearly half the teaching hours of this option, and every year Section A has several parts that require writing SQL; ER diagrams and normalisation are examined almost every year too. The HKEAA comments repeatedly point to three weaknesses: sub-queries with GROUP BY / HAVING, the minimal cardinalities (participation constraints) in ER diagrams, and wrong primary and foreign keys in normalisation.

## Recent examination focus
| Year | Paper 2 Section A questions related to this option |
|---|---|
| Sample Paper | Q1 (ER diagram), Q2 (UNIQUE / PRIMARY KEY, INSERT, rollback), Q3 (derived attribute), Q4 (normalisation to Third Normal Form), Q5 (joins, outer join, GROUP BY, views, ALTER TABLE) |
| 2025 | Q1 (ER diagram, rollback), Q2 (UNION, UPDATE with EXISTS), Q3 (INSERT, join with SUM), Q4 (normalisation), Q5 (data type, LIKE, date conditions, sub-query with MAX, MINUS, integrity, denormalisation) |
| 2024 | Q1 (candidate key, joining three tables, LEFT JOIN, sub-query with HAVING, ALTER TABLE, EXISTS and MINUS), Q2(a)(b) (primary key, functional dependency, data redundancy, normalisation), Q3(a)(c)(d) (ER diagram, index, UPDATE, data privacy), Q4(a)–(c) (data type, UNION and UNION ALL, the three types of integrity) |
| 2023 | Q1 (filtering and sorting, date conditions, NOT IN, GROUP BY and HAVING, view with a self-join, UPDATE, MINUS), Q2(b)(d) (database constraints, access rights), Q3(a)(b)(d) (derived attribute, ER diagram, DELETE and DROP), Q4 (functional dependency, COUNT, index, normalisation, database security) |

## One-page checklist before the exam

**Relational database concepts**
- [ ] The meanings of entity, instance, attribute, relationship, domain and NULL, with examples from everyday applications
- [ ] A table may have several candidate keys; the primary key is chosen from them and is unique and not null; a foreign key refers to the primary key of another table (or the same table)
- [ ] Join the fields of a composite key with "+", e.g. `MID + BID + BDATE`; include enough fields but no unnecessary ones
- [ ] Use the character type for codes with leading zeros or letters, and state the reason
- [ ] An index speeds up searching but takes space and slows down insertions and updates; `CREATE INDEX name ON table (field1, field2)`, listing the WHERE field before the ORDER BY field
- [ ] Entity integrity (repeated or null primary key), referential integrity (foreign key value does not exist), domain integrity (invalid or out-of-range value); state the type first, then the reason
- [ ] Rollback undoes an uncommitted transaction and returns the database to its previous state; damaged committed data need a backup

**Structured Query Language**
- [ ] `ALTER TABLE … ADD`, `ALTER COLUMN`, `DROP COLUMN`; `DELETE FROM` deletes records, `DROP TABLE` removes the whole table
- [ ] `INSERT INTO … VALUES (…)` follows the field order of the table; numbers without quotes, text and dates with quotes
- [ ] `UPDATE … SET field = field + 10 WHERE …`; UPDATE and DELETE without WHERE affect all records
- [ ] AND before OR, with brackets when unsure; BETWEEN is inclusive; `%` and `_` in LIKE; `IS NULL`
- [ ] The difference between `COUNT(*)` and `COUNT(field)`; `SUBSTRING(s, start, length)` counts from 1
- [ ] WHERE filters records before grouping, HAVING filters groups after grouping; no aggregate functions in WHERE
- [ ] Joining n tables needs n − 1 join conditions; write "table.field" for common field names; add DISTINCT when needed
- [ ] Unmatched records: `LEFT JOIN … WHERE right_table.field IS NULL`, or `NOT IN (sub-query)`
- [ ] Comparing with the maximum or average needs a sub-query: `WHERE PRICE = (SELECT MAX(PRICE) FROM …)`
- [ ] `> ANY` means greater than the minimum, `> ALL` greater than the maximum; EXISTS checks whether a sub-query returns any record
- [ ] UNION removes duplicate rows, UNION ALL keeps them; INTERSECT keeps rows in both; MINUS keeps rows in the first but not the second
- [ ] A view is a virtual table: it simplifies queries, allows calculating before comparing, and hides sensitive data

**Database design methodology**
- [ ] The symbols beside an entity tell "how many of this entity for each instance of the other": 1 or M is the maximum, | or O the minimum
- [ ] Both ends of every relationship need a cardinality and a participation constraint; do not miss any relationship in the description
- [ ] Resolving many-to-many: add an associative entity and make both sides one-to-many; both original entities get 1 and |; swap the original participation constraints and place them beside the associative entity
- [ ] Give an example of each of insertion, update and deletion anomalies; for data redundancy, state which field is repeated and in what situation
- [ ] A derived attribute can be calculated from other attributes, such as age or the number of visits; HKID is not a derived attribute
- [ ] 1NF: atomic values, no repeating groups; 2NF: no partial dependency; 3NF: no transitive dependency
- [ ] In normalisation answers, give the fields, primary key and foreign keys of every table; use a composite key when the same code repeats in different groups
- [ ] Denormalisation: merge tables, add redundant fields or derived attributes, use views; benefit: faster queries; drawbacks: redundancy and inconsistency; "less storage" is not a benefit
- [ ] ER diagram to tables: for one-to-many, put the primary key of the "1" side into the "M" side; the associative entity of a many-to-many relationship becomes a table
- [ ] Set access rights by role and by level (database, table, record, field); hide fields and records with views; obtain consent before using personal data for other purposes
