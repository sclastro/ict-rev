## 4.1 Curriculum requirements

Apply data validation checks to design appropriate test data; understand and describe the types of program errors (syntax, logic and run-time), explain why they occur and debug them; identify boundary cases; compare different solutions to the same problem in terms of the steps of operation and resource usage.

## 4.2 Data validation

**Validation** checks whether input is reasonable according to preset rules, and rejects unreasonable data. Common checks:

| Check | What it checks | Example |
|---|---|---|
| Presence check | A required field is not empty | Name and quantity cannot be left blank |
| Range check | A value lies within a specified range | Mark 0 to 100; heart rate 40 to 200 |
| Length check | The number of characters meets the requirement | Password 8 to 16 characters; user ID exactly 7 characters |
| Type check | The data is of the correct type | Age must be an integer |
| Format check | The data follows a specified format | Product code in the form "YYYY-CAT-NNN" |
| Fixed value check (lookup table) | The data is one of the items in a preset list | Class can only be 2A, 2B, 2C or 2D |
| Check digit | The check digit calculated from the other digits equals the check digit entered | The last character of a username is a check digit |

**Verification**, by contrast, checks whether the data entered matches its source, e.g. asking for a password to be entered twice, or asking the user to check the data shown on screen. Validation only ensures that data is reasonable, not that it is correct: a student who picks someone else's class from a drop-down menu still passes the check.

> ⚠ **[2025 P1A Q31] In "input N; while N < 0 do: input N", what is the purpose of using the loop?**
> ✔ **Data validation**: a negative input must be re-entered until the value is reasonable.
> ✘ Choosing "data verification". The loop only checks whether N is reasonable; it does not compare N with a source.

> ⚠ **[2025 P1B 7(c)] Field CL of a database table stores the student's class. Suggest a validation check for CL that is more effective than a format check.**
> ✔ Fixed value check: accept only the classes that exist in the school (e.g. 2A, 2C, 3D). A format check can only ensure "one digit followed by one letter" and cannot reject a non-existent class such as 7Z.
> ✘ The HKEAA noted that only a small number of candidates answered "fixed value check"; some mistakenly believed that several validation checks could be applied to a single data value and listed several.

**Check digit**

[2025 P1B 9] A username consists of form F (1 to 6), class C (A or B), class number N (1 to 40) and check digit D. Calculation: S ← F + N; if C = "B", S ← S × 3; D is the remainder of (S / 10).

| Username | Check | Result |
|---|---|---|
| 4B115 | F = 4, C = B, N = 11; (4 + 11) × 3 = 45, and the remainder of 45 ÷ 10 is 5, the same as D | Valid |
| 2C180 | Class C does not exist | Invalid |

- The system supports at most 6 × 2 × 40 = **480** students.
- Limitation of the check digit: different errors may give the same check digit. For example, if 1A245 is mistyped as 1A145, the remainders of (1 + 24) and (1 + 14) divided by 10 are both 5, so the error in the class number is not detected.
- The HKEAA noted that many candidates did not show the calculation of the check digit when stating that a username was valid, and lost marks.

## 4.3 Designing test data

Test data should be able to reveal errors; do not use only data that "will surely work".

| Category | Meaning | Example (age must be 18 to 60 inclusive) |
|---|---|---|
| Normal data | Typical data within the range, which the program should accept | 30, 45 |
| Boundary data | Data at the edge of the range or just beyond it, where errors are most likely | 17, 18, 60, 61 |
| Unreasonable data | Data outside the range, which the program should reject | −5, 120 |
| Data of the wrong type | Input of the wrong type | "twenty", blank |

A test plan should list the **purpose** and **expected result** of each item of test data, to be compared with the actual result after running.

| Test data | Purpose | Expected result |
|---|---|---|
| 30 | Normal data | Accept |
| 18 | Lower boundary | Accept |
| 17 | Just below the lower limit | Reject |
| 60 | Upper boundary | Accept |
| 61 | Just above the upper limit | Reject |

> ⚠ **[2025 P1A Q30] For "if (age <= 11) or (age >= 60) then output 'Discount!!' else output 'No discount!!'", which data set for age is the most suitable for testing the algorithm?**
> ✔ **10, 11, 12, 59, 60, 61**: the boundaries of both conditions and the values on either side are all tested. 93% of candidates answered correctly.
> ✘ Choosing 1, 2, 3, 4, 5: all of them test only one branch.

[2023 P1A Q6] For "IF MARKS >= 50 THEN OUTPUT 'PASS' ELSE OUTPUT 'FAIL'", the appropriate test values are 99, 0, 50: they test a pass, a fail and the boundary 50 together. A set with only failing values (−10, 30, 40) or only passing values (100, 99, 86) is not appropriate.

