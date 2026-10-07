## 3.1 Curriculum requirements

Understand and use variables, constants and simple lists (one-dimensional arrays) in different problem contexts; use operators (arithmetic operators include addition, subtraction, multiplication, division and modulus; relational operators include equal to, not equal to, greater than, greater than or equal to, less than, less than or equal to; Boolean operators include AND, OR and NOT), expressions, assignment statements, input and output statements; understand and use sequence, selection and iteration (nested loops are not required) constructs to create a program; produce programming solutions for given problems, e.g. finding the minimum, maximum and average values in a list, searching for an item in a list and reporting the result, finding the length of a string, extracting required characters from a string, counting the items in a list that meet specified criteria, checking whether the values in a list are in order, and using mathematical formulas.

All program code on this page is in Python. Programming questions in Paper 1 Section B may be answered in Python or C++ (or Pascal up to 2027), and candidates must indicate the language used in the answer book.

## 3.2 Basic elements of a Python program

```python
# Calculate the area of a rectangle (text after # is a comment and is not executed)
LENGTH = 12            # constant: by convention named in capitals, meaning the value should not change
width = float(input("Enter the width: "))
area = LENGTH * width
print("The area is", area)
```

A **variable** is a named storage location whose value can change; a **constant** should not change while the program runs. Python has no true constants; by convention they are named in capitals.

| Naming rule | Valid | Invalid |
|---|---|---|
| Starts with a letter or underscore | `total_score`, `_count` | `1st_place` |
| Contains only letters, digits and underscores | `price2` | `user-name`, `my score` |
| Must not be a reserved word | `for_count` | `for`, `while`, `True` |
| Case-sensitive | `Score` and `score` are two different variables | |

Good variable names are meaningful, e.g. `total_mark` rather than `t`.

**Indentation**: Python uses indentation to show which statements belong to an `if`, `for`, `while` or function. The HKEAA stated that incorrect indentation in Python is a major error that affects program flow and gets no marks; a missing colon at the end of `if` or `for` is a minor error.

## 3.3 Data types and type conversion

| Curriculum data type | Python | Examples |
|---|---|---|
| Integer | `int` | `25`, `-3` |
| Real | `float` | `3.14`, `82.0` |
| Character, string | `str` (Python has no separate character type; a character is a string of length 1) | `'A'`, `"STEAM"` |
| Boolean | `bool` | `True`, `False` |
| One-dimensional array | `list` | `[68, 84, 82, 80, 92]` |

`input()` always returns a **string**, which must be converted before calculation:

| Statement | Result |
|---|---|
| `int("25")` | `25` |
| `float("10.5")` | `10.5` |
| `int(3.9)` | `3` (the fractional part is dropped, not rounded) |
| `str(25)` | `"25"` |
| `int("5.7")`, `int("abc")` | Run-time error (ValueError) |
| `"10" + "20"` | `"1020"` (strings are joined, not added) |

## 3.4 Operators and expressions

**Arithmetic operators**

| Operation | Python | Example | Result |
|---|---|---|---|
| Add, subtract, multiply | `+` `-` `*` | `7 * 3` | `21` |
| Divide | `/` | `7 / 2` | `3.5` (always real; `6 / 2` gives `3.0`) |
| Quotient (integer division) | `//` | `7 // 2` | `3` |
| Remainder (modulus) | `%` | `7 % 2` | `1` |
| Power | `**` | `2 ** 3` | `8` |

**Relational operators**: `==` (equal to), `!=` (not equal to), `>`, `>=`, `<`, `<=`; the result is `True` or `False`.

**Boolean operators**: `and`, `or`, `not`.

**Order of evaluation**: brackets → `**` → `*` `/` `//` `%` → `+` `-` → relational operators → `not` → `and` → `or`. For example, `12 + 8 / 2 ** 2` first works out `2 ** 2 = 4`, then `8 / 4 = 2.0`, giving `14.0`.

**From pseudocode to Python**

| Pseudocode | Python |
|---|---|
| `X ← X + 1` | `x = x + 1` or `x += 1` |
| `if A = B` | `if a == b:` |
| `A <> B` | `a != b` |
| `the remainder of (A / 2)` | `a % 2` |
| `the quotient of (P / Q)` | `p // q` |
| `the integral part of ((L + R) ÷ 2)` | `(l + r) // 2` |
| `AND`, `OR`, `NOT` | `and`, `or`, `not` |
| `input N` (integer) | `n = int(input())` |
| `output S` | `print(s)` |

