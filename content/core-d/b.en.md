## 2.1 Curriculum requirements

Perform a dry run of a set of steps to determine its purpose and/or output; define algorithm and use pseudocode and program flowcharts to represent algorithms; outline and discuss the input and output requirements of a problem and design an appropriate user interface; recognise the uses and nature of simple data types (restricted to integer, real, character and Boolean) and data structures (limited to string and one-dimensional array), including Boolean logic (AND, OR, NOT) and truth tables; select appropriate data types and discuss the merit of the chosen types; design and construct standard algorithms involving basic control structures (sequence, selection [binary and multi-way] and iteration); create and examine algorithms such as loading and printing an array, and adding or deleting an item in an array; produce trace tables; locate logic errors in an algorithm and correct them; modify an algorithm for changes in task specification; describe the advantages of modularity in designing computer solutions, and habitually use the modular approach to structure algorithms.

## 2.2 Algorithms, pseudocode and program flowcharts

An **algorithm** is a clear, finite and ordered series of steps for solving a problem. An algorithm can be represented by **pseudocode** or a **program flowchart**.

**Program flowchart symbols**

| Symbol | Use | Example |
|---|---|---|
| Oval | Start, end | Start |
| Parallelogram | Input, output | input N; output S |
| Rectangle | Process (assignment, calculation) | S ← S + N |
| Diamond | Decision, with two exits "Yes" and "No" | N > 4? |
| Arrow | Direction of flow | |
| Rectangle with double vertical sides | Predefined process, i.e. calling a module or subprogram | Calculate BMI |

**Pseudocode style in HKEAA papers**

There is no single standard for pseudocode. The table shows the style commonly used in HKEAA English papers:

| Use | Pseudocode |
|---|---|
| Assignment | `X ← X + 1` |
| Input, output | `input N`, `output S`, `output 'Not found'` |
| Binary selection | `if condition then` … `else` … |
| Pre-test loop | `while condition do` … |
| Counting loop | `for i from 1 to N` … |
| Post-test loop | `repeat` … `until condition` |
| Remainder, quotient | `the remainder of (A / 2)`, `the quotient of (P / Q)` |
| Integral part | `the integral part of ((left + right) ÷ 2)` |
| Leaving a loop early | `exit the loop` |
| Array element | `A[i]`; the question states the index range, e.g. "A[1] to A[N]" or "indexes from 0 to N − 1" |

Pseudocode uses indentation to show which statements belong inside a selection or loop. Whether array indexes start from 1 or 0 differs from question to question, so read the question's description first.

| Comparison | Pseudocode | Program flowchart |
|---|---|---|
| Form | Text | Diagram |
| Advantages | Quicker to write and modify; easy to convert into program code | Visual; the flow of execution is easy to see |
| Disadvantages | Less visual than a diagram | Time-consuming to draw; flowcharts of complex algorithms become very large |

**HKEAA marking principles (pseudocode)**

- The focus is logical reasoning; minor syntax errors are accepted.
- Pseudocode may follow Python, C++ or Pascal style: assignment may be written `←`, `=` or `:=`; equality `=` or `==`; inequality `<>` or `!=`; `≥` or `>=`; letter case and single or double quotes are not penalised.
- Errors that affect the logic or program flow are not accepted, e.g. missing brackets so that `(left + right) / 2` becomes `left + right / 2`.
- Pseudocode gets no marks when the question asks for answers in a programming language.

## 2.3 Dry runs and trace tables

A **dry run** executes an algorithm by hand, line by line, without a computer, recording how the variable values change in order to find the output or purpose of the algorithm, or to find errors. A **trace table** lists the values of the variables after each step (or each iteration).

How to dry run:
1. List all the variables and write down their initial values;
2. Execute line by line, updating the table at every assignment;
3. At a selection or loop, work out whether the condition is true before deciding the next step;
4. After the loop ends, write the output required by the question.

> ⚠ **[2025 P1A Q38] What is the output of the following algorithm?**
> ✔ S ← 0, A ← 3; while A <= 9: S ← S + A; if (the remainder of (A / 2)) = 1 then A ← A + 1, else A ← 2 * A + 1; finally output S. Trace: A = 3 → S = 3, A is odd, A = 4; A = 4 → S = 7, A is even, A = 9; A = 9 → S = 16, A = 10, the loop stops. Output **16**.
> ✘ Only 65% of candidates answered correctly. The HKEAA noted that the candidates who lost marks traced the odd and even branches wrongly.

