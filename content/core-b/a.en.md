## 1.1 Curriculum requirements

Explain the functions of hardware within a computer system, namely input and output devices, processing units (the central processing unit, CPU, and the graphics processing unit, GPU), the bus system and storage devices; explain the structure and functions of a CPU and its components, know that a CPU is measured in terms of frequency, and know units such as microsecond, nanosecond and picosecond; outline the steps in the fetch-decode-execute cycle using a single processor, and describe the roles of components, registers and buses in the cycle; describe the functions and characteristics of RAM, ROM and cache memory, and the relationship among memory size, memory address, word length and computer performance; distinguish the prefixes used in computers from SI notation (1 KB = 1024 bytes, not 1000 bytes); describe the features, advantages, disadvantages and applications of input and output devices, and select appropriate devices for a given context; describe storage devices in terms of random or sequential access, volatility, data transfer rate and storage capacity; outline the latest developments in computer systems (technical details are not required).

## 1.2 Components of a computer system

The **system unit** is the main body of a computer. It contains the motherboard, the CPU, main memory, expansion slots, the power supply and storage devices. Expansion slots are used to install extra circuit boards such as display cards.

External devices connected to the system unit are called **peripherals**. They fall into four groups:

| Group | Examples |
|---|---|
| Input devices | Keyboard, mouse, scanner, microphone, web cam |
| Output devices | Monitor, printer, speaker, projector |
| Storage devices | External hard disk, USB flash drive |
| Communication devices | Modem, router, Bluetooth adapter |

Some devices are both input and output devices, such as touch screens, multifunction printers and interactive flat panels.

A computer processes data in the order **input → process → output**. The CPU processes data together with main memory, and results to be kept are written to storage devices.

## 1.3 Central processing unit (CPU)

The CPU executes program instructions and processes data. Its processing power largely determines the overall performance of a computer. The CPU of a personal computer is also called a **microprocessor**: an integrated circuit made up of billions of transistors.

| Component | Function |
|---|---|
| Arithmetic and logic unit (ALU) | Performs arithmetic operations (+, −, ×, ÷) and logical operations (comparison, AND, OR, NOT) |
| Control unit (CU) | Reads instructions from main memory, decodes them, directs other components (including the ALU) to execute them, and coordinates input and output operations |
| Register | The fastest memory unit inside the CPU; temporarily holds the data, instructions or addresses being processed |

Common registers:

| Register | Content |
|---|---|
| Program counter (PC) | The memory address of the **next** instruction to be fetched |
| Instruction register (IR) | The instruction **being executed** |
| Memory address register (MAR) | The memory **address** to be read from or written to |
| Memory data register (MDR) | The **data or instruction** read from or to be written to memory |
| Accumulator (ACC) | The results of arithmetic and logic operations; a general-purpose register |

> ⚠ **[2024 P1A Q22] Which of the following temporarily hold data or instructions? (1) Accumulator (2) Instruction register (3) Memory address register**
> ✔ The answer is (1) and (2). Only 32% of candidates answered correctly. The MAR holds an **address**, not data or instructions.

⚠ The program counter stores a memory **address**, not the instruction itself or the number of instructions [2012 Practice Paper P1A Q18]. Cache memory is not a register [2012 Practice Paper P1A Q20].

## 1.4 Graphics processing unit (GPU)

A GPU is a processor designed for graphics and massive parallel computation. It takes heavy workloads off the CPU.

| Comparison | CPU | GPU |
|---|---|---|
| Number of cores | Fewer (a few to dozens) | Many (up to thousands) |
| Design focus | Handles all kinds of instructions; executes complex tasks in sequence | Handles a large number of simple operations of the same type at the same time |
| Suitable tasks | General programs, operating systems, database queries | 3D animation, video rendering and encoding, image processing, training AI models |

GPUs come in two forms:

- **Dedicated GPU**: on a display card, with its own dedicated memory; higher performance.
- **Integrated GPU (iGPU)**: built into the CPU or motherboard and **shares main memory** with the CPU, which reduces the RAM available to the system, but uses less power and costs less.

A computer can work without a dedicated GPU, but not without a CPU. A GPU only handles certain types of computation and cannot replace the CPU.

✔ When an online AI service is used, the heavy computation is done by the remote server. Adding a GPU to the local computer does little to make the online service smoother.

## 1.5 Bus system

