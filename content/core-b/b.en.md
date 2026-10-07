## 2.1 Curriculum requirements

Know the functions of system software and application software, and the relationship between hardware, system software, application software and users; outline the basic functions of an operating system, describe some common operating systems, and explain their differences and applications; state the functions and uses of utility programs and driver programs (examples of utility programs include data compression, virus detection, file management, disk defragmentation and system monitoring software; technical details are not required); distinguish the characteristics and applications of different types of computer systems, including batch processing systems, online interactive systems, real-time systems, parallel processing systems, distributed processing systems and virtualisation.

## 2.2 System software and application software

| Comparison | System software | Application software |
|---|---|---|
| Role | Manages and controls hardware resources; provides a platform for application software | Runs on the platform provided by system software and performs specific tasks for users |
| Components or types | Operating system, utility programs, driver programs | Productivity software (word processing, spreadsheets, presentations, databases), communication software (browsers, email), multimedia software, entertainment software, educational software |
| Installation | Usually pre-installed; a computer cannot work without an operating system | Installed by users as needed |

The relationship between hardware, software and users:

**User ↔ user interface ↔ application software ↔ system software (operating system) ↔ hardware**

System software is the intermediary between application software and hardware. Application software cannot run without an operating system.

> ✔ **[Sample Paper Section B 1(b)] We do not use system software to play a video. Why?**
> System software helps manage hardware resources. It includes the operating system, utility programs and driver programs, and provides an interface between the hardware and users. Playing a video is the job of application software, such as a media player.

> ✔ **[2024 P1B 4(c)] Suggest a function of application software and system software respectively during the operation of a dot-matrix display board.**
> Application software: lets users manage, edit or choose the image patterns to be displayed.
> System software: the driver program allows the system to communicate with and control the display board.

## 2.3 User interfaces

| | Graphical user interface (GUI) | Command line interface (CLI) |
|---|---|---|
| How it is used | Click icons and menus with a pointing device | Type text commands with a keyboard |
| Advantages | Easy to learn; no need to remember commands; visually attractive | Uses fewer computer resources; experienced users can carry out complex tasks quickly; suits batch processing of repetitive tasks |
| Disadvantages | Uses more memory and processing power | Commands must be remembered; long learning time |
| Main users | General users | System administrators, programmers |

Example: to create hundreds of user accounts on a server from the data in a text file, running commands in a CLI is more efficient than creating them one by one in a GUI.

## 2.4 Functions of an operating system

The operating system (OS) is the essential part of system software. Its main functions are:

| Function | Description |
|---|---|
| Managing input and output devices | Controls peripheral devices and communicates with them through driver programs |
| Managing memory | Allocates RAM to different programs |
| Managing files | Organises folders, transfers files between main memory and secondary storage, allocates storage space, protects and recovers files |
| Managing processors and jobs | Allocates hardware resources and schedules jobs |
| Managing network communication | Sets up and coordinates network activities |
| Managing system security | User accounts, passwords, access rights |
| Providing a user interface | Lets users operate the computer and run application software |

> ⚠ **[2025 P1A Q12] Which of the following are the functions of an operating system? (1) Managing input and output devices (2) Managing system security (3) Managing computer's memory**
> ✔ All three. Only 45% of candidates answered correctly; 36% left out "managing system security".

⚠ The following are not functions of an operating system: storing user programs permanently [2023 P1A Q16]; playing video files [2024 P1A Q21]; editing text files.

Updating an operating system frequently fixes security loopholes and reduces the chance of virus attacks [2023 P1A Q40].

## 2.5 Common operating systems

| Type | Examples | Features |
|---|---|---|
| Network operating systems | Windows Server, Linux | Used on servers; multi-user; provide central storage, shared peripherals and advanced security |
| Desktop operating systems | Microsoft Windows, macOS | Used on desktop and notebook computers; high hardware expandability and software compatibility |
| Mobile operating systems | Android, iOS, iPadOS | Used on smartphones, tablets, wearables and IoT devices; mainly touch-based GUIs |

Other comparisons:

- **Open source and proprietary**: Linux and Android are open source; Windows, macOS and iOS are proprietary.
- **Hardware**: Windows runs on hardware from different brands; macOS runs only on Apple computers.
- **Multitasking**: today's operating systems can run several programs at the same time. The early Disk Operating System (DOS) was single-tasking and had only a command line interface.