| Iteration | A (before) | S | A odd? | A (after) |
|---|---|---|---|---|
| 1 | 3 | 3 | Yes | 4 |
| 2 | 4 | 7 | No | 9 |
| 3 | 9 | 16 | Yes | 10 |

⚠ The control variable of a counting loop is reassigned. [2023 P1A Q30] After A ← 5, B ← 11, C ← 7, the loop "for C from 2 to 3: B ← A + B" runs only twice (C = 2, 3), B becomes 16 then 21, and the output A + B = **26**. Only 38% of candidates answered correctly. The original value 7 of C does not affect the number of iterations.

## 2.4 Data types and data structures

**Simple data types**

| Data type | Data stored | Examples |
|---|---|---|
| Integer | Numbers without a fractional part | Number of people, steps, pages |
| Real | Numbers that may have a fractional part | Average mark, amount of money, body temperature |
| Character | A single letter, digit or symbol | `'A'`, `'5'`, `'#'` |
| Boolean | Only TRUE or FALSE | Whether a member, whether found |

**Simple data structures**

| Data structure | Description | Examples |
|---|---|---|
| String | A sequence of characters that can be accessed one by one | `"STEAM"`, phone number, student ID |
| One-dimensional array | A group of elements of the same data type, accessed by one name and an index | `JS[1]` to `JS[5]` store the scores of five judges |

Advantages of an array over many separate variables: all elements can be processed with a loop and an index, so the program is shorter; when the amount of data changes, only the array size and the loop range need changing.

**Choosing a data type** depends on the nature of the data (whether it is used in calculation, whether it has decimals, whether it has only two states), the precision needed and the memory required:

| Data | Suitable type | Reason |
|---|---|---|
| Phone number, student ID, HKID number | String | Not used in calculation; may have leading zeros or letters |
| Number of pages, quantity bought | Integer | Whole numbers only |
| Price, average mark, body temperature | Real | May have decimals |
| Has astigmatism, is a member | Boolean | Only two states, "yes" and "no" |
| Class (e.g. 2A) | String (or two characters) | Contains a digit and a letter |

> ⚠ **[2025 P1B 8(a)(ii)] What data type should the final score FS be? Why?**
> ✔ Real, because FS is the average of three scores and may have decimals.
> ✘ Writing only "numeric" without an explanation, or giving no reason at all.

[Sample Paper Section B 9(a)] Transaction amounts should not be stored as strings, because numbers in a string cannot be used directly in calculations; use real.

## 2.5 Boolean logic and truth tables

| A | B | A AND B | A OR B | NOT A |
|---|---|---|---|---|
| FALSE | FALSE | FALSE | FALSE | TRUE |
| FALSE | TRUE | FALSE | TRUE | TRUE |
| TRUE | FALSE | FALSE | TRUE | FALSE |
| TRUE | TRUE | TRUE | TRUE | FALSE |

- AND: true only if both are true; OR: true if either is true; NOT: swaps true and false.
- Without brackets, evaluate NOT first, then AND, then OR.
- Checking "between 18 and 60 inclusive" needs AND: `(A >= 18) AND (A <= 60)`; checking "outside the range" uses OR: `(A < 18) OR (A > 60)`.

**De Morgan's laws**

| Expression | Equivalent to |
|---|---|
| NOT (A OR B) | (NOT A) AND (NOT B) |
| NOT (A AND B) | (NOT A) OR (NOT B) |
| NOT (X > 15) | X <= 15 |
| NOT (X = 6) | X <> 6 |

> ⚠ **[2012 Practice Paper P1A Q29] P and Q represent A ≥ 18 and A ≤ 60 respectively. For which of A = 0, 18, 30, 80 is NOT (P AND Q) true?**
> ✔ NOT (P AND Q) means A is not within 18 to 60, so only **0 and 80**.
> ✘ Including 18 by mistake: when A = 18, P and Q are both true, so NOT (P AND Q) is false.

[Sample Paper Section A Q27] With X = 1, Y = 2 and Z = 3, `((X = 1) AND (Y > -2)) OR (Z > 3)` is true; the other three options all join `Z > 3` (false) with AND, so they are false.

## 2.6 Input, output and user interface

When designing a solution, decide first: what data the user inputs, in what form, and how the input is checked; what the program outputs and how it is displayed.