A bus is a set of physical lines connecting the components inside a computer. There are three types:

| Bus | What it carries | Direction |
|---|---|---|
| Data bus | Data and instructions | Two-way |
| Address bus | Addresses of memory locations or devices | From the CPU |
| Control bus | Control signals such as "read", "write" and timing signals | Two-way |

**Bus width** is the number of bits a bus can carry at the same time. A 32-bit data bus can transfer 32 bits of data at a time [adapted from 2025 Mock P1A Q16]. An address bus with n lines can represent 2ⁿ different addresses.

⚠ Control signals are carried by the control bus, not the data bus [Sample Paper Section A Q13].

## 1.6 Fetch-decode-execute cycle

The CPU executes each instruction in a **machine cycle**, also called the fetch-decode-execute cycle:

| Stage | Process |
|---|---|
| Fetch | ① The address in the PC is copied to the MAR and sent to main memory through the address bus; ② the CU sends a "read" signal through the control bus; ③ main memory sends the instruction at that address to the MDR through the data bus; ④ the instruction is copied from the MDR to the IR, and the PC points to the next instruction |
| Decode | The CU interprets the instruction in the IR to identify the operation (opcode) and the data to be used (operand) |
| Execute | The CU directs the relevant components to carry out the instruction, for example the ALU performs a calculation and the result is stored in the ACC |
| Store | The result is written back to a register or main memory; not every instruction needs this step |

✔ The CU is involved in every stage. The ALU only works in the execute stage of instructions that need a calculation.

## 1.7 CPU performance

**1. Clock rate**

The clock rate is the number of clock cycles a CPU performs per second, measured in hertz (Hz). Today's CPUs have clock rates in the GHz range.

| Frequency | Time |
|---|---|
| 1 kHz = 10³ Hz | 1 ms (millisecond) = 10⁻³ s |
| 1 MHz = 10⁶ Hz | 1 μs (microsecond) = 10⁻⁶ s |
| 1 GHz = 10⁹ Hz | 1 ns (nanosecond) = 10⁻⁹ s |
| | 1 ps (picosecond) = 10⁻¹² s |

⚠ Frequency prefixes are decimal, unlike the 1024 used for KB and MB.

**Time per instruction = clock cycles per instruction ÷ clock rate**

Example: a single-core CPU has a clock rate of 3.2 GHz, and each instruction takes 4 clock cycles.

Time per instruction = 4 ÷ (3.2 × 10⁹) = 1.25 × 10⁻⁹ s = **1.25 ns**.

Lowering the clock rate reduces power consumption and heat [Sample Paper Section A Q12]. Overclocking increases speed but produces more heat and may shorten the life of the CPU.

**2. Number of cores**

Each core of a multi-core CPU can execute instructions independently, so the CPU can process more instructions at the same time. This suits tasks that can be split up, such as video editing, rendering and server work. However, a quad-core CPU is not four times as fast as a single-core CPU, because:

- some instructions must be executed in order and cannot be shared among cores;
- the cores compete for shared resources such as main memory, buses and cache memory.

> ⚠ **[2023 P1A Q14] For a CPU with the specifications of 16 cores, 5 GHz and a 30 MB cache, which of the following are correct?**
> ✔ The clock rate of the CPU is 5 GHz; the CPU accesses data in the cache memory faster than that in RAM.
> ✘ About 45% of candidates wrongly thought that "the maximum number of programs that the CPU can handle at the same time is 16". A program often uses more than one core, and each core is not used by only one program.

CPU specifications tell you the number of clock cycles per second and the number of cores, but not how fast a program will actually run, which also depends on memory, storage devices, the type of program and so on. Similarly, the configuration "i7 CPU, 16 GB RAM, 1 TB SSD, 802.11ac Wi-Fi" only tells you the maximum data transfer rate of the wireless network, not the screen size or the start-up time [Sample Paper Section A Q14].

**3. Word length**

Word length is the number of bits of data or instructions a CPU processes at a time. A longer word length means:

- more data can be processed at a time;
- the instruction set can hold more and more complex instructions;
- more bits are available for memory addresses, so a larger memory space can be addressed.

⚠ A longer word length **does not** mean each instruction is executed faster.