## 2.6 Compatibility and cross-platform software

A program written for one operating system usually cannot be installed or run directly on another.

> ⚠ **[2025 P1B 7(b)(ii)] Mr Li develops a program to run on a tablet computer, but the program cannot be installed on a notebook computer. Why?**
> ✔ The two computers have different operating systems; or the program is not cross-platform.
> ✘ Weaker candidates wrote "different systems", which is imprecise. Write "operating system".

> ⚠ **[2023 P1B 1(c)] Give a benefit of using a word processor that runs on a browser and of installing a word processor on a laptop. Why might the installation fail?**
> ✔ Browser version: updated functions are provided; no installation is required; it can be used on other computers. Installed version: no Internet connection is required; more functions can be provided.
> ✔ Installation failure: not compatible with the operating system; not enough storage space.
> ✘ "Not compatible with the computer system" gets no mark: "operating system" cannot be replaced by "computer system", though "system software" is accepted. "Saves storage" alone also gets no mark; you must explain that nothing needs to be downloaded and installed.

**Cross-platform** software can run on several operating systems. For example, a Java program is compiled into bytecode, which can run on any operating system with a Java Virtual Machine (JVM). A web-based application only needs a browser, so it can also be used on different operating systems.

✔ A JVM only runs Java programs. An old game not written in Java will not run on a new operating system just because a JVM is installed.

## 2.7 Utility programs

Utility programs help the operating system protect data, optimise the system and manage resources.

| Utility program | Function |
|---|---|
| File manager | Copies, deletes and renames files, and organises them in a directory structure |
| File compression utility | Compresses one or more files into a smaller file for easier sending and backup |
| Antivirus software | Uses virus definition files to find known viruses, and cleans, deletes or quarantines infected files; virus definitions must be updated regularly |
| Software firewall | Monitors and controls incoming and outgoing network traffic, blocking unauthorised access |
| Backup utility | Copies selected files or a whole disk; can run automatically on a schedule |
| Data recovery utility | Recovers damaged or accidentally deleted files |
| Uninstaller | Removes an application and its related files completely |
| Disk scanner | Detects and fixes logical errors on storage devices |
| Disk defragmenter | Rearranges scattered file fragments on a traditional hard disk into contiguous locations to speed up access |
| Disk cleanup | Deletes temporary and unneeded files to free up storage space |
| System monitoring software | Shows the running processes, CPU and memory usage, and network traffic |

✔ Defragmentation only applies to traditional hard disks. SSDs use random access, so fragmentation does not slow them down, and defragmenting causes unnecessary writes; SSDs use TRIM to manage unused blocks instead.

System monitoring software provides information on current processes, memory usage and network traffic [Sample Paper Section A Q16]. When a server slows down at peak times, system monitoring software can help find the cause [adapted from 2026 Mock P1B 5(c)].

⚠ When a computer is infected by ransomware, disconnect the network connection and shut down the computer immediately. Running an antivirus program alone is not enough [2024 P1A Q18; see Module C].

## 2.8 Driver programs

A driver program lets the operating system communicate with a specific peripheral device. The HKEAA regards driver programs as essential components of operating systems.

- Operating systems already include driver programs for common devices (such as keyboards, mice and some printers), so these devices can be used as soon as they are connected [2023 P1A Q19].
- Driver programs for other devices are provided by the manufacturers. **Different operating systems need different driver programs.**
- Software reasons why a new printer does not work: the driver has not been installed, or the driver is corrupted [2012 Practice Paper P1B 3(d)(iii)].

> ⚠ **[2024 P1A Q17] Driver programs P and Q are used in video conferencing and printing respectively. Which of the following descriptions is reasonable?**
> ✔ P allows the operating system and web cameras to interact with each other.
> ✘ 22% of candidates chose "Q can be executed in different operating systems". Driver programs depend on the operating system and cannot be used across operating systems. They also do not control the number of concurrent users or the user rights for printing.

