## 1.1 Curriculum requirements

Define a problem and its scope; analyse a problem by identifying the required inputs and outputs and stating the processes required, e.g. calculating interest on mortgages and listing the instalments, finding the Body Mass Index (BMI), programming a robot to detect and trace lines; solve a problem by decomposing it into smaller, manageable sub-problems, e.g. sub-problems representing the input, process and output of the solution; identify common elements across similar problems, e.g. modifying "sort students by height in ascending order" into "sort by weight in descending order", or "make a robot move in a square" into "move in other polygons".

## 1.2 Computational thinking

**Computational thinking** is a way of thinking about and solving problems in the manner a computer solves them. It does not have to involve a computer: everyday problems can be handled in the same way. Computational thinking has four elements:

| Element | Meaning | Example (organising a class outing) |
|---|---|---|
| Decomposition | Break a complex problem into smaller sub-problems that are easier to handle | Split into choosing a venue, booking a coach, collecting fees, arranging activities |
| Pattern recognition | Find similarities between problems and reuse or modify an existing solution | Reuse last year's fee table, changing only the number of students and the coach fare |
| Abstraction | Keep only the information needed to solve the problem and ignore irrelevant details | To work out the coach fare, only the number of people and the distance matter, not the students' names |
| Algorithm design | Set out a series of clear, ordered steps to solve the problem | Write the steps for roll call, boarding, departure and assembly |

Not every problem needs all four elements; a simple problem may need only an algorithm.

⚠ A program that processes the judges' scores and ignores the judges' names is applying **abstraction**, not decomposition.

## 1.3 Steps in problem solving

Systematic problem solving generally follows this order:

| Step | Work |
|---|---|
| 1. Define the problem | State clearly what problem is to be solved and its scope |
| 2. Analyse the problem | Identify the required inputs, outputs and processes |
| 3. Design the algorithm | Write the steps of the solution in pseudocode or a program flowchart |
| 4. Write the program | Convert the algorithm into program code |
| 5. Test and debug | Check the program with different test data, then locate and correct errors |
| 6. Document and evaluate | Write program documentation and a user manual, and evaluate whether the solution solves the problem |

Following these steps keeps the goal clear, avoids wasted effort, makes division of work easier and helps control risks, but it does not guarantee that a solution will be found faster.

> ⚠ **[2012 Practice Paper P1A Q31] What is the correct order of these problem-solving tasks? (1) Outline the input and output requirements of the problem (2) Define the scope of the problem (3) Evaluate the output of the solution (4) Complete the testing and debugging**
> ✔ (2) → (1) → (4) → (3). Define the scope first, then analyse the inputs and outputs; evaluate only after testing and debugging are complete.
> ✘ Putting "outline the inputs and outputs" before "define the scope".

[Sample Paper Section A Q28] An insurance company asks its IT project manager to build web pages for clients. The manager should first define the scope of the service, and only then evaluate the equipment needed, estimate the completion date and recruit programmers.

## 1.4 Defining a problem and its scope

When defining a problem, state clearly **the people involved**, **the place** and **the time**, so that the problem is specific and measurable.

| Weak definition | Better definition |
|---|---|
| The library's borrowing system is slow. | Students (people) in the school library (place) have to queue for more than 10 minutes to borrow books at lunchtime (time); the new system should halve the waiting time by next term. |
| The food delivery app is hard to use. | Elderly users (people) ordering on their phones at home (place) often pick the wrong dishes because the text is too small (problem); the interface must be improved within three months (time). |

A clearly defined scope helps to:
- **decompose the problem effectively** into sub-problems;
- decide which functions are needed and which are not, avoiding wasted time and resources;
- give everyone the same understanding of the goal, so that the solution can be evaluated later.

> ⚠ **[Sample Paper Section A Q26] Mary needs to define the scope of a problem precisely. What is/are the major reason(s)? (1) She can break down the problem into sub-problems effectively (2) She can use a truth table to illustrate the solution (3) She can ignore the boundary cases when testing the algorithm**
> ✔ (1) only.
> ✘ Choosing (3): boundary cases must always be tested, however clear the scope is.

## 1.5 Analysing a problem: input, process, output

When analysing a problem, identify three parts:

| Part | Meaning | BMI example |
|---|---|---|
| Input | Data that must be obtained before the problem can be solved | Weight (kg), height (m) |
| Process | The steps or formula that turn the input into the output | BMI = weight ÷ height², then classify by range |
| Output | The expected result | BMI value and category |

BMI categories commonly used in Hong Kong: below 18.5 underweight, 18.5 to 22.9 normal, 23 to 24.9 overweight, 25 or above obese.

**More examples**

| Problem | Input | Process | Output |
|---|---|---|---|
| Loan instalments | Loan amount, annual interest rate, loan term | Work out the monthly rate and number of payments, then the monthly payment by formula | Monthly payment, total interest |
| Route-planning app | Current location, destination | Search for possible routes and compare journey times | Suggested route, time needed |
| Calorie counter | Food eaten, portions | Look up the calories per portion of each food, multiply by the portions and add up | Total calories for the day |

[adapted from 2022 P1A Q32] A route-planning app needs at least the user's "current location" and "destination". Information unrelated to the search result, such as the delivery rider's name or the calories in a meal, is not required input.

**Line-tracing robot**: the robot has a left and a right sensor underneath.

| Left sensor | Right sensor | Action |
|---|---|---|
| Detects the line | Detects the line | Move forward |
| Detects the line | Does not detect the line | Turn left |
| Does not detect the line | Detects the line | Turn right |
| Does not detect the line | Does not detect the line | Stop |

