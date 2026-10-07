## 2.1 Learning outcomes

Identify data, records, fields, files and databases in the hierarchical organisation of data; explain how records can be organised, stored and retrieved, and compare direct access with sequential access; discuss the need for data control; describe how errors can be detected by validation and parity checking, and prevented by verification and validation.

## 2.2 Why data control is needed

Three common sources of error in manual input:

| Error | Meaning | Example |
|---|---|---|
| Data source error | The provider gives incorrect data | A customer gives the wrong phone number |
| Transcription error | Data is read or typed incorrectly | Typing the digit "0" as the letter "O" |
| Transposition error | Two adjacent characters are swapped | Typing 16 as 61 |

Incorrect input always produces incorrect output: **garbage in, garbage out (GIGO)**. Data control aims to make input data accurate; the usual methods are **data validation** and **data verification**.

## 2.3 Data validation

Input data is compared with predefined rules to make sure it is **reasonable and valid**.

| Check | Purpose | Example |
|---|---|---|
| Presence check | A required field must not be left empty | Student number cannot be blank |
| Field length check | The number of characters is correct | A Hong Kong phone number must have 8 digits |
| Range check | A value lies within a set range | A test mark is between 0 and 100 |
| Fixed value check | Only values from a predefined list are accepted | Class can only be A, B, C or D |
| Format check | Data follows a set pattern | An email address must contain "@" |
| Type check | The data type is correct | A mark must be a number |
| Check digit | Calculated by a formula and appended to the data for self-checking | ISBN, HKID number |

**Validation can only make data reasonable; it cannot make data correct.** For example, if 78 is typed as 87, a range check will not notice.

> ⚠ **[2025 P1B 7(c)] Suggest a validation check for the class field CL that is more effective than a format check.**
> ✔ Answer: **fixed value check** (the class must be one of the classes that actually exist). Performance was *poor*: many candidates did not know the fixed value check. A correct description without the term is also accepted.
> ✘ A Level 5 candidate in the Chinese-medium samples answered "range check"; a class is text, so a range check does not suit it.
> Some candidates wrongly thought they could pile several checks onto one answer. The question asks for one check, so give the most suitable one.

> ⚠ **[2024 P1B 1(a)(iii)] Column D contains only 1 or 0. Besides checking that fields are non-empty, describe a suitable validation.**
> ✔ Fixed value check / type check / range check (an integer between 0 and 1).
> ✘ Format check, presence check and length check were not accepted.

> ⚠ **[2025 P1B 7(a)(i)] Suggest a better form element than a text box for entering the class.**
> ✔ A drop-down menu or radio buttons, because only valid classes are offered, so **the input is valid and reasonable**.
> ✘ Some candidates said this "ensures the input is correct". That is a misconception: a student can still choose the wrong class.

## 2.4 Check digit

A check digit is calculated from the rest of the data by a fixed formula and appended to the end. The receiving system recalculates it; if the result differs from the attached check digit, the data is invalid.

**Worked example (our own)**: a membership number has four digits plus a check digit. Rule: multiply the first four digits by weights 4, 3, 2, 1, add the products, and take the remainder after dividing by 10.

Check **3517-8**: 3×4 + 5×3 + 1×2 + 7×1 = 12 + 15 + 2 + 7 = 36, and 36 mod 10 = 6. The attached check digit is 8, which is different, so the number is **invalid**.

> ⚠ **[2025 P1B 9(b)] Decide whether a user name is valid, and state a limitation of the check digit.**
> ✔ Every decision needs **complete working**, including the mod (remainder) step, and a reason for the conclusion. For example, "(11 + 4) × 3 mod 10 = 5, which matches the check digit, so it is valid" scores 2 marks; incomplete working scores 1; no explanation scores 0. An invalid case also needs a reason, e.g. class "C" does not exist.
> ✔ Limitation: **two different inputs can produce the same check digit**, so such errors cannot be detected. Full marks require a concrete example with both calculations shown.
> ✘ Not accepted: "the calculation takes time", "it can only check numbers, not letters", "the check digit can only be 0 to 9".

## 2.5 Parity check

Used to detect bit errors **after data is transmitted or copied**, e.g. sending data packets over a network, or writing data from RAM to a hard disk.

- **Even parity**: after adding the parity bit, the total number of 1s is even.
- **Odd parity**: after adding the parity bit, the total number of 1s is odd.

Example: the data 1011 0010 has four 1s. With even parity the parity bit is 0, so 1011 0010 **0** is sent; with odd parity it is 1, so 1011 0010 **1** is sent.

Limitation: if an **even number of bits are wrong** (e.g. two bits swapped or both flipped), the number of 1s keeps the same parity and the error goes undetected.

> ⚠ **[2024 P1B 4(a)(ii)] Add an even parity bit at the end of a 15-bit image pattern.**
> ✔ Add a single parity bit at the **end of the whole pattern**, giving 16 bits.
> ✘ Weaker candidates added a parity bit after every three bits, or put the parity bit first.

> ⚠ **[2023 P1B 4(d)(i)] An error bit may occur during data transmission. Briefly describe how this error can be checked.**
> ✔ Add a parity bit; use a checksum; transmit twice and compare.
> ✘ Many candidates answered check digit, length check or type check. These are **validation checks at input**, not transmission error detection. The HKEAA stresses the difference between *error checking* and *validation*.

## 2.6 Data verification

Checks whether the input data **matches the original source**.

| Method | How it works | Example |
|---|---|---|
| Input data twice | One person enters the data twice; the computer compares the two entries | Entering a new password twice |
| Double data entry | Two people each enter the same document into separate files; the computer compares the files | Clinical research data |

