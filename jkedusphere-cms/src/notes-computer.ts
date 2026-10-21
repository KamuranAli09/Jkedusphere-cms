// Computer Knowledge notes (same format as notes-polity.ts).
// "@unit Title" = group, "## Topic {#id}" = topic page (/computer-knowledge/<id>).
// Extra format used here: {{formula}} shows text as a formula in code style, e.g. {{=SUM(A1:A10)}}.
// Do not use backticks or dollar-brace in the text.
import type { Subject } from './notes';

export const COMPUTER: Subject = {
  slug: 'computer-knowledge',
  short: 'Computer Knowledge',
  h1: 'Computer Knowledge Notes',
  title: 'Computer Knowledge Notes with Excel Formulas for JKSSB, JKPSC, SSC | JKEdusphere',
  description: 'Complete advanced computer notes: hardware, networking, security, MS Word, PowerPoint, Excel formulas with examples, DBMS, SQL, AI and Digital India.',
  intro: 'Topic-wise notes for JKSSB, JKPSC, J&K Police, SSC and banking exams: from number systems to every important Excel formula with worked examples.',
  published: '2026-10-21',
  updated: '2026-10-21',
  source: String.raw`
@unit Start Here

## Overview: What This Course Covers {#overview}

These notes cover **Computer Knowledge** from the first bit to the last Excel formula. They are written for **JKSSB, JKPSC, J&K Police, Naib Tehsildar, SSC, banking and other State exams**, where a computer section is either a scoring part of the paper or a separate computer-proficiency test.

### What you will find

| Unit | What it covers |
|---|---|
| **1. Computer Fundamentals** | Generations, types, CPU, memory, storage, input and output, number systems, logic gates. |
| **2. Software and Operating Systems** | System and application software, languages, translators, Windows, Linux, process and memory management. |
| **3. Networking and Internet** | Topologies, devices, OSI and TCP/IP, IP addressing, protocols, ports, email, browsers, web terms. |
| **4. Security and Cyber Laws** | Malware, attacks, cryptography, firewalls, IT Act 2000, digital payments, safe practices. |
| **5. MS Word and PowerPoint** | Features, menus, shortcuts, mail merge, slides, views, transitions. |
| **6. Microsoft Excel** | Cells, references, every important formula with syntax, example and use, pivot tables, charts, shortcuts. |
| **7. Databases and Programming** | DBMS, keys, normalisation, SQL commands, algorithms, flowcharts, data structures. |
| **8. Emerging Technology and Digital India** | AI, cloud, IoT, blockchain, 5G, Indian supercomputers and government digital projects. |
| **9. Quick Revision** | Excel formula cheat sheet, one-liners, full forms and practice questions. |

### Why study Computer Knowledge

- **It is scoring.** Questions are direct: a shortcut, a full form, a formula result. If you have revised, the mark is certain.
- **It is practical.** Almost every office job in J&K (clerk, accountant, patwari, teacher, police) now uses a computer and Excel daily.
- **Excel is the highest-value topic.** Many exams ask what a formula returns. Unit 6 gives the syntax, a worked example and the typical trap for each formula.
- **It is a short syllabus.** Most of it can be revised in a few days.

### How the exams weigh it

Computer questions usually form a small block in the General Awareness or General Knowledge paper, and some posts (clerical, accounts, assistant and similar) add a **separate computer proficiency or typing test**. The number of questions and the level change from exam to exam, so always check the **latest notification, syllabus and previous year papers**.

:::tip How to use these notes
1. Read **one topic at a time** from the list on the left (or tap **Topics** on a phone).
2. Formulas appear in a **code style** like {{=SUM(A1:A5)}}. Type each one in a real Excel sheet. Typing it once is worth reading it ten times.
3. Revise the **Exam tip** and **Memory trick** boxes, which mark the usual traps.
4. In the last week, use only **Unit 9: Quick Revision**.
:::

:::note About versions
Features differ a little between Microsoft Office 2016, 2019, 2021 and Microsoft 365. Old exams ask classic features (VLOOKUP, IF, SUMIF). Newer ones also ask XLOOKUP, FILTER, UNIQUE and similar. Each topic says which version a function needs.
:::

Start with the first topic: [Generations of Computers](#generations).

@unit Computer Fundamentals

## Generations of Computers {#generations}

A **computer** is an electronic device that accepts **data** (input), processes it under the control of a stored **program**, and gives **information** (output). The word comes from *compute*, to calculate. The basic cycle is **Input → Process → Output → Storage**.

### The five generations

| Generation | Period | Key technology | Examples and features |
|---|---|---|---|
| **First** | 1940 to 1956 | **Vacuum tubes** | ENIAC, EDVAC, UNIVAC. Huge, hot, slow, unreliable. **Machine language**. Used punched cards and magnetic drums. |
| **Second** | 1956 to 1963 | **Transistors** | Smaller, faster, cheaper. **Assembly language** and early high-level languages (**FORTRAN, COBOL**). Magnetic tape and disk. |
| **Third** | 1964 to 1971 | **Integrated Circuits (IC)** | Many transistors on one chip. **Operating systems**, keyboard and monitor, **high-level languages** (BASIC, Pascal). |
| **Fourth** | 1971 to present | **Microprocessor (VLSI)** | Whole CPU on one chip. **Intel 4004 (1971)** was the first microprocessor. Personal computers, GUI, networks, the Internet. |
| **Fifth** | Present and beyond | **ULSI, AI, parallel processing** | Artificial intelligence, robotics, natural-language processing, quantum computing. |

:::mem Memory trick
**V-T-I-M-A**: **V**acuum tube → **T**ransistor → **I**C → **M**icroprocessor → **A**I. Each step made the computer smaller, faster and cheaper.
:::

### Pioneers and milestones

| Person or machine | Contribution |
|---|---|
| **Abacus** | Oldest calculating tool. |
| **Blaise Pascal** | **Pascaline** (1642), a mechanical adding machine. |
| **Charles Babbage** | **Father of the Computer**. Designed the **Difference Engine** (1822) and the **Analytical Engine** (1837), which had an input, store, mill (CPU) and output. |
| **Ada Lovelace** | **First programmer**, for her notes on the Analytical Engine. |
| **Herman Hollerith** | Punched-card tabulating machine for the US census (1890). His company became IBM. |
| **Alan Turing** | **Turing machine**, the theory of computation. Turing Test for machine intelligence. |
| **John von Neumann** | **Stored program concept**: data and instructions are kept in the same memory. |
| **ENIAC (1946)** | First general-purpose **electronic** digital computer. |
| **Tim Berners-Lee** | Invented the **World Wide Web** (1989 to 1991). |

### Computers in India

- The first computer in India was the **HEC-2M**, installed at the **Indian Statistical Institute, Calcutta** in 1956. **TIFRAC** at TIFR Mumbai was the first indigenous machine.
- **C-DAC** (Centre for Development of Advanced Computing, Pune) built the **PARAM** series of supercomputers, starting with **PARAM 8000** in 1991. **Vijay Bhatkar** led this effort.

:::tip Exam tip
Questions like "which technology marks the third generation?" want **IC**. "Who is called the father of computers?" wants **Charles Babbage**. Keep the table of generations by heart.
:::

## Types of Computers {#types-of-computers}

### By size and power

| Type | Features | Examples and use |
|---|---|---|
| **Supercomputer** | Fastest and most powerful. Thousands of processors working in parallel. Speed in **FLOPS** (floating-point operations per second). | Weather forecasting, nuclear research, space, molecular science. India: **PARAM**, **Pratyush** (IITM Pune) and **Mihir** (NCMRWF) for weather. |
| **Mainframe** | Large, serves **thousands of users** at once. Very reliable. Speed in **MIPS**. | Banks, airlines, railways, insurance, census. |
| **Minicomputer** | Mid-sized multi-user machine. | Small business, labs. |
| **Microcomputer** | Single-user computer built around a microprocessor. | Desktop, laptop, tablet, smartphone. |

### By working principle

| Type | Works on | Example |
|---|---|---|
| **Analog** | Continuous physical quantities | Speedometer, thermometer, voltmeter. |
| **Digital** | Discrete data in **0 and 1** | Desktop, laptop, calculator. |
| **Hybrid** | Both analog and digital | ICU monitors, petrol pumps, ECG machines. |

### Other terms

- **Workstation**: powerful single-user computer for design, graphics and engineering.
- **Server**: serves files, web pages or services to other computers (clients).
- **Embedded computer**: built inside another device (washing machine, car, ATM, router).
- **Laptop** and **notebook**: portable. **Tablet** and **smartphone**: touch-based portable devices. **PDA**: older palm-sized organiser.

### Units of data

| Unit | Size |
|---|---|
| **Bit** | One binary digit (0 or 1). The smallest unit. |
| **Nibble** | 4 bits |
| **Byte** | 8 bits. One character. |
| **Kilobyte (KB)** | 1,024 bytes |
| **Megabyte (MB)** | 1,024 KB |
| **Gigabyte (GB)** | 1,024 MB |
| **Terabyte (TB)** | 1,024 GB |
| **Petabyte (PB)** | 1,024 TB |
| **Exabyte (EB), Zettabyte (ZB), Yottabyte (YB)** | Each is 1,024 times the one before. |

:::key Key fact
Speed units rise as: **millisecond (10^-3 s) → microsecond (10^-6) → nanosecond (10^-9) → picosecond (10^-12)**. Processor clock speed is measured in **hertz**; modern CPUs run at **gigahertz (GHz)**.
:::

## CPU, Memory and Storage {#hardware}

### The CPU (Central Processing Unit)

The CPU is the **brain** of the computer. It has three parts.

| Part | Job |
|---|---|
| **ALU (Arithmetic Logic Unit)** | Does arithmetic (+, -, ×, ÷) and logical comparisons (AND, OR, NOT, greater than). |
| **CU (Control Unit)** | Directs and coordinates all parts. It fetches instructions, decodes them and sends signals. It does **no** calculation. |
| **Registers** | Tiny, very fast memory inside the CPU. |

Important registers: **Program Counter (PC)** holds the address of the next instruction; **Instruction Register (IR)** holds the current instruction; **Memory Address Register (MAR)** holds the address being accessed; **Memory Data Register (MDR/MBR)** holds the data read or written; **Accumulator** holds results of ALU operations.

**Machine cycle:** **Fetch → Decode → Execute → Store**. Multi-core CPUs (dual, quad, octa) have several processing cores that work in parallel.

### Buses

| Bus | Carries | Direction |
|---|---|---|
| **Data bus** | Data | **Bidirectional** |
| **Address bus** | Memory addresses | **Unidirectional** (CPU to memory) |
| **Control bus** | Control signals (read, write) | Both |

### Memory hierarchy

From fastest and smallest to slowest and largest:

**Registers → Cache → RAM (main memory) → Secondary storage (SSD, HDD) → Tertiary and offline storage (tape, optical).** Speed and cost per byte **fall** as you go down; capacity **rises**.

### Primary memory

| Memory | Facts |
|---|---|
| **RAM** | **Random Access Memory.** **Volatile** (data lost when power is off). Holds running programs and data. Read and write. |
| **SRAM** | **Static RAM.** Uses flip-flops. Faster, costlier, no refresh. Used for **cache**. |
| **DRAM** | **Dynamic RAM.** Uses capacitors. Needs constant **refreshing**. Slower, cheaper. Used as main memory. |
| **SDRAM, DDR** | Synchronous DRAM. **DDR4** and **DDR5** are current standards. |
| **Cache** | Small, very fast memory between the CPU and RAM. Levels **L1** (fastest, inside the core), **L2**, **L3**. |
| **ROM** | **Read Only Memory.** **Non-volatile.** Stores the start-up instructions (**BIOS/UEFI**). |
| **PROM** | Programmable once by the user. |
| **EPROM** | Erased by **ultraviolet light**. |
| **EEPROM** | Erased **electrically**. Flash memory is an advanced form. |
| **CMOS** | Small battery-backed memory that keeps BIOS settings, date and time. |
| **Virtual memory** | Part of the hard disk used as extra RAM (page file or swap space). |

:::tip Exam tip
**RAM = volatile, ROM = non-volatile.** **SRAM = cache; DRAM = main memory.** **EPROM = UV; EEPROM = electric.** These pairings are asked every year.
:::

### Secondary storage

| Device | Facts |
|---|---|
| **Hard Disk (HDD)** | Magnetic **platters** with **tracks, sectors, cylinders**. Speed in **RPM** (5,400 or 7,200). |
| **SSD** | **Solid State Drive.** Flash (NAND) memory, **no moving parts**, faster, quieter. |
| **CD-ROM** | About **700 MB** |
| **DVD** | About **4.7 GB** (single layer, single side) |
| **Blu-ray** | About **25 GB** per layer, read with a **blue-violet laser** |
| **Magnetic tape** | **Sequential access.** Used for backups and archives. |
| **Pen drive, SD card** | Portable flash storage. |

**Access:** RAM and disks allow **random (direct) access**. Magnetic tape allows **sequential access** only.

## Input and Output Devices {#io-devices}

### Input devices

| Device | Use |
|---|---|
| **Keyboard** | Text entry. **QWERTY** layout. |
| **Mouse** | Pointing device. Invented by **Douglas Engelbart** (1964). |
| **Scanner** | Converts paper into a digital image. |
| **OCR** | Optical Character Recognition: reads printed text. |
| **OMR** | Optical Mark Recognition: reads marked bubbles, as in **OMR answer sheets**. |
| **MICR** | Magnetic Ink Character Recognition: reads the ink on the **bottom of bank cheques**. |
| **Barcode reader** | Reads product codes. **QR code** reader reads two-dimensional codes. |
| **Touch screen, light pen, joystick, trackball, stylus** | Pointing and drawing. |
| **Microphone, webcam** | Audio and video input. |
| **Biometric devices** | Fingerprint, iris and face scanners (Aadhaar enrolment). |

### Output devices

| Device | Facts |
|---|---|
| **Monitor** | CRT (old), LCD, **LED**, **OLED**. Sharpness depends on **resolution** (pixels) and **PPI**. |
| **Printer: impact** | Strikes the paper. **Dot-matrix**, daisy-wheel, line printer. Can make **carbon copies**. Noisy. |
| **Printer: non-impact** | **Inkjet**, **laser**, **thermal**. Quiet and sharper. |
| **Plotter** | Draws large engineering drawings (maps, blueprints). |
| **Projector, speakers, headphones** | Display and sound output. |

**Printer speed:** dot-matrix in **CPS** (characters per second), line printers in **LPM** (lines per minute), laser and inkjet in **PPM** (pages per minute). **Print quality** is in **DPI** (dots per inch).

### Ports and connectors

| Port | Use |
|---|---|
| **USB** (Type-A, Type-C) | Universal Serial Bus. Keyboards, drives, charging. Hot-swappable. |
| **HDMI** | Digital video **and audio** to a TV or monitor. |
| **VGA** | Older analogue video. **DVI**: digital video. |
| **Ethernet (RJ-45)** | Wired network. |
| **Thunderbolt** | Very fast data, video and power in one port. |
| **PS/2** | Old keyboard and mouse port. |

:::mem Memory trick
**Cheque = MICR. Answer sheet = OMR. Printed page to text = OCR. Shop bill = barcode.**
:::

## Number Systems and Codes {#number-systems}

Computers store everything as **binary** (0 and 1) because electronic circuits have two stable states, on and off.

| System | Base | Digits used |
|---|---|---|
| **Binary** | 2 | 0, 1 |
| **Octal** | 8 | 0 to 7 |
| **Decimal** | 10 | 0 to 9 |
| **Hexadecimal** | 16 | 0 to 9 and A to F (A = 10, B = 11, C = 12, D = 13, E = 14, F = 15) |

### Decimal to binary (divide by 2)

Divide repeatedly by 2 and write the remainders from **bottom to top**.

**Example: 45 to binary.** 45 ÷ 2 = 22 r **1**; 22 ÷ 2 = 11 r **0**; 11 ÷ 2 = 5 r **1**; 5 ÷ 2 = 2 r **1**; 2 ÷ 2 = 1 r **0**; 1 ÷ 2 = 0 r **1**. Read upward: **101101**.

Check: 32 + 8 + 4 + 1 = 45.

### Binary to decimal (place values)

Multiply each bit by a power of 2 and add. **Example:** 1101 = 8 + 4 + 0 + 1 = **13**.

**Fractions:** the digits after the point have weights 1/2, 1/4, 1/8. So **1101.101** = 13 + 0.5 + 0 + 0.125 = **13.625**. To convert a decimal fraction, **multiply by 2** and note the integer parts: 0.625 × 2 = 1.25 (1), 0.25 × 2 = 0.5 (0), 0.5 × 2 = 1.0 (1), so 0.625 = **0.101**.

### Binary, octal and hexadecimal shortcuts

- **Binary to octal:** group bits in **threes** from the right. **Binary to hex:** group in **fours**.
- Example: **10110111** → octal groups 10 | 110 | 111 = **267**; hex groups 1011 | 0111 = **B7**. In decimal both equal **183**.
- **Hex to decimal:** 2F = 2 × 16 + 15 = **47**. **Octal to decimal:** 17 = 1 × 8 + 7 = **15**.

### Binary arithmetic

| Rule | Result |
|---|---|
| 0 + 0 | 0 |
| 0 + 1 and 1 + 0 | 1 |
| 1 + 1 | **10** (0 carry 1) |
| 1 + 1 + 1 | **11** (1 carry 1) |

Example: 1011 + 0110 = **10001** (11 + 6 = 17).

### Negative numbers

| Method | How |
|---|---|
| **Sign and magnitude** | First bit is the sign (0 positive, 1 negative). |
| **1's complement** | **Invert** every bit. |
| **2's complement** | **1's complement + 1.** Used by computers. |

Example, **-5 in 8 bits:** 5 = 00000101 → invert = 11111010 → add 1 = **11111011**. An **8-bit** two's complement number ranges from **-128 to +127**.

### Character codes

| Code | Facts |
|---|---|
| **BCD** | Binary Coded Decimal. Each decimal digit in 4 bits (8421). |
| **ASCII** | American Standard Code for Information Interchange. **7-bit = 128 characters**; extended ASCII is 8-bit = 256. |
| **EBCDIC** | **8-bit** code used on IBM mainframes. |
| **Unicode** | Covers **all world languages**, including Urdu, Hindi and Kashmiri scripts. **UTF-8**, UTF-16, UTF-32. |
| **Gray code** | Only one bit changes between successive values. |

**ASCII values worth knowing:** **A = 65, Z = 90, a = 97, z = 122, 0 = 48, space = 32.** Lower case is **32 more** than upper case.

:::tip Exam tip
Calculation questions are short. Remember: **decimal → binary by dividing by 2, binary → decimal by place value, binary → octal in 3s, binary → hex in 4s.**
:::

## Boolean Algebra and Logic Gates {#logic-gates}

A **logic gate** is a circuit with one or more inputs and one output, working on 0 and 1.

### Basic gates

| Gate | Expression | Output is 1 when |
|---|---|---|
| **AND** | {{A.B}} | **both** inputs are 1 |
| **OR** | {{A+B}} | **at least one** input is 1 |
| **NOT** | {{A'}} | the input is 0 (it **inverts**) |
| **NAND** | {{(A.B)'}} | **not** both inputs are 1 |
| **NOR** | {{(A+B)'}} | **both** inputs are 0 |
| **XOR** | {{A xor B}} | inputs are **different** |
| **XNOR** | {{(A xor B)'}} | inputs are **the same** |

### Truth table for two inputs

| A | B | AND | OR | NAND | NOR | XOR | XNOR |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

:::key Key fact
**NAND and NOR are universal gates**: any other gate can be built from NAND gates alone, or from NOR gates alone.
:::

### Laws of Boolean algebra

| Law | Rule |
|---|---|
| **Identity** | {{A+0 = A}} and {{A.1 = A}} |
| **Null (domination)** | {{A+1 = 1}} and {{A.0 = 0}} |
| **Idempotent** | {{A+A = A}} and {{A.A = A}} |
| **Complement** | {{A+A' = 1}} and {{A.A' = 0}} |
| **Double negation** | {{(A')' = A}} |
| **Commutative** | {{A+B = B+A}} |
| **Distributive** | {{A.(B+C) = A.B + A.C}} |
| **Absorption** | {{A+A.B = A}} |
| **De Morgan's laws** | {{(A.B)' = A'+B'}} and {{(A+B)' = A'.B'}} |

### Adders

- **Half adder** adds two bits: **Sum = A XOR B**, **Carry = A AND B**.
- **Full adder** adds two bits **and a carry-in**: Sum = A XOR B XOR Cin.

:::mem Memory trick
**De Morgan: break the line, change the sign.** A bar over an AND becomes an OR of the bars, and the other way round.
:::

@unit Software and Operating Systems

## Types of Software {#software}

**Hardware** is the physical part of the computer; **software** is the set of programs that tell it what to do. The two together make a working system.

### Classification

| Type | Meaning | Examples |
|---|---|---|
| **System software** | Runs and manages the computer itself. | Operating system, device drivers, utilities, language translators, firmware |
| **Application software** | Does a task for the user. | MS Office, browsers, Tally, Photoshop, games |
| **Utility software** | Maintenance tools. | Antivirus, disk cleanup, disk defragmenter, backup, file compression (WinZip, 7-Zip) |
| **Firmware** | Permanent program stored in ROM or flash. | BIOS/UEFI, router firmware |
| **Middleware** | Connects two separate applications. | Database connectors |

### Application software in detail

- **General-purpose (packaged):** word processor, spreadsheet, presentation, database. Example: **Microsoft Office, LibreOffice, Google Workspace**.
- **Specific-purpose:** built for one job. Example: **Tally** (accounting), railway reservation, payroll.
- **Custom (bespoke):** made for one organisation on order.

### Licensing

| Term | Meaning |
|---|---|
| **Proprietary** | Source code is closed. Paid licence. Windows, MS Office. |
| **Open source** | Source code is open to see, change and share. **Linux, Firefox, LibreOffice, Android (core)**. |
| **Freeware** | Free to use, source closed. |
| **Shareware** | Free trial, then you must pay. |
| **Freemium** | Free basic version, paid premium version. |
| **Public domain** | No copyright restriction. |

:::tip Exam tip
**Hardware you can touch; software you cannot.** The operating system is **system software**, a word processor is **application software**, an antivirus is **utility software**. Expect "which of these is NOT system software?"
:::

## Programming Languages and Translators {#languages}

### Generations of languages

| Generation | Level | Facts |
|---|---|---|
| **1GL** | **Machine language** | Only 0s and 1s. The only language the CPU understands directly. Fastest, hardest. |
| **2GL** | **Assembly language** | Uses **mnemonics** (ADD, MOV). Needs an **assembler**. |
| **3GL** | **High-level languages** | English-like. C, C++, Java, Python, FORTRAN, COBOL, BASIC, Pascal. Needs a compiler or interpreter. |
| **4GL** | Very high-level | SQL, report generators. You say **what** is needed, not how. |
| **5GL** | AI-based | Prolog, Mercury. Problem solving by constraints. |

### Language translators

| Translator | How it works |
|---|---|
| **Assembler** | Assembly language → machine code. |
| **Compiler** | Translates the **whole program at once** into object code. Shows **all errors together**. Program then runs fast. Example: C, C++, Java (to bytecode). |
| **Interpreter** | Translates and runs **one line at a time**. Stops at the **first error**. Easier to debug, slower to run. Example: Python, BASIC. |
| **Linker** | Joins object files and libraries into one **executable**. |
| **Loader** | Loads the executable into memory to run. |

**Flow:** Source code → (Compiler) → Object code → (Linker) → Executable file.

### Types of errors

- **Syntax error:** breaks the rules of the language (missing semicolon). Caught at compile time.
- **Logical error:** program runs but gives a **wrong answer**. Hardest to find.
- **Runtime error:** occurs while running (divide by zero).

### Object-Oriented Programming (OOP)

Languages: **C++, Java, Python**. Four pillars: **Encapsulation** (data and methods bound in a class), **Abstraction** (hide detail, show the essentials), **Inheritance** (a class gets features of another), **Polymorphism** (one name, many forms). A **class** is a blueprint; an **object** is an instance of it.

### Who made what

| Language | Creator |
|---|---|
| **FORTRAN** (1957) | **John Backus** at IBM. First widely used high-level language. |
| **COBOL** | Business language. **Grace Hopper** played a key role. |
| **BASIC** | Kemeny and Kurtz |
| **Pascal** | Niklaus Wirth |
| **C** (1972) | **Dennis Ritchie** at Bell Labs |
| **C++** | **Bjarne Stroustrup** |
| **Java** (1995) | **James Gosling** at Sun Microsystems |
| **Python** | **Guido van Rossum** |

:::key Key fact
**HTML and XML are markup languages, not programming languages.** **SQL** is a query language. **JavaScript** and **PHP** are scripting languages used on the web.
:::

## Operating System {#operating-systems}

The **Operating System (OS)** is the main system software. It is the **interface between the user and the hardware** and manages all resources.

### Functions

1. **Process management:** decides which program gets the CPU and when.
2. **Memory management:** allots and frees RAM.
3. **File management:** creates, stores, names and protects files.
4. **Device management:** controls input and output devices through **drivers**.
5. **Security:** passwords, user accounts, permissions.
6. **User interface:** **GUI** (icons, windows) or **CLI** (typed commands).

### Types of operating systems

| Type | Meaning | Example |
|---|---|---|
| **Batch** | Jobs collected and run in groups without user contact. | Early payroll systems |
| **Multiprogramming** | Several programs in memory; CPU switches when one waits for input or output. | |
| **Time-sharing** | CPU time shared in small slices among many users. | Unix |
| **Multitasking** | One user runs many tasks together. | Windows |
| **Multiprocessing** | Two or more CPUs work together. | |
| **Real-time (RTOS)** | Must respond within a fixed time. **Hard** (missile, pacemaker) and **soft** (video streaming). | |
| **Distributed** | Many computers act as one system. | |
| **Network OS** | Manages a network. | Windows Server |
| **Mobile OS** | For phones and tablets. | **Android, iOS** |
| **Embedded** | Inside devices. | Washing machine, ATM |

### Kernel and shell

- **Kernel:** the core of the OS, in direct contact with the hardware. Linux is a kernel.
- **Shell:** the program that takes your commands and passes them to the kernel. **Bash** is a popular shell.

### Booting

**Booting** is starting the computer and loading the OS into RAM. Steps: power on → **POST (Power-On Self Test)** → BIOS/UEFI finds the **bootloader** → OS loads. **Cold boot** = starting from power off. **Warm boot** = restart without turning power off (Ctrl + Alt + Delete or Restart).

:::mem Memory trick
**OS = Manager.** It manages **P**rocesses, **M**emory, **F**iles, **D**evices, **S**ecurity: **PMFDS**.
:::

## Process, Memory and File Management {#os-management}

### Process management

A **process** is a program in execution. A **thread** is a smaller unit of a process.

| State | Meaning |
|---|---|
| **New** | Process is being created. |
| **Ready** | Waiting for the CPU. |
| **Running** | Using the CPU. |
| **Waiting (blocked)** | Waiting for input or output. |
| **Terminated** | Finished. |

The **Process Control Block (PCB)** stores a process's information. Switching the CPU from one process to another is a **context switch**.

### CPU scheduling algorithms

| Algorithm | Rule |
|---|---|
| **FCFS** | First Come First Served. Simple, can cause long waits. |
| **SJF** | Shortest Job First. Lowest average waiting time. |
| **Round Robin** | Each process gets a fixed **time quantum** in turn. Used in time-sharing. |
| **Priority** | Highest priority first. Low priority may **starve**. |

**Worked example (FCFS).** Processes P1, P2, P3 arrive together with burst times 5, 3 and 2 ms. Waiting times: P1 = 0, P2 = 5, P3 = 8. **Average waiting time = (0 + 5 + 8) ÷ 3 = 4.33 ms.** With SJF (order 2, 3, 5) waits are 0, 2, 5 and the average is **2.33 ms**, which is why SJF is optimal.

### Deadlock

Processes wait for each other forever. It needs all **four conditions**: **mutual exclusion, hold and wait, no pre-emption, circular wait**.

### Memory management

| Term | Meaning |
|---|---|
| **Paging** | Memory divided into **fixed-size** blocks: **pages** (program) and **frames** (RAM). |
| **Segmentation** | Memory divided into **variable-size** logical parts (code, data, stack). |
| **Internal fragmentation** | Wasted space **inside** an allotted block. |
| **External fragmentation** | Free space split into pieces too small to use. |
| **Virtual memory** | Disk space used as extra RAM, so large programs can run. |
| **Thrashing** | The system spends more time swapping pages than working. |
| **Page replacement** | **FIFO, LRU** (Least Recently Used), **Optimal**. |

### File systems

| System | Facts |
|---|---|
| **FAT32** | Old. Maximum file size **4 GB**. Works on pen drives and all systems. |
| **exFAT** | For flash drives and large files. |
| **NTFS** | Windows standard. Large files, **security permissions**, encryption, compression. |
| **ext4** | Linux standard. |

A **file** has a **name** and an **extension**: .docx, .xlsx, .pptx, .pdf, .txt, .jpg, .png, .mp3, .mp4, .zip, .exe. Files are arranged in **folders (directories)**; the top is the **root**.

:::tip Exam tip
**Paging = fixed size; segmentation = variable size.** **Compiler = whole program; interpreter = line by line.** **Deadlock needs four conditions.** These are the favourite OS questions.
:::

## Windows and Linux {#windows-linux}

### Windows basics

- **Desktop:** main screen. **Taskbar:** bar at the bottom with the **Start** button and running programs. **Recycle Bin:** holds deleted files until emptied.
- **File Explorer:** manages files and folders. **Task Manager:** shows running processes, ends tasks. **Settings** (older: **Control Panel**): configure the system.
- **Windows versions:** Windows 10 (2015), Windows 11 (2021). Windows is made by **Microsoft** (founded by **Bill Gates and Paul Allen**, 1975).
- **Safe mode:** starts Windows with minimum drivers to fix problems.

### Windows shortcuts

| Keys | Action |
|---|---|
| {{Ctrl + C}} / {{Ctrl + X}} / {{Ctrl + V}} | Copy / Cut / Paste |
| {{Ctrl + Z}} / {{Ctrl + Y}} | Undo / Redo |
| {{Ctrl + A}} | Select all |
| {{Alt + Tab}} | Switch between open programs |
| {{Alt + F4}} | Close the current window; on desktop, shut-down options |
| {{Ctrl + Shift + Esc}} | Open Task Manager |
| {{Win}} | Open Start menu |
| {{Win + D}} | Show desktop |
| {{Win + E}} | Open File Explorer |
| {{Win + L}} | Lock the computer |
| {{Win + R}} | Open the **Run** box |
| {{Win + I}} | Open Settings |
| {{Win + Shift + S}} | Screenshot (snip) tool |
| {{PrtSc}} | Copy a screenshot to the clipboard |
| {{F2}} | Rename a selected file |
| {{F5}} | Refresh |
| {{Delete}} | Send to Recycle Bin |
| {{Shift + Delete}} | **Delete permanently** (skips Recycle Bin) |

### Linux and Unix

- **Unix** was created at **Bell Labs in 1969** by **Ken Thompson and Dennis Ritchie**.
- **Linux** is an open-source, Unix-like kernel written by **Linus Torvalds in 1991**, released under the **GNU GPL**. Its mascot is **Tux** the penguin.
- **Distributions:** Ubuntu, Debian, Fedora, Red Hat, **Kali** (security testing). **Android** uses the Linux kernel.
- **India:** **BOSS** (Bharat Operating System Solutions) by C-DAC is an Indian Linux distribution. **Maya OS** by DRDO is an Ubuntu-based OS for defence use.

### Common Linux commands

| Command | Use |
|---|---|
| {{pwd}} | Show the current directory |
| {{ls}} | List files |
| {{cd}} | Change directory |
| {{mkdir}} / {{rmdir}} | Make / remove a directory |
| {{cp}} / {{mv}} / {{rm}} | Copy / move or rename / delete |
| {{touch}} | Create an empty file |
| {{cat}} | Show file contents |
| {{grep}} | Search text |
| {{chmod}} / {{chown}} | Change permissions / owner |
| {{ps}} / {{top}} / {{kill}} | Show processes / live usage / end a process |
| {{sudo}} | Run a command with administrator rights |
| {{man}} | Show the manual of a command |
| {{df}} / {{du}} | Disk free space / disk usage |

@unit Networking and Internet

## Types of Networks and Topologies {#networks}

A **computer network** connects two or more devices to share data and resources.

### Types by size

| Network | Range | Example |
|---|---|---|
| **PAN** | Personal Area Network. About **10 m**. | Bluetooth between phone and earbuds |
| **LAN** | Local Area Network. One building or campus. | Office, school, cyber cafe |
| **CAN** | Campus Area Network. | University |
| **MAN** | Metropolitan Area Network. A city. | Cable TV network |
| **WAN** | Wide Area Network. Countries and continents. | **The Internet** is the largest WAN |

**Intranet:** private network inside an organisation, using Internet technology. **Extranet:** intranet opened to selected outsiders (suppliers, partners). **VPN:** secure private tunnel over the public Internet.

**Client-server:** a central server serves many clients. **Peer-to-peer (P2P):** every computer is both client and server.

### Transmission modes

| Mode | Direction | Example |
|---|---|---|
| **Simplex** | One way only | Keyboard, TV broadcast, radio |
| **Half duplex** | Both ways, **one at a time** | Walkie-talkie |
| **Full duplex** | Both ways **together** | Telephone, mobile call |

### Topologies

| Topology | Layout | Facts |
|---|---|---|
| **Bus** | Single backbone cable | Cheap. If the backbone fails, the whole network fails. |
| **Ring** | Closed loop | Data travels in one direction. One break can stop the ring. |
| **Star** | All devices to a **central hub or switch** | Most common. Easy to add devices. Failure of the centre stops the network. |
| **Mesh** | Every device linked to every other | Most reliable, most costly. **Links = n(n-1)/2.** |
| **Tree** | Stars joined on a bus | Hierarchical. |
| **Hybrid** | Mix of topologies | Flexible. |

**Example:** a full mesh of **6 computers** needs 6 × 5 ÷ 2 = **15 links**.

### Transmission media

- **Guided (wired):** **twisted pair** (UTP, STP; used in LAN), **coaxial** cable (cable TV), **optical fibre** (light signals; fastest, no interference, long distance).
- **Unguided (wireless):** radio waves, **microwave**, **infrared**, **satellite**, Bluetooth, Wi-Fi.

### Standards

| Standard | Meaning |
|---|---|
| **IEEE 802.3** | Ethernet |
| **IEEE 802.11** | **Wi-Fi** (versions 802.11 a, b, g, n, ac, ax; **Wi-Fi 6** is 802.11ax) |
| **IEEE 802.15** | Bluetooth |
| **IEEE 802.16** | WiMAX |

:::tip Exam tip
**Internet = WAN. Bluetooth = PAN. Star = hub or switch in the centre. Mesh = most fault-tolerant.** Learn the mesh formula, since it is a frequent calculation.
:::

## Network Devices {#network-devices}

| Device | Job |
|---|---|
| **NIC** | **Network Interface Card.** Connects a computer to a network. Has a unique **MAC address**. |
| **Modem** | **Modulator-Demodulator.** Converts digital signals to analog and back, for telephone and cable lines. |
| **Hub** | Sends data to **all** ports. Dumb, works at the **Physical** layer. |
| **Switch** | Sends data **only to the intended device**, using MAC addresses. Works at the **Data Link** layer. |
| **Bridge** | Connects two LANs. |
| **Router** | Connects **different networks** and picks the best path using **IP addresses**. Works at the **Network** layer. |
| **Gateway** | Connects networks that use **different protocols**. The "entry and exit door". |
| **Repeater** | **Regenerates** a weak signal over a long distance. |
| **Access Point (AP)** | Lets wireless devices join a wired network. |
| **Firewall** | Filters traffic to protect the network. |

:::mem Memory trick
**Hub = Hello everyone. Switch = Sends to one. Router = Roads between networks.**
:::

## OSI Model and TCP/IP {#osi-tcpip}

The **OSI model** (Open Systems Interconnection) was defined by **ISO**. It splits network communication into **seven layers**.

| No. | Layer | Job | Data unit |
|---|---|---|---|
| **7** | **Application** | Services to the user (HTTP, FTP, SMTP) | Data |
| **6** | **Presentation** | Translation, **encryption, compression** | Data |
| **5** | **Session** | Opens, manages and closes sessions | Data |
| **4** | **Transport** | End-to-end delivery, error recovery (**TCP, UDP**) | **Segment** |
| **3** | **Network** | **Routing and IP addressing** | **Packet** |
| **2** | **Data Link** | Framing, **MAC addressing**, error detection | **Frame** |
| **1** | **Physical** | Bits on the cable or air | **Bit** |

:::mem Memory trick
Top to bottom: **All People Seem To Need Data Processing** (Application, Presentation, Session, Transport, Network, Data link, Physical). Bottom to top: **Please Do Not Throw Sausage Pizza Away**.
:::

### TCP/IP model (4 layers)

| Layer | Matches OSI | Protocols |
|---|---|---|
| **Application** | Application, Presentation, Session | HTTP, HTTPS, FTP, SMTP, DNS, DHCP |
| **Transport** | Transport | TCP, UDP |
| **Internet** | Network | IP, ICMP, ARP |
| **Network Access (Link)** | Data Link, Physical | Ethernet, Wi-Fi |

| TCP | UDP |
|---|---|
| **Connection-oriented**, reliable, ordered | **Connectionless**, faster, no guarantee |
| Web, email, file transfer | Video calls, live streaming, online games, DNS queries |

## IP Addressing, Protocols and Ports {#ip-protocols}

### IPv4 and IPv6

| | IPv4 | IPv6 |
|---|---|---|
| **Size** | **32 bits** | **128 bits** |
| **Format** | Four numbers 0 to 255 separated by dots: 192.168.1.10 | Eight groups of hexadecimal: 2001:0db8:85a3::8a2e:0370:7334 |
| **Addresses** | About 4.3 billion | Practically unlimited |

An **IP address** is the **logical** address of a device on a network. A **MAC address** is the **physical** 48-bit address burned into the NIC, written in hexadecimal (for example 00:1A:2B:3C:4D:5E).

### IPv4 classes

| Class | First number range | Default mask | Use |
|---|---|---|---|
| **A** | 1 to 126 | 255.0.0.0 | Very large networks |
| **B** | 128 to 191 | 255.255.0.0 | Medium networks |
| **C** | 192 to 223 | 255.255.255.0 | Small networks |
| **D** | 224 to 239 | None | **Multicasting** |
| **E** | 240 to 255 | None | Experimental |

**127.x.x.x** is reserved for **loopback** (127.0.0.1 = "localhost", your own computer). **Private ranges** (not routable on the Internet): **10.0.0.0 to 10.255.255.255**, **172.16.0.0 to 172.31.255.255**, **192.168.0.0 to 192.168.255.255**.

**Worked examples.** 172.20.5.9 starts with 172, so it is **Class B**. A /24 network (mask 255.255.255.0) has 2^8 = 256 addresses, of which **254 can be used for hosts** (one is the network address, one the broadcast).

### Key network protocols

| Protocol | Full form and use | Port |
|---|---|---|
| **HTTP** | HyperText Transfer Protocol: web pages | **80** |
| **HTTPS** | HTTP Secure (SSL/TLS encryption) | **443** |
| **FTP** | File Transfer Protocol | **21** (control), 20 (data) |
| **SSH** | Secure Shell: safe remote login | **22** |
| **Telnet** | Remote login, **not secure** | **23** |
| **SMTP** | Simple Mail Transfer Protocol: **sends** email | **25** |
| **DNS** | Domain Name System: name to IP address | **53** |
| **DHCP** | Dynamic Host Configuration Protocol: gives IP addresses automatically | 67 and 68 |
| **POP3** | Post Office Protocol: **downloads** email | **110** |
| **IMAP** | Internet Message Access Protocol: reads email **on the server**, synced across devices | **143** |
| **SNMP** | Network management | 161 |
| **RDP** | Remote Desktop Protocol | 3389 |
| **ICMP** | Used by {{ping}} to test reachability | none |

**Other terms:** **NAT** lets many private devices share one public IP. **ARP** finds a MAC address from an IP address. {{ping}} tests a connection; {{ipconfig}} (Windows) and {{ifconfig}} or {{ip a}} (Linux) show the IP settings; {{tracert}} shows the route of packets.

:::tip Exam tip
**Send = SMTP. Receive = POP3 or IMAP. Name to number = DNS. Secure web = HTTPS (443).** Also remember that **IPv4 is 32-bit and IPv6 is 128-bit.**
:::

## Internet, Web and Email {#internet-web}

### Basics

- The **Internet** is a worldwide network of networks. It began as **ARPANET** (1969, US Department of Defense).
- The **World Wide Web (WWW)** is a system of linked pages on the Internet, invented by **Tim Berners-Lee at CERN** (1989 to 1991). The Internet is the **network**; the Web is a **service** on it.
- **ISP:** Internet Service Provider. **Bandwidth:** maximum data rate, in **bps** (bits per second).
- **Browser:** software to view web pages. **Chrome, Firefox, Safari, Edge.** A **search engine** (Google, Bing) finds pages.
- **HTML** (HyperText Markup Language) is the language of web pages; **HTTP** is the protocol that carries them.

### URL

A **URL (Uniform Resource Locator)** is the full address of a page: **protocol://domain/path**, for example https://jkedusphere.com/computer-knowledge. The **domain** names a site. Common extensions: **.com** (commercial), **.org** (organisation), **.edu** (education), **.gov** (government), **.net** (network), **.in** (India), **.gov.in** and **.nic.in** (Indian government).

### Web terms

| Term | Meaning |
|---|---|
| **Hyperlink** | Clickable link to another page or place. |
| **Home page** | The first page of a website. |
| **Bookmark / Favourite** | Saved page address. |
| **Cookie** | Small file a site stores on your computer to remember you. |
| **Cache** | Saved copy of pages for faster loading. |
| **Download / Upload** | Receive a file / send a file. |
| **Streaming** | Playing media while it downloads. |
| **Blog** | Online journal. **Wiki** (Wikipedia): pages anyone can edit. |
| **Incognito / Private mode** | Browser does not save history or cookies on your device. It does **not** hide you from your ISP or the website. |
| **Web 1.0 / 2.0 / 3.0** | Read-only web / interactive social web / decentralised and semantic web. |

### Email

- **Email** was developed by **Ray Tomlinson** (1971), who chose the **@** sign. An address looks like **name@domain**.
- **To:** main recipient. **Cc:** carbon copy, visible to all. **Bcc:** blind carbon copy, **hidden** from other recipients.
- **Inbox, Sent, Drafts, Spam (Junk), Trash.** Attachments can be added.
- **Phishing** emails fake a trusted sender to steal information.

:::mem Memory trick
**Bcc = Blind.** The people in Bcc see everyone, but nobody sees them.
:::

@unit Security and Cyber Laws

## Malware, Threats and Attacks {#malware}

**Cyber security** protects computers, networks and data from attack. The three goals are the **CIA triad: Confidentiality, Integrity, Availability**.

### Malware (malicious software)

| Malware | Behaviour |
|---|---|
| **Virus** | Attaches itself to a **host file** and spreads when the file is run or shared. Needs user action. |
| **Worm** | **Self-replicates** across networks on its own, with no host file. Slows the network. |
| **Trojan horse** | Looks like a useful program but hides harmful code. **Does not replicate.** |
| **Ransomware** | **Locks or encrypts files** and demands payment. WannaCry (2017) is the famous case. |
| **Spyware** | Secretly collects information about the user. |
| **Keylogger** | Records every key pressed to steal passwords. |
| **Adware** | Shows unwanted advertisements. |
| **Rootkit** | Hides deep in the system to give an attacker hidden control. |
| **Botnet** | A network of infected computers ("zombies") controlled remotely. |
| **Logic bomb** | Harmful code that fires on a **condition** (a date, an event). |
| **Backdoor** | A hidden entry that bypasses normal login. |

### Attacks and crimes

| Attack | Meaning |
|---|---|
| **Phishing** | Fake emails or sites to steal passwords or card details. **Spear phishing** targets one person. |
| **Vishing / Smishing** | Phishing by **voice call** / by **SMS**. |
| **Pharming** | Redirects you to a fake site even when you type the right address. |
| **DoS / DDoS** | Floods a server with requests to make it unavailable. **DDoS** uses **many** computers. |
| **Man-in-the-Middle** | Attacker secretly sits between two parties and reads or alters data. |
| **Brute force** | Tries every possible password. |
| **SQL injection** | Inserts malicious SQL through an input box to reach the database. |
| **Social engineering** | Tricks people, not machines, into giving secrets. |
| **Spoofing** | Pretending to be a trusted source (email, IP or caller ID). |
| **Sniffing** | Capturing data packets on a network. |
| **Zero-day** | Attack on a flaw the vendor does not yet know about. |
| **Identity theft** | Using someone's personal data to cheat. |
| **Skimming** | Copying card data with a hidden device on an ATM or shop machine. |
| **SIM swap** | Fraudster gets a duplicate SIM to receive your OTPs. |
| **Cyberstalking, cyberbullying** | Online harassment. |

### Types of hackers

**White hat** (ethical, with permission), **black hat** (criminal), **grey hat** (in between). **Ethical hacking** and **penetration testing** are legal security checks.

:::mem Memory trick
**Virus needs a host; worm walks alone; trojan tricks.** Ransomware = ransom. Phishing = fishing for your details.
:::

## Cryptography and Protection {#cryptography}

**Cryptography** converts readable data (**plaintext**) into unreadable data (**ciphertext**) using a **key**. **Encryption** is plaintext to ciphertext; **decryption** is the reverse.

| Type | Keys | Facts |
|---|---|---|
| **Symmetric** | **One shared key** for both | Fast. Key distribution is the problem. **AES, DES, 3DES.** |
| **Asymmetric (public key)** | **Public key** encrypts, **private key** decrypts | Slower but safe to share the public key. **RSA.** |
| **Hashing** | **No key**; one-way | Fixed-size fingerprint of data. Checks **integrity**. **MD5, SHA-256.** |

- **Digital signature:** the sender signs with the **private key**; anyone verifies with the **public key**. It proves **who sent it** and that it was **not changed**. Legally valid under the IT Act.
- **Digital certificate:** issued by a **Certificate Authority (CA)**; links a public key to an identity.
- **SSL/TLS:** encrypts the connection between browser and site (**HTTPS**, padlock icon).
- **Steganography:** hiding a message **inside** an image or other file.

### Protective measures

| Measure | What it does |
|---|---|
| **Firewall** | Filters incoming and outgoing traffic by rules. Hardware or software. |
| **Antivirus** | Detects and removes malware. Needs regular signature updates. |
| **IDS / IPS** | Intrusion Detection / Prevention System. |
| **VPN** | Encrypted tunnel for safe browsing. |
| **2FA / MFA** | Two-factor or multi-factor login: password + OTP, fingerprint or token. |
| **OTP** | One-Time Password, valid for one use. |
| **CAPTCHA** | Test to separate humans from bots. |
| **Backup** | Extra copy of data. Good practice is the **3-2-1 rule**: 3 copies, 2 media, 1 off-site. |
| **Software updates (patches)** | Close known security holes. |

### Safe practices

- Use **long, unique passwords** (12 or more characters, mixed). Never share your **OTP, PIN or CVV**.
- Do not open attachments or links from unknown senders. Check for **https** before entering card data.
- Do not use public Wi-Fi for banking.

:::tip Exam tip
**Symmetric = one key. Asymmetric = two keys (public and private).** **Digital signature uses the sender's private key.** **Hash is one-way and cannot be decrypted.**
:::

## Cyber Laws and Digital Payments {#cyber-law}

### Information Technology Act, 2000

India's main cyber law. It came into force on **17 October 2000** and was amended in **2008**. It gives legal recognition to **electronic records and digital signatures** and defines cyber offences.

| Section | Subject |
|---|---|
| **43** | Damage to a computer or system without permission (compensation) |
| **66** | Computer-related offences, including **hacking** |
| **66C** | **Identity theft** |
| **66D** | **Cheating by personation** using a computer |
| **66E** | Violation of **privacy** (private images) |
| **66F** | **Cyber terrorism** |
| **67** | Publishing **obscene** material electronically |
| **69** | Government powers of **interception** and monitoring |
| **72** | Breach of confidentiality and privacy |

**Section 66A** (offensive messages) was **struck down by the Supreme Court in Shreya Singhal v. Union of India (2015)** as it violated free speech.

### Institutions and other laws

- **CERT-In** (Indian Computer Emergency Response Team) is the national agency for cyber incidents, under **MeitY**.
- **National Cyber Crime Reporting Portal:** cybercrime.gov.in. **Helpline: 1930** for financial cyber fraud.
- **Digital Personal Data Protection Act, 2023** governs the processing of personal data.
- **Copyright** protects software. **Piracy** is illegal copying. **Patents** protect inventions.

:::jk J&K corner
**J&K Police** has a **Cyber Police** wing that registers and investigates cyber crime. Report online fraud first on **1930** or cybercrime.gov.in, then at the nearest police station.
:::

### Digital payments

| System | Facts |
|---|---|
| **NPCI** | National Payments Corporation of India, set up in **2008**. Runs UPI, RuPay, IMPS and others. |
| **UPI** | **Unified Payments Interface.** Launched in **2016**. Instant, 24 x 7, uses a **VPA (UPI ID)** and a **UPI PIN**. |
| **IMPS** | Immediate Payment Service. 24 x 7 bank transfer. |
| **NEFT** | National Electronic Funds Transfer. Settled in batches. 24 x 7 now. |
| **RTGS** | Real Time Gross Settlement. For **large-value** transfers (minimum **₹2 lakh**). |
| **BHIM** | Government UPI app. |
| **RuPay** | Indian card network. |
| **AePS** | Aadhaar Enabled Payment System. |
| **USSD** | UPI without internet on basic phones: dial {{*99#}}. |

:::key Key fact
**No genuine bank or UPI request ever needs you to enter your PIN to RECEIVE money.** A "collect" request needs your PIN to **pay**. Never share an OTP with anyone.
:::

@unit MS Word and PowerPoint

## Microsoft Word {#ms-word}

**MS Word** is a **word processor** made by Microsoft. Its files use the extension **.docx** (older **.doc**). A **template** is **.dotx**; a file with **macros** is **.docm**.

### The window

- **Title bar**, **Quick Access Toolbar** (Save, Undo, Redo), **Ribbon** with tabs, **Ruler**, **Status bar** (page number, word count, zoom), **Scroll bars**.
- **Ribbon tabs:** **File, Home, Insert, Design, Layout (Page Layout), References, Mailings, Review, View.**

| Tab | Main groups and tools |
|---|---|
| **Home** | Clipboard (Cut, Copy, Paste, **Format Painter**), Font, Paragraph (alignment, spacing, bullets), Styles, Editing (Find, Replace, Select) |
| **Insert** | Pages (Cover page, Blank page, **Page break**), **Table**, Pictures, Shapes, **SmartArt**, Chart, Link, **Header, Footer, Page number**, Text box, **Symbol, Equation** |
| **Design** | Themes, **Watermark**, Page color, Page borders |
| **Layout** | **Margins, Orientation, Size, Columns, Breaks**, Indent, Spacing |
| **References** | **Table of Contents, Footnote, Endnote, Citation, Bibliography, Caption** |
| **Mailings** | **Mail Merge**, Envelopes, Labels |
| **Review** | **Spelling and Grammar (F7)**, Word Count, **Track Changes, Comments**, Accept and Reject |
| **View** | Views, Zoom, Ruler, Gridlines, Navigation Pane |

### Important concepts

- **Views:** Print Layout (default), Read Mode, Web Layout, Outline, Draft.
- **Default page:** margins of **1 inch (2.54 cm)** on all sides in recent versions; A4 in India.
- **Alignment:** left, centre, right, **justify**. **Indent:** moves text from the margin. **Line spacing:** distance between lines.
- **Header and Footer:** repeated text at the top and bottom of every page.
- **Drop cap:** large first letter of a paragraph.
- **Section break:** lets you change layout (margins, orientation) inside one document. A **page break** only starts a new page.
- **Footnote:** note at the **bottom of the page**; **endnote:** at the **end of the document**.
- **Track Changes** records edits so others can accept or reject them.
- **Table of Contents** is built automatically from **Heading** styles.
- **Print range example:** typing {{1-3,5}} prints pages 1, 2, 3 and 5.

### Mail Merge

Mail merge creates many personalised copies of one letter. It needs three parts:

1. **Main document:** the letter with fixed text.
2. **Data source:** a table (Excel, Access or Word table) with names and addresses.
3. **Merge fields:** placeholders such as «Name» that take values from the data source.

Steps: **Start Mail Merge → Select Recipients → Insert Merge Field → Preview Results → Finish and Merge.** Types: Letters, Emails, Envelopes, Labels, Directory.

### Word shortcuts

| Keys | Action |
|---|---|
| {{Ctrl + B}} / {{Ctrl + I}} / {{Ctrl + U}} | **Bold** / *Italic* / Underline |
| {{Ctrl + L}} / {{Ctrl + E}} / {{Ctrl + R}} / {{Ctrl + J}} | Align left / centre / right / justify |
| {{Ctrl + S}} / {{F12}} | Save / Save As |
| {{Ctrl + N}} / {{Ctrl + O}} / {{Ctrl + P}} | New / Open / Print |
| {{Ctrl + W}} | Close the document |
| {{Ctrl + F}} / {{Ctrl + H}} / {{Ctrl + G}} | Find / Replace / Go To |
| {{Ctrl + K}} | Insert hyperlink |
| {{Ctrl + Enter}} | Page break |
| {{Shift + Enter}} | Line break (new line, same paragraph) |
| {{Ctrl + Home}} / {{Ctrl + End}} | Start / end of document |
| {{Ctrl + Shift + C}} / {{Ctrl + Shift + V}} | Copy / paste formatting |
| {{Ctrl + 1}} / {{Ctrl + 2}} / {{Ctrl + 5}} | Single / double / 1.5 line spacing |
| {{Ctrl + ]}} / {{Ctrl + [}} | Increase / decrease font size |
| {{Shift + F3}} | Change case (UPPER, lower, Title) |
| {{F7}} | Spelling and grammar check |
| {{Ctrl + A}} | Select all |

**Selection with the mouse:** double-click selects a **word**, triple-click selects a **paragraph**, **Ctrl + click** selects a **sentence**, and clicking in the left margin selects a **line**.

:::tip Exam tip
**Mail merge = main document + data source.** **Page break = Ctrl + Enter. Line break = Shift + Enter.** **Footnote = page bottom; endnote = document end.**
:::

## Microsoft PowerPoint {#ms-powerpoint}

**MS PowerPoint** creates **presentations** made of **slides**. File extensions: **.pptx** (older **.ppt**), **.ppsx** (opens directly as a slide show), **.potx** (template).

### The window

- **Slide pane** (centre), **thumbnail pane** (left), **Notes pane** (below), Ribbon tabs: **File, Home, Insert, Design, Transitions, Animations, Slide Show, Review, View.**
- Default slide size is **16:9 widescreen** (older versions used 4:3).

| Tab | Main uses |
|---|---|
| **Home** | New Slide, **Layout**, Font, Paragraph |
| **Insert** | Pictures, Shapes, SmartArt, Charts, Video, Audio, Hyperlink, **Action buttons**, Header and Footer, Slide number |
| **Design** | **Themes**, Variants, Slide size, Background |
| **Transitions** | Effects **between slides** |
| **Animations** | Effects on **objects** (text, pictures) inside a slide; **Animation Pane** |
| **Slide Show** | Start, **Rehearse Timings**, Record, Set Up Slide Show |
| **View** | Normal, Slide Sorter, Notes Page, Reading View, **Slide Master** |

### Views

| View | Use |
|---|---|
| **Normal** | Main editing view. |
| **Slide Sorter** | Thumbnails of all slides: reorder, copy, delete. |
| **Notes Page** | Speaker notes with each slide. |
| **Reading View** | Review in a window. |
| **Slide Show** | Full-screen presentation. |

### Key ideas

- **Layout:** arrangement of placeholders on a slide (Title, Title and Content, Blank).
- **Theme:** colours, fonts and effects for the whole deck.
- **Slide Master:** controls the **design of all slides** at once (logo, font, background).
- **Transition vs animation:** a **transition** is the effect when **moving from one slide to the next**; an **animation** moves **objects within a slide**.
- **Presenter view:** shows notes and the next slide to the speaker only.
- **Export:** save as **PDF**, video or handouts.

### PowerPoint shortcuts

| Keys | Action |
|---|---|
| {{F5}} | Start the show **from the beginning** |
| {{Shift + F5}} | Start from the **current slide** |
| {{Esc}} | End the show |
| {{Ctrl + M}} | Insert a **new slide** |
| {{N}} or {{Enter}} or {{Right arrow}} | Next slide (in show) |
| {{P}} or {{Left arrow}} | Previous slide |
| {{B}} / {{W}} | Black screen / white screen during the show |
| {{Ctrl + D}} | Duplicate the selected slide or object |
| {{Ctrl + Shift + C}} / {{Ctrl + Shift + V}} | Copy / paste formatting |
| {{Page Up}} / {{Page Down}} | Previous / next slide in Normal view |

:::mem Memory trick
**Transition = Travel between slides. Animation = Action on objects.** **F5 = Full show from start; Shift + F5 = from here.**
:::

@unit Microsoft Excel

## Excel Basics {#excel-basics}

**MS Excel** is a **spreadsheet** program. Data is stored in a grid of **rows and columns**. Its files are called **workbooks**; each workbook holds one or more **worksheets**.

### Structure and limits

| Item | Fact |
|---|---|
| **Cell** | Intersection of a row and a column. Address such as **B5** (column letter first, then row number). |
| **Active cell** | The selected cell, shown with a thick border. |
| **Rows** | **1,048,576** |
| **Columns** | **16,384**, from A to **XFD** |
| **Cells in a sheet** | 1,048,576 × 16,384 (about 17 billion) |
| **Default sheets in a new workbook** | **1** (Excel 2013 and later); older versions gave 3 |
| **Sheet name** | Up to **31 characters**. Cannot contain {{\ / ? * [ ] :}} |
| **Characters in a cell** | Up to **32,767** |
| **Zoom** | 10% to 400% |
| **Default column width / row height** | 8.43 characters / 15 points |

**File types:** **.xlsx** (default), **.xls** (old), **.xlsm** (with macros), **.xlsb** (binary), **.xltx** (template), **.csv** (plain text with commas).

### The window

**Title bar, Quick Access Toolbar, Ribbon, Name Box** (shows the active cell address, lets you jump to a cell or name), **Formula Bar** (shows the cell contents), **Column and row headers, Sheet tabs, Status bar** (shows Sum, Average and Count of the selected cells).

**Ribbon tabs:** File, Home, Insert, Page Layout, **Formulas**, **Data**, Review, View.

### Data entry

- **Text** is **left-aligned** by default; **numbers and dates** are **right-aligned**; **logical values and errors** are **centred**.
- To store a number as text, start with an **apostrophe** (for example {{'0191}}) or format the cell as Text.
- **Fill Handle:** the small square at the corner of the selection. **Drag** to copy or to continue a series (Jan, Feb, Mon, Tue, 1, 2, 3). Typing 1 and 2 and dragging gives 3, 4, 5.
- **Alt + Enter** starts a **new line inside a cell**. **Wrap Text** shows long text on several lines.
- **Merge and Center** joins cells into one. Only the **upper-left** value is kept.

### How Excel stores dates and times

A **date is a serial number**: **1 = 1 January 1900**, 2 = 2 January 1900, and so on. A **time** is a **fraction of a day**: 0.5 = 12:00 noon. So **date arithmetic is plain subtraction** and a date formatted as General shows a number.

### Number formats

General, Number, Currency, **Accounting**, Short and Long Date, Time, **Percentage** (multiplies by 100), Fraction, Scientific, **Text**. A cell showing **####** means the **column is too narrow** (or the date or time result is negative).

:::tip Exam tip
Remember the numbers: **1,048,576 rows, 16,384 columns, last column XFD, 31-character sheet name, 1 January 1900 = serial 1.** They appear again and again.
:::

## Formulas, Operators and Cell References {#excel-references}

A **formula always begins with an equals sign (=)**. Excel then calculates and shows the result. A **function** is a built-in formula such as {{SUM}}. Typing a **+** or **-** at the start also works, but = is standard.

### Operators and order of operations

| Operator | Meaning |
|---|---|
| {{+  -  *  /}} | Add, subtract, multiply, divide |
| {{^}} | Power |
| {{%}} | Percent |
| {{&}} | **Joins text** (concatenation) |
| {{=  <>  >  <  >=  <=}} | Comparison; result is TRUE or FALSE |
| {{:}} | **Range**: A1:A10 |
| {{,}} | **Union**: A1:A5,C1:C5 |
| space | **Intersection**: the cells common to two ranges |

**Order of calculation (high to low):** **Brackets → % → ^ → × and ÷ → + and − → & → comparison.** Operators of equal rank work **left to right**.

| Formula | Result | Why |
|---|---|---|
| {{=2+3*4}} | **14** | Multiplication first |
| {{=(2+3)*4}} | **20** | Brackets first |
| {{=10-2-3}} | **5** | Left to right |
| {{=2^3^2}} | **64** | (2^3)^2, left to right |
| {{=-2^2}} | **4** | Excel applies the minus sign **before** the power |
| {{=50%*200}} | **100** | 50% is 0.5 |
| {{="J"&"K"&1}} | **JK1** | Text joining |
| {{=5>3}} | **TRUE** | Comparison |

### Types of cell reference

| Type | Example | Behaviour when copied |
|---|---|---|
| **Relative** | {{A1}} | Changes with the new position (default). |
| **Absolute** | {{$A$1}} | **Never changes.** Both column and row are locked. |
| **Mixed** | {{$A1}} or {{A$1}} | Only the column **or** only the row is locked. |

**F4 cycles the reference:** A1 → $A$1 → A$1 → $A1 → A1.

**Example.** Cell B2 holds a price, and F1 holds a tax rate of 18%. In C2 write {{=B2*$F$1}} and copy it down. The price reference moves (B3, B4 ...) but **$F$1 stays fixed**.

### Other kinds of reference

| Reference | Form |
|---|---|
| **Another sheet** | {{=Sheet2!A1}} |
| **Another workbook** | {{=[Book1.xlsx]Sheet1!$A$1}} |
| **3-D reference** (same cell across sheets) | {{=SUM(Sheet1:Sheet3!B2)}} |
| **Named range** | {{=SUM(Marks)}} after naming C2:C9 as Marks (Name Box, or **Ctrl + F3** Name Manager, **Ctrl + Shift + F3** create from selection) |
| **Table (structured)** | {{=SUM(Table1[Marks])}} |

### Wildcards in criteria

{{?}} matches **one** character, {{*}} matches **any number** of characters, and {{~}} cancels a wildcard (so {{~*}} means a real star). They work in COUNTIF, SUMIF, MATCH, VLOOKUP and similar functions, not in IF.

:::mem Memory trick
**F4 = Fix.** The dollar sign **locks** what follows it: $A$1 locks column and row, A$1 locks only the row.
:::

### The sample sheet used in all the examples

Every example in this unit uses this small table in **A1:D9**.

| | A | B | C | D |
|---|---|---|---|---|
| **1** | **Name** | **District** | **Marks** | **Fee (₹)** |
| **2** | Aamir | Srinagar | 78 | 2500 |
| **3** | Bilal | Jammu | 65 | 3000 |
| **4** | Charu | Jammu | 92 | 3000 |
| **5** | Danish | Anantnag | 55 | 2500 |
| **6** | Eram | Srinagar | 88 | 3500 |
| **7** | Farhan | Baramulla | 40 | 2500 |
| **8** | Gurpreet | Jammu | 71 | 3000 |
| **9** | Hina | Anantnag | 83 | 3500 |

Type it into a sheet and test every formula yourself. **Total marks = 572, average = 71.5, total fee = 23,500.**

## Math and Rounding Functions {#excel-math}

| Function | Syntax | Example and result | Use |
|---|---|---|---|
| **SUM** | {{=SUM(number1, [number2], ...)}} | {{=SUM(C2:C9)}} → **572** | Adds numbers. Ignores text and blanks in a range. |
| **AutoSum** | **Alt + =** | | Inserts SUM for the neighbouring cells. |
| **PRODUCT** | {{=PRODUCT(2,3,4)}} | **24** | Multiplies. |
| **SUMPRODUCT** | {{=SUMPRODUCT(array1, array2)}} | {{=SUMPRODUCT(C2:C9,D2:D9)}} → **1715000** | Multiplies matching items, then adds. Works as a **multi-condition counter** and weighted average. |
| **SUMSQ** | {{=SUMSQ(3,4)}} | **25** | Sum of squares. |
| **ABS** | {{=ABS(-7)}} | **7** | Absolute value. |
| **SIGN** | {{=SIGN(-9)}} | **-1** | -1, 0 or 1. |
| **SQRT** | {{=SQRT(144)}} | **12** | Square root. Negative gives #NUM!. |
| **POWER** | {{=POWER(2,10)}} | **1024** | Same as 2^10. |
| **EXP, LN, LOG, LOG10** | {{=LOG(100,10)}} | **2** | Exponent and logarithms. |
| **MOD** | {{=MOD(17,5)}} | **2** | **Remainder.** Sign follows the **divisor**: {{=MOD(-7,3)}} → 2. |
| **QUOTIENT** | {{=QUOTIENT(17,5)}} | **3** | Integer part of division. |
| **INT** | {{=INT(-4.5)}} | **-5** | Rounds **down** to the next lower integer. |
| **TRUNC** | {{=TRUNC(-4.5)}} | **-4** | **Cuts off** the decimals, no rounding. |
| **FACT** | {{=FACT(5)}} | **120** | Factorial. |
| **COMBIN / PERMUT** | {{=COMBIN(5,2)}} / {{=PERMUT(5,2)}} | **10** / **20** | Combinations / permutations. |
| **GCD / LCM** | {{=GCD(12,18)}} / {{=LCM(4,6)}} | **6** / **12** | Highest common factor / lowest common multiple. |
| **PI** | {{=PI()}} | 3.14159... | The constant pi. |
| **RAND** | {{=RAND()}} | Random decimal between 0 and 1 | Changes at every recalculation. |
| **RANDBETWEEN** | {{=RANDBETWEEN(1,100)}} | Random whole number from 1 to 100 | |
| **SUBTOTAL** | {{=SUBTOTAL(9, C2:C9)}} | **572** | Totals that **ignore other SUBTOTALs** and obey filters. |

### Rounding functions

| Function | Example | Result | Rule |
|---|---|---|---|
| **ROUND** | {{=ROUND(2.567,2)}} | **2.57** | Normal rounding to the given digits. |
| | {{=ROUND(1234,-2)}} | **1200** | A **negative** digit count rounds to hundreds, tens and so on. |
| **ROUNDUP** | {{=ROUNDUP(2.341,1)}} | **2.4** | Always **away from zero**. |
| **ROUNDDOWN** | {{=ROUNDDOWN(2.99,0)}} | **2** | Always **towards zero**. |
| **MROUND** | {{=MROUND(17,5)}} | **15** | Nearest multiple of 5. |
| **CEILING** | {{=CEILING(17,5)}} | **20** | Up to the next multiple. |
| **FLOOR** | {{=FLOOR(17,5)}} | **15** | Down to the previous multiple. |
| **EVEN / ODD** | {{=EVEN(3)}} / {{=ODD(4)}} | **4** / **5** | Round **up** to the next even or odd number. |

### SUBTOTAL function numbers

{{=SUBTOTAL(function_num, range)}}. Numbers **1 to 11** include rows hidden by hand; **101 to 111** **leave out hidden rows**. **Filtered-out rows are always left out.**

| Number | Function | Number | Function |
|---|---|---|---|
| **1 / 101** | AVERAGE | **5 / 105** | MIN |
| **2 / 102** | COUNT | **6 / 106** | PRODUCT |
| **3 / 103** | COUNTA | **7 / 107** | STDEV |
| **4 / 104** | MAX | **9 / 109** | **SUM** |

:::tip Exam tip
**INT(-4.5) = -5 but TRUNC(-4.5) = -4.** **ROUND with -2 rounds to hundreds.** **SUBTOTAL(9, ...) = sum that ignores other subtotals; 9 is SUM.**
:::

## Statistical Functions {#excel-statistics}

### Counting and averages

| Function | Syntax and example | Result | Notes |
|---|---|---|---|
| **AVERAGE** | {{=AVERAGE(C2:C9)}} | **71.5** | Ignores text and blanks, **but counts zeros**. |
| **AVERAGEA** | {{=AVERAGEA(range)}} | | Counts text as 0 and TRUE as 1. |
| **COUNT** | {{=COUNT(C2:C9)}} | **8** | Counts **numbers (and dates)** only. |
| **COUNTA** | {{=COUNTA(A1:A9)}} | **9** | Counts **all non-empty** cells, text included. |
| **COUNTBLANK** | {{=COUNTBLANK(A1:D9)}} | **0** | Counts empty cells. |
| **MAX / MIN** | {{=MAX(C2:C9)}} / {{=MIN(C2:C9)}} | **92** / **40** | Highest and lowest. |
| **MEDIAN** | {{=MEDIAN(C2:C9)}} | **74.5** | Middle value. With an even count it is the **average of the two middle values** (71 and 78). |
| **MODE.SNGL** | {{=MODE.SNGL(D2:D9)}} | **2500** | Most frequent value. Returns the **first** one when tied. |
| **MODE.MULT** | {{=MODE.MULT(range)}} | | All modes (array result). |

### Position, rank and percentile

| Function | Example | Result | Notes |
|---|---|---|---|
| **LARGE** | {{=LARGE(C2:C9,2)}} | **88** | 2nd largest. |
| **SMALL** | {{=SMALL(C2:C9,2)}} | **55** | 2nd smallest. |
| **RANK.EQ** (old **RANK**) | {{=RANK.EQ(C2,$C$2:$C$9,0)}} | **4** | Rank of 78. **0 or omitted = descending** (largest is 1); **1 = ascending**. Ties share a rank. |
| **RANK.AVG** | {{=RANK.AVG(...)}} | | Ties get the **average** rank. |
| **PERCENTILE.INC** | {{=PERCENTILE.INC(C2:C9,0.9)}} | **89.2** | Value below which 90% of data fall. |
| **QUARTILE.INC** | {{=QUARTILE.INC(C2:C9,1)}} | **62.5** | Quarter number 0 to 4: 0 = min, 2 = median, 4 = max. |
| **PERCENTRANK.INC** | {{=PERCENTRANK.INC(range, x)}} | | Relative standing from 0 to 1. |

### Spread and relationship

| Function | Example | Result | Notes |
|---|---|---|---|
| **VAR.S / VAR.P** | {{=VAR.S(C2:C9)}} | **310.57** | Variance of a **sample** / of the **whole population** (271.75). |
| **STDEV.S / STDEV.P** | {{=STDEV.S(C2:C9)}} | **17.62** | Standard deviation, **sample** (divides by n - 1) / **population** (divides by n, gives 16.48). |
| **CORREL** | {{=CORREL(C2:C9,D2:D9)}} | **0.675** | Correlation between two sets, from -1 to +1. |
| **SLOPE / INTERCEPT** | {{=SLOPE(y_range, x_range)}} | | Regression line y = mx + c. |
| **FORECAST.LINEAR** | {{=FORECAST.LINEAR(x, known_y, known_x)}} | | Predicts a value on the line. |
| **FREQUENCY** | {{=FREQUENCY(data, bins)}} | | Count in each class interval (array formula). |

### Useful everyday formulas

| Need | Formula |
|---|---|
| **Percentage of total** | {{=C2/SUM($C$2:$C$9)}} (format as %) |
| **Percentage change** | {{=(New - Old)/Old}} |
| **Average without a formula** | Select cells and read the **status bar**. |
| **Simple interest** | {{=P*R*T/100}} |
| **Compound amount** | {{=P*(1+R/100)^T}}; {{=10000*(1+10/100)^2}} → **12100** |
| **CAGR** | {{=(End/Start)^(1/Years)-1}}; {{=(150/100)^(1/3)-1}} → **14.47%** |

:::mem Memory trick
**".S" is Sample, ".P" is Population.** The sample version divides by **n - 1**, so it is always a little larger.
:::

## Logical and Information Functions {#excel-logical}

### IF and its partners

| Function | Syntax | Example | Result |
|---|---|---|---|
| **IF** | {{=IF(logical_test, value_if_true, value_if_false)}} | {{=IF(C2>=40,"Pass","Fail")}} | **Pass** |
| **Nested IF** | {{=IF(C2>=90,"A+",IF(C2>=75,"A",IF(C2>=60,"B",IF(C2>=40,"Pass","Fail"))))}} | for 78 | **A** |
| **IFS** (2019+) | {{=IFS(C2>=90,"A+",C2>=75,"A",C2>=60,"B",TRUE,"C")}} | for 78 | **A** |
| **AND** | {{=AND(C2>=60,D2>=3000)}} | Aamir (78, 2500) | **FALSE** |
| **OR** | {{=OR(C2>=90,D2>=3500)}} | Eram (88, 3500) | **TRUE** |
| **NOT** | {{=NOT(C2>=60)}} | for 78 | **FALSE** |
| **XOR** | {{=XOR(TRUE,TRUE)}} | | **FALSE** (TRUE only if an **odd** number are TRUE) |
| **SWITCH** (2019+) | {{=SWITCH(2,1,"Mon",2,"Tue","Other")}} | | **Tue** |
| **IFERROR** | {{=IFERROR(value, value_if_error)}} | {{=IFERROR(VLOOKUP("Zoya",A2:D9,3,FALSE),"Not found")}} | **Not found** |
| **IFNA** | {{=IFNA(value, value_if_na)}} | | Hides **only #N/A**. |

**Combined conditions:** {{=IF(AND(C2>=60,B2="Jammu"),"Merit","")}} tests two things; **AND needs all true, OR needs any one.** The IF function allows **64 nested levels**.

:::key Key fact
**IF with text:** always put text in **double quotes** ("Pass"). Numbers and cell references take no quotes. A comparison like {{=A1="Jammu"}} is **not case-sensitive**.
:::

### Information (IS) functions

All return **TRUE or FALSE**.

| Function | Tests whether the cell is... |
|---|---|
| {{=ISBLANK(A1)}} | empty |
| {{=ISNUMBER(A1)}} | a number (a **date is a number**) |
| {{=ISTEXT(A1)}} | text |
| {{=ISERROR(A1)}} | any error |
| {{=ISERR(A1)}} | any error **except #N/A** |
| {{=ISNA(A1)}} | the #N/A error |
| {{=ISEVEN(A1)}} / {{=ISODD(A1)}} | even / odd |
| {{=ISFORMULA(A1)}} | holding a formula |
| {{=ISLOGICAL(A1)}} | TRUE or FALSE |

Other: {{=TYPE(A1)}} gives 1 for number, 2 text, 4 logical, 16 error. {{=N(A1)}} converts to a number. {{=CELL("address",A1)}} and {{=INFO(...)}} describe the cell and the system.

**TRUE counts as 1 and FALSE as 0** in arithmetic, which is why {{=SUMPRODUCT((B2:B9="Jammu")*(C2:C9>=70))}} counts the Jammu students with 70 or more: it returns **2**.

## Conditional Functions: SUMIF, COUNTIF and Others {#excel-conditional}

These add, count or average **only the cells that meet a condition**. They are among the most tested Excel functions.

### The five core functions

| Function | Syntax | Example | Result |
|---|---|---|---|
| **COUNTIF** | {{=COUNTIF(range, criteria)}} | {{=COUNTIF(B2:B9,"Jammu")}} | **3** |
| | | {{=COUNTIF(C2:C9,">=60")}} | **6** |
| **COUNTIFS** | {{=COUNTIFS(range1, crit1, range2, crit2, ...)}} | {{=COUNTIFS(B2:B9,"Jammu",C2:C9,">=70")}} | **2** |
| **SUMIF** | {{=SUMIF(range, criteria, [sum_range])}} | {{=SUMIF(B2:B9,"Jammu",C2:C9)}} | **228** |
| | | {{=SUMIF(C2:C9,">=60",D2:D9)}} | **18500** |
| **SUMIFS** | {{=SUMIFS(sum_range, range1, crit1, range2, crit2, ...)}} | {{=SUMIFS(D2:D9,B2:B9,"Anantnag")}} | **6000** |
| **AVERAGEIF** | {{=AVERAGEIF(range, criteria, [average_range])}} | {{=AVERAGEIF(B2:B9,"Srinagar",C2:C9)}} | **83** |
| **AVERAGEIFS** | {{=AVERAGEIFS(avg_range, range1, crit1, ...)}} | | |
| **MAXIFS / MINIFS** (2019+) | {{=MAXIFS(max_range, range1, crit1, ...)}} | {{=MAXIFS(C2:C9,B2:B9,"Jammu")}} | **92** |

:::tip Exam tip
**Argument order trap.** In **SUMIF** the sum range comes **last** (range, criteria, sum_range). In **SUMIFS and AVERAGEIFS** the sum range comes **first**. COUNTIF and COUNTIFS have no sum range.
:::

### Writing criteria

| Criteria | Meaning |
|---|---|
| {{"Jammu"}} | Equal to Jammu (not case-sensitive) |
| {{">=60"}} | Comparison goes **inside quotes** |
| {{"<>Jammu"}} | Not equal |
| {{"J*"}} | Starts with J (wildcard) |
| {{"?????"}} | Exactly five characters |
| {{">"&F1}} | Greater than the value **in cell F1** (join with &) |
| {{"<>"}} | Not blank |
| {{""}} | Blank |
| {{">"&AVERAGE(C2:C9)}} | Greater than the average |

### OR conditions

SUMIFS and COUNTIFS combine conditions with **AND**. For **OR**, add separate functions:

{{=COUNTIF(B2:B9,"Jammu")+COUNTIF(B2:B9,"Srinagar")}} → **5**

or count several values at once with {{=SUM(COUNTIF(B2:B9,{"Jammu","Srinagar"}))}} → **5**.

### Between two values

{{=COUNTIFS(C2:C9,">=60",C2:C9,"<=80")}} counts marks from 60 to 80: **3** (78, 65, 71).

### Remember

- Text criteria are **not case-sensitive**. For **case-sensitive** counting use SUMPRODUCT with EXACT.
- Ranges in the IFS family of functions must all be the **same size**.
- A criteria range and the sum range must line up row by row.
- A criterion like {{"1"}} matches both the **number 1 and the text 1**, so COUNTIF does not tell them apart.

## Lookup and Reference Functions {#excel-lookup}

Lookup functions **find a value in a table** and return related data. They are the heart of office Excel work.

### VLOOKUP and HLOOKUP

{{=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])}}

| Argument | Meaning |
|---|---|
| **lookup_value** | What to find. |
| **table_array** | The table. The value must be in its **first (leftmost) column**. |
| **col_index_num** | Which column to return, **counted from the first column of the table** (1, 2, 3 ...). |
| **range_lookup** | **FALSE or 0 = exact match.** TRUE or omitted = **approximate** match (data must be sorted **ascending**). |

| Formula | Result |
|---|---|
| {{=VLOOKUP("Eram",A2:D9,3,FALSE)}} | **88** (Eram's marks) |
| {{=VLOOKUP("Eram",A2:D9,2,FALSE)}} | **Srinagar** |
| {{=VLOOKUP("Zoya",A2:D9,3,FALSE)}} | **#N/A** (not found) |
| {{=IFERROR(VLOOKUP("Zoya",A2:D9,3,FALSE),"Not found")}} | **Not found** |
| {{=VLOOKUP("Sri*",A2:D9,1,FALSE)}} | Wildcard match (needs text starting Sri) |

**Approximate match for grades.** Put this grade table in F2:G7, sorted ascending by marks:

| F | G |
|---|---|
| 0 | F |
| 40 | D |
| 50 | C |
| 60 | B |
| 75 | A |
| 90 | A+ |

{{=VLOOKUP(78,$F$2:$G$7,2,TRUE)}} → **A**. Excel returns the **largest value that is less than or equal to 78**, which is 75. This is the clean alternative to a long nested IF.

**HLOOKUP** works the same way but searches the **top row** and returns from a **row**: {{=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])}}.

:::tip Exam tip
**VLOOKUP errors:** **#N/A** = value not found. **#REF!** = column number is larger than the table has. **#VALUE!** = column number is less than 1. **VLOOKUP cannot look to the left** of the lookup column.
:::

### INDEX and MATCH

| Function | Syntax | Example | Result |
|---|---|---|---|
| **MATCH** | {{=MATCH(lookup_value, lookup_array, [match_type])}} | {{=MATCH("Eram",A2:A9,0)}} | **5** (position, not value) |
| **INDEX** | {{=INDEX(array, row_num, [col_num])}} | {{=INDEX(A2:D9,5,3)}} | **88** |
| **INDEX + MATCH** | {{=INDEX(return_range, MATCH(value, lookup_range, 0))}} | {{=INDEX(A2:A9,MATCH(92,C2:C9,0))}} | **Charu** (looks left) |
| **Two-way lookup** | {{=INDEX(table, MATCH(row_value, rows, 0), MATCH(col_value, cols, 0))}} | | Row and column both found |

**MATCH types:** **0 = exact**; **1 = largest value less than or equal** (data sorted ascending, the default); **-1 = smallest value greater than or equal** (data sorted descending).

**Top scorer:** {{=INDEX(A2:A9,MATCH(MAX(C2:C9),C2:C9,0))}} → **Charu**.

### XLOOKUP (Excel 2021 and Microsoft 365)

{{=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])}}

- {{=XLOOKUP("Eram",A2:A9,C2:C9,"Not found")}} → **88**
- Looks **left or right**, defaults to an **exact match**, needs no column number, and has a built-in **not found** message.
- **match_mode:** 0 exact (default), -1 exact or next smaller, 1 exact or next larger, 2 wildcard. **search_mode:** 1 first to last, **-1 last to first**.
- **XMATCH** is the matching partner of MATCH.

### VLOOKUP, INDEX-MATCH and XLOOKUP compared

| Feature | VLOOKUP | INDEX + MATCH | XLOOKUP |
|---|---|---|---|
| Look to the left | No | **Yes** | **Yes** |
| Default match | Approximate | Set by you | **Exact** |
| Breaks if a column is inserted | **Yes** (fixed column number) | No | No |
| Available in | All versions | All versions | 2021 and 365 |

### Other reference functions

| Function | Example | Result |
|---|---|---|
| **LOOKUP** | {{=LOOKUP(78,F2:F7,G2:G7)}} | **A** (needs sorted data) |
| **CHOOSE** | {{=CHOOSE(2,"Low","Medium","High")}} | **Medium** |
| **ROW / COLUMN** | {{=ROW(C5)}} / {{=COLUMN(C5)}} | **5** / **3** |
| **ROWS / COLUMNS** | {{=ROWS(A2:D9)}} / {{=COLUMNS(A2:D9)}} | **8** / **4** |
| **ADDRESS** | {{=ADDRESS(2,3)}} | **$C$2** |
| **OFFSET** | {{=OFFSET(A1,2,1)}} | Value in **B3** (2 rows down, 1 column right) |
| **INDIRECT** | {{=INDIRECT("C"&5)}} | Value in **C5** (address built from text) |
| **TRANSPOSE** | {{=TRANSPOSE(A1:A4)}} | Turns a column into a row |
| **HYPERLINK** | {{=HYPERLINK("https://jkedusphere.com","Open")}} | A clickable link |

**OFFSET** and **INDIRECT** are **volatile**: they recalculate every time anything changes.

## Text Functions {#excel-text}

Text functions clean and cut text. Examples use the word **JKEdusphere** (11 characters).

| Function | Syntax | Example | Result |
|---|---|---|---|
| **LEN** | {{=LEN(text)}} | {{=LEN("JKEdusphere")}} | **11** (spaces count) |
| **LEFT** | {{=LEFT(text, [n])}} | {{=LEFT("JKEdusphere",2)}} | **JK** |
| **RIGHT** | {{=RIGHT(text, [n])}} | {{=RIGHT("JKEdusphere",4)}} | **here** |
| **MID** | {{=MID(text, start, n)}} | {{=MID("JKEdusphere",3,3)}} | **Edu** |
| **FIND** | {{=FIND(find_text, within_text, [start])}} | {{=FIND("s","JKEdusphere")}} | **6**. **Case-sensitive**, no wildcards. |
| **SEARCH** | {{=SEARCH(find_text, within_text, [start])}} | {{=SEARCH("S","JKEdusphere")}} | **6**. **Not case-sensitive**, allows wildcards. |
| **UPPER / LOWER** | {{=UPPER("jammu")}} | | **JAMMU** / jammu |
| **PROPER** | {{=PROPER("jammu and kashmir")}} | | **Jammu And Kashmir** |
| **TRIM** | {{=TRIM("  Srinagar   city ")}} | | **Srinagar city** (removes extra spaces, keeps one between words) |
| **CLEAN** | {{=CLEAN(text)}} | | Removes **non-printing** characters |
| **SUBSTITUTE** | {{=SUBSTITUTE(text, old, new, [instance])}} | {{=SUBSTITUTE("2026-10-21","-","/")}} | **2026/10/21**. Replaces by **content**. |
| **REPLACE** | {{=REPLACE(old_text, start, n, new_text)}} | {{=REPLACE("JK2025",3,4,"2026")}} | **JK2026**. Replaces by **position**. |
| **CONCATENATE / CONCAT** | {{=CONCAT(text1, text2, ...)}} | {{=A2&" - "&B2}} | **Aamir - Srinagar** |
| **TEXTJOIN** (2019+) | {{=TEXTJOIN(delimiter, ignore_empty, text1, ...)}} | {{=TEXTJOIN(", ",TRUE,A2:A4)}} | **Aamir, Bilal, Charu** |
| **EXACT** | {{=EXACT(text1, text2)}} | {{=EXACT("Jammu","jammu")}} | **FALSE** (case-sensitive compare) |
| **REPT** | {{=REPT(text, n)}} | {{=REPT("*",5)}} | {{*****}} |
| **VALUE** | {{=VALUE("123")+1}} | | **124** (text to number) |
| **TEXT** | {{=TEXT(value, format)}} | {{=TEXT(1234.5,"#,##0.00")}} | **1,234.50** |
| | | {{=TEXT(DATE(2026,10,21),"dd-mmm-yyyy")}} | **21-Oct-2026** |
| | | {{=TEXT(DATE(2026,10,21),"dddd")}} | **Wednesday** |
| | | {{=TEXT(0.256,"0.0%")}} | **25.6%** |
| **CHAR / CODE** | {{=CHAR(65)}} / {{=CODE("A")}} | | **A** / **65** |
| **TEXTBEFORE / TEXTAFTER / TEXTSPLIT** (365) | {{=TEXTBEFORE("Ali Khan"," ")}} | | **Ali** |

:::tip Exam tip
**FIND is case-sensitive; SEARCH is not.** **SUBSTITUTE changes by text, REPLACE changes by position.** **TRIM removes extra spaces, CLEAN removes unprintable characters.** The result of a text function is **text**, even when it looks like a number.
:::

### Handy combinations

| Need | Formula |
|---|---|
| **First name** from "Ali Khan" in A1 | {{=LEFT(A1,FIND(" ",A1)-1)}} |
| **Last name** | {{=RIGHT(A1,LEN(A1)-FIND(" ",A1))}} |
| **Count the words** in A1 | {{=LEN(TRIM(A1))-LEN(SUBSTITUTE(TRIM(A1)," ",""))+1}} |
| **Count how often "a" occurs** | {{=LEN(A1)-LEN(SUBSTITUTE(A1,"a",""))}} |
| **Remove all spaces** | {{=SUBSTITUTE(A1," ","")}} |
| **Make a code** like JK-001 | {{="JK-"&TEXT(ROW()-1,"000")}} |
| **Show a number with leading zeros** | {{=TEXT(7,"000")}} → **007** |

Without formulas you can use **Flash Fill (Ctrl + E)**, which copies a pattern you type once, and **Text to Columns** (Data tab), which splits text at a space, comma or fixed width.

## Date and Time Functions {#excel-date}

Because dates are **serial numbers** (1 = 1 January 1900), you can add, subtract and compare them. Examples assume **today is Wednesday, 21 October 2026**.

| Function | Syntax | Example | Result |
|---|---|---|---|
| **TODAY** | {{=TODAY()}} | | Current date. **Volatile**: updates every day. |
| **NOW** | {{=NOW()}} | | Current date **and time**. |
| **DATE** | {{=DATE(year, month, day)}} | {{=DATE(2026,10,21)}} | **21-10-2026** |
| **YEAR / MONTH / DAY** | {{=YEAR(date)}} | {{=MONTH(DATE(2026,10,21))}} | **10** |
| **HOUR / MINUTE / SECOND** | {{=HOUR(NOW())}} | | The hour, minute or second |
| **TIME** | {{=TIME(6,0,0)}} | | **0.25** (6 AM is a quarter of a day) |
| **WEEKDAY** | {{=WEEKDAY(date, [return_type])}} | {{=WEEKDAY(DATE(2026,10,21))}} | **4** (Wednesday) |
| | | {{=WEEKDAY(DATE(2026,10,21),2)}} | **3** (Monday = 1) |
| **WEEKNUM** | {{=WEEKNUM(date)}} | | Week of the year |
| **DAYS** | {{=DAYS(end_date, start_date)}} | {{=DAYS(DATE(2026,12,31),DATE(2026,10,21))}} | **71** |
| **EDATE** | {{=EDATE(start_date, months)}} | {{=EDATE(DATE(2026,1,31),1)}} | **28-Feb-2026** |
| **EOMONTH** | {{=EOMONTH(start_date, months)}} | {{=EOMONTH(DATE(2026,2,10),0)}} | **28-Feb-2026** (last day of the month) |
| **DATEDIF** | {{=DATEDIF(start, end, unit)}} | see below | Gap between two dates |
| **NETWORKDAYS** | {{=NETWORKDAYS(start, end, [holidays])}} | {{=NETWORKDAYS(DATE(2026,10,1),DATE(2026,10,31))}} | **22** (Saturdays and Sundays excluded) |
| **WORKDAY** | {{=WORKDAY(start, days, [holidays])}} | {{=WORKDAY(DATE(2026,10,21),10)}} | **4-Nov-2026** |
| **YEARFRAC** | {{=YEARFRAC(start, end)}} | | Years as a fraction |
| **DATEVALUE** | {{=DATEVALUE("21-10-2026")}} | | Text to a date serial (depends on region settings) |

**WEEKDAY return types:** **1 (default) = Sunday is 1** to Saturday 7; **2 = Monday is 1** to Sunday 7; **3 = Monday is 0** to Sunday 6.

### DATEDIF

A **hidden function**: it works, but it does not appear in the function list. Units, with **start = 15 Jan 2000** and **end = 21 Oct 2026**:

| Unit | Gives | Result |
|---|---|---|
| {{"Y"}} | Complete **years** | **26** |
| {{"M"}} | Complete **months** | **321** |
| {{"D"}} | **Days** | **9776** |
| {{"YM"}} | Months **after removing years** | **9** |
| {{"MD"}} | Days **after removing months and years** | **6** |
| {{"YD"}} | Days after removing years | **279** |

**Age:** {{=DATEDIF(B2,TODAY(),"Y")}} gives the age in complete years from a date of birth in B2. Full age: {{=DATEDIF(B2,TODAY(),"Y")&" years, "&DATEDIF(B2,TODAY(),"YM")&" months"}}.

### Simple date arithmetic

- **Days between two dates:** {{=B2-A2}} (format the result as General or Number).
- **Add 30 days:** {{=A2+30}}. **Add 3 months:** {{=EDATE(A2,3)}}. **Retirement date at 60:** {{=EDATE(B2,60*12)}}.
- **Last day of this month:** {{=EOMONTH(TODAY(),0)}}. **First day of this month:** {{=EOMONTH(TODAY(),-1)+1}}.
- **Time worked:** {{=(End-Start)*24}} gives **hours**.

:::mem Memory trick
**TODAY = date only. NOW = date plus time.** Both are **volatile**, so they change when the sheet recalculates. To enter a date that **does not change**, press **Ctrl + ;** and for the time **Ctrl + Shift + ;**.
:::

## Financial Functions {#excel-financial}

Financial functions follow one rule: **money you pay out is negative, money you receive is positive.** Use a **rate per period** and the **number of periods** in the same unit. For monthly payments on a yearly rate, **divide the rate by 12** and **multiply the years by 12**.

| Function | Syntax | Finds |
|---|---|---|
| **PMT** | {{=PMT(rate, nper, pv, [fv], [type])}} | Regular **payment** (EMI) |
| **PPMT / IPMT** | {{=PPMT(rate, per, nper, pv)}} | **Principal** part / **interest** part of one payment |
| **FV** | {{=FV(rate, nper, pmt, [pv], [type])}} | **Future value** |
| **PV** | {{=PV(rate, nper, pmt, [fv], [type])}} | **Present value** |
| **NPER** | {{=NPER(rate, pmt, pv, [fv], [type])}} | **Number of periods** |
| **RATE** | {{=RATE(nper, pmt, pv, [fv], [type])}} | **Interest rate** per period |
| **NPV** | {{=NPV(rate, value1, value2, ...)}} | **Net present value** |
| **IRR** | {{=IRR(values, [guess])}} | **Internal rate of return** |

**type:** **0 or omitted = payment at the end** of the period; **1 = at the beginning**.

### Worked examples

| Situation | Formula | Result |
|---|---|---|
| **EMI** on a loan of ₹5,00,000 at 9% a year for 5 years | {{=PMT(9%/12,60,500000)}} | **-10,379.18** a month (negative = you pay). Total paid = 10,379.18 × 60 = 6,22,750.66, so **interest = ₹1,22,750.66**. |
| **SIP** of ₹5,000 a month at 6% a year for 5 years | {{=FV(6%/12,60,-5000)}} | **₹3,48,850.15** |
| Same SIP, paid at the **start** of each month | {{=FV(6%/12,60,-5000,0,1)}} | **₹3,50,594.40** |
| ₹1,00,000 lump sum at 8% for 5 years | {{=FV(8%,5,0,-100000)}} | **₹1,46,932.81** |
| **Present value** of ₹10,000 due in 3 years at 10% | {{=PV(10%,3,0,-10000)}} | **₹7,513.15** |
| **Years to double** money at 8% | {{=NPER(8%,0,-1,2)}} | **about 9.01 years** |
| **Monthly rate** behind the EMI above | {{=RATE(60,-10379.18,500000)}} | **0.75%** a month, so 9% a year |

### NPV and IRR

Cash flows for a project: **-1,00,000 now**, then **+40,000, +50,000, +60,000** at the end of years 1, 2 and 3. Discount rate 10%.

- {{=NPV(10%,40000,50000,60000)-100000}} → **₹22,764.84**. **NPV assumes the first value comes at the END of period 1**, so the initial investment is **subtracted outside** the function.
- {{=IRR(A1:A4)}} with the four flows in A1:A4 (including -1,00,000) → **21.65%**. IRR is the rate at which NPV becomes **zero**.
- **XNPV** and **XIRR** do the same with **actual dates**; **MIRR** uses separate borrowing and reinvestment rates.

### Depreciation

Asset cost ₹1,00,000, salvage value ₹10,000, life 5 years.

| Function | Formula | Year 1 | Method |
|---|---|---|---|
| **SLN** | {{=SLN(100000,10000,5)}} | **18,000** every year | **Straight-line**: (cost - salvage) ÷ life |
| **DB** | {{=DB(100000,10000,5,1)}} | **36,900** | **Fixed declining balance** |
| **DDB** | {{=DDB(100000,10000,5,1)}} | **40,000** (year 2: 24,000) | **Double-declining balance**, rate = 2 ÷ life |
| **SYD** | {{=SYD(100000,10000,5,1)}} | **30,000** | **Sum-of-years' digits** |

**Other:** {{=EFFECT(nominal_rate, npery)}} gives the **effective annual rate**; {{=NOMINAL(effect_rate, npery)}} does the reverse.

:::tip Exam tip
**PMT = loan payment, FV = future value, PV = present value, NPV = net present value, IRR = internal rate of return.** The sign rule explains why the answer often shows as **negative**. For monthly flows: **rate ÷ 12, years × 12.**
:::

## Array and Dynamic Array Functions {#excel-dynamic}

An **array formula** works on a whole range at once. Before 2021 it needed **Ctrl + Shift + Enter**, which shows the formula in **curly braces** {{ {=SUM(IF(B2:B9="Jammu",C2:C9))} }}. In **Excel 2021 and Microsoft 365**, **dynamic arrays** do this by default, and the result **spills** into the neighbouring cells.

| Function | Syntax | Example | Result |
|---|---|---|---|
| **FILTER** | {{=FILTER(array, include, [if_empty])}} | {{=FILTER(A2:C9,B2:B9="Jammu")}} | Rows for **Bilal, Charu, Gurpreet** |
| **SORT** | {{=SORT(array, [sort_index], [order], [by_col])}} | {{=SORT(A2:C9,3,-1)}} | Table sorted by **Marks, largest first** (order 1 = ascending, -1 = descending) |
| **SORTBY** | {{=SORTBY(array, by_array, [order])}} | {{=SORTBY(A2:A9,C2:C9,-1)}} | Names ordered by marks |
| **UNIQUE** | {{=UNIQUE(array)}} | {{=UNIQUE(B2:B9)}} | **Srinagar, Jammu, Anantnag, Baramulla** |
| **SEQUENCE** | {{=SEQUENCE(rows, [cols], [start], [step])}} | {{=SEQUENCE(5)}} | 1, 2, 3, 4, 5 down a column |
| **RANDARRAY** | {{=RANDARRAY(rows, cols)}} | | A block of random numbers |
| **XLOOKUP** | see the lookup topic | | |
| **LET** | {{=LET(name, value, calculation)}} | {{=LET(x,C2:C9,SUM(x)/COUNT(x))}} | **71.5** (names a value once, uses it again) |
| **VSTACK / HSTACK** | {{=VSTACK(A2:A3,A8:A9)}} | | Joins ranges vertically / horizontally |
| **TAKE / DROP** | {{=TAKE(A2:A9,3)}} | | First 3 / all except those rows |

- **Spill range:** the area the result fills. Refer to all of it with the **# sign**, for example {{=SUM(F2#)}}.
- **#SPILL!** appears when something **blocks** the spill area.
- **Count of distinct districts:** {{=COUNTA(UNIQUE(B2:B9))}} → **4**.
- **Old-style array examples:** {{=SUM(IF(B2:B9="Jammu",C2:C9))}} → **228**; {{=MAX(IF(B2:B9="Jammu",C2:C9))}} → **92**.
- **SUMPRODUCT** handles many array tasks **without** Ctrl + Shift + Enter.

:::key Key fact
In **older versions**, an array formula must be confirmed with **Ctrl + Shift + Enter**. In **Microsoft 365**, just press **Enter**. FILTER, SORT, UNIQUE, SEQUENCE, XLOOKUP and LET need **Excel 2021 or Microsoft 365**.
:::

## Data Tools, Pivot Tables and Charts {#excel-data-tools}

### Organising data

| Tool | What it does |
|---|---|
| **Sort** | **Data → Sort A to Z / Z to A.** Multi-level sort and custom lists are possible. |
| **Filter** | **Ctrl + Shift + L** turns **AutoFilter** on. Hides rows that do not match. **Advanced Filter** uses a separate **criteria range** and can copy results elsewhere. |
| **Remove Duplicates** | Deletes repeated rows. |
| **Text to Columns** | Splits one column at a delimiter or fixed width. |
| **Flash Fill** | **Ctrl + E.** Fills by copying a pattern. |
| **Freeze Panes** | Keeps **top rows or left columns** visible while scrolling. |
| **Subtotal** | Inserts SUBTOTAL rows per group. The data must be **sorted by that column first**. |
| **Group / Outline** | Collapses and expands rows or columns. |
| **Excel Table** | **Ctrl + T.** Turns a range into a table that grows automatically and uses **structured references**. |
| **Paste Special** | Pastes only **values, formulas, formats**, or **transposes**; can **add, subtract, multiply or divide** while pasting. |

### Data Validation

**Data → Data Validation** restricts what may be typed. Types: **Whole number, Decimal, List** (a drop-down), **Date, Time, Text length, Custom** (a formula). It also has an **Input Message** and an **Error Alert** with three styles: **Stop, Warning, Information**. **Circle Invalid Data** marks entries that break the rule.

### Conditional Formatting

**Home → Conditional Formatting** formats cells automatically by rule: **Highlight Cells Rules** (greater than, duplicate values), **Top/Bottom Rules**, **Data Bars**, **Color Scales**, **Icon Sets**. A **formula rule** such as {{=$C2<40}} colours a whole row for a failed student.

### What-If Analysis

| Tool | Use |
|---|---|
| **Goal Seek** | Finds the **one input** needed to reach a target result. Example: what interest rate gives an EMI of ₹10,000? |
| **Scenario Manager** | Saves sets of input values (best, worst, expected) and compares them. |
| **Data Table** | Shows a result for many values of one or two inputs. |
| **Solver** | Add-in for **optimisation** with several variables and constraints. |

### Pivot Tables

A **PivotTable** summarises a large table **without writing formulas**. **Insert → PivotTable.**

| Area | Purpose |
|---|---|
| **Filters** | Report-level filter |
| **Rows** | Items listed down the side |
| **Columns** | Items listed across the top |
| **Values** | The numbers calculated: **Sum, Count, Average, Max, Min** |

- **Numbers default to Sum; text defaults to Count.**
- A pivot table does **not update automatically** when the source data changes. Use **Refresh (Alt + F5)**.
- **Slicers** are button filters. **Pivot Chart** is a chart linked to the pivot table. **Group** combines dates into months, quarters and years. A **Calculated Field** adds a formula-based field.
- **Example:** Rows = District, Values = Sum of Fee gives total fee per district: Anantnag 6,000, Baramulla 2,500, Jammu 9,000, Srinagar 6,000.

### Charts

**Insert → Charts.** Select the data first. **Alt + F1** makes a chart on the same sheet; **F11** makes a chart on its own sheet.

| Chart | Best for |
|---|---|
| **Column / Bar** | Comparing categories. |
| **Line** | **Trends over time.** |
| **Pie / Doughnut** | **Parts of a whole.** A pie shows **only one data series**. |
| **Scatter (XY)** | Relationship between two numeric variables. |
| **Area** | Totals over time. |
| **Histogram** | Distribution of data (2016 and later). |
| **Combo** | Two chart types together (columns and a line). |
| **Waterfall** | Rising and falling totals. |
| **Sparkline** | A **tiny chart inside one cell**. |

**Chart elements:** title, axis titles, legend, data labels, gridlines, data table. **Category axis** is the X axis; **value axis** is the Y axis.

### Protecting and printing

- **Review → Protect Sheet / Protect Workbook** (passwords). **Format Cells → Protection → Locked** works only **after** the sheet is protected. **Hidden** hides formulas.
- **Page Layout:** **Print Area**, **Print Titles** (repeat header rows on each page), **Orientation**, **Margins**, **Page Break Preview**, **Fit to one page**.
- **Macros:** record repetitive steps. Saved in **.xlsm** files, written in **VBA** (Visual Basic for Applications). **Alt + F11** opens the VBA editor and **Alt + F8** lists macros.

## Errors and Shortcuts in Excel {#excel-errors-shortcuts}

### Error values

| Error | Meaning | Typical cause |
|---|---|---|
| **####** | Column too narrow, or negative date or time | Widen the column |
| **#DIV/0!** | Division by zero or by an empty cell | {{=A1/0}} |
| **#N/A** | Value **not available** | Lookup did not find the value |
| **#NAME?** | Excel does not recognise a **name** | Misspelt function, text without quotes |
| **#NULL!** | Wrong range operator | A space used instead of : or , |
| **#NUM!** | Invalid number | {{=SQRT(-1)}} or a result too big |
| **#REF!** | **Invalid reference** | A referred cell was deleted; VLOOKUP column too large |
| **#VALUE!** | **Wrong type of value** | Adding text to a number: {{="a"+1}} |
| **#SPILL!** | Spill area blocked | Dynamic array formula |
| **#CALC!** | Calculation problem in an array | Empty array result |

A **circular reference** is a formula that refers to **its own cell**, directly or through others. Excel warns about it and may show 0.

:::tip Exam tip
**#N/A = lookup failed. #REF! = deleted or invalid cell. #VALUE! = wrong data type. #DIV/0! = divide by zero. #NAME? = unknown name. #NUM! = bad number.**
:::

### Excel shortcuts

| Keys | Action |
|---|---|
| {{Ctrl + C}} / {{Ctrl + X}} / {{Ctrl + V}} | Copy / Cut / Paste |
| {{Ctrl + Z}} / {{Ctrl + Y}} | Undo / Redo |
| {{Ctrl + S}} / {{F12}} | Save / Save As |
| {{Ctrl + N}} / {{Ctrl + O}} / {{Ctrl + P}} | New / Open / Print |
| {{Ctrl + A}} | Select all (press twice inside a table) |
| {{F2}} | **Edit the active cell** |
| {{F4}} | Cycle absolute and relative references; **repeat the last action** |
| {{F5}} or {{Ctrl + G}} | **Go To** |
| {{F7}} | Spell check |
| {{F9}} | Recalculate all formulas |
| {{F11}} | Create a chart on a new sheet |
| {{F12}} | Save As |
| {{Alt + =}} | **AutoSum** |
| {{Alt + Enter}} | New line inside a cell |
| {{Alt + F1}} | Insert a chart on the sheet |
| {{Ctrl + ;}} | Insert today's date (fixed) |
| {{Ctrl + Shift + ;}} | Insert the current time (fixed) |
| {{Ctrl + Home}} / {{Ctrl + End}} | Go to A1 / go to the last used cell |
| {{Ctrl + Arrow}} | Jump to the edge of the data block |
| {{Ctrl + Space}} / {{Shift + Space}} | Select the column / the row |
| {{Ctrl + Shift + L}} | Turn the filter on or off |
| {{Ctrl + T}} | Create a table |
| {{Ctrl + 1}} | **Format Cells** dialog box |
| {{Ctrl + B}} / {{Ctrl + I}} / {{Ctrl + U}} | Bold / Italic / Underline |
| {{Ctrl + +}} / {{Ctrl + -}} | Insert / Delete cells, rows or columns |
| {{Ctrl + 9}} / {{Ctrl + 0}} | Hide the row / hide the column |
| {{Ctrl + Page Down}} / {{Ctrl + Page Up}} | Next / previous sheet |
| {{Shift + F11}} | Insert a new worksheet |
| {{Ctrl + K}} | Insert a hyperlink |
| {{Ctrl + E}} | Flash Fill |
| {{Ctrl + F}} / {{Ctrl + H}} | Find / Replace |
| {{Ctrl + Shift + $}} / {{Ctrl + Shift + %}} | Currency format / Percentage format |
| {{Ctrl + ~}} | Show formulas instead of values (the grave accent key, above Tab) |
| {{Shift + F3}} | Insert Function dialog box |
| {{Ctrl + Shift + Enter}} | Enter an **array formula** (older versions) |

:::mem Memory trick
**F2 = Edit. F4 = Fix reference. F5 = Go to. F7 = Spelling. F9 = Recalculate. F11 = Chart sheet. F12 = Save As.**
:::

## Worked Exercises {#excel-worked}

Practise on the **sample sheet** (A1:D9) from the formulas topic. Add the formulas below in columns E, F, G and H, copy them down, and check each answer.

### Exercise 1: Result sheet

| Column | Header | Formula in row 2 | Row 2 result |
|---|---|---|---|
| **E** | Result | {{=IF(C2>=40,"Pass","Fail")}} | **Pass** |
| **F** | Grade | {{=IF(C2>=90,"A+",IF(C2>=75,"A",IF(C2>=60,"B",IF(C2>=40,"C","F"))))}} | **A** |
| **G** | Rank | {{=RANK.EQ(C2,$C$2:$C$9,0)}} | **4** |
| **H** | Fee share | {{=D2/SUM($D$2:$D$9)}} (format as %) | **10.6%** |

Summary formulas:

| Question | Formula | Answer |
|---|---|---|
| Number of students | {{=COUNTA(A2:A9)}} | **8** |
| Students who passed | {{=COUNTIF(E2:E9,"Pass")}} | **8** (Farhan scored exactly 40) |
| Class average | {{=AVERAGE(C2:C9)}} | **71.5** |
| Highest and lowest | {{=MAX(C2:C9)}} and {{=MIN(C2:C9)}} | **92** and **40** |
| Topper's name | {{=INDEX(A2:A9,MATCH(MAX(C2:C9),C2:C9,0))}} | **Charu** |
| Average marks of Srinagar | {{=AVERAGEIF(B2:B9,"Srinagar",C2:C9)}} | **83** |
| Students from Jammu above 70 | {{=COUNTIFS(B2:B9,"Jammu",C2:C9,">70")}} | **2** |
| Total fee from Anantnag | {{=SUMIFS(D2:D9,B2:B9,"Anantnag")}} | **6000** |
| Students above the class average | {{=COUNTIF(C2:C9,">"&AVERAGE(C2:C9))}} | **4** (78, 92, 88, 83) |

### Exercise 2: Salary sheet (assumed rates for practice)

Basic pay in B2 = 30,000. Assume **DA = 40% of basic**, **HRA = 8% of basic**, **deduction = 10% of basic**.

| Item | Formula | Result |
|---|---|---|
| DA | {{=B2*40%}} | **12,000** |
| HRA | {{=B2*8%}} | **2,400** |
| Gross pay | {{=B2+C2+D2}} (basic + DA + HRA) | **44,400** |
| Deduction | {{=B2*10%}} | **3,000** |
| Net pay | {{=E2-F2}} | **41,400** |

Real DA and HRA rates are set by the government and change, so use the current order in real work.

### Exercise 3: Quick checks you should be able to do

1. Which function counts cells that contain numbers? **COUNT**.
2. What does {{=A1&B1}} do when A1 is "JK" and B1 is "Edu"? **JKEdu**.
3. Which function returns today's date and time? **NOW**.
4. What is the shortcut for AutoSum? **Alt + =**.
5. Which reference does not change when copied? **Absolute ($A$1).**
6. Which function finds the position of a value in a range? **MATCH**.

@unit Databases and Programming

## Database Concepts and Keys {#dbms}

**Data** is raw facts; **information** is processed, meaningful data. A **database** is an organised collection of related data. A **DBMS (Database Management System)** is the software that creates, stores, retrieves and protects it. Examples: **MySQL, Oracle, MS SQL Server, PostgreSQL, MS Access**. **MongoDB** is a **NoSQL** database.

### Why a DBMS beats separate files

Less **redundancy** (repeated data), better **consistency**, **sharing** among users, **security** and access control, **backup and recovery**, and **data independence** (changing storage does not change programs).

### Database models

| Model | Structure |
|---|---|
| **Hierarchical** | Tree, parent and child (one parent). |
| **Network** | Graph, a child may have many parents. |
| **Relational** | **Tables** joined by keys. Proposed by **E. F. Codd (1970)**. The most used model. |
| **Object-oriented** | Data stored as objects. |

### Relational terms

| Formal term | Common term |
|---|---|
| **Relation** | Table |
| **Tuple** | Row or record |
| **Attribute** | Column or field |
| **Degree** | **Number of columns** |
| **Cardinality** | **Number of rows** |
| **Domain** | Set of allowed values for a column |

### Keys

| Key | Meaning |
|---|---|
| **Super key** | Any set of columns that identifies a row uniquely. |
| **Candidate key** | A **minimal** super key. A table can have several. |
| **Primary key** | The candidate key chosen to identify rows. **Unique and never NULL.** Only **one** per table. |
| **Alternate key** | Candidate keys not chosen as primary. |
| **Composite key** | A key made of **two or more** columns. |
| **Foreign key** | A column that **refers to the primary key of another table**. Links tables. |

### ER model

An **Entity-Relationship diagram** shows the design: **entity** (rectangle), **attribute** (ellipse), **relationship** (diamond). Relationship types: **one-to-one (1:1), one-to-many (1:N), many-to-many (M:N).** Example: one teacher teaches many students (1:N).

### Other ideas

- **Schema** is the structure of the database. **Three-level architecture:** **internal** (physical), **conceptual** (logical), **external** (user views).
- **DBA:** Database Administrator.
- **Transaction** and **ACID** properties: **A**tomicity (all or nothing), **C**onsistency, **I**solation, **D**urability. **COMMIT** saves a transaction; **ROLLBACK** undoes it.
- **Data warehouse:** large store of historical data for analysis. **Data mining:** finding patterns in large data.

### MS Access

**MS Access** is a desktop RDBMS (file extension **.accdb**). Its objects: **Tables** (store data), **Queries** (retrieve and compute), **Forms** (data entry), **Reports** (printed output), **Macros** and **Modules**. Data types: Short Text, Long Text, Number, Date/Time, Currency, **AutoNumber**, Yes/No, OLE Object, Hyperlink, Attachment. Views: **Datasheet** and **Design**.

:::tip Exam tip
**Primary key = unique + not null, one per table. Foreign key = link to another table's primary key. Degree = columns, cardinality = rows.**
:::

## Normalisation {#normalisation}

**Normalisation** organises tables to **remove redundancy** and avoid **anomalies**:

- **Insertion anomaly:** cannot add data without other, unrelated data.
- **Update anomaly:** the same fact must be changed in many rows.
- **Deletion anomaly:** deleting a row loses other useful facts.

A **functional dependency** X → Y means the value of X decides the value of Y.

| Normal form | Rule |
|---|---|
| **1NF** | Every cell holds a **single (atomic) value**. No repeating groups. |
| **2NF** | In 1NF and **no partial dependency**: no non-key column depends on only **part** of a composite key. |
| **3NF** | In 2NF and **no transitive dependency**: a non-key column must not depend on another non-key column. |
| **BCNF** | Stronger 3NF: every determinant is a candidate key. |

**Example.** A table Student(RollNo, Name, CourseID, CourseName) repeats the course name for every student. **CourseName depends on CourseID, not on the student.** Split it into Student(RollNo, Name, CourseID) and Course(CourseID, CourseName).

**Denormalisation** adds redundancy on purpose to make reading faster.

:::mem Memory trick
**"The key, the whole key, and nothing but the key."** 1NF = atomic, 2NF = the **whole** key, 3NF = **nothing but** the key.
:::

## SQL {#sql}

**SQL (Structured Query Language)** is the standard language of relational databases. It is **not case-sensitive** for keywords. A statement ends with a **semicolon**. Examples below use a table **Students(Name, District, Marks, Fee)** holding the same eight rows as the Excel sample sheet.

### Categories of SQL commands

| Category | Full form | Commands |
|---|---|---|
| **DDL** | Data Definition Language | {{CREATE}}, {{ALTER}}, {{DROP}}, {{TRUNCATE}}, {{RENAME}} |
| **DML** | Data Manipulation Language | {{INSERT}}, {{UPDATE}}, {{DELETE}} (and {{SELECT}}, sometimes called DQL) |
| **DCL** | Data Control Language | {{GRANT}}, {{REVOKE}} |
| **TCL** | Transaction Control Language | {{COMMIT}}, {{ROLLBACK}}, {{SAVEPOINT}} |

### Core statements

| Task | Statement |
|---|---|
| Create a table | {{CREATE TABLE Students (Name VARCHAR(30) PRIMARY KEY, District VARCHAR(20), Marks INT, Fee INT);}} |
| Add a row | {{INSERT INTO Students VALUES ('Aamir','Srinagar',78,2500);}} |
| Read all | {{SELECT * FROM Students;}} |
| Filter | {{SELECT Name FROM Students WHERE Marks >= 80;}} → Charu, Eram, Hina |
| Sort | {{SELECT * FROM Students ORDER BY Marks DESC;}} |
| Unique values | {{SELECT DISTINCT District FROM Students;}} → 4 rows |
| Change data | {{UPDATE Students SET Marks = 45 WHERE Name = 'Farhan';}} |
| Remove rows | {{DELETE FROM Students WHERE Marks < 40;}} |
| Add a column | {{ALTER TABLE Students ADD Age INT;}} |
| Delete the table | {{DROP TABLE Students;}} |

### Conditions

| Operator | Example |
|---|---|
| {{AND, OR, NOT}} | {{WHERE District = 'Jammu' AND Marks > 70}} → Charu, Gurpreet |
| {{BETWEEN}} | {{WHERE Marks BETWEEN 60 AND 80}} (**both ends included**) |
| {{IN}} | {{WHERE District IN ('Jammu','Srinagar')}} |
| {{LIKE}} | {{WHERE Name LIKE 'A%'}}; **%** = any number of characters, **_** = exactly one |
| {{IS NULL}} | {{WHERE Fee IS NULL}} (never use = NULL) |

### Aggregates and grouping

Aggregate functions: {{COUNT}}, {{SUM}}, {{AVG}}, {{MAX}}, {{MIN}}. {{COUNT(*)}} counts all rows; {{COUNT(column)}} **skips NULLs**.

| Statement | Result |
|---|---|
| {{SELECT COUNT(*) FROM Students WHERE District = 'Jammu';}} | **3** |
| {{SELECT AVG(Marks) FROM Students;}} | **71.5** |
| {{SELECT District, AVG(Marks) FROM Students GROUP BY District;}} | Anantnag **69**, Baramulla **40**, Jammu **76**, Srinagar **83** |
| {{SELECT District, AVG(Marks) FROM Students GROUP BY District HAVING AVG(Marks) > 70;}} | Jammu **76**, Srinagar **83** |

**WHERE filters rows before grouping; HAVING filters groups after grouping.** Aggregate functions cannot be used in WHERE.

### Joins

A **join** combines rows from two tables on a matching column.

| Join | Returns |
|---|---|
| **INNER JOIN** | Only rows that **match in both** tables. |
| **LEFT JOIN** | **All rows of the left table**, plus matches from the right (NULL where none). |
| **RIGHT JOIN** | All rows of the right table, plus matches from the left. |
| **FULL JOIN** | All rows from both. |
| **CROSS JOIN** | Every row with every row (**Cartesian product**). |
| **Self join** | A table joined with itself. |

Example: {{SELECT s.Name, c.CourseName FROM Student s INNER JOIN Course c ON s.CourseID = c.CourseID;}}

### Constraints

{{PRIMARY KEY}} (unique, not null), {{FOREIGN KEY}}, {{UNIQUE}}, {{NOT NULL}}, {{CHECK}} (a condition), {{DEFAULT}} (a starting value).

### Important differences

| DELETE | TRUNCATE | DROP |
|---|---|---|
| **DML.** Removes chosen rows (with WHERE). Can be rolled back. | **DDL.** Removes **all rows**, keeps the structure. Faster. | **DDL.** Removes the **whole table**, structure and data. |

**Order in which a query is processed:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

:::mem Memory trick
**Select Fruit With Great Heavy Orders:** **S**ELECT, **F**ROM, **W**HERE, **G**ROUP BY, **H**AVING, **O**RDER BY is the order you **write** a query.
:::

## Programming Concepts and Data Structures {#programming}

### Algorithm, flowchart and pseudocode

- An **algorithm** is a **finite, ordered set of steps** to solve a problem. It must be clear, finite and give a result.
- **Pseudocode** is an algorithm written in plain, code-like English.
- A **flowchart** draws the algorithm with symbols:

| Symbol | Shape | Meaning |
|---|---|---|
| **Terminal** | Oval | **Start** and **Stop** |
| **Input / Output** | Parallelogram | Read or print data |
| **Process** | Rectangle | Calculation or action |
| **Decision** | Diamond | Yes or No question |
| **Flow line** | Arrow | Direction of flow |
| **Connector** | Small circle | Joins parts of a flowchart |

### Basic ideas

- **Variable:** named memory location. **Constant:** value that does not change.
- **Data types:** integer, float (decimal), character, string, boolean.
- **Control structures:** **sequence** (one after another), **selection** (if, else, switch), **iteration** (loops: for, while, do-while).
- **Function (procedure):** a named block of code that can be reused. **Recursion:** a function that calls itself. **Array:** an ordered collection of items of one type, accessed by an **index** (usually from 0).
- **IDE:** Integrated Development Environment. **Debugging:** finding and fixing errors. **API:** a set of rules for programs to talk to each other.

### Software Development Life Cycle (SDLC)

**Requirements → Design → Coding → Testing → Deployment → Maintenance.**

| Model | Idea |
|---|---|
| **Waterfall** | Each stage finishes before the next begins. |
| **Agile** | Short cycles, constant feedback. |
| **Spiral** | Repeated cycles with **risk analysis**. |
| **Prototype** | Build a quick sample first. |

**Testing:** **unit** (one part), **integration** (parts together), **system**, **acceptance** (by the customer). **Black-box testing** checks output without seeing code; **white-box** examines the code. **Alpha** test is inside the company; **beta** test is with real users outside.

### Data structures

| Structure | Rule | Operations |
|---|---|---|
| **Array** | Fixed size, indexed. | Access by index |
| **Stack** | **LIFO**: Last In, First Out. Like a pile of plates. | **Push**, **Pop**, Peek |
| **Queue** | **FIFO**: First In, First Out. Like a ticket line. | **Enqueue**, **Dequeue** |
| **Linked list** | Nodes joined by pointers. Easy insertion and deletion. | |
| **Tree** | Hierarchy: **root**, parent, child, **leaf**. **Binary tree:** at most two children. | Traversals: inorder, preorder, postorder |
| **Graph** | Vertices joined by edges. | Used in maps and networks |

Uses: a **stack** handles **undo**, function calls and bracket checking; a **queue** handles printer jobs and CPU scheduling.

**Postfix example.** Infix {{2+3*4}} written in postfix is {{2 3 4 * +}}. Evaluate by pushing numbers on a stack: 3 × 4 = 12, then 2 + 12 = **14**.

### Searching and sorting

| Algorithm | Idea | Time |
|---|---|---|
| **Linear search** | Check items one by one. | O(n) |
| **Binary search** | Halve a **sorted** list each step. | **O(log n)** |
| **Bubble sort** | Swap neighbouring items repeatedly. | O(n²) |
| **Selection sort** | Pick the smallest each time. | O(n²) |
| **Insertion sort** | Insert each item in place. | O(n²) |
| **Merge sort** | Divide, sort, merge. | **O(n log n)** |
| **Quick sort** | Partition around a pivot. | O(n log n) average, **O(n²) worst** |

**Big-O** describes how the running time grows with the size n. **Binary search needs sorted data**; a list of 1,000 items needs at most **10 comparisons** (2^10 = 1,024).

@unit Emerging Technology and Digital India

## Artificial Intelligence and Data {#ai-ml}

**Artificial Intelligence (AI)** is the ability of a machine to do tasks that normally need human intelligence: learning, reasoning, understanding language, recognising images. The term was coined by **John McCarthy** (1956). The **Turing Test** (Alan Turing) asks whether a machine can pass as a human in conversation.

### Branches

| Branch | Meaning |
|---|---|
| **Machine Learning (ML)** | Systems learn from **data** instead of fixed rules. |
| **Supervised learning** | Learns from **labelled** examples (spam or not spam). |
| **Unsupervised learning** | Finds patterns in **unlabelled** data (customer groups). |
| **Reinforcement learning** | Learns by **reward and penalty** (game-playing, robots). |
| **Deep Learning** | ML with many-layered **neural networks**. |
| **NLP** | Natural Language Processing: understanding human language (translation, chatbots, voice assistants). |
| **Computer Vision** | Understanding images and video (face recognition). |
| **Generative AI** | Creates **new** text, images, audio or code. Built on **large language models (LLMs)**. Chatbots such as ChatGPT, Gemini and Claude belong here. |
| **Expert system** | Rule-based program that copies a human expert. |
| **Robotics** | Machines that sense and act. **Isaac Asimov** wrote the famous Three Laws of Robotics. |

### Big Data

Very large, fast, varied data that normal tools cannot handle. The **5 Vs:** **Volume, Velocity, Variety, Veracity, Value.** Tools: **Hadoop, Spark.** **Data analytics** draws conclusions from data.

### India and AI

- **IndiaAI Mission** (approved in 2024) builds computing power, datasets and AI skills.
- **C-DAC's AIRAWAT** and **PARAM** systems support AI research.
- **Bhashini** is the national language translation mission for Indian languages.

:::tip Exam tip
**GIGO: Garbage In, Garbage Out.** An AI or a spreadsheet gives wrong answers when the data is wrong. Also remember **supervised = labelled, unsupervised = unlabelled.**
:::

## Cloud, IoT, Blockchain, 5G and More {#emerging-tech}

### Cloud computing

Using servers, storage and software **over the Internet** and paying for what you use. Benefits: scalability, no hardware to maintain, access from anywhere.

| Service model | You get | Example |
|---|---|---|
| **IaaS** | Infrastructure: servers, storage | Amazon EC2, Azure VMs |
| **PaaS** | Platform to build apps | Google App Engine |
| **SaaS** | Ready-made software | **Gmail, Google Docs, Microsoft 365** |

**Deployment:** **public** (shared, run by a provider), **private** (one organisation), **hybrid** (both), **community**. Big providers: **AWS, Microsoft Azure, Google Cloud.** India's government cloud is **MeghRaj** (GI Cloud). **Virtualisation** runs several virtual machines on one physical machine. **Edge computing** processes data near where it is made.

### Internet of Things (IoT)

Everyday objects with **sensors, software and Internet connection** that collect and exchange data: smart meters, smart homes, wearables, connected cars. The term was coined by **Kevin Ashton** (1999). **RFID** and **NFC** are short-range tags used in toll cards and contactless payment.

### Blockchain

A **distributed ledger**: records (**blocks**) are linked by **hashes**, copied across many computers and almost impossible to alter. It needs no central authority and works by **consensus**. **Bitcoin** (**Satoshi Nakamoto**, 2008 paper, 2009 launch) is the first cryptocurrency. **Smart contracts** are self-running agreements on a blockchain (Ethereum). A **cryptocurrency** is digital money secured by cryptography.

### Mobile generations

| Generation | Feature |
|---|---|
| **1G** | Analog voice |
| **2G** | Digital voice and SMS (**GSM**, CDMA) |
| **3G** | Mobile internet, video calls |
| **4G (LTE)** | Fast broadband, HD video |
| **5G** | Very high speed, **very low latency**, millions of devices per square km |

**5G** was launched in India on **1 October 2022**. **SIM** = Subscriber Identity Module. **IMEI** is the **15-digit** serial number of a phone.

### Other technologies

| Technology | Meaning |
|---|---|
| **Quantum computing** | Uses **qubits**, which can be 0 and 1 together (**superposition**) and linked (**entanglement**). India's **National Quantum Mission** was approved in 2023. |
| **AR / VR** | Augmented Reality adds digital items to the real view; Virtual Reality is a fully digital world. |
| **3D printing** | Builds objects layer by layer from a digital model. |
| **Drones** | Unmanned aerial vehicles. |
| **Digital twin** | Virtual copy of a real object or system. |
| **GPS / NavIC** | **GPS** is the US navigation system; **NavIC** is **India's regional** system (ISRO). |
| **Green computing** | Energy-saving computing. **E-waste** is discarded electronics. |

## Digital India and e-Governance {#digital-india}

**e-Governance** uses IT to deliver government services to citizens and businesses. India's **National e-Governance Plan (NeGP)** began in **2006**.

### Digital India

**Digital India** was launched on **1 July 2015**. Its three vision areas:

1. **Digital infrastructure** as a core utility for every citizen.
2. **Governance and services on demand.**
3. **Digital empowerment** of citizens.

Its nine pillars include **broadband highways, universal access to mobile connectivity, public Internet access, e-governance, e-Kranti, information for all, electronics manufacturing, IT for jobs and early harvest programmes.**

### Key platforms

| Platform | Purpose |
|---|---|
| **Aadhaar** | 12-digit unique identity number issued by **UIDAI**. Biometric and demographic data. |
| **DigiLocker** | Cloud storage for **official documents** (certificates, licences). |
| **UMANG** | One app for many central and state services. |
| **e-Sign** | Online signing using Aadhaar. |
| **GeM** | **Government e-Marketplace** for public purchases. |
| **MyGov** | Citizen engagement portal. |
| **BHIM / UPI** | Digital payments. |
| **BharatNet** | Optical fibre to **gram panchayats**. |
| **CSC** | **Common Service Centres**: village-level service counters. |
| **NIC** | **National Informatics Centre** builds government IT systems. |
| **CoWIN** | Vaccination platform. |
| **ONDC** | Open Network for Digital Commerce. |
| **JAM** | **Jan Dhan, Aadhaar, Mobile**: the trinity used for direct benefit transfer (**DBT**). |
| **e-Courts, e-Office, e-Hospital** | Digital court records, file handling and hospital services. |

:::jk J&K corner
Recruitment notices, results and forms are released on official portals such as the **JKSSB** and **JKPSC** websites (jkssb.nic.in and jkpsc.nic.in). Always apply through the official site only. Services in J&K also run on national platforms such as Aadhaar, DigiLocker, UMANG and GeM.
:::

:::note Stay current
Names of schemes, ministers and statistics keep changing. Check the **latest official source** before an exam for anything that sounds like current affairs.
:::

@unit Quick Revision

## Excel Formula Cheat Sheet {#excel-cheat-sheet}

Answers use the **sample sheet** (A1:D9) from the formulas topic.

| I want to... | Use | Example |
|---|---|---|
| Add numbers | SUM | {{=SUM(C2:C9)}} → 572 |
| Average | AVERAGE | {{=AVERAGE(C2:C9)}} → 71.5 |
| Highest / lowest | MAX / MIN | {{=MAX(C2:C9)}} → 92 |
| Count numbers | COUNT | {{=COUNT(C2:C9)}} → 8 |
| Count non-empty cells | COUNTA | {{=COUNTA(A2:A9)}} → 8 |
| Count empty cells | COUNTBLANK | {{=COUNTBLANK(A1:D9)}} → 0 |
| Count by condition | COUNTIF / COUNTIFS | {{=COUNTIF(B2:B9,"Jammu")}} → 3 |
| Add by condition | SUMIF / SUMIFS | {{=SUMIF(B2:B9,"Jammu",C2:C9)}} → 228 |
| Average by condition | AVERAGEIF | {{=AVERAGEIF(B2:B9,"Srinagar",C2:C9)}} → 83 |
| Decide between two results | IF | {{=IF(C2>=40,"Pass","Fail")}} |
| Many tests together | AND / OR | {{=AND(C2>=60,D2>=3000)}} |
| Hide an error | IFERROR | {{=IFERROR(A1/B1,0)}} |
| Find by key (exact) | VLOOKUP, XLOOKUP | {{=VLOOKUP("Eram",A2:D9,3,FALSE)}} → 88 |
| Find with a left lookup | INDEX + MATCH | {{=INDEX(A2:A9,MATCH(92,C2:C9,0))}} → Charu |
| Position in a list | MATCH | {{=MATCH("Eram",A2:A9,0)}} → 5 |
| Rank | RANK.EQ | {{=RANK.EQ(C2,$C$2:$C$9)}} → 4 |
| Nth largest | LARGE | {{=LARGE(C2:C9,2)}} → 88 |
| Middle value | MEDIAN | {{=MEDIAN(C2:C9)}} → 74.5 |
| Round | ROUND | {{=ROUND(2.567,2)}} → 2.57 |
| Remainder | MOD | {{=MOD(17,5)}} → 2 |
| Weighted total | SUMPRODUCT | {{=SUMPRODUCT(C2:C9,D2:D9)}} → 1715000 |
| Join text | & or TEXTJOIN | {{=A2&" - "&B2}} |
| Cut text | LEFT, RIGHT, MID | {{=MID("JKEdusphere",3,3)}} → Edu |
| Clean text | TRIM | {{=TRIM("  a  b ")}} → a b |
| Change case | UPPER, LOWER, PROPER | {{=PROPER("jammu")}} → Jammu |
| Today's date | TODAY | {{=TODAY()}} |
| Age or gap in years | DATEDIF | {{=DATEDIF(B2,TODAY(),"Y")}} |
| Month end | EOMONTH | {{=EOMONTH(DATE(2026,2,10),0)}} → 28-Feb-2026 |
| Working days | NETWORKDAYS | {{=NETWORKDAYS(A1,B1)}} |
| Loan EMI | PMT | {{=PMT(9%/12,60,500000)}} → -10,379.18 |
| Future value | FV | {{=FV(8%,5,0,-100000)}} → 1,46,932.81 |
| Project worth | NPV, IRR | {{=NPV(10%,40000,50000,60000)-100000}} → 22,764.84 |
| Filter rows (365) | FILTER | {{=FILTER(A2:C9,B2:B9="Jammu")}} |
| Distinct items (365) | UNIQUE | {{=UNIQUE(B2:B9)}} |

## One-Liners to Remember {#one-liners}

### Fundamentals

- The father of the computer is **Charles Babbage**; the first programmer is **Ada Lovelace**.
- **First generation = vacuum tube; second = transistor; third = IC; fourth = microprocessor.**
- **1 byte = 8 bits.** **1 KB = 1,024 bytes.**
- **The brain of the computer is the CPU.** The CU **controls**; the ALU **calculates**.
- **RAM is volatile, ROM is non-volatile.** **Cache is the fastest memory after registers.**
- **MICR = cheques, OMR = answer sheets, OCR = text recognition, barcode = shop bills.**
- **Binary 2, octal 8, decimal 10, hex 16.** **ASCII is 7-bit (128 characters); Unicode covers all languages.**
- **NAND and NOR are universal gates.**

### Software and OS

- **Compiler = whole program, interpreter = line by line.**
- **Linux was created by Linus Torvalds (1991).** It is open source.
- **Shift + Delete = permanent delete.** **Ctrl + Shift + Esc = Task Manager.** **Win + L = lock.**
- **Paging = fixed blocks; segmentation = variable blocks.**
- **Deadlock needs four conditions:** mutual exclusion, hold and wait, no pre-emption, circular wait.

### Networking and security

- **The Internet is a WAN; Bluetooth is a PAN.**
- **The router works at the Network layer (IP); the switch at the Data Link layer (MAC); the hub at the Physical layer.**
- **IPv4 = 32 bits; IPv6 = 128 bits; MAC = 48 bits.**
- **HTTP 80, HTTPS 443, FTP 21, SSH 22, SMTP 25, DNS 53, POP3 110, IMAP 143.**
- **Virus needs a host; worm spreads alone; trojan hides in a useful program.**
- **Symmetric encryption uses one key; asymmetric uses a key pair.** A digital signature uses the **sender's private key**.
- **IT Act 2000; section 66C = identity theft; 66D = cheating by personation; 66F = cyber terrorism.**
- **Cyber fraud helpline: 1930.**

### Office and Excel

- **Excel: 1,048,576 rows, 16,384 columns (XFD), sheet name up to 31 characters.**
- **Formula starts with =.** **F4 toggles absolute reference.** **F2 edits a cell.** **Alt + = is AutoSum.**
- **SUMIF = (range, criteria, sum_range). SUMIFS = (sum_range, range1, criteria1, ...).**
- **VLOOKUP cannot look left. Use FALSE for an exact match.**
- **FIND is case-sensitive; SEARCH is not.** **SUBSTITUTE replaces text; REPLACE replaces by position.**
- **INT(-4.5) = -5; TRUNC(-4.5) = -4.** **MOD takes the sign of the divisor.**
- **PMT = EMI, FV = future value, PV = present value, NPV and IRR = investment appraisal.**
- **Pivot table does not refresh by itself. Alt + F5 refreshes.**
- **Word: mail merge = main document + data source. Ctrl + Enter = page break.**
- **PowerPoint: F5 = start from beginning; Shift + F5 = from current slide.**

### Database and technology

- **Primary key = unique + not null.** **Foreign key links two tables.** **Degree = columns; cardinality = rows.**
- **WHERE filters rows; HAVING filters groups.**
- **DELETE removes rows; TRUNCATE removes all rows; DROP removes the table.**
- **Stack = LIFO; queue = FIFO.** **Binary search needs a sorted list.**
- **IaaS, PaaS, SaaS** are the three cloud service models.
- **Digital India launched 1 July 2015.** **UPI launched 2016.** **5G launched in India on 1 October 2022.**

## Full Forms {#full-forms}

### Hardware and storage

| Short form | Full form |
|---|---|
| **ALU / CU / CPU** | Arithmetic Logic Unit / Control Unit / Central Processing Unit |
| **GPU** | Graphics Processing Unit |
| **RAM / ROM** | Random Access Memory / Read Only Memory |
| **PROM / EPROM / EEPROM** | Programmable ROM / Erasable Programmable ROM / Electrically Erasable Programmable ROM |
| **BIOS / UEFI / POST** | Basic Input Output System / Unified Extensible Firmware Interface / Power-On Self Test |
| **CMOS** | Complementary Metal Oxide Semiconductor |
| **HDD / SSD** | Hard Disk Drive / Solid State Drive |
| **CD-ROM / DVD** | Compact Disc Read Only Memory / Digital Versatile Disc |
| **USB / HDMI / VGA** | Universal Serial Bus / High-Definition Multimedia Interface / Video Graphics Array |
| **CRT / LCD / LED / OLED** | Cathode Ray Tube / Liquid Crystal Display / Light Emitting Diode / Organic LED |
| **MICR / OCR / OMR** | Magnetic Ink Character Recognition / Optical Character Recognition / Optical Mark Recognition |
| **DPI / PPI / CPS / LPM / PPM** | Dots Per Inch / Pixels Per Inch / Characters Per Second / Lines Per Minute / Pages Per Minute |
| **FLOPS / MIPS** | Floating-point Operations Per Second / Million Instructions Per Second |
| **IC / VLSI / ULSI** | Integrated Circuit / Very Large Scale Integration / Ultra Large Scale Integration |
| **SMPS / UPS** | Switched Mode Power Supply / Uninterruptible Power Supply |

### Software, web and networking

| Short form | Full form |
|---|---|
| **OS / GUI / CLI** | Operating System / Graphical User Interface / Command Line Interface |
| **IDE / API** | Integrated Development Environment / Application Programming Interface |
| **URL** | Uniform Resource Locator |
| **HTTP / HTTPS** | HyperText Transfer Protocol / HTTP Secure |
| **HTML / XML / CSS** | HyperText Markup Language / eXtensible Markup Language / Cascading Style Sheets |
| **WWW** | World Wide Web |
| **FTP / SMTP / POP3 / IMAP** | File Transfer Protocol / Simple Mail Transfer Protocol / Post Office Protocol 3 / Internet Message Access Protocol |
| **TCP / UDP / IP** | Transmission Control Protocol / User Datagram Protocol / Internet Protocol |
| **DNS / DHCP / NAT / ARP** | Domain Name System / Dynamic Host Configuration Protocol / Network Address Translation / Address Resolution Protocol |
| **LAN / MAN / WAN / PAN** | Local / Metropolitan / Wide / Personal Area Network |
| **VPN** | Virtual Private Network |
| **NIC / MAC** | Network Interface Card / Media Access Control |
| **ISP** | Internet Service Provider |
| **OSI / ISO / IEEE** | Open Systems Interconnection / International Organization for Standardization / Institute of Electrical and Electronics Engineers |
| **SSL / TLS** | Secure Sockets Layer / Transport Layer Security |
| **CAPTCHA** | Completely Automated Public Turing test to tell Computers and Humans Apart |
| **GSM / CDMA / LTE** | Global System for Mobile Communications / Code Division Multiple Access / Long Term Evolution |
| **SIM / IMEI / SMS** | Subscriber Identity Module / International Mobile Equipment Identity / Short Message Service |
| **VoIP** | Voice over Internet Protocol |
| **SSID / WPA** | Service Set Identifier / Wi-Fi Protected Access |

:::note About Wi-Fi
**Wi-Fi** is a brand name. "Wireless Fidelity" is a popular expansion but not an official one. **Bluetooth** is named after the Danish king **Harald Bluetooth**.
:::

### Data, programming and general

| Short form | Full form |
|---|---|
| **ASCII / EBCDIC / BCD** | American Standard Code for Information Interchange / Extended Binary Coded Decimal Interchange Code / Binary Coded Decimal |
| **DBMS / RDBMS / SQL** | Database Management System / Relational DBMS / Structured Query Language |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **OOP / SDLC** | Object-Oriented Programming / Software Development Life Cycle |
| **AI / ML / NLP / IoT** | Artificial Intelligence / Machine Learning / Natural Language Processing / Internet of Things |
| **IaaS / PaaS / SaaS** | Infrastructure / Platform / Software as a Service |
| **GIGO / WYSIWYG** | Garbage In Garbage Out / What You See Is What You Get |
| **PDF / JPEG / GIF / PNG** | Portable Document Format / Joint Photographic Experts Group / Graphics Interchange Format / Portable Network Graphics |
| **MPEG / BMP / TIFF** | Moving Picture Experts Group / Bitmap / Tagged Image File Format |
| **ENIAC / EDVAC / UNIVAC** | Electronic Numerical Integrator and Computer / Electronic Discrete Variable Automatic Computer / Universal Automatic Computer |
| **COBOL / FORTRAN / BASIC** | Common Business-Oriented Language / Formula Translation / Beginner's All-purpose Symbolic Instruction Code |
| **DOS** | Disk Operating System |
| **C-DAC / NIC** | Centre for Development of Advanced Computing / National Informatics Centre |
| **CERT-In / MeitY** | Indian Computer Emergency Response Team / Ministry of Electronics and Information Technology |
| **UIDAI / NPCI** | Unique Identification Authority of India / National Payments Corporation of India |
| **UPI / NEFT / RTGS / IMPS** | Unified Payments Interface / National Electronic Funds Transfer / Real Time Gross Settlement / Immediate Payment Service |
| **PIN / OTP / ATM** | Personal Identification Number / One-Time Password / Automated Teller Machine |
| **DBT / CSC / GeM** | Direct Benefit Transfer / Common Service Centre / Government e-Marketplace |

## Practice Questions {#practice-questions}

Test yourself, then check the answers below. Questions 12 to 22 use the **sample sheet**.

1. Which generation of computers used **microprocessors**?
2. What is **45** in binary?
3. What is binary **10110111** in hexadecimal?
4. Which logic gate gives 1 only when its two inputs are **different**?
5. Which memory is **volatile**: RAM or ROM?
6. At which **OSI layer** does a router work?
7. What is the default port of **HTTPS**?
8. Which protocol is used to **send** email?
9. Which malware **self-replicates** without a host file?
10. Which section of the IT Act deals with **identity theft**?
11. What is the shortcut for **AutoSum**?
12. What does {{=COUNTIF(C2:C9,">=60")}} return?
13. What does {{=SUMIF(B2:B9,"Jammu",C2:C9)}} return?
14. What does {{=MEDIAN(C2:C9)}} return?
15. What does {{=LEFT("JKEdusphere",2)&RIGHT("JKEdusphere",4)}} return?
16. What does {{=INT(-4.5)}} return?
17. What does {{=2+3*4^2}} return?
18. What does {{=WEEKDAY(DATE(2026,10,21),2)}} return?
19. What is the **sign** of {{=PMT(9%/12,60,500000)}}, and why?
20. What does {{=ROUND(1234,-2)}} return?
21. Which function returns the **position** of a value in a range?
22. In {{=VLOOKUP("Eram",A2:D9,2,FALSE)}}, what is returned?
23. Which SQL clause filters **groups**?
24. Which key links a table to **another table's primary key**?
25. Which normal form removes **partial dependency**?
26. How many **rows** does an Excel worksheet have?
27. Which chart is best for showing a **trend over time**?
28. Who invented the **World Wide Web**?
29. How many bits does **IPv6** use?
30. Which pointing device did **Douglas Engelbart** invent?

### Answers

1. **Fourth generation.**
2. **101101.**
3. **B7.**
4. **XOR.**
5. **RAM.**
6. **Network layer (layer 3).**
7. **443.**
8. **SMTP.**
9. **Worm.**
10. **Section 66C.**
11. **Alt + =.**
12. **6** (all except 55 and 40).
13. **228** (65 + 92 + 71).
14. **74.5** (average of 71 and 78).
15. **JKhere.**
16. **-5.**
17. **50** (power first: 4^2 = 16, then 3 × 16 = 48, then 2 + 48).
18. **3** (Wednesday, with Monday as 1).
19. **Negative**, because the payment is **money going out**. The amount is about **-10,379.18** a month.
20. **1200.**
21. **MATCH.**
22. **Srinagar** (column 2, District).
23. **HAVING.**
24. **Foreign key.**
25. **Second normal form (2NF).**
26. **1,048,576.**
27. **Line chart.**
28. **Tim Berners-Lee.**
29. **128 bits.**
30. **The mouse.**

:::mem Memory trick
For the whole subject remember the path of **data**: **Input → CPU (with RAM) → Output → Storage**, carried by **networks**, protected by **security**, organised in **databases** and shown through **Excel and Office**.
:::

Practise with our free tests at [JKEdusphere](https://jkedusphere.com).
`,
};