| Comparison | Command Line Interface (CLI) | Graphical User Interface (GUI) |
|---|---|---|
| Operation | Type text commands | Click icons, buttons and menus |
| Advantages | Easy to program; uses few resources | Easy to use without memorising commands; menus can restrict input and reduce input errors |
| Disadvantages | Users must memorise commands and may mistype them | More program code is needed |

[2025 P1B 7(a)(i)] For the "Class" field of an online form, a drop-down menu or radio buttons are better than a text box, because only valid classes are provided and users cannot enter a class that does not exist. The HKEAA pointed out that a drop-down menu ensures the input is **reasonable** (valid), not that it is **correct**: a student may still choose the wrong class.

## 2.7 Control structures: sequence

Any algorithm can be built from three basic control structures: **sequence**, **selection** and **iteration**. Sequence means executing statements one by one from top to bottom.

**Swapping the values of two variables** needs a temporary variable:

```text
TEMP ← A
A ← B
B ← TEMP
```

⚠ Writing only `A ← B`, `B ← A` is wrong: the first statement has already overwritten the original value of A, so both variables end up equal to B.

[2023 P1B 3(a)(i)] Swapping `A[i]` and `A[i-1]`: `TEMP ← A[i]`, `A[i] ← A[i-1]`, `A[i-1] ← TEMP`.

## 2.8 Control structures: selection

**Binary selection**: do one thing if the condition is true, otherwise do another.

```text
if MARKS >= 50 then
    output 'PASS'
else
    output 'FAIL'
```

**Multi-way selection** can be written as a chain of "else if" decisions, or with nested selection (see below):

```text
if MARK >= 80 then
    GRADE ← 'Distinction'
else if MARK >= 40 then
    GRADE ← 'Attained'
else
    GRADE ← 'Unattained'
```

Above, the conditions are arranged from high to low; once one condition is true, the rest are not checked. If written as three separate "if" statements, every mark is checked three times, and if the order is wrong, later statements overwrite the earlier result.

> ⚠ **[2012 Practice Paper P1B 3(c)] Ada decides the grade with three separate "if" statements (MARK < 40, MARK >= 40, MARK >= 80); Ben draws a flowchart with nested decisions. Which algorithm is more efficient?**
> ✔ The nested algorithm is more efficient because, in general, it executes fewer comparisons.
> ✘ Answering only "faster" without stating that fewer comparisons are made.

**Nested selection**: a selection inside another selection. In a dry run, decide the outer condition first, then the inner one.

> ⚠ **[2012 Practice Paper P1A Q32] A ← 5, B ← 10; if (2 × A) > 8 then [if A > (5 + B) then A ← B, else B ← A], else A ← A + 8. What is the final value of A?**
> ✔ The outer condition 10 > 8 is true; the inner condition 5 > 15 is false, so B ← A is executed. A is unchanged at **5**.

[2025 P1A Q32] Two algorithms have the same effect. Version 1: if P > 20 then A ← P * 5, else A ← P * 2. Version 2: first A ← **P * 2**, then "if P > 20 then A ← A + P * 3". When P > 20, A = P * 2 + P * 3 = P * 5, the same as Version 1.

[2025 P1A Q33] "if (K < 9) or (K > 22) then output K": of the options 9, 10, 22 and 23, only 23 is output. Neither 9 nor 22 satisfies the strict "less than" or "greater than".

## 2.9 Control structures: iteration

| Loop | Pseudocode | When the condition is checked | Minimum executions | Suitable for |
|---|---|---|---|---|
| Counting loop | for i from 1 to N | Before each iteration | 0 (when N < 1) | A known number of repetitions |
| Pre-test loop | while condition do | Before each iteration; executes only while true | 0 | An unknown number of repetitions, possibly none |
| Post-test loop | repeat … until condition | After each iteration; stops when true | 1 | An unknown number of repetitions, at least one |

In a flowchart, a decision box **before** the loop body indicates a pre-test loop; one **after** the loop body indicates a post-test loop.

> ⚠ **[2025 P1A Q28, Q29] A vending machine outputs a can of soda for every 5 credits. M1 outputs a can and sets N ← N − 5, then checks N > 4; M2 checks N > 4 first and, if true, outputs a can and sets N ← N − 5. How many cans does each output when N = 10 and when N = 0?**
> ✔ N = 10: both M1 and M2 output **2** cans. N = 0: **only M1** outputs a can, because a post-test loop runs at least once and outputs the soda before checking the credits.
> ✘ Thinking that neither outputs anything when N = 0, overlooking that M1 is a post-test structure.