> ⚠ **[2025 P1A Q17] The sizes of memory addresses of Computers P and Q are 64-bit and 32-bit respectively. Which of the following is/are correct?**
> ✔ P supports a larger accessible memory space than Q.
> ✘ The address size determines neither the clock rate nor the data transfer speed.

**4. Other factors**

Cache size, bus architecture and GPU performance also affect the overall performance of a computer.

> ✔ **[2025 P1B 5(a)] Complete the table with improvements in the hardware specifications of a desktop computer.**
> CPU: higher clock rate / larger cache size / more advanced bus architecture / larger word length.
> RAM: higher data transfer rate. Display unit: higher resolution / colour depth / refresh rate.
> 1 mark each. The question asks for "improvements", so answers must be comparative ("higher"); stating only an attribute of the component loses the mark.

## 1.8 Main memory

Main memory is installed on the motherboard and stores the data and instructions the CPU is about to process. It is divided into RAM and ROM; the CPU also contains cache memory.

| Comparison | RAM | ROM | Cache memory |
|---|---|---|---|
| Content | The operating system, programs and data in use | Bootstrap program, BIOS and other firmware | Frequently used data and instructions |
| Volatility | Volatile (content lost when power is off) | Non-volatile | Volatile |
| Can the content change? | Changes constantly during operation | Normally read-only; rewritten only when firmware is updated | Changes constantly |
| Capacity | Large (GB) | Small (MB) | Smallest (KB to tens of MB) |
| Speed | Fast | Slower than RAM | Much faster than RAM |

From fastest to slowest: **registers > cache memory > RAM > secondary storage**. Capacity is the other way round.

There are two RAM technologies: dynamic RAM (DRAM) is cheaper and denser and is used as the main memory of computers; static RAM (SRAM) is faster but more expensive and is used as CPU cache memory.

**1. RAM**

> ⚠ **[2023 P1B 1(b)] What is the main function of RAM? How can increasing the size of RAM enhance the computational power of the computer?**
> ✔ RAM **temporarily** stores the user programs and data in use; more RAM decreases the time needed to access secondary storage.
> ✘ "Stores frequently used data" gets no mark: that is the function of cache memory. "More RAM, faster computation" alone also gets no mark; the answer must show that reading from and writing to RAM is faster than secondary storage.

More RAM allows more programs to be opened at the same time. However, if the software cannot use the extra RAM, or the bottleneck is the CPU or GPU, more RAM will not improve performance [adapted from 2026 Mock P1A Q13].

**2. Cache memory**

When the CPU needs data, it first searches the cache memory (level 1 → level 2 → level 3). If the data is found, it is read directly; if not, it is fetched from RAM and a copy is stored in the cache for later use.

> ⚠ **[2024 P1A Q20] Which of the following statements about cache memory is correct?**
> ✔ It stores frequently-used data and instructions.
> ✘ It is not a type of ROM; it is not found only in the CPU, as devices such as hard disks also have caches; its data access rate is higher than that of RAM, not lower.

> ⚠ **[2025 P1A Q16] When scanning a personal computer to detect computer viruses, which type(s) of memory will be used to store a virus checker and its data?**
> ✔ Cache memory and RAM. Only 47% of candidates answered correctly. A running program is loaded into RAM, and its frequently used parts are copied into the cache; ROM is read-only and is not used to hold running programs.

**3. ROM**

ROM stores the **bootstrap program** and the **Basic Input/Output System (BIOS)**. At start-up, the bootstrap program tests the hardware and then loads the operating system into RAM [2024 P1A Q19: the bootstrap program is usually stored in ROM]. Today's ROM is mostly electrically rewritable flash memory, so firmware can be updated.

✔ The bootstrap program cannot be stored in RAM, because RAM is volatile and loses its content when power is off. It is not stored on the hard disk either, because the operating system has not been loaded at start-up, so the CPU cannot yet access the hard disk; the content of a hard disk can also be changed.

> ⚠ **[2024 P1A Q16] Eva experiences a power failure when working on word processing. Some of her working data can be restored. Why?**
> ✔ Because that data had been saved on the hard disk (for example by auto-save). RAM is volatile and loses its content in a power failure; ROM is not used to store working data. Only 53% of candidates answered correctly.

**4. Memory addresses and addressable space**

Every memory location has a unique address. An address of n bits gives 2ⁿ addresses.