⚠ Assignment uses one equals sign `=`; comparison uses two `==`. Writing `if a = b:` in an `if` condition is a syntax error.

## 3.5 Input and output

```python
name = input("Enter name: ")
price = float(input("Enter price: "))
qty = int(input("Enter quantity: "))
total = price * qty
print("Customer:", name)
print(f"Total: ${total:.2f}")      # f-string; :.2f shows two decimal places
print(round(total, 1))            # rounded to one decimal place
```

`print()` can output several items separated by commas, with a space added automatically between items. An f-string embeds the values of variables inside `{}`.

## 3.6 Lists (one-dimensional arrays)

Python implements one-dimensional arrays as **lists**.

```python
marks = [42, 78, 65, 91, 56]
print(marks[0])          # first element: 42 (indexes start from 0)
print(marks[4])          # last element: 56
print(len(marks))        # number of elements: 5
marks[2] = 70            # change the third element
for i in range(0, len(marks)):
    print(i, marks[i])
```

- A list of length N has indexes 0 to N − 1; accessing `marks[5]` causes a run-time error (IndexError).
- A list must be created before elements are accessed by index, e.g. `scores = [0] * 10` creates ten 0s.
- `marks[-1]` refers to the last element; this is Python-specific.

**When the question's array indexes start from 1**: the Python program should keep the question's indexes and leave `L[0]` unused. For example, if the scores are stored in `JS[1]` to `JS[5]`, write the loop as `for i in range(1, 6):`. The Python answer in the 2025 marking scheme does exactly this.

## 3.7 Selection

```python
mark = int(input("Enter mark: "))
if mark >= 80:
    grade = "Distinction"
elif mark >= 40:
    grade = "Attained"
else:
    grade = "Unattained"
print(grade)
```

- `if`, `elif` and `else` end with a colon, and the next line is indented.
- `elif` is checked only when all previous conditions are false, which suits multi-way selection.
- A range check can be written `if 18 <= age <= 60:` or `if age >= 18 and age <= 60:`.

## 3.8 Iteration

**for loops and range()**

| Code | Numbers produced | Equivalent pseudocode |
|---|---|---|
| `range(5)` | 0, 1, 2, 3, 4 | for i from 0 to 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 | for i from 1 to 5 |
| `range(2, n + 1)` | 2, 3, …, n | for i from 2 to N |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 | |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 | for i from 5 down to 1 |

⚠ `range(a, b)` does **not include** b. The HKEAA noted that in 2025 many candidates wrote "for i from 2 to N" as `range(2, N)`, missing the last iteration.

**while loops** (pre-test loops)

```python
total = 0
day = 1
while day <= 7:
    steps = int(input())
    total = total + steps
    day = day + 1
print(total)
```

**Validating input with a while loop**

> ⚠ **[2025 P1B 8(c)(ii)] Complete the program segment to ensure that the scores (sc) entered by the judges are valid, i.e. 0 ≤ sc ≤ 100.**
> ✔ `while sc < 0 or sc > 100:`, or `while not (sc >= 0 and sc <= 100):`.
> ✘ Writing `while sc < 0 and sc > 100:`: no value can be both below 0 and above 100, so the loop never runs.

```python
sc = int(input())
while sc < 0 or sc > 100:
    print("Invalid input. Please input again.")
    sc = int(input())
```

Python has no post-test loop. When something must run at least once, run it once and then repeat with `while` (as above), or use `while True:` with `break`. `break` and `continue` are extension content; controlling the loop with a flag works just as well. Nested loops are not required by the curriculum.

## 3.9 Functions

```python
def calc_bmi(weight, height):      # weight and height are parameters
    return weight / (height ** 2)

bmi = calc_bmi(60, 1.65)           # 60 and 1.65 are the values passed in (arguments)
print(round(bmi, 1))               # 22.0
```

- `def` defines a function; `return` sends back the result and ends the function.
- A function may have no `return` and just perform a task (equivalent to a procedure).
- When each task is written as a function, the main program only calls them in turn; the structure is clearer and the functions are easier to reuse and test.