**Converting between post-test and pre-test loops**: "repeat … until condition" stops when the condition is true; when rewriting it as "while … do", negate the condition (and remember that a pre-test loop may not execute at all).

| Post-test loop | Equivalent pre-test condition |
|---|---|
| until (A > 15) OR (B >= 12) | while (A <= 15) AND (B < 12) |
| until X > 0 | while X <= 0 |

**Rewriting a counting loop as a pre-test loop**: set the initial value of the control variable yourself and increment it inside the loop body.

> ⚠ **[2023 P1A Q29] Algorithm 1 adds N[1] to N[5] with "for i from 1 to 5". To rewrite it as Algorithm 2 with "while (i <= 5) do", which two statements must be added?**
> ✔ Add `i ← 1` before the loop and `i ← i + 1` inside the loop.
> ✘ Only 51% of candidates answered correctly. With `i ← 0` as the initial value, the algorithm would also add N[0], which is outside N[1] to N[5].

**Infinite loop**: the condition is always true, so the loop never stops.

[2025 P1A Q27] i ← 10; while i > 0, output '$'. The statement `i ← i - 1` must be inserted into the loop; otherwise i stays at 10 and the loop never ends.

[2012 Practice Paper P1A Q33] S ← 1; input A; while S < 10, S ← S + A. Only a **positive** input makes S reach 10 or above; zero or a negative number causes an infinite loop.

**Counting iterations**:

```text
N ← 2
while N < 8 do
    output '*'
    N ← N + 3
```

Output happens when N is 2 and 5; the loop stops at N = 8, so **2** "*" are output [2023 P1A Q27].

[2024 P1A Q30] S ← 0, N ← 1; repeat S ← S + N, N ← N + 2 until N > 6; S becomes 1, 4, 9, and the output is **9**.

## 2.10 Standard algorithms on arrays

Below, array A has N elements with indexes 1 to N. If the question's indexes start from 0, change the range to 0 to N − 1.

**Loading and printing an array**

```text
for i from 1 to N
    input A[i]
for i from 1 to N
    output A[i]
```

[Sample Paper Section A Q29] cnt ← 1, ind ← 1; while cnt < 100: cnt ← cnt + 2, AR[ind] ← cnt, ind ← ind + 1. AR[1] to AR[5] are 3, 5, 7, 9, 11, so AR[5] = **11**.

**Sum, count, average**

```text
S ← 0
C ← 0
for i from 1 to N
    S ← S + A[i]
    if A[i] >= 50 then
        C ← C + 1
AVG ← S / N
```

**Maximum and its position**

```text
MAX ← A[1]
P ← 1
for i from 2 to N
    if A[i] > MAX then
        MAX ← A[i]
        P ← i
```

- Use the first element as the initial value and start the loop from the second element; for the minimum, change `>` to `<`.
- Do not use 0 as the initial value of the maximum: if all numbers are negative, the result would wrongly be 0.
- Recording only the position also works: `if A[i] > A[P] then P ← i`.

> ⚠ **[2025 P1B 8(a)(i), (b)] The scores of five judges are stored in JS[1] to JS[5]; JS[Smax] is the highest score and JS[Smin] the lowest. In the pseudocode "Smax ← 1; for i from 2 to N: if JS[i] > JS[Smax] then Smax ← i", how many times is the comparison executed? What is the advantage of using the variable N instead of the constant 5?**
> ✔ Skateboarder C's scores are 68, 84, 82, 80, 92, so Smax = 5, Smin = 1, FS = (84 + 82 + 80) ÷ 3 = 82.00. The comparison is executed **4 times (N − 1)**. With N instead of 5, only one place needs changing when the number of judges changes; programmers can update all statements involving N in a single step.
> ✘ Confusing array indexes with contents, writing Smax as 92 and Smin as 68; answering only "easy to change" without elaboration.

**Search controlled by a flag**

```text
i ← 1
FOUND ← FALSE
input X
while (i <= N) AND (NOT FOUND) do
    if A[i] = X then
        FOUND ← TRUE
    else
        i ← i + 1
if FOUND then
    output i
else
    output 'Not found'
```