Example: with 32-bit memory addresses and 1 byte per address, the maximum addressable memory = 2³² × 1 B = 4 GB. So a 32-bit computer can use at most about 4 GB of RAM, while a 64-bit computer can use far more.

## 1.9 Data units and calculations

| Use | Units | Conversion |
|---|---|---|
| Storage capacity, file size | KB, MB, GB, TB | 1 KB = 2¹⁰ B = 1024 B; each further step × 1024 |
| Clock rate | kHz, MHz, GHz | Each step × 1000 |
| Bandwidth, data transfer rate | kbps, Mbps, Gbps; MBps | Each step × 1000 |

> ⚠ **[2025 P1B 3(a)] Each photo is 5 MB and the upload bandwidth is 100 Mbps. Estimate the shortest time required to upload 200 photos.**
> ✔ (200 × 5 × 8) ÷ 100 = **80 s**.
> ✔ Also accepted: (200 × 1024 × 1024 × 5 × 8) ÷ (100 × 1000 × 1000) ≈ 84 s; (200 × 1024 × 5 × 8) ÷ (100 × 1000) ≈ 82 s.
> ✘ Using 1024 for bandwidth gets no mark; no unit gets no mark. The most common error is forgetting to convert bytes to bits (× 8), which even some Level 5 candidates did.

[2023 P1B 5(b)(ii)] 200 files of 2 KB uploaded through a 10 Mbps network: 200 × 2 × 1024 × 8 ÷ (10 × 10⁶) ≈ **0.33 s**.

[2024 P1B 2(b)(i)] Receiving a 5 GB video through a 1 Gbps network: 5 × 1024³ × 8 ÷ 10⁹ ≈ **42.9 s** (40 s using 1000, also accepted).

⚠ Using 1000 for file size was accepted in 2024 and 2025, but the 2023 marking scheme only accepted answers using 1024 (0.33 s, 0.32768 s, 0.328 s). The safest approach: use 1024 for file size and 1000 for bandwidth.

**Hard disk read time = access time + file size ÷ data transfer rate**

Example: a hard disk has an access time of 12 ms and a data transfer rate of 50 MBps. To read a 20 MB file from adjacent sectors:

12 ms + (20 × 1024 × 1024) ÷ (50 × 10⁶) s = 0.012 s + 0.419 s ≈ **0.431 s**.

If the file is scattered over 10 non-adjacent locations, each location adds another access time, so the total time increases greatly.

A **cluster** is the smallest unit of disk space allocated to a file, and one cluster can belong to only one file. Example: with 4 KB clusters, a 10 KB file uses 3 clusters (12 KB), wasting 2 KB; with 8 KB clusters, it uses 2 clusters (16 KB), wasting 6 KB.

[Adapted from 2025 Mock P1A Q12] A dashcam uses a 512 GB memory card, and every 3 minutes of video takes 15 MB:

512 × 1024 ÷ 15 × 3 = 104 857.6 minutes ≈ **1748 hours**.

## 1.10 Secondary storage devices

Secondary storage devices are non-volatile and store the operating system, application software and data for the long term. The CPU cannot process data directly in secondary storage; the data must first be loaded into RAM.

**1. Four aspects of a storage device**

| Aspect | Meaning |
|---|---|
| Access mode | **Random access** (also called direct access): the required data can be reached directly; **sequential access**: the data before it must be passed in order |
| Volatility | All secondary storage devices are non-volatile |
| Data transfer rate | The amount of data transferred per second; another measure is **access time**, the average time to locate the required data |
| Storage capacity | The maximum amount of data that can be stored |

✔ Among common storage devices, only **magnetic tape** uses sequential access; hard disks, SSDs, optical discs and flash memory cards can all be accessed directly [2012 Practice Paper P1A Q14].

> ⚠ **[2023 P1A Q1] Which of the following statements about direct access on a storage device are correct?**
> ✔ In general, the seek time to search for a file is shorter than that of sequential access; direct access is more commonly used in hard disks than sequential access.
> ✘ "Writing the data of a file starts from the beginning of the storage device" describes sequential access.

**2. Common secondary storage devices**