The program reads the sensors in a loop that repeats forever, and uses selection to decide the action.

> ⚠ **[Sample Paper Section A Q32] An input–process–output cycle: three numbers are input, the flowchart in the process part adds them and divides by 3, and the average is output. Which statement is not correct?**
> ✔ "The IPO cycle illustrates the data type and data structure" is not correct. It shows the problem (finding the average of three numbers) and its solution; the control structure in the process part is a sequence.
> ✘ Thinking that an IPO cycle must state the data types.

## 1.6 Decomposing a problem

Three methods are commonly used to break a large problem into sub-problems:

| Method | How | Example |
|---|---|---|
| Top-down approach | Start from the whole and break it down level by level | School app → login, timetable, homework submission, notifications |
| Modularisation | Divide the solution into independent modules, each developed and tested separately | A smart home divided into lighting, security cameras and temperature control subsystems |
| Stepwise refinement | Expand outline steps step by step into detailed steps | "Prepare vegetables" → wash, slice, put in a bowl → refine each step further |

After decomposition, the sub-problems often correspond to the input, process and output of the solution. For example, a BMI program can be split into three modules: input data, calculate BMI, output result.

**Advantages of decomposition**

| Advantage | Explanation |
|---|---|
| Simplifies the problem | Each sub-problem is smaller and easier to understand and design |
| Easier debugging | Errors are confined to individual modules and are easier to locate |
| Parallel development | Team members can work on different modules at the same time, shortening development time |
| Reusability | Modules can be reused elsewhere in the program or in other projects |
| Easier to extend and modify | Adding a function or changing one part does not affect other modules |

⚠ Decomposition and modularisation do **not** make a program run faster, nor do they guarantee that the program is free of errors.

## 1.7 Pattern recognition: identifying common elements across similar problems

When facing a new problem, first find what it has in common with problems already solved, then modify the existing solution.

| Existing solution | Common element | Problem solved after modification |
|---|---|---|
| Sort students by height in ascending order | Compare one item of data for two students and swap them if they are out of order | Sort by weight in descending order: compare weight instead, and change "greater than" to "less than" |
| Robot moves in a square: repeat 4 times "move forward, turn 90°" | Repeat n times "move forward, turn by some angle" | Regular n-sided polygon: repeat n times, turning 360° ÷ n each time |
| Validate a 6-digit PIN | Check the length and the characters used | Validate an 8-character staff ID: change the length and the allowed characters |

Algorithm for a regular n-sided polygon:

```text
input n
for i from 1 to n
    move forward 100 steps
    turn left (360 / n) degrees
```

⚠ Pattern recognition does not mean memorising a solution and reusing it unchanged; it means finding the similarities and then modifying the solution for the new situation.

## 1.8 Self-test

<details><summary>1. Name the four elements of computational thinking.</summary>

Decomposition, pattern recognition, abstraction, algorithm design.
</details>

<details><summary>2. The student union wants to develop an online voting system. Which of the following defines the scope of the problem most clearly? A. The voting system should be easy to use B. S4 to S6 students of the school (people) vote on the school intranet (place) during the student union election (time), and the system must prevent repeated voting C. The system should use the latest technology D. The voting system must have no errors</summary>

**B**. Only B states the people, time, place and the problem to be solved.
</details>

<details><summary>3. A currency converter inputs an amount in US dollars, calculates "HKD = USD × 7.8" and outputs the amount in Hong Kong dollars. Someone says "the process part must use a selection structure". Do you agree?</summary>

No. The process part has only one formula; a sequence is enough and no selection is needed.
</details>

<details><summary>4. Give two inputs and one output for calculating the monthly payment of a mortgage loan.</summary>

Inputs: loan amount (or property price and loan-to-value ratio), annual interest rate, loan term (any two). Output: monthly payment.
</details>

<details><summary>5. Three programmers develop a mobile game together using a modular design. What is the main advantage?</summary>

Each programmer can develop and test different game functions independently, so the work can proceed in parallel and development time is shortened. Modularity does not make the game run faster or reduce its file size.
</details>

<details><summary>6. Splitting a "smart home" project into lighting control, security camera and temperature control subsystems is which method of decomposition?</summary>

Modularisation. Each subsystem is a module that can be developed and tested independently.
</details>

<details><summary>7. Explain "stepwise refinement" and write the main first-level steps of "prepare vegetables".</summary>

Stepwise refinement expands outline steps level by level into more detailed steps. First level: 1. wash the vegetables; 2. slice the vegetables; 3. put them in a bowl.
</details>

<details><summary>8. A robot moves in a square with "repeat 4 times: move forward 50 steps, turn right 90°". How should it be modified to move in a regular hexagon? Which element of computational thinking does this apply?</summary>

Repeat 6 times, turning right 360° ÷ 6 = 60° each time. This applies pattern recognition: identify the common pattern "repeat n times: move forward and turn", then change the number of repetitions and the angle.
</details>

<details><summary>9. When calculating competition results, a programmer processes only the judges' scores and ignores the judges' names and districts. Which element of computational thinking is applied? Explain.</summary>

Abstraction. The program keeps only the information needed to solve the problem (the scores) and ignores details irrelevant to the calculation (names and districts).
</details>

<details><summary>10. Give two advantages of decomposing a large program into modules, and one common misconception.</summary>

Advantages: modules can be reused; they are easier to design and test; debugging is easier; work can be divided and done in parallel (any two). Misconception: thinking that modularity makes a program run faster or use less memory.
</details>