[Sample Paper Section A Q36] For "if A > 5 then B ← 10 else B ← 20", the boundary cases are the inputs **5 and 6**. 10 and 20 are outputs, not boundary cases.

> ⚠ **[2024 P1B 4(a)] Array A stores six integers. ALG1 validates "all integers are positive" and ALG2 validates "the integers are sorted in ascending order". Describe the purposes of these invalid test data: Case 1: 3, 5, 5, 3, 8, 5; Case 2: −1, −1, 3, 5, 5, 8.**
> ✔ Case 1 is all positive but not in ascending order, so it checks whether ALG2 validates that the integers are sorted in ascending order. Case 2 is in ascending order but contains negative values, so it checks whether ALG1 validates that all integers are positive.
> ✘ The HKEAA noted that only a small number of candidates related their answers to the algorithms in the question. State which algorithm and which requirement each data set targets.

[2023 P1B 3(d)] Choose two of three data sets to test a sorting subprogram. Each set has its own feature: negative values and zero (−3, −1, 4, 0, 7), already sorted (1, 2, 3, 4, 5), duplicate values (1, 1, 3, 3, 5). Choose any two and explain what situation each one tests.

## 4.4 Types of program errors

| Error type | Meaning | Why it occurs | Example (Python) |
|---|---|---|---|
| Syntax error | The program breaks the rules of the language and cannot be translated or run | Misspelt keywords, missing symbols, wrong indentation | `if x > 0` without a colon; `print("Hi)` without a closing quote; `if a = b:` |
| Logic error | The program runs but the result is not what was expected | Wrong algorithm or formula | Dividing by 5 instead of 3 for an average; `range(1, n)` doing one iteration too few; `>` written as `>=` |
| Run-time error | An error occurs while the program is running and the program stops | An operation that cannot be completed during execution | Division by zero; accessing an index that does not exist; `int("abc")`; square root of a negative number |

- Syntax errors are reported by the translator (compiler or interpreter) before execution or when that line is reached; they are the easiest to find.
- Logic errors produce no error message; the translator cannot know the formula the programmer intended, so they can only be found with test data and dry runs.
- Run-time errors may appear only for certain inputs, e.g. when 0 is entered as a divisor.

[Sample Paper Section A Q30] An algorithm calculates the square root of an expression. When the input B makes the expression negative, the square root cannot be found during execution, which is a run-time error.

⚠ In Python, mistyping `print` as `prnt` causes an error only when that line is executed (NameError), so it is generally classed as a run-time error; in C++ the compiler reports the same mistake during compilation, so it is a syntax error. Explain your answer according to the language and context in the question.

## 4.5 Debugging methods

| Method | How |
|---|---|
| Dry run and trace table | Execute by hand line by line, record variable values, and find the step that differs from what is expected |
| Add output statements | Temporarily output variable values at suspicious points to observe how the program runs |
| Use the IDE's debugging tools | Set breakpoints so the program pauses at chosen lines, then step through and inspect variable values |
| Test module by module | Test each module independently first, and combine them only when each is correct |

**Preventing run-time errors**: check the data before calculating, e.g. do not divide when the divisor is 0, or ask the user to re-enter in a loop. Python's `try` and `except` can catch run-time errors so that the program does not stop; this is extension content.

```python
divisor = int(input("Enter the divisor: "))
while divisor == 0:
    print("The divisor cannot be 0")
    divisor = int(input("Enter the divisor: "))
print(100 / divisor)
```

## 4.6 Comparing algorithms

A problem can often be solved by more than one algorithm. Compare them in two respects:

| Respect | What to look at |
|---|---|
| Steps of operation | The number of comparisons, calculations or iterations needed; fewer steps mean faster execution |
| Resource usage | The memory needed, e.g. extra variables or arrays |

**Stopping early reduces the number of steps**

[Sample Paper Section B 4(c)] ALG1 searches for a string among all the strings in a data file and always checks every string. ALG1 is not efficient because, even when the target has been found early, it still compares all the remaining strings; with a flag and a pre-test loop, the search can stop as soon as the target is found.

**Data affects the number of steps**: the same algorithm can take very different numbers of steps for different data.

[2023 P1B 3(b)] A sorting subprogram processes five numbers: 2, 3, 5, 7, 9, already in ascending order, need no swaps (**0**); 9, 7, 5, 3, 2, in descending order, need **10** swaps.

**Number of comparisons**: [2025 P1B 8(b)(i)] In "Smax ← 1; for i from 2 to N: if JS[i] > JS[Smax] then Smax ← i", the comparison is executed N − 1 times, i.e. 4 times.

**Example: checking whether at least half of the array is even**

