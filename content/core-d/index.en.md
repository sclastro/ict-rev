> For: HKDSE Information and Communication Technology, new curriculum (examinations from 2025 onwards)
> Sources: CDC–HKEAA *ICT Curriculum and Assessment Guide*; HKEAA exam briefing materials 2023–2025; the 2025 Sample Paper; the 2012 Practice Paper; past papers and marking schemes; the HKACE 2025 and 2026 mock examinations
> Labels: [2025 P1A Q38] means 2025 HKDSE Paper 1A Question 38; [adapted from 2025 Mock P1A Q37] means a question adapted from the Hong Kong Association for Computer Education 2025 mock examination; "⚠" marks a common mistake reported by the HKEAA; "✔" marks a high-scoring answer
> The 2023 and 2024 questions, and earlier ones, come from the old-curriculum HKDSE. Module D is largely the same in the old and new curricula, so these questions are still useful

For the paper structure and the HKEAA's answering principles, see [Exam Strategies: Paper Structure and Answering Principles](../exam/structure.html).

## Module D in the new curriculum
| Part | Module / option | Suggested hours |
|---|---|---|
| Compulsory (144 hours) | A Information Processing | 37 |
| | B Computer System Fundamentals | 20 |
| | C Internet and its Applications | 31 |
| | **D Computational Thinking and Programming** | **48** |
| | E Social Implications | 8 |
| Elective (76 hours, choose two) | A Databases, B Web Application Development, C Algorithm and Programming | 38 each |

Module D has the most teaching hours in the compulsory part. Students learn to analyse problems systematically, represent algorithms with pseudocode or program flowcharts, trace how variable values change in an algorithm, and write, test and improve simple programs. It has four topics:

| Topic | Hours | Textbook chapters |
|---|---|---|
| a. Problem Formulation and Analysis | 5 | Ch. 1 |
| b. Algorithm Design | 12 | Ch. 2 (algorithms, dry runs, data types, Boolean logic), Ch. 3 (control structures, arrays, trace tables, modules) |
| c. Program Development | **20** | Ch. 4 (variables, operators, input and output), Ch. 5 (sequence, selection, iteration, functions), Ch. 6 (common programs) |
| d. Program Testing and Debugging | 11 | Ch. 7 (data validation, test data, error types), Ch. 8 (comparing algorithms) |

The HKEAA reported that in the 2025 Paper 1A candidates performed best in "Computational Thinking and Programming", but many still lost marks in the programming questions of Section B. Common causes were wrong loop ranges, variables without initial values, and confusing array indexes with array contents.

**Programming language**: Paper 1 Section B requires candidates to write programs in a specified language. The 2025–2027 HKDSE accepts Python, C++ or Pascal; from 2028 only Python and C++ are accepted. All program code on this site is in Python, and the pseudocode follows the style of HKEAA papers (see Section 2.2 of [Topic b](b.html)).

## Recent examination focus
| Year | Questions related to Module D |
|---|---|
| Sample Paper | Section A Q26–36 (reasons for defining the scope of a problem, Boolean expressions, defining the scope of service first, dry run on an array, input causing a run-time error, shifting array elements, input–process–output, deleting the P-th value in an array, flowchart with an array, boundary cases); Section B Q3 (processing an array of binary digits with a loop), Q4 (searching for a string in an array, test values, efficiency of an algorithm), Q9 (data types, calculating a total, finding the position of the lowest amount, advantages of a modular approach) |
| 2025 | Section A Q27–38 (preventing an infinite loop, comparing two flowcharts, test data, validating input with a loop, equivalent algorithms, selection conditions, dry runs on arrays and loops, finding a remainder); Section B Q6 (reversing and shifting a character array), Q8 (scoring program: indexes of the highest and lowest scores, data type, number of comparisons, writing a program, validating scores), Q9 (check digit of a username, converting a flowchart to pseudocode and correcting errors) |
| 2024 | Section A Q27–33 (for loop, nested selection, repeat…until loop, controlling a search with a flag, advantages of modularity); Section B Q4 (purposes of invalid test data, algorithms validating positive values and ascending order, algorithm finding the most frequent value) |
| 2023 | Section A Q6 (test values), Q27–33 (while loop, summing an array, converting between for and while loops, for loop, counting by input, finding the maximum, advantages of a modular approach); Section B Q3 (sorting subprogram: swapping, tracing, number of swaps, choosing test data) |

## One-page checklist before the exam

**Problem formulation and analysis**
- [ ] Four elements of computational thinking: decomposition, pattern recognition, abstraction, algorithm design
- [ ] Order of problem solving: define the problem and its scope → analyse inputs and outputs → design the algorithm → write the program → test and debug → document and evaluate
- [ ] When defining the scope, state the people, place and time involved, so that the problem can be decomposed into sub-problems effectively
- [ ] Analysing a problem: list the inputs, process and outputs; an input is data that must be obtained before the problem can be solved
- [ ] Advantages of modularity: modules can be reused, are easier to design and test, make debugging easier, and allow parallel development; modularity does **not** make a program run faster

**Algorithm design**
- [ ] Flowchart: oval (start/end), parallelogram (input/output), rectangle (process), diamond (decision)
- [ ] A pre-test loop (while) may not execute at all; a post-test loop (repeat…until) executes at least once
- [ ] "repeat … until condition" stops when the condition is true; "while condition" continues while the condition is true
- [ ] De Morgan's laws: NOT (A OR B) = NOT A AND NOT B; NOT (A AND B) = NOT A OR NOT B
- [ ] Order of precedence: NOT → AND → OR
- [ ] Phone numbers and student IDs use string; average marks and amounts of money use real; membership status uses Boolean
- [ ] Inserting an item: shift from the last item backwards; deleting an item: move each following item forward, starting from the deleted position
- [ ] When finding the maximum or minimum, use the first element as the initial value, not 0

**Program development (Python)**
- [ ] `input()` returns a string; convert it with `int()` or `float()` before calculation
- [ ] `/` gives a real number; `//` gives the quotient; `%` gives the remainder; the pseudocode "the remainder of (A / 2)" is `A % 2`
- [ ] Only `range(1, N + 1)` includes N; `range(2, N)` does one iteration too few
- [ ] When the array indexes in a question start from 1, the Python program uses the same indexes as the question and leaves `L[0]` unused
- [ ] Set initial values before accumulating or counting; keep the original contents of the array when finding the index of the maximum

**Program testing and debugging**
- [ ] Test data should include normal data, boundary data and unreasonable data; for the range 0 to 100, try −1, 0, 50, 100, 101
- [ ] Syntax error: breaks the rules of the language, so the program cannot run; logic error: the program runs but gives wrong results; run-time error: an error occurs during execution and the program stops, e.g. division by zero, index out of range
- [ ] Validation makes sure the input is reasonable; verification makes sure the input matches the source
- [ ] Compare algorithms by the number of steps (comparisons) and resource usage (memory); stopping once the target is found reduces the number of steps
- [ ] Using a variable N instead of the constant 5 means only one place needs changing when the amount of data changes
