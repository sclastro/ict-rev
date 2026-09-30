> For: HKDSE Information and Communication Technology, new curriculum (examinations from 2025 onwards)
> Sources: CDC–HKEAA *ICT Curriculum and Assessment Guide*; HKEAA exam briefing materials 2023–2025; the 2025 Sample Paper and Samples of Candidates' Performance
> Labels: [2025 P1B 1(b)] means 2025 HKDSE Paper 1B Question 1(b); "⚠" marks a common mistake reported by the HKEAA; "✔" marks a high-scoring answer
> "Old Paper 2C" refers to the pre-2025 elective *Multimedia Production and Website Development*. Its multimedia content is now part of Module A; it is not the new Paper 2C (Algorithm and Programming)

For the paper structure and the HKEAA's answering principles, see [Exam Strategies: Paper Structure and Answering Principles](../exam/structure.html).

## Module A in the new curriculum
| Part | Module / Option | Suggested hours |
|---|---|---|
| Compulsory (144 hours) | **A Information Processing** | **37** |
| | B Computer System Fundamentals | 20 |
| | C Internet and its Applications | 31 |
| | D Computational Thinking and Programming | 48 |
| | E Social Implications | 8 |
| Elective (76 hours, choose two) | A Databases, B Web Application Development, C Algorithm and Programming | 38 each |

Module A takes up about a quarter of the Compulsory Part and is its second-largest module. It has four topics:

| Topic | Hours | Textbook chapters |
|---|---|---|
| a. Introduction to Information Processing | 3 | Ch. 1 |
| b. Data Organisation and Data Control | 4 | Ch. 2 |
| c. Data Representation | 10 | Ch. 3 & 4 |
| d. Data Manipulation and Analysis | **20** | Ch. 5 (spreadsheets), Ch. 6 (databases) |

Topic d accounts for more than half of Module A. Spreadsheet formulas and SQL queries appear in Paper 1B almost every year, so you must be fluent in both.

## Recent examination focus
| Year | Paper 1B questions related to Module A |
|---|---|
| Sample Paper | Section A Q1–10; Section B Q5 (comparing file formats), Q8 (validation, SQL, spreadsheet COUNTIF) |
| 2025 | Q1 (AVERAGE, COUNTIF), Q7 (form elements, fixed value check, SQL GROUP BY), Q9 (check digit) |
| 2024 | Q1 (IF, SUMIF, validation, sorting, primary key, SQL), Q4 (bit patterns, even parity, number of bits) |
| 2023 | Q1(d) (verifying information), Q2 (IF, pivot table, primary key, SQL, chart), Q4(d) (detecting transmission errors) |

## One-page checklist before the exam

**Calculations**
- [ ] B × 8 = b; bandwidth and bitrate use 1000; file size uses 1024
- [ ] Show your working and write units; colour depth is a number of bits (e.g. 8), not a number of colours (e.g. 256)
- [ ] n bits → 2ⁿ combinations; number of bits ≠ number of combinations
- [ ] Two's complement range −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1; two same-sign numbers giving an opposite-sign result → overflow

**Concepts**
- [ ] Validation ≠ verification; validation makes data reasonable, not necessarily correct
- [ ] Transmission errors: parity check or checksum, not check digit or length check
- [ ] Fixed value check: only values from a predefined list are accepted
- [ ] Check digit: complete working (including mod); for the limitation, give two inputs that produce the same check digit
- [ ] Primary key: unique, not null, fewest fields; join a composite key with "+"
- [ ] Derived data need not be stored (redundancy; a query can regenerate it)
- [ ] Lossy compression cannot be reversed; changing the aspect ratio causes distortion or black bars; changing the display size does not change the file size

**Spreadsheets**
- [ ] Formulas start with "="; AVERAGE, not AVG
- [ ] Join a comparison operator to a cell in COUNTIF / SUMIF: `"<="&G2`
- [ ] No quotation marks around numbers; write `<=`, not ≤
- [ ] Decide which parts need $ before copying a formula
- [ ] Pivot table values must state SUM / COUNT and the exact field name

**SQL**
- [ ] Order: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY
- [ ] WHERE filters before grouping, HAVING after; no aggregate functions in WHERE
- [ ] Quote text, not numbers; `%` and `_` in LIKE
- [ ] GROUP BY outputs one row per group