| Device | How it works and features | Common uses |
|---|---|---|
| Hard disk (HDD) | Magnetic platters; the read/write head moves to the track and the platter spins to the sector; large capacity, low cost per GB; has moving parts and is sensitive to shock | Large amounts of data, file servers |
| Solid-state drive (SSD) | Flash memory with no moving parts; short access time, high data transfer rate | Operating systems, application software, notebook computers |
| Magnetic tape | Sequential access, slow; very low cost per GB; can be stored offline | Long-term backup, off-site backup |
| Optical disc (CD, DVD, Blu-ray) | Read by laser; needs a disc drive; limited capacity (about 700 MB, 4.7 GB to 8.5 GB, 25 GB to 50 GB) | Distributing software and films; R can be written once, RW can be rewritten |
| USB flash drive, memory card | Flash memory; small, durable, low power | Carrying and exchanging files, cameras, mobile phones |
| Network storage | Accessed through a network, including file servers, network-attached storage (NAS) and cloud storage | Sharing files, central backup |

Optical discs are becoming less common because they need a disc drive, transfer data slowly and have limited capacity. The trend in storage devices is **larger capacity, higher speed and smaller size**.

**3. SSD and hard disk**

| | Advantages of SSD | Advantages of hard disk |
|---|---|---|
| Speed | Short access time, high data transfer rate | |
| Durability | No moving parts, shock-resistant | Less limited in write cycles; data is easier to recover after damage |
| Others | Lighter, smaller, less power, less heat, quieter | Lower cost per GB; larger capacity for the same price |

> ⚠ **[2023 P1B 1(a)] Give two benefits of replacing the hard disk with an SSD as the secondary storage of a laptop computer.**
> ✔ Faster seek time; shock resistance; lighter in weight; less heat produced during operation; less power consumption; smaller in size.
> ✘ "More silent in operation" gets no mark because it is not related to the laptop scenario. "Faster computation" is also wrong: storage devices have nothing to do with computation.

> ✔ **[2024 P1B 2(a)] Arrange SSD, HDD and RAM in descending order by their data transfer rates, and describe a functional difference between RAM and SSD.**
> RAM > SSD > HDD. RAM is volatile while SSD is non-volatile; or RAM is primary storage while SSD is secondary storage.

When upgrading a SATA SSD to an M.2 NVMe SSD with a higher data transfer rate, check that the motherboard supports it [Sample Paper Section A Q11].

**4. Network storage and cloud storage**

| | Cloud storage | Local storage (NAS, external hard disk) |
|---|---|---|
| Advantages | Access anytime, anywhere through the Internet; capacity can be scaled up or down; easy sharing; the provider handles backup, and some keep older versions to recover from ransomware | No Internet connection needed; faster transfer; data does not pass through a third party, so lower security risk; no ongoing subscription fee |
| Disadvantages | Needs an Internet connection; uploading large amounts of data takes time and mobile data; sensitive data is handed to a third party, with a risk of leakage; subscription fee | Must be bought, maintained and backed up by the user; data may be lost if the device is lost or damaged |

## 1.11 Input devices

| Group | Devices | Key points |
|---|---|---|
| Keyboard | Wired, wireless (Bluetooth, radio frequency) | Tablets usually connect to keyboards by Bluetooth |
| Pointing devices | Mouse, trackball, touchpad, track point, joystick, touch screen, digitizing tablet, stylus | A trackball does not need to be moved and saves space; touch screens suit kiosks; digitizing tablets suit graphic design |
| Scanner | Flatbed scanner, handheld scanner | Specifications: resolution (dpi), colour depth (bits); with optical character recognition (OCR) software, printed text can be converted into editable text |
| Optical readers | Bar code reader, QR code reader, optical mark reader (OMR) | Bar codes improve input accuracy; OMR is used for multiple-choice answer sheets |
| Card readers | Magnetic stripe card readers, smart card (RFID, NFC, e.g. Octopus) readers | Access control, electronic payment |
| Biometric devices | Fingerprint scanner, face recognition, voice recognition, iris scanner | Convert body features into digital codes and compare them with stored records |
| Sound and image | Microphone, digital camera, web cam, digital video camera | A microphone can work with speech recognition software; web cams are used for video conferencing |

Scanning with 24-bit colour instead of 8-bit colour captures more different colours and gives a larger file, but the resolution does not change [2012 Practice Paper P1A Q3]. A fingerprint scanner is not a pointing device.

Disadvantages of voice recognition: lower accuracy in noisy places; the system may fail to recognise a user whose voice has changed (e.g. a sore throat); someone may use a pre-recorded voice to fool the system.

## 1.12 Output devices