> ⚠ **[2025 P1B 5(b)] What is the major function of a printer's driver program? What is the benefit of using the latest version?**
> ✔ Function: it facilitates communication between the printer and the operating system; it interprets print jobs for the printer to execute; it handles error messages from the printer.
> ✔ Latest version: it ensures compatibility with the operating system; it provides up-to-date functions; it fixes bugs in previous versions.
> Only a small number of candidates identified the core function of the driver program.

## 2.9 Modes of operation of computer systems

| Mode | Features | Examples |
|---|---|---|
| Batch processing | Jobs are collected into a batch and processed together on a schedule, without user interaction | Payroll, printing bank statements, school report cards, scheduled backups, scheduled virus scans |
| Online interactive processing | Receives requests through a network and responds within seconds to minutes | Online shopping, online enquiries, search engines, web-based email |
| Real-time processing | Processes input data **immediately** and responds | ATMs, booking systems, autonomous driving, security alarms, flight simulators |
| Parallel processing | Several processors or cores in **one computer** work on tasks at the same time | Big data analysis, training AI models, scientific computing |
| Distributed processing | Several computers connected by a **network** share the same job | Computer animation rendering, large online services |

**1. Batch processing**

Batch processing makes good use of computer resources, schedules time-consuming jobs for off-peak hours and has relatively low operating costs; its drawback is that the results are not up to date.

> ⚠ **[2023 P1B 5(b)(i)] A device continuously records a member's heartbeat rate, and the data file is uploaded to the server every 5 minutes. Is this a batch processing system or a real-time processing system?**
> ✔ Batch processing, because data is collected over a period of time and then uploaded together; the system does not process the latest data immediately.
> ✘ "It is scheduled to upload data every 5 minutes" alone gets no mark; you must explain that the data is accumulated before it is processed.

> ✔ **[2024 P1B 2(b)(ii)] Antivirus software shows warnings on two occasions: A "The file cannot be executed because it contains a virus"; B "Viruses are detected in a scheduled scan". Which mode best describes each?**
> A is real-time processing: the file is scanned immediately when it is opened. B is batch processing: many files are scanned together at a scheduled time.

**2. Real-time processing**

A real-time system needs enough memory and processing power to respond in the shortest time. To reduce downtime, it usually has backup hardware and software, so it costs more to build and run.

✔ A booking system with several booking counters in different locations in a city is best described as a **real-time system**, because each purchase must update the seats immediately to avoid selling the same seat twice. Counters in different places do not make it distributed processing [Sample Paper Section A Q15].

**3. Parallel processing and distributed processing**

| Comparison | Parallel processing | Distributed processing |
|---|---|---|
| Hardware | Several processors in one computer | Several computers connected by a network |
| Network needed? | No | **Yes** |
| Coordination | Processors share memory | Each computer has its own memory and exchanges information through the network; a load manager assigns jobs and combines results |

Advantages of distributed processing: lower initial cost; easy to scale up; one computer failing does not stop the whole system, so fault tolerance is higher; resources can be managed more efficiently. Disadvantage: overall performance drops when network traffic is heavy or bandwidth is insufficient.

> ⚠ **[2023 P1A Q3] Mary only has a computer without any network connections. Which of the following systems can she carry out?**
> ✔ A real-time system and a batch processing system. Only 37% of candidates answered correctly. Distributed processing needs a network.

> ✔ **[2025 P1A Q14] Characteristics of a distributed processing system**
> Information is exchanged between processors; each processor has its own memory for processing. "A processor can execute a process only after another processor completes its process" is not a characteristic.

## 2.10 Virtualisation

Virtualisation divides the hardware resources of one physical computer into several **virtual machines (VMs)**. Each virtual machine runs its own operating system and applications independently.

| Application | Description |
|---|---|
| OS virtualisation | Runs another operating system within the current one, e.g. Linux on a Windows computer, which helps software development and testing |
| Server virtualisation | A hypervisor partitions one physical server into several virtual servers; this is the foundation of cloud computing |

> ⚠ **[2025 P1A Q13] Which of the following are examples of applications of virtualisation?**
> ✔ Creating a virtual environment using a different operating system within the current operating system; partitioning a physical server into several virtual servers for running multiple application programs.
> ✘ "Combining several physical hard disks into a single virtual storage device" **does not count**. The HKEAA explained that this is storage aggregation, similar to RAID-like systems, not virtual machines. Only 52% of candidates answered correctly.