## 3.10 Programs you must be able to write

### Minimum, maximum and average values

```python
def find_max(L):
    max_val = L[0]
    for i in range(1, len(L)):
        if L[i] > max_val:
            max_val = L[i]
    return max_val

def find_min(L):
    min_val = L[0]
    for i in range(1, len(L)):
        if L[i] < min_val:
            min_val = L[i]
    return min_val

def find_mean(L):
    total = 0
    for i in range(0, len(L)):
        total = total + L[i]
    return total / len(L)

temps = [28.5, 30.2, 31.0, 29.8, 33.5, 27.0, 30.5]
print(find_max(temps), find_min(temps), find_mean(temps))
```

> ⚠ **[2025 P1B 8(c)(i)] The scores of five judges are stored in JS[1] to JS[5]. Write a Python program segment to compute Smax, Smin and FS (the average of the remaining three scores after dropping the highest and lowest).**
> ✔ Marking points: finding the maximum (`Smax = 1` before the loop, `if JS[i] > JS[Smax]: Smax = i` in the loop), finding the minimum, summing the scores (`FS = 0` before the loop, or starting from `JS[1]`), calculating `FS = (FS - JS[Smax] - JS[Smin]) / 3`, and overall correctness (correct loop ranges, all JS values retained, no extra statements that cause mistakes).
> ✘ Writing the loop as `range(2, N)`; no initial values for Smax, Smin or FS; adding only JS[2] to JS[5]; using `or` instead of `and`; changing the contents of JS to find the extreme values.

```python
N = 5
Smax = 1
Smin = 1
FS = JS[1]
for i in range(2, N + 1):
    FS = FS + JS[i]
    if JS[i] > JS[Smax]:
        Smax = i
    elif JS[i] < JS[Smin]:
        Smin = i
FS = (FS - JS[Smax] - JS[Smin]) / 3
```

⚠ If the question's indexes start from 1, leave `JS[0]` unused, e.g. `JS = [0, 68, 84, 82, 80, 92]`.

### Searching for an item in a list and reporting the result

```python
present = [2, 6, 9, 10, 12, 15, 18, 21]
target = int(input("Enter class number: "))
found = False
i = 0
while i < len(present) and not found:
    if present[i] == target:
        found = True
    else:
        i = i + 1
if found:
    print("Found at index", i)
else:
    print("Not found")
```

Once found, `found` becomes `True` and the loop stops, so the remaining elements need not be checked. Python's `in` operator (e.g. `target in present`) tells directly whether an item exists, but it is extension content; when a question asks for the search steps, do not just write `in`.

### Finding the length of a string

```python
s = input("Enter a string: ")
print(len(s))            # built-in function

count = 0                # without len(): count character by character
for ch in s:
    count = count + 1
print(count)
```

### Extracting required characters from a string

Like a list, a string can be accessed character by character by index.

```python
prod_id = "2025-BEV-045"
year = ""
for i in range(0, 4):            # indexes 0 to 3: the year
    year = year + prod_id[i]
category = prod_id[5] + prod_id[6] + prod_id[7]
print(year, category)            # 2025 BEV
```

Python's slicing `prod_id[0:4]` and `prod_id[5:8]` gives the same results (the end index is excluded), but it is extension content.

### Counting the items that meet specified criteria

```python
marks = [42, 78, 65, 91, 56, 73, 38, 69]
count = 0
for i in range(0, len(marks)):
    if marks[i] >= 50:
        count = count + 1
print("Number of passes:", count)
```

To count even numbers, change the condition to `marks[i] % 2 == 0`; to count how many times a character appears in a string, compare character by character instead.

### Checking whether the values in a list are in order

```python
def is_ascending(L):
    for i in range(0, len(L) - 1):
        if L[i] > L[i + 1]:
            return False
    return True

print(is_ascending([1, 3, 5, 5, 8]))    # True
print(is_ascending([3, 5, 4, 8]))       # False
```