**1. Monitors**

| Specification | Meaning |
|---|---|
| Screen size | Diagonal length, in inches |
| Resolution | Number of pixels displayed, e.g. 1920 × 1080 (FHD), 3840 × 2160 (4K) |
| Pixel density | Pixels per inch (ppi); higher means sharper |
| Contrast ratio | Ratio of the brightest white to the darkest black, e.g. 3000:1 |
| Refresh rate | Number of times the screen is redrawn per second (Hz); higher means smoother motion, suited to games |
| Brightness | Measured in cd/m² |
| Ports | HDMI, DisplayPort, USB-C |

Monitors have developed from cathode ray tube (CRT) and liquid crystal display (LCD) to LED and OLED. OLED monitors have better colour accuracy, contrast and response time.

**2. Printers**

| Printer | Features | Suitable uses |
|---|---|---|
| Inkjet printer | High colour quality; high cost per page; nozzles may clog if not used often | Home use, photos |
| Laser printer | Fast, lower cost per page, high quality | Large volumes of printing in offices |
| Dot-matrix printer | Pins strike an ink ribbon; slow and noisy, but can print on multi-part forms | Multi-part forms |
| Thermal printer | Heats thermal paper; small and needs no ink; printouts fade | Receipts, labels |
| Plotter | Prints large printouts | Building plans, posters |

Printer specifications include print resolution (dpi), print speed (ppm, pages per minute) and connection methods (USB, Wi-Fi, Bluetooth, Ethernet). Fibre optics are not used to connect a home laser printer [2024 P1A Q15].

**3. Projectors and interactive flat panels**

Projector specifications include brightness (lumens, lm), resolution and wireless connection. Interactive flat panels have higher resolution, better contrast and a longer life than projectors, and users can write directly on the screen.

> ⚠ **[2023 P1A Q17] Which of the following is not a specification of a projector?**
> ✔ 5400 rpm (revolutions per minute), which is a hard disk specification. Only half of the candidates answered correctly. Wi-Fi 802.11ac, 3800 lumens and 4K UHD are all projector specifications.

## 1.13 Choosing devices for a given context

First identify what the context needs, such as mobility, cost, speed, durability or security. Then choose a device and explain which of its features meets that need.

| Context | Common devices |
|---|---|
| Supermarket point of sale, self-checkout, fast-food self-ordering kiosk | Bar code / QR code reader, touch screen, Octopus or credit card reader, thermal printer |
| Library information kiosk | Touch screen (no mouse needed, saves space, less likely to be stolen or damaged) |
| Small office home office | Multifunction printer (print, scan, copy, fax) |
| Meeting room | Interactive flat panel or projector, wireless presenter |
| Video editing and rendering | CPU with a high clock rate or many cores, dedicated GPU, large RAM, SSD |

> ⚠ **[2025 P1B 7(b)(i)] Mr Li decides to provide tablet computers instead of notebook computers for students to enter data. Give two reasons to support his decision.**
> ✔ Lighter in weight / smaller in size for easy carrying; a user-friendly touch screen for easy input; a longer battery life.
> ✘ Two answers in the same category (e.g. "lighter" and "smaller") get only 1 mark.

> ✔ **[2024 P1B 2(a)(iii)] Give two reasons why Computer Q is better for 4K video rendering.**
> Q has a CPU with better processing power because of its higher clock rate; Q has a dedicated GPU with standalone memory for better graphics processing.

[2023 P1A Q18] A computer's performance is "poor" for database queries, "smooth" for online meetings and "fair" for playing 4K videos on a hard disk. The display card and the CPU should be upgraded; online meetings are smooth, so the network interface card does not need upgrading.

## 1.14 Latest developments in computer systems

The curriculum only requires an outline; technical details are not needed.

| Area | Developments |
|---|---|
| Processors | More cores; GPUs built into CPUs; general-purpose GPUs used for AI; neural processing units (NPUs) designed for AI computation |
| Main memory | DDR5 with larger capacity and higher speed; LPDDR5X with better energy efficiency for mobile devices |
| Secondary storage | Faster NVMe SSDs; ever larger capacity; widespread cloud storage |
| Data communication | Wi-Fi 6/7, 5G mobile networks, USB 3.2 and USB4 |
| Input and output | OLED monitors, interactive flat panels, smart glasses with augmented reality |

## 1.15 Self-test