| Advantages | Disadvantages |
|---|---|
| One server can provide different operating systems and software | Virtual machines respond more slowly than physical computers, especially when the server is heavily loaded |
| Software incompatible with the original computer can be run | Heavier network load |
| Better use of servers; lower hardware costs | High implementation cost |
| Lower maintenance and running costs | Not all software works properly in a virtual environment; higher risk of security loopholes |

## 2.11 Self-test

<details><summary>1. Every night a school automatically updates the database with the day's attendance records. Which mode of operation is this? Give one advantage.</summary>

Batch processing: the day's records are accumulated and processed together at night on a schedule. Advantage: the job is scheduled for off-peak hours, making good use of computer resources.
</details>

<details><summary>2. [Adapted from 2026 Mock P1B 5(b)] A shopping mall car park offers online parking space reservations. Which type of processing system should be used? Explain briefly.</summary>

A real-time processing system. Each reservation must be confirmed and the space status updated immediately, so that the same space is not reserved twice.
</details>

<details><summary>3. [Adapted from 2025 Mock P1B 1(b)] Chi-wai finds that loading files from his hard disk takes longer than half a year ago. Without upgrading any hardware, how can he improve this?</summary>

Use a disk defragmenter to rearrange the scattered file fragments into contiguous locations, so the read/write head moves less and access is faster. If the storage device is an SSD, use TRIM instead of defragmentation.
</details>

<details><summary>4. A manufacturer releases two printer models, and its customers use three different operating systems. At least how many driver programs must it write? Why?</summary>

2 × 3 = **6**. Driver programs depend on both the device and the operating system, so each printer model needs its own driver for each operating system.
</details>

<details><summary>5. A teacher has installed virtualisation software on a Windows computer to demonstrate Linux in class. What else must be installed? Give one advantage and one disadvantage of this approach.</summary>

Linux must be installed as the guest operating system. Advantage: no extra computer is needed. Disadvantage: the virtual machine responds more slowly than a physical computer.
</details>

<details><summary>6. Compared with one powerful parallel processing server, give two advantages of a distributed processing system made up of 50 networked workstations.</summary>

Lower initial cost; easy to scale up; one workstation failing does not stop the whole system, so fault tolerance is higher. (Any two)
</details>

<details><summary>7. [Adapted from 2024 P1A Q21] Which of the following are functions of an operating system? (1) Interacting with devices and facilitating input/output operations (2) Playing video files (3) Facilitating a computer to connect to a network</summary>

**(1) and (3)**. Playing video files is the job of application software such as a media player.
</details>

<details><summary>8. A technician needs to rename 500 files on a server according to a rule. Should a GUI or a CLI be used? Give one reason.</summary>

**A CLI**. One command or a batch file can process all the files at once without clicking each one, which is more efficient.
</details>

<details><summary>9. Suggest a utility program for each situation: (a) deleting temporary files to free up space; (b) finding out which program is using a lot of CPU; (c) combining 50 photos into one smaller file to send by email; (d) recovering an accidentally deleted file.</summary>

(a) Disk cleanup. (b) System monitoring software. (c) File compression utility. (d) Data recovery utility.
</details>

<details><summary>10. [Adapted from 2025 Mock P1B 7(c)] Chris cannot download and install a mobile application on his smartphone. State two possible reasons.</summary>

The smartphone's operating system or its version does not support the application; not enough storage space; no Internet connection; the hardware does not meet the minimum requirements of the application. (Any two)
</details>

<details><summary>11. State the mode of operation of each system: (a) a school prints report cards every month; (b) the autopilot of an aircraft; (c) a customer checks the stock of an online bookshop; (d) an animation company renders a film using 100 networked computers.</summary>

(a) Batch processing. (b) Real-time processing. (c) Online interactive processing. (d) Distributed processing.
</details>

<details><summary>12. After a major operating system update, a display card stops working properly, although the hardware is not damaged. Give a possible reason and a solution.</summary>

Reason: the existing display card driver is not compatible with the updated operating system. Solution: remove the old driver, then download and install the latest driver provided by the manufacturer for that display card and the new operating system.
</details>