```text
ALG1
C ← 0
for i from 1 to N
    if (the remainder of (A[i] / 2)) = 0 then
        C ← C + 1
if C >= N / 2 then output 'E' else output 'O'

ALG2
C ← 0
i ← 1
while (i <= N) AND (C < N / 2) do
    if (the remainder of (A[i] / 2)) = 0 then
        C ← C + 1
    i ← i + 1
if C >= N / 2 then output 'E' else output 'O'
```

With N = 8 and A = 6, 4, 2, 8, 1, 3, 5, 7, ALG2 stops after counting the fourth even number and makes only 4 comparisons; ALG1 always makes 8. If the even numbers never reach half, e.g. 1, 3, 5, 7, 9, 2, 4, 6, both make 8 comparisons. The two algorithms use similar amounts of memory.

⚠ More memory does not reduce the number of comparisons. If an algorithm is slow because it takes many steps, improve the algorithm itself.

**Trade-off between speed and memory**

| Approach | Speed | Memory |
|---|---|---|
| Output each result as soon as it is calculated | Each output takes time | No extra array needed |
| Store the results in an array and process them all at the end | Results can be reused without recalculation | An extra array is needed |
| Swap two values with a temporary variable | Three assignments | One extra variable |

When choosing an algorithm, also consider whether the program is easy to understand and maintain. A shorter, clearer algorithm is less likely to go wrong when modified later.

## 4.7 Self-test

<details><summary>1. State the difference between validation and verification, with an example of each.</summary>

Validation checks by rules whether data is reasonable, e.g. a range check that heart rate is between 40 and 200. Verification checks whether data matches its source, e.g. entering a password twice, or asking the user to check the data displayed.
</details>

<details><summary>2. An online form requires a password of 8 to 16 characters inclusive. Give four suitable boundary test data (as numbers of characters).</summary>

7, 8, 16 and 17 characters.
</details>

<details><summary>3. Exam marks must be between 0 and 100 inclusive. Design a set of test data including normal, boundary and unreasonable data.</summary>

For example −1 (unreasonable), 0 (boundary), 50 (normal), 100 (boundary), 101 (unreasonable).
</details>

<details><summary>4. State the type of error in each case: (a) dividing by 5 instead of 3 for an average (b) a missing colon at the end of an if statement (c) the program stops when a user enters "abc" in a field that requires an integer (d) dividing by 0 in a loop</summary>

(a) Logic error; (b) syntax error; (c) run-time error; (d) run-time error.
</details>

<details><summary>5. Why can an IDE usually not find logic errors automatically?</summary>

A program with logic errors follows the syntax and runs, and the IDE cannot know the formula or result the programmer intended. Logic errors can only be found by comparing actual and expected results with test data, or by tracing with a dry run.
</details>

<details><summary>6. A guessing game requires GUESS to be between 1 and 100 inclusive, but the program has if GUESS > 1 and GUESS < 100:. Identify the error and suggest a test value that would reveal it.</summary>

`>` and `<` exclude 1 and 100, so the program rejects valid boundary values. Change it to `if GUESS >= 1 and GUESS <= 100:`. The test value 1 or 100 reveals the error.
</details>

<details><summary>7. A car park has 50 spaces. To test the "car park full" condition, give one normal, one boundary and one unreasonable test value (number of cars parked).</summary>

Normal: 49; boundary: 50; unreasonable: 51. (Other reasonable answers are accepted.)
</details>

<details><summary>8. The last character of a user ID is a check digit. What is the purpose of a check digit? Give one limitation.</summary>

Purpose: the check digit is calculated from the other digits and compared with the one entered, to detect input errors such as a mistyped digit. Limitation: different errors may give the same check digit, so some errors go undetected.
</details>

<details><summary>9. Explain why a search that stops once the target is found is generally more efficient than one that checks every element. When do both take the same number of steps?</summary>

After the target is found, the remaining elements need not be compared, so fewer comparisons are made. If the target is in the last position or does not exist, both must check every element and take the same number of steps.
</details>

<details><summary>10. Someone suggests adding more memory so that a linear search on a million items runs faster. Do you agree?</summary>

No. A linear search is slow because it compares a large amount of data one by one; more memory does not reduce the number of comparisons. Improve the algorithm instead, e.g. stop once the target is found.
</details>

<details><summary>11. Write a Python program that asks the user for the number of participants between 1 and 30, asking again if the input is unreasonable.</summary>

```python
n = int(input("Number of participants: "))
while n < 1 or n > 30:
    print("The number must be between 1 and 30")
    n = int(input("Number of participants: "))
```
</details>

<details><summary>12. Algorithm A takes 0.5 s for 1000 items and 480 s for one million items; algorithm B takes 0.8 s and 90.5 s respectively. Which should a high-volume system use?</summary>

Algorithm B. Its time grows much more slowly with large amounts of data, even though it is slightly slower for small amounts.
</details>