<details><summary>1. A dual-core CPU has a clock rate of 2.5 GHz, and each instruction takes 5 clock cycles. (a) How long does each instruction take? (b) In theory, at most how many instructions can be processed per second? (c) Why is the actual number usually smaller?</summary>

(a) 5 ÷ (2.5 × 10⁹) = 2 × 10⁻⁹ s = **2 ns**.

(b) 2 × 2.5 × 10⁹ ÷ 5 = **1 × 10⁹** instructions.

(c) Some instructions must be executed in order and cannot be handled by both cores at the same time; the two cores also compete for shared resources such as main memory and buses.
</details>

<details><summary>2. In the fetch stage, what does each of the three buses carry?</summary>

The address bus carries the instruction address in the MAR to main memory; the control bus carries the "read" signal; the data bus carries the instruction from main memory back to the MDR.
</details>

<details><summary>3. A hard disk has an access time of 10 ms and a data transfer rate of 100 MBps. How long does it take to read a 25 MB file from adjacent sectors?</summary>

10 ms + (25 × 1024 × 1024) ÷ (100 × 10⁶) s = 0.01 s + 0.262 s ≈ **0.272 s** (0.26 s if 1000 is used for the file size).
</details>

<details><summary>4. [Adapted from 2025 Mock P1B 1(a)] When rendering a video, Chi-wai finds that RAM usage is not full, but rendering is slow. Suggest two hardware upgrades and explain.</summary>

CPU: a higher clock rate or more cores increases processing speed. GPU (display card): a GPU has many cores that process graphics data in parallel, shortening the rendering time.

✘ "Increase the RAM capacity" is not accepted: RAM usage is not full, so RAM is not the bottleneck.
</details>

<details><summary>5. [Adapted from 2026 Mock P1B 2(b)] A content creator is considering an external hard disk or an external SSD to store his artwork. Give one disadvantage of each.</summary>

Hard disk: sensitive to shock and easily damaged if dropped; lower data transfer rate; heavier, larger and uses more power.

SSD: more expensive for the same capacity; limited number of write cycles; data is harder to recover after damage.
</details>

<details><summary>6. Why is the bootstrap program stored in ROM rather than RAM?</summary>

ROM is non-volatile, so it keeps the bootstrap program when power is off and the CPU can read it at every start-up; RAM is volatile and loses its content when power is off.
</details>

<details><summary>7. A computer's address bus has 20 lines, and each memory address stores 1 byte. What is the maximum addressable memory?</summary>

2²⁰ × 1 B = 1 048 576 B = **1 MB**.
</details>

<details><summary>8. Arrange the following in order of data access speed, from fastest to slowest: RAM, hard disk, registers, SSD, cache memory.</summary>

**Registers > cache memory > RAM > SSD > hard disk**. The faster the memory, the higher the cost per unit of capacity and usually the smaller the capacity [adapted from 2026 Mock P1A Q16].
</details>

<details><summary>9. [Adapted from 2025 Mock P1A Q15] A computer has 16 GB of RAM, and its hard disk stores video files of 8 GB and 32 GB. Can the computer read the data in the 32 GB file?</summary>

**Yes**, any data in either file can be read. A program does not need to load a whole file into RAM at once; it can read it in parts as needed, loading the next part after processing the current one.
</details>

<details><summary>10. A hard disk has a cluster size of 4 KB. How much storage space is wasted when storing 1000 files of 9 KB each?</summary>

Each file uses 3 clusters (12 KB), wasting 3 KB. 1000 files waste 3000 KB ≈ **2.93 MB** in total.
</details>

<details><summary>11. [Adapted from 2025 Mock P1A Q11] Which of the following are common specifications of a dashcam? (1) 802.11ac (2) Full HD (3) 7200 rpm</summary>

**(1) and (2)**. A dashcam can send videos to a phone by Wi-Fi and records in Full HD. 7200 rpm is the rotational speed of a hard disk.
</details>

<details><summary>12. Suggest a type of printer for each situation and give a reason: (a) the school office prints hundreds of notices every day; (b) the tuck shop prints receipts; (c) the Visual Arts Department prints A1 posters.</summary>

(a) Laser printer: fast printing and lower cost per page.

(b) Thermal printer: small and needs no ink; suitable for small receipts.

(c) Plotter: can produce large printouts.
</details>
