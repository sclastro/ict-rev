## 4.1 Learning outcomes

**Spreadsheets**: use cell references, functions, and mathematical, logical and relational operators in formulas; filter, search and sort data using single or multiple criteria; manipulate data across multiple worksheets; use pivot tables, pivot charts and "what-if" scenarios to analyse data, identify trends and make informed judgements.

**Databases**: create and maintain a simple database with a DBMS; create and use a form for data entry; select, filter and sort data using queries on a **single database table**; trace and interpret simple SQL statements; create and format reports for intended users.

## 4.2 The HKEAA list of functions and commands

The last page of the Sample Paper answer book lists the following for candidates' reference. Treat this list as the scope of the examination.

**Spreadsheet**
- Constants: TRUE, FALSE
- Operators: `+ - * / < > = <> <= >= &`
- Functions: INT, RAND, SQRT, ROUND, AND, NOT, OR, LEFT, LEN, MID, RIGHT, AVERAGE, COUNT, COUNTIF, MAX, MIN, RANK, SUM, SUMIF, FIND, XLOOKUP, IF

**SQL**
- Constants: TRUE, FALSE
- Operators: `+ - * / > < = >= <= <> % _ '`, AND, NOT, OR
- Keywords: AVG, MAX, MIN, SUM, AS, BETWEEN, BY, ASC, DESC, DISTINCT, FROM, GROUP, HAVING, LIKE, NULL, ORDER, SELECT, WHERE

