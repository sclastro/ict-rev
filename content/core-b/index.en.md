> For: HKDSE Information and Communication Technology, new curriculum (examinations from 2025 onwards)
> Sources: CDC–HKEAA *ICT Curriculum and Assessment Guide*; HKEAA exam briefing materials 2023–2025; the 2025 Sample Paper; the 2012 Practice Paper; past papers and marking schemes; the HKACE 2025 and 2026 mock examinations
> Labels: [2025 P1A Q12] means 2025 HKDSE Paper 1A Question 12; [adapted from 2025 Mock P1B 1(a)] means a question adapted from the Hong Kong Association for Computer Education 2025 mock examination; "⚠" marks a common mistake reported by the HKEAA; "✔" marks a high-scoring answer
> The 2023 and 2024 questions come from the old-curriculum HKDSE. Module B is largely the same in the old and new curricula, so these questions are still useful

For the paper structure and the HKEAA's answering principles, see [Exam Strategies: Paper Structure and Answering Principles](../exam/structure.html).

## Module B in the new curriculum
| Part | Module / option | Suggested hours |
|---|---|---|
| Compulsory (144 hours) | A Information Processing | 37 |
| | **B Computer System Fundamentals** | **20** |
| | C Internet and its Applications | 31 |
| | D Computational Thinking and Programming | 48 |
| | E Social Implications | 8 |
| Elective (76 hours, choose two) | A Databases, B Web Application Development, C Algorithm and Programming | 38 each |

Module B explains how the components of a computer system work together. It has two topics:

| Topic | Hours | Textbook chapters |
|---|---|---|
| a. Basic Machine Organisation | **14** | Ch. 1 (processors), Ch. 2 (main memory and secondary storage), Ch. 3 (input and output devices) |
| b. System Software | 6 | Ch. 4 |

Module B questions are usually set in everyday contexts, such as buying a computer, upgrading hardware, choosing a printer or identifying the mode of operation of a system. Answers must refer to the context and use accurate technical terms.

## Recent examination focus
| Year | Questions related to Module B |
|---|---|
| Sample Paper | Section A Q11–16 (SSD upgrade, clock rate, CPU components, computer configuration, booking system, system monitoring software); Section B Q1 (choosing a desktop computer or a smartphone for video editing, role of system software) |
| 2025 | P1A Q12–14, 16, 17 (operating system functions, virtualisation, distributed processing, memory, address size); P1B Q3(a) (upload time), Q5 (improvements in hardware specifications, driver programs), Q7(b) (tablet and notebook computers, operating system compatibility) |
| 2024 | P1A Q15–17, 19–22 (printer connection, restoring data after a power failure, driver programs, bootstrap program, cache memory, operating system functions, registers); P1B Q2 (buying a computer, RAM and SSD, download time, batch and real-time processing), Q4(c) (application and system software) |
| 2023 | P1A Q1, 3, 14, 16–19, 40 (direct access, modes of operation, CPU specifications, operating system functions, projector specifications, hardware upgrades, driver programs, system updates); P1B Q1(a)–(c) (SSD, RAM, installing software), Q5(b) (batch processing, upload time) |

## One-page checklist before the exam

**Calculations**
- [ ] Clock rate, bandwidth and data transfer rate use 1000 (1 GHz = 10⁹ Hz, 1 Mbps = 10⁶ bps); file size uses 1024 (1000 was accepted in 2025 but not in 2023, so 1024 is safer)
- [ ] B × 8 = b; show your working and give the unit (s, ms)
- [ ] Time per instruction = clock cycles per instruction ÷ clock rate
- [ ] Read time = access time + file size ÷ data transfer rate
- [ ] An n-bit address gives 2ⁿ addresses; a 32-bit address can address at most 4 GB

**Processors and memory**
- [ ] Registers that hold data or instructions: ACC, IR, MDR; MAR holds an address; PC holds the address of the next instruction
- [ ] The data bus carries data and instructions; the address bus carries addresses; the control bus carries control signals
- [ ] 16 cores does not mean "at most 16 programs at the same time"
- [ ] Address size affects the accessible memory space, not the clock rate or data transfer speed
- [ ] RAM stores the programs and data in use "temporarily"; cache memory stores "frequently used" data and instructions
- [ ] ROM stores the bootstrap program; RAM is volatile, so it cannot store the bootstrap program
- [ ] Storage devices affect access speed, not computation speed

**Storage and peripheral devices**
- [ ] Among common storage devices, only magnetic tape uses sequential access; the others use random (direct) access
- [ ] Data transfer rate: RAM > SSD > hard disk
- [ ] Projector specifications include lumens, resolution and wireless connection; 5400 rpm is a hard disk specification
- [ ] Improvements must be comparative: "higher resolution", not "high resolution"
- [ ] When asked for two reasons, give reasons from different categories

**System software**
- [ ] Managing system security is a function of an operating system; playing videos and storing programs permanently are not
- [ ] Write "operating system", not "system" or "computer system"
- [ ] A driver program lets the operating system communicate with a specific device; different operating systems need different driver programs
- [ ] Distributed processing needs a network; batch and real-time processing can run without one
- [ ] Combining several physical hard disks into one virtual storage device is not virtualisation
- [ ] Defragment traditional hard disks; SSDs do not need defragmentation