> ⚠ **[2024 P1A Q31, Q32] In the search algorithm above, what should fill the blank in "while (i <= 10) ___ FLAG do"? What is the purpose of the variable FLAG?**
> ✔ Fill in **AND NOT**; FLAG is used **to control the loop**: once the value is found, FLAG becomes true and the loop stops.
> ✘ Only 40% of candidates answered Q31 correctly. "OR" would keep the loop going after the value is found; "AND" makes the condition false from the start. FLAG does not store a location or a count.

**Inserting an item**: to insert X at position P, start from the last element and shift each element back one place; otherwise data not yet moved is overwritten.

```text
for i from N down to P
    A[i + 1] ← A[i]
A[P] ← X
N ← N + 1
```

**Deleting an item**: to delete the element at position P, starting from P, move each following element forward.

```text
for i from P to N - 1
    A[i] ← A[i + 1]
N ← N - 1
```

[Sample Paper Section A Q33] The purpose of "input P; K ← P; while K <= N − 1 do: A[K] ← A[K + 1], K ← K + 1; N ← N − 1" is to **remove the P-th value in A**.

**Reversing and shifting**

> ⚠ **[2025 P1B 6] The character array s1[0] to s1[4] contains S, T, E, A, M. (a) Execute "for i from 0 to 4: s2[4 − i] ← s1[i]"; (b) execute "ch ← s1[0]; for i from 0 to 3: s2[i] ← s1[i + 1]; s2[4] ← ch". What are the contents of s2 in each case?**
> ✔ (a) M, A, E, T, S (reversed); (b) T, E, A, M, S (shifted left by one place, with the first character moved to the end).
> ✘ Treating (a) as a straight copy. s2[4 − i] means the first character of s1 goes into the last cell of s2.

## 2.11 Locating and correcting logic errors, modifying algorithms

**Common logic errors**

| Error | Example | Correction |
|---|---|---|
| Boundary error | "Between 18 and 30 inclusive" written as `age > 18` | Change to `age >= 18` |
| Off-by-one loop | To add 1 + 2 + … + 5, writing `while i < 5` | Change to `while i <= 5` |
| AND/OR misused | Range check written as `(age >= 18) OR (age <= 30)`, true for any age | Change to AND |
| No initial value | No `S ← 0` before accumulating | Add the initial value before the loop |
| Initial value in the wrong place | `S ← 0` placed inside the loop, resetting S every iteration | Move it before the loop |
| Flag overwritten | A search with "else FOUND ← FALSE", so a later element resets it after a match | Delete the "else" part |

> ⚠ **[2025 P1B 9(c)] A username consists of form F, class C, class number N and check digit D. After the flowchart was converted to pseudocode, there are four mistakes after Line 130 (Line 150 should be S ← F + N, which is given). Find the other three and correct them.**
> ✔ Line 140 `if 1<=F<=6 or 1<=N<=40` should use **and** (both must hold); Line 160 should be `if C = "A" or C = "B"` (first confirm the class is valid); Line 220 `if not FLAG` should be **`if FLAG`**: FLAG still being true means the username failed the checks, so "Invalid username" is output.
> ✘ About two thirds of candidates misunderstood the use of the flag here, and only one third found all the errors.

**Modifying an algorithm for a new requirement**: first find the part of the algorithm related to the requirement, and change only that part.

| Requirement | Modification |
|---|---|
| Maximum → minimum | Change `A[i] > MAX` to `A[i] < MIN` |
| Ascending sort → descending sort | Change the `>` in the order comparison to `<` |
| Check ascending → check descending | Change `A[i] > A[i + 1]` to `A[i] < A[i + 1]` |
| Count passes → count fails | Change `>= 50` to `< 50` |

## 2.12 The modular approach

A **module** (subprogram) is a group of statements that performs a specific task. It has its own name, can take **parameters**, and can return a result. A module that returns a value is a **function**, e.g. `find_max(A, N)` returns the maximum; a module that only performs a task without returning a value is a **procedure**, e.g. `print_report(A, N)`.

```text
function calc_bmi(W, H)
    return W / (H * H)

input WEIGHT, HEIGHT
BMI ← calc_bmi(WEIGHT, HEIGHT)
output BMI
```

**Advantages of designing solutions with modules**

| Advantage | Explanation |
|---|---|
| Reusability | The same module can be reused in other parts of the program or in other projects, so the program is shorter |
| Easier to design and test | Each module is small and can be tested independently |
| Easier debugging and maintenance | Errors are confined to individual modules; changing one module does not affect other parts |
| Teamwork | Different programmers can write different modules at the same time |
| Clear structure | The main program only lists the steps calling each module, which is easy to understand |