(COUNT is missing from the Sample Paper's SQL list, but COUNT(*) appeared in the 2024 paper, so learn it too.)

## 4.3 Spreadsheet basics

- A cell address is a column letter plus a row number, e.g. B7, AK51.
- **Every formula must start with "=".**
- The cell format affects what is displayed and stored. For example, 000815 typed into a Number cell becomes 815; data with leading zeros, such as student numbers and phone numbers, should be formatted as **Text**.
- AutoFill can copy content or extend a series (e.g. dates, numbers).

**Operators**

| Type | Operators |
|---|---|
| Arithmetic | `+ - * / ^ %` |
| Comparison | `= <> > >= < <=` |
| Text concatenation | `&` |
| Reference | `:` (range, e.g. A1:B10), `,` (union, e.g. A1:A5, D2:D6) |

⚠ Write comparison operators only as `<=`, `>=` and `<>` — never ≤, ≥, ≠ or =< [2023 P1B 2(a)].

## 4.4 Cell references

| Type | Written as | When the formula is copied |
|---|---|---|
| Relative | A1 | Column and row both shift by the distance moved |
| Absolute | $A$1 | Neither changes |
| Mixed | $A1 or A$1 | The part with "$" stays fixed |

**Copying rule**: work out how many columns and rows the target cell is from the original; every part without "$" moves by the same amount.

Example: C3 contains `=A$1+$B2`. Copied to E5 (2 columns right, 2 rows down), it becomes `=C$1+$B4`.

Referring to another worksheet: `='Sheet name'!B3`; to another file: `='[File name.xlsx]Sheet name'!B3`.

✔ **Refer to cells instead of typing values into formulas.** For example, put the commission rate in B2 and write `=C6*B$2`; if the rate changes, you only edit B2 and every formula updates automatically.

## 4.5 Common functions

**Statistical functions**

| Function | Purpose | Example |
|---|---|---|
| SUM(range) | Total | =SUM(B2:B9) |
| AVERAGE(range) | Mean | =AVERAGE(C2:E2) |
| MAX(range), MIN(range) | Largest, smallest value | =MAX(F2:F36) |
| COUNT(range) | Number of cells containing **numbers** | =COUNT(B2:B9) |
| COUNTIF(range, criteria) | Number of cells meeting the criteria | =COUNTIF(B2:B9,"Absent") |
| SUMIF(range, criteria, sum_range) | Total of the corresponding values that meet the criteria | =SUMIF(C2:C9,"4A",D2:D9) |
| RANK(number, ref, [order]) | Rank; order omitted or 0 means descending, non-zero ascending | =RANK(B2,B$2:B$9) |

Criteria may use wildcards: `*` for any number of characters, `?` for one character, e.g. "4?" matches every S4 class.

**Maths functions**: ROUND(X, D) rounds to D decimal places; INT(X) gives the largest integer not greater than X, e.g. INT(−4.3) = −5; SQRT(X) square root; RAND() returns a random number from 0 up to (but not including) 1.

**Logical functions**: IF(condition, value_if_true, value_if_false); AND(cond1, cond2, …) is TRUE only if all are true; OR(…) is TRUE if any is true; NOT(condition) reverses it.

Nested IF example: `=IF(B2>=80,"A",IF(B2>=50,"B","C"))`

**Text functions**

| Function | Purpose | Example (A1 = "Banana") |
|---|---|---|
| LEN(text) | Number of characters (spaces count) | =LEN(A1) → 6 |
| LEFT(text, N) | Leftmost N characters | =LEFT(A1,3) → Ban |
| RIGHT(text, N) | Rightmost N characters | =RIGHT(A1,4) → nana |
| MID(text, S, N) | N characters starting from position S | =MID(A1,3,2) → na |
| FIND(find_text, text, [start]) | Position of the first occurrence; case-sensitive | =FIND("a",A1,3) → 4 |

Join text with `&`: `=LEFT(B2,1)&". "&A2`

**XLOOKUP**

`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])`

| match_mode | Meaning | Typical use |
|---|---|---|
| 0 (default) | Exact match | Look up a name from an ID |
| −1 | Exact match, otherwise the next **smaller** value | Look up a grade from a table of lower mark limits |
| 1 | Exact match, otherwise the next **larger** value | Find a coach large enough for a given number of people |

Example: the mark is in F2, grade lower limits in J2:J6 and grades in K2:K6: `=XLOOKUP(F2,$J$2:$J$6,$K$2:$K$6,,-1)`.

## 4.6 Spreadsheet formulas: common mistakes reported by the HKEAA

> ⚠ **[2025 P1B 1(a)] A formula is entered into F2 to calculate the average mark of the three tests and then copied to F3:F36. Write the formula in F2.**
> ✔ `=AVERAGE(C2:E2)`; other methods such as `=SUM(C2:E2)/3` were also accepted.
> ✘ "A common error was using 'AVG' instead of the appropriate function name" (AVG is an SQL function). Remember the "=" sign.

> ⚠ **[2025 P1B 1(b)] A formula in H2 counts the students whose average is less than or equal to G2; it is then copied to H3:H6.**
> ✔ `=COUNTIF($F$2:$F$36,"<="&G2)`
> ✘ Performance was *fair*. Many wrote `"<=G2"` or left out the `&`; a Level 5 candidate in the Chinese-medium samples wrote `'<=G2'` and also lost the mark.
> Key point: put the comparison operator inside quotation marks and join it to the cell reference with `&`; only a G2 outside the quotes picks up the cell's value. Use an absolute reference for the range.

> ⚠ **[2024 P1B 1(a)(i)] If either column D or column E is 1, column F shows 1; otherwise 0.**
> ✔ `=IF(D2+E2>=1,1,0)`; the condition may also be `D2+E2>0` or `OR(D2=1,E2=1)`; or `=IF(D2+E2=0,0,1)`.
> ✘ Writing the results as `"1","0"` (quotation marks turn them into text, not numbers); `OR(D2,E2)=1`.

> ⚠ **[2024 P1B 1(a)(ii)] `=SUMIF(A2:A81,"S01",F2:F81)` in B85 gives the right result, but is wrong when copied to B86, E85 and E86. Correct the formula in B85.**
> ✔ `=SUMIF($A$2:$A$81,A85,$F$2:$F$81)`
> Key points: both ranges need **absolute references**; the criteria should refer to **cell A85** with a **relative reference**, so that it becomes D85 when copied to E85.
> ✘ `$A85` (still refers to column A after copying to column E); `"S01"` (criteria hard-coded); ranges without $.

> ⚠ **[2023 P1B 2(a)(b)]**
> ✔ `=IF($C2<=$C$102,1,0)`; `=$D2*$E2+$E$102`
> ✘ Most candidates knew to use IF but many lost the second mark: writing ≤, leaving out "=" in `<=`, or putting the condition or numbers in quotation marks. Some did not put $ in E$102.

HKEAA teaching advice (2024): mind the formula syntax; **no quotation marks or other punctuation around numerical values**; use $ correctly; **spell function names correctly**.

## 4.7 Sorting and filtering

- **Sorting** rearranges records by one or more keys and changes their order. With several keys, records are sorted by the **primary key** first, then by the **secondary key** where the primary key is equal.
- **Filtering** shows only the records that meet the criteria and hides the rest temporarily, **without changing the original data**; removing the filter shows everything again.

> ⚠ **[2024 P1B 1(a)(iv)] The records have already been sorted. State the sort options.**
> ✔ First by DATE **descending**, then by NAME **ascending**. Infer this from the data: dates run from 2024-02-28 to 2024-02-27, and within each day names are in alphabetical order.
> ✘ Reversing the order (NAME first, then DATE), or mixing up ascending and descending.

✔ To list "members of one house, from highest to lowest score": first filter by house, then sort by score in descending order.

## 4.8 Charts, pivot tables and what-if analysis

**Chart types**

| Chart | Use |
|---|---|
| Column / bar chart | Compare values across categories |
| Line chart | Show a trend over time |
| Pie chart | Show each part as a proportion of the whole |
| Scatter chart | Show the correlation between two sets of data |
| Radar chart | Compare several measures at once |

Chart elements: chart title, X- and Y-axis titles, legend, data labels, gridlines. A pie chart has no axes. 2D charts show proportions more accurately than 3D charts.

> ⚠ **[2023 P1B 2(e)] Draft a chart to show the top 5 students with the highest scores.**
> ✔ A suitable chart type (bar chart, 1 mark), plus two of: chart title, axis titles, data labels or legend (2 marks).
> ✘ Some candidates drew a **table** instead of a chart; some labelled only one axis. Answers written in the wrong language medium were not marked (e.g. a Chinese axis name in the English paper).

A **pivot table** builds a summary table from a large data set. It has four areas: **rows, columns, values and filters**. Values can be summarised by SUM, COUNT, AVERAGE, MAX or MIN. A **pivot chart** shows a pivot table as a chart.

Example: a table has the fields Class, House and Score. For "total score of each house in each class": rows = House, columns = Class, values = Sum of Score.

> ⚠ **[2023 P1B 2(c)] Complete the settings of a pivot table to find the sum of scores for each student.**
> ✔ Columns = StudID; values = **Sum of Score**.
> ✘ Many candidates wrote only "Score" without **SUM**, misspelt the field name (e.g. "Scores"), or added extra fields.

**What-if analysis** changes input values to see the effect on the results, for forecasting and planning. Tools include Scenario Manager and Goal Seek.

✔ Distinguish them: what-if analysis compares **different sets of input values**; a pivot table summarises **one set of data** by category. "Changing different parameters to estimate monthly expenses" suits what-if analysis; "comparing the sales of different branches" is a pivot table or chart task [Sample Paper Section A Q8].

✔ Spreadsheets suit small-scale analysis and charting; a DBMS suits large amounts of structured data, many users and access control. A spreadsheet is not suitable for analysing big data directly, because a worksheet holds a limited number of rows and becomes slow with large data sets [Sample Paper Section B 2(b)].

## 4.9 Databases: forms, queries, reports and table design

| Object | Purpose |
|---|---|
| Table | Stores data in rows (records) and columns (fields); every database must have one |
| Form | A graphical interface for entering, displaying and modifying records |
| Query | Extracts data meeting criteria from one or more tables; can calculate and sort; can be saved and reused |
| Report | Displays or prints data in a predefined format, often as a summary such as a mark sheet |

**Benefits of forms**: a user-friendly environment for data entry (a simplified user interface); validation such as range checks; verification such as entering a password twice; drop-down menus, radio buttons, check boxes and date pickers that simplify input; one form can update related records in several tables.

⚠ A form does **not** shorten SQL execution time and does **not** reduce storage space [adapted from 2021 P1A Q11].

**Steps in designing a table**: list the items to record → make each item a field → give each field a short, meaningful name → decide the data type and field length → set the primary key → add validation rules where needed.

| Data type | Use | Example |
|---|---|---|
| Text / character | Names, codes, phone numbers (not used in calculations) | NAME, TEL_NO, HKID |
| Integer | Whole numbers used in calculations | AGE, MARK |
| Floating point (real) | Numbers with decimals | PRICE, AREA |
| Date / time | Dates | DOB |
| Boolean | Yes / no | PAID |

✔ Use text for phone numbers and student numbers: they are not used in calculations and may contain leading zeros or letters.
✔ Use the date type for dates: it makes sorting, filtering and date calculations easy. Stored as text, "10/2/2025" sorts before "2/2/2025".
✔ Field lengths should be long enough without waste, e.g. 20 or more for an English name, about 4 for a Chinese name.

## 4.10 The SQL SELECT statement

**Clause order**

```sql
SELECT   fields or expressions
FROM     table
WHERE    condition on records      -- filters before grouping
GROUP BY grouping field
HAVING   condition on groups       -- filters after grouping
ORDER BY sort field [ASC | DESC]
```

**Sample table LOAN (our own)**

| SID | CLASS | BOOK | DAYS |
|---|---|---|---|
| S01 | 4A | B12 | 7 |
| S02 | 4B | B05 | 14 |
| S01 | 4A | B33 | 3 |
| S03 | 4A | B12 | 10 |
| S04 | 4C | B08 | 21 |

| SQL | Output | Notes |
|---|---|---|
| `SELECT SID, DAYS FROM LOAN WHERE CLASS = '4A' AND DAYS > 5` | S01 7<br>S03 10 | AND: both conditions must hold |
| `SELECT COUNT(*) FROM LOAN WHERE DAYS BETWEEN 7 AND 14` | 3 | BETWEEN includes both ends (7, 14, 10) |
| `SELECT DISTINCT BOOK FROM LOAN WHERE BOOK LIKE 'B_2'` | B12 | `_` is one character; DISTINCT removes duplicates |
| `SELECT SID, COUNT(*) FROM LOAN GROUP BY SID HAVING COUNT(*) > 1` | S01 2 | Group first, then filter the groups |
| `SELECT CLASS, SUM(DAYS) FROM LOAN GROUP BY CLASS ORDER BY SUM(DAYS) DESC` | 4C 21<br>4A 20<br>4B 14 | One row per group, sorted by total descending |

**Operators and keywords**

| Item | Usage |
|---|---|
| Comparison | `= < <= > >= <>` |
| Logical | AND, OR, NOT; precedence NOT > AND > OR — add brackets when unsure |
| `LIKE` | `%` means zero or more characters, `_` one character, e.g. `NAME LIKE 'J%'` |
| `BETWEEN a AND b` | From a to b inclusive |
| `IS NULL` | The field is empty (never write `= NULL`) |
| `IN (…)` | Equal to any value in the list |
| Aggregate functions | SUM, AVG, MAX, MIN, COUNT(*), COUNT(field) (ignores nulls) |
| `AS` | Gives an output column an alias, e.g. `SUM(DAYS) AS TOTAL` |
| `ORDER BY` | Ascending (ASC) by default; DESC for descending; can sort by several fields |

**Steps for tracing GROUP BY output**

1. Use WHERE to remove records that do not meet the condition.
2. Group the remaining records by the GROUP BY field — **one output row per group**.
3. Calculate the aggregate function for each group.
4. Use HAVING to remove groups that do not meet its condition.
5. Sort by ORDER BY; without ORDER BY, the HKEAA does not usually require a particular order.

> ⚠ **[2024 P1B 1(b)(iii)] Based on the first 8 records, what is the output of the following SQL statement?**
> `SELECT EID, COUNT(*) FROM ATTEND WHERE SIGNIN + SIGNOUT = 1 GROUP BY EID HAVING COUNT(*) > 1`
> ✔ S03 2, S04 2 (order of EID is not important).
> ✘ Listing groups that fail the HAVING condition (e.g. S01 1) or staff with a count of 0; writing S03 and S04 on the same line.

> ⚠ **[2023 P1B 2(d)(ii)]** SUM with GROUP BY: some candidates failed to group the two S01 records together, or failed to add 4 and 6 to get 10.

> ✔ **[2025 P1B 7(d)]** `SELECT CL, CNO FROM SS WHERE SER='Flag selling' AND CL LIKE '2_'` and `SELECT CL, SUM(HR) FROM SS GROUP BY CL`. Performance was *very good* — marks you must not lose.

**SQL mistakes to avoid** (from the 2024 and 2025 briefings, including the Paper 2A marking principles)

- ✘ Aggregate functions in WHERE, e.g. `WHERE DAYS > AVG(DAYS)`. Aggregate functions belong in SELECT or HAVING only.
- ✘ Quoting numbers, e.g. `YEAR = '2012'` (write `YEAR = 2012`); text, however, must be quoted, e.g. `CLASS = '4A'`.
- ✘ Writing ≤ instead of `<=`.
- ✘ Clauses in the wrong order, e.g. ORDER BY in the middle of a WHERE condition.
- ✘ Selecting a field that is neither in GROUP BY nor inside an aggregate function.
- ✘ Using SQL's AVG in a spreadsheet, or the spreadsheet's AVERAGE in SQL.

## 4.11 Self-test

<details><summary>1. B2 contains =$A2*B$1. What is the formula after it is copied to D5?</summary>

2 columns right and 3 rows down: $A2 → **$A5**; B$1 → **D$1**. Answer: `=$A5*D$1`.
</details>

<details><summary>2. A2:A100 holds classes and C2:C100 holds scores. Write a formula for the total score of class 4B, and one for the number of students in 4B.</summary>

Total: `=SUMIF(A2:A100,"4B",C2:C100)`; number of students: `=COUNTIF(A2:A100,"4B")`.
</details>

<details><summary>3. Using the LOAN table above, write an SQL statement to find the average loan days of each class, listing only classes with an average above 10.</summary>

`SELECT CLASS, AVG(DAYS) FROM LOAN GROUP BY CLASS HAVING AVG(DAYS) > 10`
Output: 4B 14, 4C 21 (4A averages 20 ÷ 3 ≈ 6.67, which does not qualify).
</details>

<details><summary>4. A student writes =IF(A2>=50,"1","0") and then counts the passes with =SUM(B2:B30), but gets 0. Why?</summary>

"1" and "0" are in quotation marks, so they are text, not numbers, and SUM does not add text. Write `=IF(A2>=50,1,0)`.
</details>

<details><summary>5. The lower score limits of a grade table are in J2:J6 (0, 40, 55, 70, 85) and the grades are in K2:K6 (F, D, C, B, A). Write a formula in G2 to look up the grade for the score in F2. What is the result when F2 is 69?</summary>

`=XLOOKUP(F2,$J$2:$J$6,$K$2:$K$6,,-1)`. Match mode −1 returns the next smaller value, 55, when 69 is not found, so the result is **C**. Use absolute references for the lookup and return ranges so that the formula can be copied down.
</details>

<details><summary>6. A2 stores a student's class and class number in the form "4B-23". Write formulas to extract the class and the class number.</summary>

Class: `=LEFT(A2,2)`. Class number: `=RIGHT(A2,2)` or `=MID(A2,4,2)`. If class names vary in length, write `=MID(A2,FIND("-",A2)+1,2)`.
</details>

<details><summary>7. Using the LOAN table in Section 4.10, write down the output of: `SELECT SID, SUM(DAYS) FROM LOAN WHERE CLASS = '4A' GROUP BY SID`</summary>

First select the three records of class 4A, then group them by SID:

S01 10 (7 + 3)

S03 10
</details>

<details><summary>8. Using the LOAN table, write an SQL statement to list the book numbers that have been borrowed more than once.</summary>

`SELECT BOOK FROM LOAN GROUP BY BOOK HAVING COUNT(*) > 1`

Output: B12. The condition is about the count after grouping, so use HAVING, not WHERE.
</details>