| Comparison | Data validation | Data verification |
|---|---|---|
| Purpose | Data is reasonable and follows the rules | Data matches the original source |
| Can it catch "a reasonable but wrong value"? | No | Yes |

✔ Re-entering a password is **data verification**, not validation [Sample Paper Section A Q3; adapted from 2025 P1A Q3].
✔ If HKID A123456(7) is typed as A123455(7), a **check digit** and **input data twice** can both detect the error; a range check cannot [adapted from 2025 P1A Q6].

## 2.7 The data hierarchy

**Data (bits, bytes) → field → record → table (file) → database**

| Level | Meaning | Example |
|---|---|---|
| Field | One specific item in a record; the smallest unit a user accesses | Date of birth |
| Record | A group of related fields describing one entity | All the details of one student |
| Table / File | A collection of records with the same structure | The table of all students |
| Database | A collection of related tables linked by keys | Student details, results and loans tables |

In a table, a **row** is a record and a **column** is a field [the 2024 briefing reminded candidates of this].

## 2.8 Primary key

A primary key **uniquely identifies** each record in a table. Its values must be **unique** and **not null**.

- If no single field qualifies, combine two or more fields into a **composite primary key**, e.g. CLASS + CLASS_NO.
- Choose the combination with the **fewest fields**; do not add unnecessary ones.
- Consider the context. A mobile number can be the primary key of a membership table, but not of a student table, because some students have no phone.
- An HKID number is unique, but it is sensitive personal data and is generally unsuitable as a primary key.

> ⚠ **[2024 P1B 1(b)] ATTEND is a staff attendance table (one record per staff member per day).**
> (i) Why can NAME not be a key field? ✔ "It is not unique." The HKEAA reminded candidates to understand the scenario: every staff member has one record per day, so the same name must appear many times.
> (ii) State the primary key. ✔ **EID + DATE** (DATE + EID or "EID, DATE" also accepted). ✘ EID + DATE + NAME (not minimal); EID alone; "EID and DATE". The HKEAA recommends joining the fields with "+".

> ⚠ **[2024 P1B 1(b)(iv)] Why is it not necessary to convert the summary data in the spreadsheet (total days attended by each person) into the database?**
> ✔ They are **derived data** (calculated from the raw data), so storing them causes **redundancy**; an SQL query can regenerate them when needed.

> ⚠ **[Sample Paper Section B 8(c)] Some students were absent from a test. It is suggested to store "ABS" or 0 in the mark fields.**
> ✔ "ABS" does not match the numeric field type; 0 would be mixed up with students who really scored zero. If -1 is used for absence instead, the -1 values must be excluded before calculating averages and similar statistics.

## 2.9 Basic functions of a DBMS

A database management system (DBMS) manages the database structure and stores, organises and retrieves data. Examples: MySQL, Microsoft SQL Server, Oracle (servers); Microsoft Access, LibreOffice Base (desktop).

Basic operations are adding, viewing, modifying and deleting records; the main features are filtering, sorting, forms, queries and reports — see section 4.9 of [Topic d: Data Manipulation and Analysis](d.html).

## 2.10 File access modes

| Mode | Typical medium | Characteristics |
|---|---|---|
| Sequential access | Magnetic tape | Must be read in order from the start; long and unpredictable seek time; low cost, suited to backup |
| Direct access (also called random access) | Hard disk, optical disc, solid-state drive (SSD), flash memory card | The target location can be reached directly; short seek time |

The C&A Guide asks you to compare **direct access** with **sequential access**. The HKEAA classifies hard disks, optical discs and flash memory as direct access [2012 Practice Paper P1A Q14]; among common media, only magnetic tape uses sequential access. See Section 1.10 of [Module B Topic a](../core-b/a.html).

## 2.11 Self-test

<details><summary>1. The data 0110 1110 is sent with odd parity. What is the parity bit?</summary>

The data already has five 1s, which is odd, so the parity bit is **0** and 0110 1110 0 is sent.
</details>

<details><summary>2. An online form asks for a date of birth. Suggest two different validation checks.</summary>

Format check (must be DD/MM/YYYY); range check (the year must be within a sensible range, e.g. not later than today). A presence check is also acceptable.
</details>

<details><summary>3. A library table LOAN records every loan (fields: student number, book number, loan date). Why may "student number + book number" be unsuitable as the primary key?</summary>

A student may borrow the same book again on another day, so two records would have the same "student number + book number". Add the loan date: "student number + book number + loan date".
</details>

<details><summary>4. Use the membership number rule in Section 2.4 (multiply the first four digits by the weights 4, 3, 2, 1, add the products and take the remainder after dividing by 10). (a) Check whether 2604-0 is valid. (b) Give an example to show one limitation of this check digit.</summary>

(a) 2×4 + 6×3 + 0×2 + 4×1 = 8 + 18 + 0 + 4 = 30, and 30 mod 10 = 0. This matches the check digit, so the number is **valid**.

(b) Different numbers can give the same check digit. For example, 2654: 2×4 + 6×3 + 5×2 + 4×1 = 40, and 40 mod 10 = 0. If 2604 is mistyped as 2654, the check digit is still 0 and the error cannot be detected.
</details>

<details><summary>5. A clerk types a student's year of birth, 2008, as 2009. Which can detect this error: a range check (2000 to 2015) or entering the data twice? Why?</summary>

**Entering the data twice** can detect it: the two entries differ, so the computer gives a warning. The range check cannot, because 2009 is still within the range. Validation only ensures that data is reasonable, not that it is correct.
</details>

<details><summary>6. 1011 0010 0 is sent with even parity, and 1001 0110 0 is received. Can the receiver detect the error? Why?</summary>

**No.** Two bits are wrong at the same time. The received 1001 0110 0 still has four 1s, which passes the even parity check. A parity check cannot detect an even number of bit errors.
</details>