- N elements need only N − 1 comparisons of adjacent pairs, so the loop stops at `len(L) - 1`; with `range(0, len(L))`, the last iteration accesses `L[len(L)]` and causes a run-time error.
- To check descending order, change the condition to `L[i] < L[i + 1]`.
- [2024 P1B 4(c)] To check whether an array is in ascending order, the condition is `A[i] > A[i+1]`, with indexes from 0 to 4 (six elements).

### Using mathematical formulas

```python
# Monthly mortgage payment M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)
P = float(input("Loan amount: "))
annual_rate = float(input("Annual interest rate (e.g. 0.04): "))
years = int(input("Loan term in years: "))
r = annual_rate / 12
n = years * 12
M = P * r * (1 + r) ** n / ((1 + r) ** n - 1)
print(f"Monthly payment: ${M:.2f}")
```

⚠ Put the denominator in brackets. The HKEAA stated that writing `(left + right) / 2` as `left + right / 2` is an error that affects the logic and gets no marks.

## 3.11 Self-test

<details><summary>1. Which of the following are valid Python variable names? total_score_1, 1st_result, user-name, while, _count</summary>

`total_score_1` and `_count`. `1st_result` starts with a digit, `user-name` contains a hyphen, and `while` is a reserved word.
</details>

<details><summary>2. Write down the results: (a) 22 // 5 (b) 22 % 5 (c) 22 / 5 (d) 2 ** 3 + 1</summary>

(a) `4`; (b) `2`; (c) `4.4`; (d) `9`.
</details>

<details><summary>3. After counter = 5, the statement counter *= 2 + 1 is executed. What is the value of counter?</summary>

`15`. A compound assignment first evaluates the right-hand side `2 + 1 = 3`, then calculates `5 * 3`.
</details>

<details><summary>4. A programmer writes radius = input("Radius: ") and then calculates 3.14 * radius ** 2, which gives an error. Why? How should it be corrected?</summary>

`input()` returns a string, which cannot be used in arithmetic. Write `radius = float(input("Radius: "))`.
</details>

<details><summary>5. Write down the numbers produced by range(10, 2, -2).</summary>

10, 8, 6, 4 (2 is not included).
</details>

<details><summary>6. Convert the pseudocode "if (the remainder of (N / 2)) = 0 then output 'Even' else output 'Odd'" into Python.</summary>

```python
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```
</details>

<details><summary>7. This program should find the fastest time. Why is the result wrong? fastest = 0; for t in times: if t < fastest: fastest = t (times = [10.05, 9.98, 10.12])</summary>

The initial value 0 of `fastest` is smaller than every time, so the condition is never true and the result is wrongly 0. Use `fastest = times[0]` as the initial value.
</details>

<details><summary>8. This program should check whether a list is in descending order but gives an error when run: for i in range(len(arr)): if arr[i] < arr[i + 1]: return False. Find the error and correct it.</summary>

In the last iteration `i = len(arr) - 1`, so `arr[i + 1]` is out of range and causes a run-time error. Change it to `for i in range(len(arr) - 1):`.
</details>

<details><summary>9. Write a Python program to find the sum of all odd numbers in the list numbers.</summary>

```python
total_odd = 0
for i in range(0, len(numbers)):
    if numbers[i] % 2 != 0:
        total_odd = total_odd + numbers[i]
print(total_odd)
```
</details>

<details><summary>10. Write a function find_target(numbers, target) that returns the index of target if found, or −1 otherwise.</summary>

```python
def find_target(numbers, target):
    for i in range(len(numbers)):
        if numbers[i] == target:
            return i
    return -1
```

`return` sends back the index as soon as the target is found, ending the function.
</details>

<details><summary>11. Cinema tickets: $50 for under 12, $40 for 65 or above, $80 for everyone else. Write the program with if, elif and else. Why does the second condition use elif rather than another if?</summary>

```python
age = int(input())
if age < 12:
    price = 50
elif age >= 65:
    price = 40
else:
    price = 80
print(price)
```

`elif` makes the three cases mutually exclusive: the next condition is checked only when the previous ones are false, and `else` runs only when none is true. With a separate `if`, the `else` pairs only with the second `if`, so the price for under-12s would become 80.
</details>

<details><summary>12. The string code = "INV-2024-HK". Without slicing, write a program to extract the year "2024".</summary>

```python
year = ""
for i in range(4, 8):
    year = year + code[i]
print(year)
```
</details>