> ⚠ **[2024 P1A Q33] Which of the following are advantages of using modularity in writing programs? (1) Some modules can be reused (2) It is easier to debug programs (3) It is faster to define a problem**
> ✔ (1) and (2) only.
> ✘ Only 42% of candidates answered correctly. Modularity is used **after** the problem is defined; it does not make defining the problem faster.

[2023 P1A Q33] The advantages of a modular approach are that a module can be reused in other scenarios and that modules are easier to design and test; "the execution time of an algorithm is shorter" is not correct. Calling modules may in fact add a little execution time.

## 2.13 Self-test

<details><summary>1. Name the flowchart symbols for "decision" and for "input/output".</summary>

Decision: diamond. Input/output: parallelogram.
</details>

<details><summary>2. [2025 P1A Q36] N ← 0; for i from 1 to 4: N ← N * i + 1; output N. What is the output?</summary>

i = 1: N = 0 × 1 + 1 = 1; i = 2: N = 3; i = 3: N = 10; i = 4: N = 41. Output **41**.
</details>

<details><summary>3. [2025 P1A Q37] X ← 0, Y ← 1; for i from 1 to 5: TEMP ← X + Y, X ← Y, Y ← TEMP; output Y. What is the output?</summary>

(X, Y) becomes (1, 1), (1, 2), (2, 3), (3, 5), (5, 8). Output **8**.
</details>

<details><summary>4. [2025 P1A Q34, Q35] i ← 1, A[1] ← 1, K ← 3; while i < 5: i ← i + 1, A[i] ← A[i − 1] + K, K ← K + 2; output A[5]. What are the final value of K and the output?</summary>

A[2] = 4, A[3] = 9, A[4] = 16, A[5] = 25; K becomes 5, 7, 9, 11. The final value of K is **11** and the output is **25**.
</details>

<details><summary>5. Choose the most suitable data type for: (a) customer name (b) age (c) whether the customer has astigmatism (d) price of glasses</summary>

(a) String; (b) integer; (c) Boolean; (d) real.
</details>

<details><summary>6. Simplify NOT ((X > 5) OR (Y < 2)) using De Morgan's law.</summary>

(X <= 5) AND (Y >= 2).
</details>

<details><summary>7. Rewrite "repeat … until (X > 5) OR (Y < 2)" as a pre-test loop. What should the condition be? How do the two differ?</summary>

`while (X <= 5) AND (Y >= 2) do`. A post-test loop executes at least once; a pre-test loop does not execute at all if the condition is false at the start.
</details>

<details><summary>8. The following algorithm should calculate 1 + 2 + 3 + 4 + 5 but outputs 10: Sum ← 0, i ← 1; while i < 5 do: Sum ← Sum + i, i ← i + 1. Find the error and correct it.</summary>

The condition `i < 5` excludes 5, so the loop runs one time too few. Change it to `while i <= 5 do`.
</details>

<details><summary>9. [adapted from 2025 Mock P1A Q37] Array s, indexed from 0, stores the scores of N candidates. After p is input, this algorithm deletes s[p]: for j from p to N − 2 do ___; s[N − 1] ← 0. What fills the blank?</summary>

`s[j] ← s[j + 1]`, moving each following element forward one place.
</details>

<details><summary>10. Array QUEUE has indexes 0 to 4 and contains "Alice", "Bob", "David", "Eva", "". To insert "Chris" at index 2, which item should be moved first? Why?</summary>

Move "Eva" from QUEUE[3] to QUEUE[4] first, then move "David". Moving from the last item avoids overwriting data not yet moved. After insertion: "Alice", "Bob", "Chris", "David", "Eva".
</details>

<details><summary>11. What is the logic error in this search algorithm? FOUND ← FALSE; for i from 1 to N: if A[i] = X then FOUND ← TRUE, else FOUND ← FALSE.</summary>

"else FOUND ← FALSE" makes FOUND reflect only the comparison with the last element: even if X was found earlier, FOUND is reset to false unless the last element is X. Delete the "else" part.
</details>

<details><summary>12. Function Calc(A, B) returns A * B. Execute Ans ← Calc(5, 4); Ans ← Calc(Ans, 2); output Ans. What is the output?</summary>

Calc(5, 4) = 20; Calc(20, 2) = 40. Output **40**.
</details>
