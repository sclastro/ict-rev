// 程式執行模擬 — 提取─譯碼─執行周期
// 簡化的 8 位元電腦：位址匯流排 4 條線（16 個位址），數據匯流排 8 條線；
// 指令 = 4 位元操作碼 + 4 位元操作數（位址）。

import * as THREE from "three";
import { OrbitControls } from "three/addons/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/addons/CSS2DRenderer.js";

// ---------------------------------------------------------------- program

const OPS = {
  0: { name: "HALT", zh: "停止", en: "halt" },
  1: { name: "LOAD", zh: "載入", en: "load" },
  2: { name: "ADD", zh: "加", en: "add" },
  3: { name: "STORE", zh: "儲存", en: "store" },
  4: { name: "IN", zh: "輸入", en: "input" },
  5: { name: "OUT", zh: "輸出", en: "output" },
};

const PROGRAM = [
  { op: 4, arg: 10, src: 0 },
  { op: 4, arg: 11, src: 1 },
  { op: 1, arg: 10, src: 2 },
  { op: 2, arg: 11, src: 2 },
  { op: 3, arg: 12, src: 2 },
  { op: 5, arg: 12, src: 3 },
  { op: 0, arg: 0, src: -1 },
];

const SOURCE = [
  { code: "a = int(input())", asm: "IN 10" },
  { code: "b = int(input())", asm: "IN 11" },
  { code: "c = a + b", asm: "LOAD 10・ADD 11・STORE 12" },
  { code: "print(c)", asm: "OUT 12" },
];

const VARS = { 10: "a", 11: "b", 12: "c" };
const DEFAULT_INPUTS = [2, 3];
const ORD = () => T(["第一", "第二"], ["first", "second"]);

const word = (ins) => (ins.op << 4) | ins.arg;
const bin = (n, w) => (n >>> 0).toString(2).padStart(w, "0");
const b4 = (n) => bin(n, 4);
const b8 = (n) => bin(n, 8);
const mnem = (w) => {
  const op = w >> 4, arg = w & 15;
  if (!OPS[op]) return DASH();
  return op === 0 ? "HALT" : `${OPS[op].name} ${arg}`;
};
const DASH = () => T("－", "–");
const c = (cls, t) => `<span class="${cls}">${t}</span>`;
const A = (t) => c("k-addr", t);
const D = (t) => c("k-data", t);
const C = (t) => c("k-ctrl", t);

// ---------------------------------------------------------------- state

function initialState() {
  return {
    pc: null, mar: null, mdr: null, mdrKind: null, ir: null, acc: null,
    ram: Array(16).fill(null),
    decoded: null, alu: null,
    loaded: false, halted: false,
    kbd: null, screen: { mode: "desktop", lines: [] },
  };
}

function clone(s) {
  return { ...s, ram: s.ram.slice(), screen: { mode: s.screen.mode, lines: s.screen.lines.slice() } };
}

let inputs = [null, null];
const inputOf = (k) => (inputs[k] ?? DEFAULT_INPUTS[k]);

// ---------------------------------------------------------------- steps
// step: { group, phase, title, body(s), concept(s), run(s), anims(s) -> [[item…]…],
//         hl[], ram(s) -> {addr, kind}, focus, need }
// anim item: { bus, path, dir, bits | sig, from2, to2 } 或 { xfer:[from,to,text,cls] }

// 介面語言：zh（中文）或 en（英文）；與溫習站共用 localStorage 的 ictrev-lang
let LANG = document.documentElement.dataset.lang === "en" ? "en" : "zh";
const T = (zh, en) => (LANG === "en" ? en : zh);

const PHASE_NAME = {
  prep: ["準備", "Prepare"], fetch: ["提取", "Fetch"], decode: ["譯碼", "Decode"],
  execute: ["執行", "Execute"], store: ["儲存", "Store"], end: ["完成", "Done"],
};
const phaseName = (p) => T(...PHASE_NAME[p]);
const READ_SIG = () => T("讀取 READ", "READ");
const WRITE_SIG = () => T("寫入 WRITE", "WRITE");

function buildSteps(brief) {
  const steps = [];
  const add = (st) => steps.push(st);

  // -- 準備
  add({
    group: "prep", phase: "prep", focus: "ssd", hl: ["ssd"],
    title: T("準備：程式存放在輔助儲存設備", "Prepare: the program is stored in secondary storage"),
    run() {},
    body: () => T(
      `<p>加法程式的機器碼一直存放在 SSD。SSD 屬<b>輔助儲存設備</b>：非易失性，關機後內容仍然保留，容量大，但存取速度遠比主記憶體慢。</p><p>CPU 不能直接從輔助儲存設備提取指令，因此程式必須先載入主記憶體。</p>`,
      `<p>The machine code of the addition program is kept on the SSD. The SSD is a <b>secondary storage device</b>: it is non-volatile, so its contents are kept when the power is off, and it has a large capacity, but it is much slower than main memory.</p><p>The CPU cannot fetch instructions directly from secondary storage, so the program must first be loaded into main memory.</p>`),
    concept: () => T(
      `<table><tr><th></th><th>主記憶體（RAM）</th><th>輔助儲存設備（如 SSD）</th></tr>
      <tr><td>易失性</td><td>易失，關機後內容消失</td><td>非易失，關機後內容保留</td></tr>
      <tr><td>速度</td><td>快，CPU 可直接存取</td><td>較慢，CPU 不能直接存取</td></tr>
      <tr><td>容量</td><td>較小</td><td>較大</td></tr></table>`,
      `<table><tr><th></th><th>Main memory (RAM)</th><th>Secondary storage (e.g. SSD)</th></tr>
      <tr><td>Volatility</td><td>Volatile: contents are lost when the power is off</td><td>Non-volatile: contents are kept</td></tr>
      <tr><td>Speed</td><td>Fast; the CPU accesses it directly</td><td>Slower; the CPU cannot access it directly</td></tr>
      <tr><td>Capacity</td><td>Smaller</td><td>Larger</td></tr></table>`),
  });
  add({
    group: "prep", phase: "prep", focus: "ssdram", hl: ["ssd"],
    title: T("準備：開啟程式，程式載入主記憶體", "Prepare: the program is opened and loaded into main memory"),
    run(s) {
      PROGRAM.forEach((ins, i) => { s.ram[i] = word(ins); });
      s.loaded = true;
      s.screen = { mode: "run", lines: [] };
    },
    anims: () => [[{ bus: "data", path: "ssd-ram", dir: "out", bits: b8(word(PROGRAM[0])), from2: "dev-ssd", to2: "ram-r0" }]],
    ram: () => ({ addr: [0, 1, 2, 3, 4, 5, 6], kind: "write" }),
    body: () => T(
      `<p>使用者開啟加法程式後，操作系統把程式的機器碼由 SSD 經匯流排系統複製到主記憶體位址 0 至 6，並預留位址 10、11、12 存放變數 a、b、c。</p><p>右方的 RAM 表顯示每個位址的內容：程式的<b>指令</b>和<b>數據</b>都以二進制存放在主記憶體。</p>`,
      `<p>When the user opens the addition program, the operating system copies its machine code from the SSD to main memory addresses 0 to 6 through the bus system, and reserves addresses 10, 11 and 12 for the variables a, b and c.</p><p>The RAM table shows the contents of each address: both the <b>instructions</b> and the <b>data</b> of the program are stored in main memory in binary.</p>`),
    concept: () => T(
      `<p>每個記憶體位置都有獨一無二的<b>記憶體位址</b>。本模擬的位址匯流排有 4 條線，可表示 2⁴ = 16 個位址（0 至 15）；數據匯流排有 8 條線，每次傳送 8 位元。</p><p>每個指令由 4 位元操作碼和 4 位元操作數組成。這是教學用的簡化設計，真實 CPU 的指令格式複雜得多。</p>`,
      `<p>Every memory location has a unique <b>memory address</b>. In this simulation the address bus has 4 lines, so it can represent 2⁴ = 16 addresses (0 to 15); the data bus has 8 lines and carries 8 bits at a time.</p><p>Each instruction consists of a 4-bit opcode and a 4-bit operand. This is a simplified design for teaching; real CPU instruction formats are far more complex.</p>`),
  });
  add({
    group: "prep", phase: "prep", focus: "cpu", hl: ["PC", "CU"],
    title: T("準備：PC 設為程式的起始位址", "Prepare: the PC is set to the start address"),
    run(s) { s.pc = 0; },
    body: () => T(
      `<p>操作系統把程式第一個指令的位址 <code>0</code> 放入<b>程式計數器（PC）</b>，CPU 由此開始第一個機器周期。</p>`,
      `<p>The operating system puts the address of the first instruction, <code>0</code>, into the <b>program counter (PC)</b>. The CPU starts its first machine cycle from here.</p>`),
    concept: () => T(
      `<p class="warn">⚠ PC 存放的是<b>下一個</b>要提取的指令的記憶體<b>位址</b>，不是指令本身。</p>`,
      `<p class="warn">⚠ The PC holds the memory <b>address</b> of the <b>next</b> instruction to be fetched, not the instruction itself.</p>`),
  });

  // -- 每個指令：提取、譯碼、執行（及儲存）
  PROGRAM.forEach((ins, i) => {
    const w = word(ins);
    const g = i;
    fetchSteps(i, w, brief).forEach(add);
    add(decodeStep(i, ins, w));
    executeSteps(i, ins).forEach(add);
    steps.filter((st) => st.group === g).forEach((st) => { st.src = ins.src; });
  });

  // -- 總結
  add({
    group: "end", phase: "end", focus: "full", hl: [],
    title: T("總結：程式執行完畢", "Summary: the program has finished"),
    run() {},
    body: (s) => T(
      `<p>四行高階語言程式翻譯成 7 個機器碼指令，CPU 為每個指令各經歷一次機器周期，最後在顯示器輸出 <b>${s.acc}</b>。</p>
      <table><tr><th>部件</th><th>在機器周期中的角色</th></tr>
      <tr><td>PC</td><td>存放下一個要提取的指令的位址；每次提取後加 1</td></tr>
      <tr><td>MAR</td><td>存放將要讀取或寫入的記憶體位址，經位址匯流排送出</td></tr>
      <tr><td>MDR</td><td>存放剛從記憶體讀出或將要寫入記憶體的數據或指令</td></tr>
      <tr><td>IR</td><td>存放正在執行的指令，供 CU 譯碼</td></tr>
      <tr><td>CU</td><td>參與每個階段：發出控制信號、譯碼、指示其他部件工作</td></tr>
      <tr><td>ALU 與 ACC</td><td>ALU 只在需要運算的指令（本例為 ADD）中工作，結果存入 ACC</td></tr>
      <tr><td>三種匯流排</td><td>位址匯流排傳送位址；數據匯流排傳送數據和指令；控制匯流排傳送「讀取」「寫入」等控制信號</td></tr></table>`,
      `<p>Four lines of high-level code became 7 machine code instructions. The CPU went through one machine cycle for each instruction and finally output <b>${s.acc}</b> on the monitor.</p>
      <table><tr><th>Component</th><th>Role in the machine cycle</th></tr>
      <tr><td>PC</td><td>Holds the address of the next instruction to be fetched; increases by 1 after each fetch</td></tr>
      <tr><td>MAR</td><td>Holds the memory address to be read from or written to, and sends it out on the address bus</td></tr>
      <tr><td>MDR</td><td>Holds the data or instruction just read from memory, or about to be written to memory</td></tr>
      <tr><td>IR</td><td>Holds the instruction being executed, for the CU to decode</td></tr>
      <tr><td>CU</td><td>Takes part in every stage: sends control signals, decodes instructions and directs the other components</td></tr>
      <tr><td>ALU and ACC</td><td>The ALU works only for instructions that need a calculation (ADD in this program); the result is stored in the ACC</td></tr>
      <tr><td>The three buses</td><td>The address bus carries addresses; the data bus carries data and instructions; the control bus carries control signals such as READ and WRITE</td></tr></table>`),
    concept: () => T(
      `<p>變數 a、b、c 現存放在主記憶體。RAM 屬易失性記憶體，關機後內容會消失；若要長期保留結果，必須另存到輔助儲存設備。</p>`,
      `<p>The variables a, b and c are now in main memory. RAM is volatile, so its contents are lost when the power is off; to keep the result, it must be saved to secondary storage.</p>`),
  });

  steps.forEach((st, k) => { st.index = k; });
  assignVoices(steps, brief);
  return steps;
}

// 每一步對應的旁白錄音編號（audio/<語言>/<編號>.mp3）；同一段錄音可用於多步
const EXEC_VOICES = {
  0: () => ["H1"],
  1: () => ["L1", "L2", "L3"],
  2: () => ["A1", "A2", "A3", "A4"],
  3: () => ["S1", "S2", "S3"],
  4: (i) => (i === 0 ? ["I1a", "I2", "I3", "I4a"] : ["I1b", "I2", "I3", "I4b"]),
  5: () => ["O1", "O2", "O3"],
};

function assignVoices(steps, brief) {
  const byGroup = new Map();
  steps.forEach((st) => {
    if (!byGroup.has(st.group)) byGroup.set(st.group, []);
    byGroup.get(st.group).push(st);
  });
  byGroup.forEach((list, g) => {
    if (g === "prep") { list.forEach((st, k) => { st.voice = "P" + (k + 1); }); return; }
    if (g === "end") { list.forEach((st) => { st.voice = "Z1"; }); return; }
    const fetch = list.filter((st) => st.phase === "fetch");
    const exec = list.filter((st) => st.phase === "execute" || st.phase === "store");
    fetch.forEach((st, k) => { st.voice = brief ? "FB" : `F${k + 1}${g === 0 ? "" : "s"}`; });
    list.filter((st) => st.phase === "decode").forEach((st) => { st.voice = "D" + g; });
    const ids = EXEC_VOICES[PROGRAM[g].op](g);
    exec.forEach((st, k) => { st.voice = ids[k]; });
  });
}

function fetchSteps(i, w, brief) {
  const base = { group: i, phase: "fetch" };
  const addrBus = (s) => ({ bus: "addr", path: "cpu-ram", dir: "out", bits: b4(s.mar), from2: "reg-MAR", to2: "ram-r" + s.mar });
  const readSig = { bus: "ctrl", path: "cpu-ram", dir: "out", sig: READ_SIG() };
  const dataIn = (s) => ({ bus: "data", path: "cpu-ram", dir: "in", bits: b8(s.ram[s.mar]), from2: "ram-r" + s.mar, to2: "reg-MDR" });

  if (brief) {
    return [{
      ...base, focus: "cpuram", hl: ["PC", "MAR", "MDR", "IR", "CU"],
      title: T(`提取：由主記憶體取得指令 ${mnem(w)}`, `Fetch: get the instruction ${mnem(w)} from main memory`),
      run(s) { s.mar = s.pc; s.mdr = s.ram[s.mar]; s.mdrKind = "instr"; s.ir = s.mdr; s.pc += 1; s.decoded = null; },
      anims: (s) => [
        [{ xfer: ["reg-PC", "reg-MAR", b4(s.mar), "addr"] }],
        [addrBus(s), readSig],
        [dataIn(s)],
        [{ xfer: ["reg-MDR", "reg-IR", b8(s.ir), ""] }],
      ],
      ram: (s) => ({ addr: [s.mar], kind: "read" }),
      body: (s) => T(
        `<p>PC 的位址 <code>${b4(s.mar)}</code> 複製到 MAR，經${A("位址匯流排")}送往主記憶體；CU 經${C("控制匯流排")}發出「讀取」信號；主記憶體把指令 <code>${b8(s.ir)}</code> 經${D("數據匯流排")}送到 MDR，再複製到 IR。PC 增至 <code>${s.pc}</code>。</p>`,
        `<p>The address <code>${b4(s.mar)}</code> in the PC is copied to the MAR and sent to main memory on the ${A("address bus")}; the CU sends a READ signal on the ${C("control bus")}; main memory sends the instruction <code>${b8(s.ir)}</code> to the MDR on the ${D("data bus")}, and it is copied to the IR. The PC increases to <code>${s.pc}</code>.</p>`),
      concept: () => T(
        `<p>提取階段的路線：PC → MAR → 位址匯流排 → 主記憶體 → 數據匯流排 → MDR → IR。</p>`,
        `<p>The route of the fetch stage: PC → MAR → address bus → main memory → data bus → MDR → IR.</p>`),
    }];
  }

  return [
    {
      ...base, focus: "cpu", hl: ["PC", "MAR", "CU"],
      title: T("提取①：PC 的位址複製到 MAR", "Fetch ①: the address in the PC is copied to the MAR"),
      run(s) { s.mar = s.pc; s.decoded = null; },
      anims: (s) => [[{ xfer: ["reg-PC", "reg-MAR", b4(s.mar), "addr"] }]],
      body: (s) => T(
        `<p>CU 把<b>程式計數器（PC）</b>的內容 <code>${b4(s.mar)}</code>（位址 ${s.mar}）複製到<b>記憶體位址寄存器（MAR）</b>。</p><p>MAR 存放將要讀取或寫入的記憶體位址，它是 CPU 通往位址匯流排的出口。</p>`,
        `<p>The CU copies the contents of the <b>program counter (PC)</b>, <code>${b4(s.mar)}</code> (address ${s.mar}), to the <b>memory address register (MAR)</b>.</p><p>The MAR holds the memory address to be read from or written to. It is the CPU's link to the address bus.</p>`),
      concept: () => T(
        `<p class="warn">⚠ MAR 存放的是<b>位址</b>，不是數據或指令。</p>`,
        `<p class="warn">⚠ The MAR holds an <b>address</b>, not data or an instruction.</p>`),
    },
    {
      ...base, focus: "cpuram", hl: ["MAR", "CU"],
      title: T("提取②：位址經位址匯流排送出，CU 發出「讀取」信號", "Fetch ②: the address goes out on the address bus, and the CU sends a READ signal"),
      run() {},
      anims: (s) => [[addrBus(s), readSig]],
      ram: (s) => ({ addr: [s.mar], kind: "read" }),
      body: (s) => T(
        `<p>MAR 中的位址 <code>${b4(s.mar)}</code> 經${A("位址匯流排")}送往主記憶體；同時 CU 經${C("控制匯流排")}發出「讀取（READ）」信號。</p><p>主記憶體據此找出位址 ${s.mar} 的內容。</p>`,
        `<p>The address <code>${b4(s.mar)}</code> in the MAR is sent to main memory on the ${A("address bus")}. At the same time, the CU sends a READ signal on the ${C("control bus")}.</p><p>Main memory then locates the contents of address ${s.mar}.</p>`),
      concept: () => T(
        `<p>位址匯流排只由 CPU 送出位址（單向）。控制匯流排傳送控制信號，告訴主記憶體這次是「讀取」還是「寫入」。</p>`,
        `<p>The address bus only carries addresses out from the CPU (one-way). The control bus carries control signals that tell main memory whether to READ or WRITE.</p>`),
    },
    {
      ...base, focus: "cpuram", hl: ["MDR"],
      title: T("提取③：指令經數據匯流排送到 MDR", "Fetch ③: the instruction comes to the MDR on the data bus"),
      run(s) { s.mdr = s.ram[s.mar]; s.mdrKind = "instr"; },
      anims: (s) => [[dataIn(s)]],
      ram: (s) => ({ addr: [s.mar], kind: "read" }),
      body: (s) => T(
        `<p>主記憶體把位址 ${s.mar} 的內容 <code>${b8(s.mdr)}</code>（即指令 <code>${mnem(s.mdr)}</code>）經${D("數據匯流排")}送回 CPU，存入<b>記憶體數據寄存器（MDR）</b>。</p>`,
        `<p>Main memory sends the contents of address ${s.mar}, <code>${b8(s.mdr)}</code> (the instruction <code>${mnem(s.mdr)}</code>), back to the CPU on the ${D("data bus")}. It is stored in the <b>memory data register (MDR)</b>.</p>`),
      concept: () => T(
        `<p>數據匯流排是雙向的，既可傳送<b>數據</b>，也可傳送<b>指令</b>。</p>`,
        `<p>The data bus is two-way. It carries both <b>data</b> and <b>instructions</b>.</p>`),
    },
    {
      ...base, focus: "cpu", hl: ["MDR", "IR", "PC", "CU"],
      title: T("提取④：指令複製到 IR，PC 加 1", "Fetch ④: the instruction is copied to the IR, and the PC increases by 1"),
      run(s) { s.ir = s.mdr; s.pc += 1; },
      anims: (s) => [[{ xfer: ["reg-MDR", "reg-IR", b8(s.ir), ""] }]],
      body: (s) => T(
        `<p>指令由 MDR 複製到<b>指令寄存器（IR）</b>。同時 PC 由 ${s.pc - 1} 增至 <code>${s.pc}</code>，指向下一個指令。</p>`,
        `<p>The instruction is copied from the MDR to the <b>instruction register (IR)</b>. At the same time, the PC increases from ${s.pc - 1} to <code>${s.pc}</code> and points to the next instruction.</p>`),
      concept: () => T(
        `<p>IR 存放<b>正在執行</b>的指令；PC 存放<b>下一個</b>要提取的指令的位址。兩者都由 CU 使用。</p>`,
        `<p>The IR holds the instruction <b>being executed</b>; the PC holds the address of the <b>next</b> instruction to be fetched. Both are used by the CU.</p>`),
    },
  ];
}

function decodeStep(i, ins, w) {
  const op = OPS[ins.op];
  return {
    group: i, phase: "decode", focus: "cpu", hl: ["IR", "CU", "decoder"],
    title: T(`譯碼：CU 解讀 IR 中的指令 ${mnem(w)}`, `Decode: the CU interprets the instruction ${mnem(w)} in the IR`),
    run(s) { s.decoded = { op: ins.op, arg: ins.arg }; },
    body: () => {
      if (ins.op === 0) {
        return T(
          `<p>CU 把 IR 中的指令 <code>${b8(w)}</code> 分為兩部分：前 4 位元 <code>0000</code> 是<b>操作碼</b>，代表「停止（HALT）」；這個指令不需要操作數。</p>`,
          `<p>The CU splits the instruction <code>${b8(w)}</code> in the IR into two parts: the first 4 bits, <code>0000</code>, are the <b>opcode</b>, which means "halt" (HALT). This instruction needs no operand.</p>`);
      }
      return T(
        `<p>CU 把 IR 中的指令 <code>${b8(w)}</code> 分為兩部分：前 4 位元 <code>${b4(ins.op)}</code> 是<b>操作碼</b>，代表「${op.zh}（${op.name}）」；後 4 位元 <code>${b4(ins.arg)}</code> 是<b>操作數</b>，代表位址 ${ins.arg}（變數 ${VARS[ins.arg]}）。</p><p>CU 由此決定執行階段要發出哪些控制信號。</p>`,
        `<p>The CU splits the instruction <code>${b8(w)}</code> in the IR into two parts: the first 4 bits, <code>${b4(ins.op)}</code>, are the <b>opcode</b>, which means "${op.en}" (${op.name}); the last 4 bits, <code>${b4(ins.arg)}</code>, are the <b>operand</b>, which means address ${ins.arg} (variable ${VARS[ins.arg]}).</p><p>From this, the CU decides which control signals to send in the execute stage.</p>`);
    },
    concept: () => `<p><code>${mnem(w)}</code>${T("：", ": ")}${MEANING[ins.op](ins.arg)}</p>`,
  };
}

const MEANING = {
  0: () => T("停止執行程式。", "Stop running the program."),
  1: (a) => T(`把位址 ${a} 的數值載入累加器（ACC）。`, `Load the value at address ${a} into the accumulator (ACC).`),
  2: (a) => T(`把位址 ${a} 的數值與 ACC 的數值相加，結果存入 ACC。`, `Add the value at address ${a} to the value in the ACC, and store the result in the ACC.`),
  3: (a) => T(`把 ACC 的數值儲存到位址 ${a}。`, `Store the value in the ACC at address ${a}.`),
  4: (a) => T(`從輸入設備讀入一個數值，存入位址 ${a}。`, `Read a value from the input device and store it at address ${a}.`),
  5: (a) => T(`把位址 ${a} 的數值送往輸出設備。`, `Send the value at address ${a} to the output device.`),
};

function executeSteps(i, ins) {
  const g = i, a = ins.arg, v = VARS[a];
  const addrOut = (sig) => [
    { bus: "addr", path: "cpu-ram", dir: "out", bits: b4(a), from2: "reg-MAR", to2: "ram-r" + a },
    { bus: "ctrl", path: "cpu-ram", dir: "out", sig },
  ];
  const marSet = { xfer: ["reg-IR", "reg-MAR", b4(a), "addr"] };

  // 讀取變數：MAR ← 操作數，位址匯流排 + 「讀取」，再由數據匯流排送到 MDR
  const readVar = (phase) => [
    {
      group: g, phase, focus: "cpuram", hl: ["IR", "MAR", "CU"],
      title: T(`執行：讀取變數 ${v}，位址經位址匯流排送出`, `Execute: read variable ${v}; the address goes out on the address bus`),
      run(s) { s.mar = a; },
      anims: () => [[marSet], addrOut(READ_SIG())],
      ram: () => ({ addr: [a], kind: "read" }),
      body: () => T(
        `<p>CU 把操作數 <code>${b4(a)}</code>（位址 ${a}）放入 MAR，經${A("位址匯流排")}送往主記憶體，並經${C("控制匯流排")}發出「讀取」信號。</p>`,
        `<p>The CU puts the operand <code>${b4(a)}</code> (address ${a}) into the MAR, sends it to main memory on the ${A("address bus")}, and sends a READ signal on the ${C("control bus")}.</p>`),
      concept: () => T(
        `<p>執行階段同樣要用匯流排存取主記憶體，這次讀取的是<b>數據</b>（變數 ${v}），不是指令。</p>`,
        `<p>The execute stage also uses the buses to access main memory. This time it reads <b>data</b> (variable ${v}), not an instruction.</p>`),
    },
    {
      group: g, phase, focus: "cpuram", hl: ["MDR"],
      title: T(`執行：變數 ${v} 的值經數據匯流排送到 MDR`, `Execute: the value of variable ${v} comes to the MDR on the data bus`),
      run(s) { s.mdr = s.ram[a]; s.mdrKind = "num"; },
      anims: (s) => [[{ bus: "data", path: "cpu-ram", dir: "in", bits: b8(s.ram[a]), from2: "ram-r" + a, to2: "reg-MDR" }]],
      ram: () => ({ addr: [a], kind: "read" }),
      body: (s) => T(
        `<p>主記憶體把位址 ${a} 的數值 <code>${b8(s.mdr)}</code>（十進制 ${s.mdr}）經${D("數據匯流排")}送到 MDR。</p>`,
        `<p>Main memory sends the value at address ${a}, <code>${b8(s.mdr)}</code> (${s.mdr} in denary), to the MDR on the ${D("data bus")}.</p>`),
      concept: () => "",
    },
  ];

  if (ins.op === 4) {
    const k = i;  // 第 k 個輸入（0 或 1）
    return [
      {
        group: g, phase: "execute", focus: "cpukbd", hl: ["CU", "kbd"], need: k,
        title: T(`執行：CU 要求鍵盤輸入${ORD()[k]}個數`, `Execute: the CU asks the keyboard for the ${ORD()[k]} number`),
        run(s) { s.screen.lines.push({ t: "> ", wait: true }); },
        anims: () => [[{ bus: "ctrl", path: "cpu-kbd", dir: "out", sig: READ_SIG() }]],
        body: () => T(
          `<p>CU 經${C("控制匯流排")}向鍵盤的輸入輸出控制器發出「讀取」信號，然後等待使用者輸入。</p><p>請在下方輸入${ORD()[k]}個數（0 至 127），然後按「確定」。</p>`,
          `<p>The CU sends a READ signal to the keyboard's I/O controller on the ${C("control bus")}, then waits for the user.</p><p>Enter the ${ORD()[k]} number (0 to 127) below, then press "OK".</p>`),
        concept: () => T(
          `<p>這是 Python 程式 <code>${SOURCE[ins.src].code}</code> 中 <code>input()</code> 的部分。</p>`,
          `<p>This is the <code>input()</code> part of the Python statement <code>${SOURCE[ins.src].code}</code>.</p>`),
      },
      {
        group: g, phase: "execute", focus: "cpukbd", hl: ["MDR", "kbd"],
        title: T("執行：輸入的數值經數據匯流排送入 MDR", "Execute: the input value goes to the MDR on the data bus"),
        run(s) {
          const n = inputOf(k);
          s.kbd = n; s.mdr = n; s.mdrKind = "num";
          s.screen.lines[s.screen.lines.length - 1] = { t: "> " + n };
        },
        anims: (s) => [[{ bus: "data", path: "cpu-kbd", dir: "in", bits: b8(s.kbd), from2: "dev-kbd", to2: "reg-MDR" }]],
        body: (s) => T(
          `<p>鍵盤把按鍵轉換為二進制數 <code>${b8(s.kbd)}</code>（十進制 ${s.kbd}），經${D("數據匯流排")}送入 CPU 的 MDR。</p>`,
          `<p>The keyboard turns the key presses into the binary number <code>${b8(s.kbd)}</code> (${s.kbd} in denary) and sends it to the MDR in the CPU on the ${D("data bus")}.</p>`),
        concept: () => T(
          `<p>輸入設備把使用者的動作轉換為 0 和 1 的電子信號；電腦內所有數據都以二進制表示。</p>`,
          `<p>Input devices turn the user's actions into electronic signals of 0s and 1s; all data inside a computer is represented in binary.</p>`),
      },
      {
        group: g, phase: "store", focus: "cpuram", hl: ["IR", "MAR", "CU"],
        title: T(`儲存：位址經位址匯流排送出，CU 發出「寫入」信號`, `Store: the address goes out on the address bus, and the CU sends a WRITE signal`),
        run(s) { s.mar = a; },
        anims: () => [[marSet], addrOut(WRITE_SIG())],
        ram: () => ({ addr: [a], kind: "write" }),
        body: () => T(
          `<p>CU 把操作數 <code>${b4(a)}</code>（位址 ${a}）放入 MAR，經${A("位址匯流排")}送往主記憶體；同時經${C("控制匯流排")}發出「寫入（WRITE）」信號。</p>`,
          `<p>The CU puts the operand <code>${b4(a)}</code> (address ${a}) into the MAR and sends it to main memory on the ${A("address bus")}. At the same time, it sends a WRITE signal on the ${C("control bus")}.</p>`),
        concept: () => T(
          `<p>同一條位址匯流排，讀取和寫入都會用到；分辨兩者的是控制匯流排上的信號。</p>`,
          `<p>The same address bus is used for both reading and writing; the signal on the control bus tells them apart.</p>`),
      },
      {
        group: g, phase: "store", focus: "cpuram", hl: ["MDR"],
        title: T(`儲存：數值經數據匯流排寫入主記憶體（變數 ${v}）`, `Store: the value is written to main memory on the data bus (variable ${v})`),
        run(s) { s.ram[a] = s.mdr; },
        anims: (s) => [[{ bus: "data", path: "cpu-ram", dir: "out", bits: b8(s.mdr), from2: "reg-MDR", to2: "ram-r" + a }]],
        ram: () => ({ addr: [a], kind: "write" }),
        body: (s) => T(
          `<p>MDR 中的 <code>${b8(s.mdr)}</code> 經${D("數據匯流排")}寫入主記憶體位址 ${a}，成為變數 <b>${v}</b> 的值（${s.mdr}）。</p>`,
          `<p>The value <code>${b8(s.mdr)}</code> in the MDR is written to main memory address ${a} on the ${D("data bus")}. It becomes the value of variable <b>${v}</b> (${s.mdr}).</p>`),
        concept: () => T(
          `<p>寫入主記憶體時：位址經位址匯流排、數據經數據匯流排、「寫入」信號經控制匯流排，三種匯流排同時配合。</p>`,
          `<p>When writing to main memory, the address goes on the address bus, the data on the data bus and the WRITE signal on the control bus: all three buses work together.</p>`),
      },
    ];
  }

  if (ins.op === 1) {
    return [
      ...readVar("execute"),
      {
        group: g, phase: "execute", focus: "cpu", hl: ["MDR", "ACC"],
        title: T("執行：數值由 MDR 複製到累加器（ACC）", "Execute: the value is copied from the MDR to the accumulator (ACC)"),
        run(s) { s.acc = s.mdr; },
        anims: (s) => [[{ xfer: ["reg-MDR", "reg-ACC", b8(s.acc), "data"] }]],
        body: (s) => T(
          `<p>數值 ${s.acc} 由 MDR 複製到<b>累加器（ACC）</b>。ACC 是通用寄存器，暫存運算所用的數據和運算結果。</p>`,
          `<p>The value ${s.acc} is copied from the MDR to the <b>accumulator (ACC)</b>. The ACC is a general-purpose register that temporarily holds data for calculations and their results.</p>`),
        concept: () => T(
          `<p>LOAD 指令不需要 ALU 運算。ALU 只在需要運算的指令中工作。</p>`,
          `<p>The LOAD instruction does not need the ALU. The ALU works only for instructions that need a calculation.</p>`),
      },
    ];
  }

  if (ins.op === 2) {
    return [
      ...readVar("execute"),
      {
        group: g, phase: "execute", focus: "cpu", hl: ["CU", "ALU", "ACC", "MDR"],
        title: T("執行：CU 指示 ALU 執行加法", "Execute: the CU tells the ALU to add"),
        run(s) { s.alu = `${s.acc} + ${s.mdr}`; },
        anims: (s) => [[{ xfer: ["reg-ACC", "alu", b8(s.acc), "alu"] }, { xfer: ["reg-MDR", "alu", b8(s.mdr), "alu"] }]],
        body: (s) => T(
          `<p>CU 發出控制信號，指示<b>算術及邏輯運算部件（ALU）</b>執行加法。ACC 的數值和 MDR 的數值送入 ALU：</p><p><code>${b8(s.acc)}</code>（${s.acc}）＋ <code>${b8(s.mdr)}</code>（${s.mdr}）</p>`,
          `<p>The CU sends a control signal telling the <b>arithmetic and logic unit (ALU)</b> to add. The values in the ACC and the MDR are sent to the ALU:</p><p><code>${b8(s.acc)}</code> (${s.acc}) + <code>${b8(s.mdr)}</code> (${s.mdr})</p>`),
        concept: () => T(
          `<p>ALU 負責算術運算（＋、－、×、÷）及邏輯運算（比較、AND、OR、NOT）。</p>`,
          `<p>The ALU performs arithmetic operations (+, −, ×, ÷) and logical operations (comparisons, AND, OR, NOT).</p>`),
      },
      {
        group: g, phase: "store", focus: "cpu", hl: ["ALU", "ACC"],
        title: T("儲存：運算結果存入 ACC", "Store: the result is stored in the ACC"),
        run(s) { const r = s.acc + s.mdr; s.alu = `${s.acc} + ${s.mdr} = ${r}`; s.acc = r; },
        anims: (s) => [[{ xfer: ["alu", "reg-ACC", b8(s.acc), "alu"] }]],
        body: (s) => T(
          `<p>ALU 算出 ${s.alu}（二進制 <code>${b8(s.acc)}</code>），結果存入 ACC，取代原來的數值。</p>`,
          `<p>The ALU works out ${s.alu} (<code>${b8(s.acc)}</code> in binary). The result is stored in the ACC, replacing the old value.</p>`),
        concept: () => T(
          `<p>ALU 的運算結果通常存放在<b>累加器（ACC）</b>。這一步把結果寫回寄存器，屬機器周期的儲存階段。</p>`,
          `<p>The result of an ALU operation is usually kept in the <b>accumulator (ACC)</b>. Writing the result back to a register is the store stage of the machine cycle.</p>`),
      },
    ];
  }

  if (ins.op === 3) {
    return [
      {
        group: g, phase: "execute", focus: "cpu", hl: ["IR", "MAR", "ACC", "MDR", "CU"],
        title: T("執行：位址放入 MAR，ACC 的數值放入 MDR", "Execute: the address goes into the MAR, and the value in the ACC goes into the MDR"),
        run(s) { s.mar = a; s.mdr = s.acc; s.mdrKind = "num"; },
        anims: (s) => [[marSet, { xfer: ["reg-ACC", "reg-MDR", b8(s.acc), "data"] }]],
        body: (s) => T(
          `<p>CU 把操作數 <code>${b4(a)}</code>（位址 ${a}）放入 MAR，並把 ACC 的數值 ${s.acc} 複製到 MDR，準備寫入主記憶體。</p>`,
          `<p>The CU puts the operand <code>${b4(a)}</code> (address ${a}) into the MAR, and copies the value ${s.acc} in the ACC to the MDR, ready to be written to main memory.</p>`),
        concept: () => T(
          `<p>CPU 與主記憶體之間的數據，必定經 MDR 進出；位址則必定經 MAR 送出。</p>`,
          `<p>Data always passes between the CPU and main memory through the MDR; addresses are always sent out through the MAR.</p>`),
      },
      {
        group: g, phase: "execute", focus: "cpuram", hl: ["MAR", "CU"],
        title: T("執行：位址經位址匯流排送出，CU 發出「寫入」信號", "Execute: the address goes out on the address bus, and the CU sends a WRITE signal"),
        run() {},
        anims: () => [addrOut(WRITE_SIG())],
        ram: () => ({ addr: [a], kind: "write" }),
        body: () => T(
          `<p>位址 <code>${b4(a)}</code> 經${A("位址匯流排")}送往主記憶體；CU 經${C("控制匯流排")}發出「寫入（WRITE）」信號。</p>`,
          `<p>The address <code>${b4(a)}</code> is sent to main memory on the ${A("address bus")}; the CU sends a WRITE signal on the ${C("control bus")}.</p>`),
        concept: () => "",
      },
      {
        group: g, phase: "execute", focus: "cpuram", hl: ["MDR"],
        title: T(`執行：結果經數據匯流排寫入主記憶體（變數 ${v}）`, `Execute: the result is written to main memory on the data bus (variable ${v})`),
        run(s) { s.ram[a] = s.mdr; },
        anims: (s) => [[{ bus: "data", path: "cpu-ram", dir: "out", bits: b8(s.mdr), from2: "reg-MDR", to2: "ram-r" + a }]],
        ram: () => ({ addr: [a], kind: "write" }),
        body: (s) => T(
          `<p>MDR 中的 <code>${b8(s.mdr)}</code> 經${D("數據匯流排")}寫入位址 ${a}，變數 <b>${v}</b> 的值為 ${s.mdr}。至此完成 Python 程式 <code>c = a + b</code> 這一行。</p>`,
          `<p>The value <code>${b8(s.mdr)}</code> in the MDR is written to address ${a} on the ${D("data bus")}. Variable <b>${v}</b> is now ${s.mdr}. This completes the Python statement <code>c = a + b</code>.</p>`),
        concept: () => T(
          `<p>一行高階語言程式可能對應多個機器碼指令：<code>c = a + b</code> 需要 LOAD、ADD、STORE 三個指令。</p>`,
          `<p>One line of high-level code may become several machine code instructions: <code>c = a + b</code> needs three, LOAD, ADD and STORE.</p>`),
      },
    ];
  }

  if (ins.op === 5) {
    return [
      ...readVar("execute"),
      {
        group: g, phase: "execute", focus: "cpumon", hl: ["MDR", "CU", "mon"],
        title: T("執行：結果經數據匯流排送往顯示器", "Execute: the result goes to the monitor on the data bus"),
        run(s) { s.screen.lines.push({ t: String(s.mdr), out: true }); },
        anims: (s) => [
          [{ bus: "ctrl", path: "cpu-mon", dir: "out", sig: WRITE_SIG() }],
          [{ bus: "data", path: "cpu-mon", dir: "out", bits: b8(s.mdr), from2: "reg-MDR", to2: "dev-mon" }],
        ],
        body: (s) => T(
          `<p>CU 經${C("控制匯流排")}向顯示器的輸入輸出控制器發出「寫入」信號，MDR 的 <code>${b8(s.mdr)}</code> 經${D("數據匯流排")}送出，顯示器顯示「${s.mdr}」。</p>`,
          `<p>The CU sends a WRITE signal to the monitor's I/O controller on the ${C("control bus")}. The value <code>${b8(s.mdr)}</code> in the MDR is sent out on the ${D("data bus")}, and the monitor shows "${s.mdr}".</p>`),
        concept: () => T(
          `<p>這是 Python 程式 <code>print(c)</code> 的部分。輸出設備把電腦內的二進制數據轉換為人看得懂的形式。</p>`,
          `<p>This is the Python statement <code>print(c)</code>. Output devices turn the binary data inside the computer into a form people can understand.</p>`),
      },
    ];
  }

  // HALT
  return [{
    group: g, phase: "execute", focus: "full", hl: ["CU"],
    title: T("執行：程式結束", "Execute: the program ends"),
    run(s) { s.halted = true; s.screen.mode = "end"; },
    body: () => T(
      `<p>CU 執行停止指令，不再提取下一個指令，控制權交回操作系統。</p>`,
      `<p>The CU carries out the halt instruction. It stops fetching instructions, and control returns to the operating system.</p>`),
    concept: () => T(
      `<p>雖然 PC 已指向位址 7，但程式已經停止，CPU 不會再提取該位址的內容。</p>`,
      `<p>Although the PC now points to address 7, the program has stopped, so the CPU does not fetch the contents of that address.</p>`),
  }];
}

// ---------------------------------------------------------------- DOM refs

const $ = (id) => document.getElementById(id);
const els = {
  title: $("step-title"), body: $("step-body"), concept: $("step-concept"),
  badge: $("phase-badge"), count: $("step-count"), scenePhase: $("scene-phase"),
  inputBox: $("input-box"), inputNum: $("input-num"), inputLabel: $("input-label"), inputErr: $("input-err"),
  timeline: $("timeline"), progress: $("progress-bar"),
  play: $("btn-play"), prev: $("btn-prev"), next: $("btn-next"), reset: $("btn-reset"), view: $("btn-view"),
  speed: $("opt-speed"), brief: $("opt-brief"), cam: $("opt-cam"), voice: $("opt-voice"),
  src: $("src"), ram: $("ram").querySelector("tbody"), decoder: $("decoder"), aluOp: $("alu-op"),
};

// static parts
SOURCE.forEach((l, k) => {
  const li = document.createElement("li");
  li.id = "src-" + k;
  li.innerHTML = `<code>${l.code}</code><span class="asm">${l.asm}</span>`;
  els.src.appendChild(li);
});

for (let r = 0; r < 16; r++) {
  const tr = document.createElement("tr");
  tr.id = "ram-r" + r;
  tr.innerHTML = `<td class="a">${b4(r)}<em>${r}</em></td><td class="v"></td><td class="m"></td>`;
  els.ram.appendChild(tr);
}

["addr", "data"].forEach((bus) => {
  const box = $("bus-" + bus).querySelector(".wires");
  const n = bus === "addr" ? 4 : 8;
  for (let k = 0; k < n; k++) {
    const sp = document.createElement("span");
    sp.className = "wire";
    sp.textContent = "·";
    box.appendChild(sp);
  }
});

// ---------------------------------------------------------------- 2D render

const REGS = ["PC", "IR", "MAR", "MDR", "ACC"];

function regDisplay(name, s) {
  const v = s[name.toLowerCase()];
  if (v === null || v === undefined) return { bin: DASH(), dec: "" };
  switch (name) {
    case "PC": return { bin: b4(v), dec: T(`位址 ${v}`, `address ${v}`) };
    case "MAR": return { bin: b4(v), dec: T(`位址 ${v}`, `address ${v}`) };
    case "IR": return { bin: `<span class="op">${b4(v >> 4)}</span> <span class="arg">${b4(v & 15)}</span>`, dec: mnem(v) };
    case "MDR": return { bin: b8(v), dec: s.mdrKind === "instr" ? T(`指令 ${mnem(v)}`, `instruction ${mnem(v)}`) : T(`數值 ${v}`, `value ${v}`) };
    default: return { bin: b8(v), dec: T(`數值 ${v}`, `value ${v}`) };
  }
}

function ramMeaning(r, s) {
  if (!s.loaded) return "";
  if (r < PROGRAM.length) return `${T("指令", "instruction")} <code>${mnem(word(PROGRAM[r]))}</code>`;
  if (VARS[r]) return s.ram[r] === null ? T(`預留給變數 ${VARS[r]}`, `reserved for ${VARS[r]}`) : `${T("變數", "variable")} ${VARS[r]} = <b>${s.ram[r]}</b>`;
  return "";
}

function render2D(s, step, prev, opts = {}) {
  const hl = new Set(opts.hl ?? step.hl ?? []);

  REGS.forEach((name) => {
    const el = $("reg-" + name);
    const d = regDisplay(name, s);
    el.querySelector(".bin").innerHTML = d.bin;
    el.querySelector(".dec").textContent = d.dec;
    el.classList.toggle("on", hl.has(name));
    const changed = prev && prev[name.toLowerCase()] !== s[name.toLowerCase()];
    el.classList.remove("changed");
    if (changed && opts.flash) { void el.offsetWidth; el.classList.add("changed"); }
  });

  $("u-cu").classList.toggle("on", hl.has("CU"));
  $("u-alu").classList.toggle("on", hl.has("ALU"));
  $("alu").classList.toggle("on", hl.has("ALU"));
  els.aluOp.textContent = s.alu ?? DASH();

  if (s.decoded) {
    const { op, arg } = s.decoded;
    els.decoder.innerHTML = op === 0
      ? T(`譯碼器：操作碼 <b>0000</b> → HALT`, `Decoder: opcode <b>0000</b> → HALT`)
      : T(`譯碼器：操作碼 <b>${b4(op)}</b> → ${OPS[op].name}；操作數 <b>${b4(arg)}</b> → 位址 ${arg}`,
          `Decoder: opcode <b>${b4(op)}</b> → ${OPS[op].name}; operand <b>${b4(arg)}</b> → address ${arg}`);
  } else {
    els.decoder.textContent = T("譯碼器：－", "Decoder: –");
  }
  els.decoder.classList.toggle("on", hl.has("decoder"));

  // RAM
  const acc = opts.ram ?? (step.ram ? step.ram(s) : null);
  for (let r = 0; r < 16; r++) {
    const tr = $("ram-r" + r);
    const v = s.ram[r];
    tr.querySelector(".v").textContent = v === null ? DASH().repeat(8) : b8(v);
    tr.querySelector(".m").innerHTML = ramMeaning(r, s);
    tr.classList.toggle("empty", v === null);
    tr.classList.toggle("pc", s.loaded && !s.halted && s.pc === r);
    tr.classList.toggle("read", !!acc && acc.kind === "read" && acc.addr.includes(r));
    tr.classList.toggle("write", !!acc && acc.kind === "write" && acc.addr.includes(r));
    tr.classList.remove("loaded");
    if (opts.flash && prev && prev.ram[r] !== v) { void tr.offsetWidth; tr.classList.add("loaded"); }
  }

  // source line
  SOURCE.forEach((_, k) => $("src-" + k).classList.toggle("on", step.src === k));

  // devices
  $("dev-kbd").querySelector(".dev-val").textContent = s.kbd ?? DASH();
  const outs = s.screen.lines.filter((l) => l.out);
  $("dev-mon").querySelector(".dev-val").textContent = outs.length ? outs[outs.length - 1].t : DASH();
  $("dev-kbd").classList.toggle("on", hl.has("kbd"));
  $("dev-mon").classList.toggle("on", hl.has("mon"));
  $("dev-ssd").classList.toggle("on", hl.has("ssd"));

  renderBuses(step, s);
}

const DIR_NAME = {
  "cpu-ram": { out: ["CPU → 主記憶體", "CPU → main memory"], in: ["主記憶體 → CPU", "main memory → CPU"] },
  "cpu-kbd": { out: ["CPU → 鍵盤", "CPU → keyboard"], in: ["鍵盤 → CPU", "keyboard → CPU"] },
  "cpu-mon": { out: ["CPU → 顯示器", "CPU → monitor"], in: ["顯示器 → CPU", "monitor → CPU"] },
  "ssd-ram": { out: ["SSD → 主記憶體", "SSD → main memory"], in: ["主記憶體 → SSD", "main memory → SSD"] },
};

function busItems(step, s) {
  if (!step.anims) return [];
  return step.anims(s).flat().filter((it) => it.bus);
}

function renderBuses(step, s) {
  const items = busItems(step, s);
  ["addr", "data", "ctrl"].forEach((bus) => {
    const box = $("bus-" + bus);
    const it = items.filter((x) => x.bus === bus).pop();
    box.classList.toggle("on", !!it);
    box.querySelector(".bus-dir").textContent = it ? T(...DIR_NAME[it.path][it.dir]) : "";
    if (bus === "ctrl") {
      box.querySelector(".signal").textContent = it ? it.sig : DASH();
    } else {
      const wires = box.querySelectorAll(".wire");
      wires.forEach((wEl, k) => {
        const bit = it ? it.bits[k] : null;
        wEl.textContent = bit ?? "·";
        wEl.classList.toggle("one", bit === "1");
      });
    }
  });
}

// flying token between two elements
const flyers = new Set();
function fly(fromId, toId, text, cls, ms) {
  const a = $(fromId), b = $(toId);
  if (!a || !b || reducedMotion) return;
  const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
  if (!ra.width || !rb.width) return;
  const vh = window.innerHeight;
  if ((ra.bottom < 0 && rb.bottom < 0) || (ra.top > vh && rb.top > vh)) return;
  const f = document.createElement("div");
  f.className = "fly " + (cls || "");
  f.textContent = text;
  document.body.appendChild(f);
  const fw = f.offsetWidth, fh = f.offsetHeight;
  const x0 = ra.left + ra.width / 2 - fw / 2, y0 = ra.top + ra.height / 2 - fh / 2;
  const x1 = rb.left + rb.width / 2 - fw / 2, y1 = rb.top + rb.height / 2 - fh / 2;
  f.style.left = x0 + "px";
  f.style.top = y0 + "px";
  f.style.transitionDuration = ms + "ms, 250ms";
  flyers.add(f);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    f.style.transform = `translate(${x1 - x0}px, ${y1 - y0}px)`;
  }));
  setTimeout(() => { f.style.opacity = "0"; }, ms);
  setTimeout(() => { f.remove(); flyers.delete(f); }, ms + 300);
}
function clearFlyers() { flyers.forEach((f) => f.remove()); flyers.clear(); }

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------- 3D scene

const BUS_COLOR = { addr: 0x1f6fd1, data: 0x15925a, ctrl: 0xc8283f };
const BOARD_Y = 0.1;
const TRACE_Y = BOARD_Y + 0.015;

const CAMS = {
  full: { t: [-2.2, 2.1, -2.2], p: [2.8, 13.4, 13.2] },
  cpu: { t: [-1, 0.3, -0.5], p: [0.6, 5.4, 4.6] },
  cpuram: { t: [1.4, 0.4, -0.5], p: [2.4, 6.6, 6.4] },
  ram: { t: [3.7, 0.8, -0.5], p: [7.4, 5, 4.5] },
  ssd: { t: [0.5, 0.2, 3.2], p: [1.5, 6, 8.5] },
  ssdram: { t: [1.6, 0.3, 1.4], p: [3, 8.2, 9.4] },
  kbd: { t: [-7.6, 0.3, 4.6], p: [-5.6, 6.5, 10.5] },
  cpukbd: { t: [-5, 0.3, 2.2], p: [-2.4, 9.5, 10.5] },
  mon: { t: [-1.5, 3.6, -8.2], p: [-0.8, 5.2, -0.8] },
  cpumon: { t: [-2.4, 1.8, -5.2], p: [0.8, 8.5, 5] },
};

function createScene(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  Object.assign(labelRenderer.domElement.style, { position: "absolute", top: "0", left: "0", pointerEvents: "none", zIndex: "2" });
  container.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  camera.position.set(...CAMS.full.p);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(...CAMS.full.t);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.47;
  controls.minDistance = 3;
  controls.maxDistance = 40;

  scene.add(new THREE.HemisphereLight(0xfffaf0, 0x8a8070, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(6, 14, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fb6ff, 0.6);
  rim.position.set(-10, 6, -10);
  scene.add(rim);

  const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.15, ...extra });
  const box = (w, h, d, mat, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    scene.add(m);
    return m;
  };
  const allLabels = [];
  const label = (text, x, y, z) => {
    const div = document.createElement("div");
    div.className = "lbl";
    div.dataset.zh = text[0];
    div.dataset.en = text[1];
    div.textContent = T(...text);
    allLabels.push(div);
    const o = new CSS2DObject(div);
    o.position.set(x, y, z);
    scene.add(o);
    return div;
  };
  const canvasTex = (w, h, draw) => {
    const cv = document.createElement("canvas");
    cv.width = w; cv.height = h;
    const ctx = cv.getContext("2d");
    draw(ctx, w, h);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { tex, ctx, cv };
  };
  const FONT = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif';

  // desk
  const desk = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), std(0xe9e3d8, { roughness: 0.95 }));
  desk.rotation.x = -Math.PI / 2;
  desk.position.y = -0.12;
  scene.add(desk);
  const grid = new THREE.GridHelper(60, 60, 0xd3ccc0, 0xddd7cc);
  grid.position.y = -0.11;
  scene.add(grid);

  // motherboard
  const boardTex = canvasTex(1024, 732, (ctx, w, h) => {
    ctx.fillStyle = "#0d3a33"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(60,160,130,.18)"; ctx.lineWidth = 2;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let k = 0; k < 140; k++) {
      let x = rnd() * w, y = rnd() * h;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 3; j++) {
        if (rnd() < 0.5) x += (rnd() - 0.5) * 220; else y += (rnd() - 0.5) * 220;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(200,220,160,.25)";
    for (let k = 0; k < 220; k++) { ctx.beginPath(); ctx.arc(rnd() * w, rnd() * h, 2.2, 0, 7); ctx.fill(); }
    ctx.strokeStyle = "rgba(220,230,200,.35)"; ctx.lineWidth = 4; ctx.strokeRect(10, 10, w - 20, h - 20);
  });
  const boardMat = std(0xffffff, { map: boardTex.tex, roughness: 0.85 });
  box(14, 0.2, 10, [std(0x0a2c27), std(0x0a2c27), boardMat, std(0x0a2c27), std(0x0a2c27), std(0x0a2c27)], 0, 0, 0);
  // mounting holes
  [[-6.6, -4.6], [6.6, -4.6], [-6.6, 4.6], [6.6, 4.6]].forEach(([x, z]) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16), std(0xc9a646, { metalness: 0.8, roughness: 0.3 }));
    m.position.set(x, BOARD_Y + 0.01, z);
    scene.add(m);
  });

  // CPU
  box(2.7, 0.12, 2.7, std(0x9aa1ab, { metalness: 0.7, roughness: 0.35 }), -1, BOARD_Y + 0.06, -0.5);
  const chip = canvasTex(512, 512, () => {});
  const drawChip = (hl) => {
    const ctx = chip.ctx;
    ctx.fillStyle = "#171a24"; ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = "#c9a646"; ctx.lineWidth = 6; ctx.strokeRect(8, 8, 496, 496);
    const region = (x, y, w, h, base, glow, title, sub, on) => {
      ctx.fillStyle = on ? glow : base;
      ctx.fillRect(x, y, w, h);
      ctx.lineWidth = on ? 8 : 3;
      ctx.strokeStyle = on ? "#ffffff" : "rgba(255,255,255,.25)";
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `bold 46px ${FONT}`; ctx.fillText(title, x + w / 2, y + h / 2 - (sub ? 22 : 0));
      if (sub) { ctx.font = `bold 32px ${FONT}`; ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.fillText(sub, x + w / 2, y + h / 2 + 30); }
    };
    region(30, 40, 216, 250, "#0c3550", "#0ea5e9", "CU", "PC・IR", hl.has("CU"));
    region(266, 40, 216, 250, "#341a52", "#a855f7", "ALU", "ACC", hl.has("ALU"));
    region(30, 312, 452, 160, "#12302e", "#14b8a6", "MAR・MDR", "", hl.has("MEM"));
    chip.tex.needsUpdate = true;
  };
  drawChip(new Set());
  box(2.15, 0.16, 2.15, [std(0x22252e), std(0x22252e), new THREE.MeshStandardMaterial({ map: chip.tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: chip.tex, emissiveIntensity: 0.35 }), std(0x22252e), std(0x22252e), std(0x22252e)], -1, BOARD_Y + 0.2, -0.5);
  const lblCPU = label(["中央處理器（CPU）", "Central processing unit (CPU)"], -1, 1.0, -0.5);

  // RAM
  const ramMats = [];
  [3.45, 4.05].forEach((x) => {
    box(0.32, 0.22, 6.4, std(0x1a1a22), x, BOARD_Y + 0.11, -0.5);
    const m = std(0x1d4a3a, { emissive: 0x3ddc84, emissiveIntensity: 0 });
    ramMats.push(m);
    box(0.08, 1.1, 6, m, x, BOARD_Y + 0.76, -0.5);
    for (let k = 0; k < 8; k++) {
      box(0.06, 0.42, 0.56, std(0x0f1116), x + 0.07, BOARD_Y + 0.82, -3.0 + k * 0.72);
      box(0.06, 0.42, 0.56, std(0x0f1116), x - 0.07, BOARD_Y + 0.82, -3.0 + k * 0.72);
    }
    box(0.1, 0.06, 6, std(0xc9a646, { metalness: 0.8, roughness: 0.3 }), x, BOARD_Y + 0.25, -0.5);
  });
  const lblRAM = label(["主記憶體（RAM）", "Main memory (RAM)"], 3.75, 1.8, -0.5);

  // SSD (M.2)
  const ssdMat = std(0x1b2b4a, { emissive: 0x4ea8ff, emissiveIntensity: 0 });
  box(4.4, 0.06, 1.0, ssdMat, -0.5, BOARD_Y + 0.1, 3.4);
  const ssdSticker = canvasTex(512, 96, (ctx, w, h) => {
    ctx.fillStyle = "#e9edf5"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1b2b4a"; ctx.font = `bold 52px ${FONT}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("SSD  1 TB", w / 2, h / 2);
  });
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.5), new THREE.MeshStandardMaterial({ map: ssdSticker.tex }));
  sticker.rotation.x = -Math.PI / 2;
  sticker.position.set(-0.9, BOARD_Y + 0.135, 3.4);
  scene.add(sticker);
  box(0.8, 0.1, 0.7, std(0x111318), 1.0, BOARD_Y + 0.17, 3.4);
  const lblSSD = label(["輔助儲存設備（SSD）", "Secondary storage (SSD)"], -0.5, 0.9, 3.4);

  // ports
  box(0.7, 0.7, 1.2, std(0x8d939c, { metalness: 0.7, roughness: 0.35 }), -6.55, BOARD_Y + 0.35, 2.2);
  box(1.0, 0.5, 0.5, std(0x8d939c, { metalness: 0.7, roughness: 0.35 }), -4, BOARD_Y + 0.25, -4.7);

  // keyboard
  const kbdGroup = new THREE.Group();
  kbdGroup.position.set(-8.6, 0, 6.2);
  kbdGroup.rotation.y = 0.18;
  scene.add(kbdGroup);
  const kb = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.3, 2.1), std(0x262a44));
  kb.position.y = 0.04;
  kbdGroup.add(kb);
  const keys = [];
  for (let r = 0; r < 4; r++) {
    for (let k = 0; k < 12; k++) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.34), std(0xc9cfe6, { emissive: 0x22d3ee, emissiveIntensity: 0 }));
      m.position.set(-2.3 + k * 0.42, 0.26, -0.68 + r * 0.44);
      kbdGroup.add(m);
      keys.push(m);
    }
  }
  const lblKBD = label(["鍵盤（輸入設備）", "Keyboard (input device)"], -8.6, 1.1, 6.2);

  // monitor
  box(2.4, 0.1, 1.3, std(0x3a3f4d, { metalness: 0.5 }), -1.5, -0.06, -8.3);
  box(0.3, 2.2, 0.3, std(0x3a3f4d, { metalness: 0.5 }), -1.5, 1.05, -8.4);
  box(6.6, 4.0, 0.25, std(0x1b1e27), -1.5, 4.1, -8.45);
  const screen = canvasTex(768, 448, () => {});
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.6), new THREE.MeshBasicMaterial({ map: screen.tex }));
  scr.position.set(-1.5, 4.1, -8.31);
  scene.add(scr);
  const lblMON = label(["顯示器（輸出設備）", "Monitor (output device)"], -1.5, 6.5, -8.4);

  const drawScreen = (st) => {
    const ctx = screen.ctx, w = 768, h = 448;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#0b2346"); g.addColorStop(1, "#071327");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.textBaseline = "top"; ctx.textAlign = "left";
    if (st.screen.mode === "desktop") {
      ctx.fillStyle = "#1e3a6b"; ctx.fillRect(56, 60, 120, 120);
      ctx.fillStyle = "#fff"; ctx.font = `bold 64px ${FONT}`; ctx.textAlign = "center"; ctx.fillText("+", 116, 82);
      ctx.font = `30px ${FONT}`; ctx.fillText(T("加法程式", "Addition"), 116, 196);
      ctx.textAlign = "left"; ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = `26px ${FONT}`;
      ctx.fillText(T("程式仍存放在 SSD", "The program is still on the SSD"), 56, 380);
    } else {
      ctx.fillStyle = "#13294d"; ctx.fillRect(0, 0, w, 56);
      ctx.fillStyle = "#cfe3ff"; ctx.font = `bold 30px ${FONT}`; ctx.fillText(T("加法程式", "Addition program"), 24, 12);
      ctx.font = `bold 58px ui-monospace, Consolas, monospace`;
      st.screen.lines.slice(-4).forEach((l, k) => {
        ctx.fillStyle = l.out ? "#3ddc84" : "#e7ecf8";
        ctx.fillText(l.t + (l.wait ? "▌" : ""), 36, 84 + k * 80);
      });
      if (st.screen.mode === "end") {
        ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = `26px ${FONT}`; ctx.fillText(T("程式已結束", "Program finished"), 24, 400);
      }
    }
    screen.tex.needsUpdate = true;
  };

  // cables
  const cableMat = std(0x30343f, { emissive: 0x22d3ee, emissiveIntensity: 0 });
  const tube = (pts) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.07, 8, false), cableMat);
    scene.add(m);
    return curve;
  };
  const kbdCable = tube([[-6.9, 0.45, 2.2], [-7.6, 0.1, 2.6], [-8.0, -0.05, 4.0], [-8.4, 0.1, 5.15]]);
  const monCable = tube([[-4, 0.35, -4.95], [-3.6, -0.05, -6.2], [-2.0, -0.05, -7.6], [-1.5, 0.6, -8.6], [-1.5, 2.2, -8.62]]);

  // bus traces
  const OFF = { addr: -0.42, data: 0, ctrl: 0.42 };
  const CENTER = {
    "cpu-ram": [[0.4, -0.5], [3.25, -0.5]],
    "cpu-kbd": [[-2.4, -0.5], [-5.2, -0.5], [-5.2, 2.2], [-6.2, 2.2]],
    "cpu-mon": [[-1, -1.9], [-1, -3.6], [-4, -3.6], [-4, -4.45]],
    "ssd-ram": [[1.85, 3.4], [3.75, 3.4], [3.75, 2.65]],
  };
  const offsetLine = (pts, d) => pts.map((p, k) => {
    const nrm = (a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz); return [-dz / L, dx / L]; };
    const n1 = k > 0 ? nrm(pts[k - 1], p) : null;
    const n2 = k < pts.length - 1 ? nrm(p, pts[k + 1]) : null;
    const n = n1 && n2 ? [n1[0] + n2[0], n1[1] + n2[1]] : (n1 || n2);
    return [p[0] + n[0] * d, p[1] + n[1] * d];
  });
  const traceMats = { addr: [], data: [], ctrl: [] };
  const paths = {};   // paths[path][bus] = [Vector3…]（由 CPU 一端開始；ssd-ram 由 SSD 開始）
  Object.entries(CENTER).forEach(([name, pts]) => {
    paths[name] = {};
    const buses = name === "ssd-ram" ? ["data"] : ["addr", "data", "ctrl"];
    buses.forEach((bus) => {
      const line = offsetLine(pts, OFF[bus]).map(([x, z]) => new THREE.Vector3(x, TRACE_Y, z));
      const mat = new THREE.MeshStandardMaterial({ color: BUS_COLOR[bus], emissive: BUS_COLOR[bus], emissiveIntensity: 0.35, roughness: 0.4 });
      traceMats[bus].push({ mat, path: name });
      for (let k = 0; k < line.length - 1; k++) {
        const a = line[k], b = line[k + 1];
        const len = a.distanceTo(b) + 0.09;
        const seg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, len), mat);
        seg.position.copy(a).add(b).multiplyScalar(0.5);
        seg.lookAt(b.x, seg.position.y, b.z);
        scene.add(seg);
      }
      // 延伸到設備：鍵盤和顯示器的連接線
      let full = line;
      if (name === "cpu-kbd") full = line.concat(kbdCable.getPoints(24));
      if (name === "cpu-mon") full = line.concat(monCable.getPoints(24));
      paths[name][bus] = full;
    });
  });

  // pulses
  const pulses = [];
  const beadGeo = new THREE.BoxGeometry(0.2, 0.1, 0.2);
  function polyInfo(pts) {
    const cum = [0];
    for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + pts[k].distanceTo(pts[k - 1]));
    return { pts, cum, len: cum[cum.length - 1] };
  }
  function pointAt(info, d) {
    const { pts, cum } = info;
    if (d <= 0) return pts[0].clone();
    if (d >= info.len) return pts[pts.length - 1].clone();
    let k = 1;
    while (cum[k] < d) k++;
    const t = (d - cum[k - 1]) / (cum[k] - cum[k - 1]);
    return pts[k - 1].clone().lerp(pts[k], t);
  }
  function pulse(item, ms) {
    const base = paths[item.path][item.bus];
    const pts = item.dir === "in" ? base.slice().reverse() : base;
    const info = polyInfo(pts);
    const chars = item.sig ? [item.sig] : item.bits.split("").reverse();
    const spacing = item.sig ? 0 : 0.34;
    const beads = chars.map((ch) => {
      const mesh = new THREE.Mesh(beadGeo, new THREE.MeshBasicMaterial({ color: BUS_COLOR[item.bus] }));
      if (item.sig) mesh.scale.set(1.6, 1.6, 1.6);
      const div = document.createElement("div");
      div.className = "bit " + item.bus;
      div.textContent = ch;
      const lab = new CSS2DObject(div);
      lab.position.set(0, 0.32, 0);
      mesh.add(lab);
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, lab };
    });
    const p = { info, beads, spacing, t0: performance.now(), ms, item };
    pulses.push(p);
    setActive(item.bus, item.path, true);
    return p;
  }
  function removePulse(p) {
    p.beads.forEach(({ mesh, lab }) => {
      mesh.remove(lab);
      lab.element.remove();
      scene.remove(mesh);
      mesh.material.dispose();
    });
  }
  function clearPulses() {
    pulses.splice(0).forEach(removePulse);
    Object.keys(traceMats).forEach((bus) => traceMats[bus].forEach((t) => { t.mat.emissiveIntensity = 0.35; }));
    cableMat.emissiveIntensity = 0;
  }
  function setActive(bus, path, on) {
    traceMats[bus].forEach((t) => { if (t.path === path) t.mat.emissiveIntensity = on ? 1.4 : 0.35; });
    if (path === "cpu-kbd" || path === "cpu-mon") cableMat.emissiveIntensity = on ? 0.6 : 0;
  }

  // keyboard press animation
  let keyAnim = null;
  function pressKeys() { keyAnim = { t0: performance.now(), keys: [7, 19, 30, 41].map((k) => keys[k]) }; }

  // highlight
  const lbls = { cpu: lblCPU, ram: lblRAM, ssd: lblSSD, kbd: lblKBD, mon: lblMON };
  function highlight(set, chipSet) {
    Object.entries(lbls).forEach(([k, el]) => el.classList.toggle("on", set.has(k)));
    ramMats.forEach((m) => { m.emissiveIntensity = set.has("ram") ? 0.35 : 0; });
    ssdMat.emissiveIntensity = set.has("ssd") ? 0.6 : 0;
    drawChip(chipSet);
  }

  // camera
  let goal = null;
  let userMoving = false;
  controls.addEventListener("start", () => { goal = null; userMoving = true; });
  controls.addEventListener("end", () => { userMoving = false; });
  function focus(name, instant) {
    const c = CAMS[name] || CAMS.full;
    const t = new THREE.Vector3(...c.t);
    const off = new THREE.Vector3(...c.p).sub(t);
    const aspect = camera.aspect || 1.6;
    if (aspect < 1.4) off.multiplyScalar(Math.min(2.3, 1.4 / aspect));
    const p = t.clone().add(off);
    if (instant) { camera.position.copy(p); controls.target.copy(t); goal = null; }
    else goal = { p, t };
  }

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = w + "px";
    renderer.domElement.style.height = h + "px";
    labelRenderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  let last = performance.now();
  function loop(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (goal) {
      const k = 1 - Math.exp(-dt * 3.2);
      camera.position.lerp(goal.p, k);
      controls.target.lerp(goal.t, k);
      if (camera.position.distanceTo(goal.p) < 0.02) goal = null;
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      const u = (now - p.t0) / p.ms;
      const total = p.info.len + p.spacing * (p.beads.length - 1);
      const head = u * total;
      p.beads.forEach(({ mesh, lab }, k) => {
        const d = head - k * p.spacing;
        const vis = d >= 0 && d <= p.info.len && u < 1.15;
        mesh.visible = vis;
        lab.visible = vis;
        lab.element.style.display = vis ? "" : "none";
        if (vis) mesh.position.copy(pointAt(p.info, d)).setY(pointAt(p.info, d).y + 0.08);
      });
      if (u > 1.2) { removePulse(p); pulses.splice(i, 1); }
    }
    if (keyAnim) {
      const u = (now - keyAnim.t0) / 900;
      keyAnim.keys.forEach((m, k) => {
        const local = Math.max(0, Math.min(1, u * 4 - k));
        const down = Math.sin(local * Math.PI);
        m.position.y = 0.26 - down * 0.08;
        m.material.emissiveIntensity = down * 1.2;
      });
      if (u > 1.2) keyAnim = null;
    }
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  const relabel = () => allLabels.forEach((el) => { el.textContent = LANG === "en" ? el.dataset.en : el.dataset.zh; });
  return { pulse, clearPulses, highlight, focus, drawScreen, pressKeys, relabel, get userMoving() { return userMoving; } };
}

function stubScene() {
  return { pulse() {}, clearPulses() {}, highlight() {}, focus() {}, drawScreen() {}, pressKeys() {}, relabel() {}, userMoving: false };
}

let view;
try {
  view = createScene($("scene"));
} catch (e) {
  console.warn("3D scene unavailable:", e);
  $("scene-fallback").hidden = false;
  view = stubScene();
}

// ---------------------------------------------------------------- engine

let steps = buildSteps(false);
let cur = 0;
let playing = false;
let gen = 0;            // 每次轉換步驟遞增，用來取消未完成的計時
let timers = [];

function stateAt(k) {
  const s = initialState();
  for (let j = 0; j <= k && j < steps.length; j++) {
    s.alu = null;
    steps[j].run(s);
  }
  return s;
}

function speed() { return parseFloat(els.speed.value) || 1; }

function later(fn, ms) {
  const g = gen;
  const id = setTimeout(() => { if (g === gen) fn(); }, ms);
  timers.push(id);
}

function cancelAll() {
  gen++;
  timers.forEach(clearTimeout);
  timers = [];
  clearFlyers();
  view.clearPulses();
  stopNarration();
}

const CPU_PARTS = ["PC", "IR", "MAR", "MDR", "ACC", "CU", "ALU", "decoder"];

function scene3DHighlight(step, s) {
  const set = new Set();
  const hl = step.hl || [];
  if (hl.some((h) => CPU_PARTS.includes(h))) set.add("cpu");
  if (step.ram && step.ram(s)) set.add("ram");
  ["ssd", "kbd", "mon"].forEach((d) => { if (hl.includes(d)) set.add(d); });
  const chipSet = new Set();
  if (hl.some((h) => ["PC", "IR", "CU", "decoder"].includes(h))) chipSet.add("CU");
  if (hl.some((h) => ["ALU", "ACC"].includes(h))) chipSet.add("ALU");
  if (hl.some((h) => ["MAR", "MDR"].includes(h))) chipSet.add("MEM");
  view.highlight(set, chipSet);
}

function groupLabel(g) {
  if (g === "prep") return T("準備", "Prepare");
  if (g === "end") return T("總結", "Summary");
  return T(`指令 ${g}：${mnem(word(PROGRAM[g]))}`, `Instruction ${g}: ${mnem(word(PROGRAM[g]))}`);
}

function renderText(step, s) {
  const ph = phaseName(step.phase);
  els.badge.textContent = ph;
  els.badge.className = "phase-badge ph-" + step.phase;
  const gl = groupLabel(step.group);
  els.scenePhase.textContent = step.group === "prep" || step.group === "end" ? gl : `${gl}${T("｜", " | ")}${ph}`;
  els.scenePhase.className = "scene-phase ph-" + step.phase;
  els.count.textContent = T(`第 ${step.index + 1}／${steps.length} 步`, `Step ${step.index + 1} / ${steps.length}`);
  els.title.textContent = step.title;
  els.body.innerHTML = step.body(s);
  els.concept.innerHTML = step.concept ? step.concept(s) : "";

  const need = step.need;
  if (need !== undefined) {
    els.inputBox.hidden = false;
    els.inputLabel.textContent = T(`輸入${ORD()[need]}個數（0 至 127，即變數 ${need === 0 ? "a" : "b"}）`, `Enter the ${ORD()[need]} number (0 to 127, variable ${need === 0 ? "a" : "b"})`);
    els.inputNum.value = inputOf(need);
    els.inputErr.hidden = true;
  } else {
    els.inputBox.hidden = true;
  }
}

function renderTimeline() {
  const groups = ["prep", ...PROGRAM.map((_, i) => i), "end"];
  const curGroup = steps[cur].group;
  const order = groups.indexOf(curGroup);
  els.timeline.innerHTML = "";
  groups.forEach((g, k) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tl" + (g === curGroup ? " on" : k < order ? " done" : "");
    if (g === "prep") b.innerHTML = `<span class="n">✦</span>${T("準備", "Prepare")}`;
    else if (g === "end") b.innerHTML = `<span class="n">✓</span>${T("總結", "Summary")}`;
    else b.innerHTML = `<span class="n">${g}</span><code>${mnem(word(PROGRAM[g]))}</code>`;
    b.addEventListener("click", () => {
      pause();
      const first = steps.findIndex((st) => st.group === g);
      go(first, false);
    });
    els.timeline.appendChild(b);
    if (g === curGroup) requestAnimationFrame(() => b.scrollIntoView({ block: "nearest", inline: "center" }));
  });
  els.progress.style.width = ((cur + 1) / steps.length) * 100 + "%";
  els.prev.disabled = cur === 0;
  els.next.disabled = cur === steps.length - 1;
}

function textOf(html) {
  const d = document.createElement("div");
  d.innerHTML = html;
  return d.textContent.replace(/\s+/g, " ").trim();
}

// 旁白：播放預先錄製的 MP3；自動播放時等動畫和旁白都完成才進入下一步
const narration = new Audio();
narration.preload = "auto";
let narrationDone = Promise.resolve(false);
let audioUnlocked = false;   // 瀏覽器要求使用者先操作，才可以播放聲音
let narratedStep = -1;       // 已播放旁白的步驟

function voiceLang() { return els.voice.value; }
function voiceSrc(step) { return step && step.voice ? `audio/${voiceLang()}/${step.voice}.mp3` : null; }

function stopNarration() {
  narration.pause();
  narration.onended = narration.onerror = null;
}

function startNarration(step) {
  stopNarration();
  const src = voiceSrc(step);
  if (voiceLang() === "off" || !src || !audioUnlocked) { narrationDone = Promise.resolve(false); return; }
  narratedStep = step.index;
  const g = gen;
  narrationDone = new Promise((resolve) => {
    narration.onended = () => resolve(g === gen);
    narration.onerror = () => resolve(false);
    narration.src = src;
    narration.playbackRate = { "1.6": 0.9, "1": 1, "0.6": 1.15 }[els.speed.value] || 1;
    const p = narration.play();
    if (p) p.catch(() => resolve(false));
  });
  // 預先載入下一步的錄音
  const next = voiceSrc(steps[step.index + 1]);
  if (next && next !== src) { const pre = new Audio(); pre.preload = "auto"; pre.src = next; }
}

// 進入第 k 步；animate 為 true 時播放匯流排和寄存器的轉移動畫
function go(k, animate) {
  cancelAll();
  cur = Math.max(0, Math.min(steps.length - 1, k));
  const step = steps[cur];
  const pre = cur > 0 ? stateAt(cur - 1) : initialState();
  const post = stateAt(cur);

  renderText(step, post);
  renderTimeline();
  scene3DHighlight(step, post);
  startNarration(step);
  if (els.cam.checked) view.focus(step.focus, !animate);

  const groups = step.anims ? step.anims(post) : [];
  const sp = speed();
  const stepMs = 1300 * sp;

  if (animate && groups.length) {
    const preView = clone(pre);
    preView.alu = null;
    render2D(preView, step, null, { hl: step.hl });
    view.drawScreen(preView);
    groups.forEach((grp, gi) => {
      later(() => {
        grp.forEach((it) => {
          if (it.xfer) {
            const [f, t, txt, cls] = it.xfer;
            fly(f, t, txt, cls, Math.min(900, stepMs * 0.75));
          } else {
            const len = it.path === "cpu-ram" ? 1 : it.path === "ssd-ram" ? 1.2 : 1.7;
            view.pulse(it, stepMs * len);
            if (it.from2 && it.to2) fly(it.from2, it.to2, it.bits, it.bus, Math.min(1000, stepMs * 0.8));
            if (it.path === "cpu-kbd" && it.dir === "in") view.pressKeys();
          }
        });
      }, gi * stepMs * (grp.some((it) => it.path === "cpu-kbd" || it.path === "cpu-mon") ? 1.7 : 1.05));
    });
    const total = groups.reduce((acc, grp) => acc + stepMs * (grp.some((it) => it.path === "cpu-kbd" || it.path === "cpu-mon") ? 1.7 : 1.05), 0);
    later(() => {
      render2D(post, step, pre, { flash: true });
      view.drawScreen(post);
      afterStep(step, post, total);
    }, total);
  } else {
    render2D(post, step, pre, { flash: animate });
    view.drawScreen(post);
    afterStep(step, post, 0);
  }
}

function afterStep(step, s, animMs) {
  if (step.need !== undefined) {
    if (playing) {
      setPlaying(false, true);
    }
    if (matchMedia("(hover: none)").matches) els.inputBox.scrollIntoView({ block: "center", behavior: "smooth" });
    else els.inputNum.focus({ preventScroll: true });
    return;
  }
  if (!playing) return;
  const len = textOf(step.body(s)).length;
  const readMs = Math.max(3000, Math.min(9000, len * 70)) * speed();
  const g = gen;
  narrationDone.then((ok) => { if (g === gen) later(advance, ok ? 600 : readMs); });
}

function advance() {
  if (cur >= steps.length - 1) { setPlaying(false); return; }
  go(cur + 1, true);
}

let resumeAfterInput = false;
function setPlaying(on, waitingInput = false) {
  playing = on;
  resumeAfterInput = waitingInput;
  els.play.textContent = on ? T("❚❚ 暫停", "❚❚ Pause") : T("▶ 播放", "▶ Play");
}

function play() {
  if (cur >= steps.length - 1) { setPlaying(true); go(0, true); return; }
  setPlaying(true);
  if (steps[cur].need !== undefined) { submitInput(); return; }
  // 這一步的旁白未播過（例如剛打開頁面），先播完再前進
  if (voiceLang() !== "off" && narratedStep !== cur) { go(cur, false); return; }
  advance();
}
function pause() {
  setPlaying(false);
  cancelAll();
  const s = stateAt(cur);
  render2D(s, steps[cur], null);
  view.drawScreen(s);
}

function submitInput() {
  const step = steps[cur];
  if (step.need === undefined) return false;
  const n = Number(els.inputNum.value);
  if (!Number.isInteger(n) || n < 0 || n > 127 || els.inputNum.value === "") {
    els.inputErr.hidden = false;
    els.inputNum.focus();
    setPlaying(false);
    return false;
  }
  inputs[step.need] = n;
  const wasPlaying = playing || resumeAfterInput;
  setPlaying(wasPlaying);
  go(cur + 1, true);
  return true;
}

// ---------------------------------------------------------------- events

els.play.addEventListener("click", () => (playing ? pause() : play()));
els.next.addEventListener("click", () => {
  setPlaying(false);
  if (steps[cur].need !== undefined) { submitInput(); return; }
  go(cur + 1, true);
});
els.prev.addEventListener("click", () => { setPlaying(false); go(cur - 1, false); });
els.reset.addEventListener("click", () => { setPlaying(false); inputs = [null, null]; go(0, false); });
els.inputBox.addEventListener("submit", (e) => { e.preventDefault(); submitInput(); });
els.view.addEventListener("click", () => {
  const full = els.view.dataset.full !== "1";
  els.view.dataset.full = full ? "1" : "";
  els.view.innerHTML = full ? bil("特寫", "Close-up") : bil("全景", "Full view");
  els.cam.checked = !full;
  view.focus(full ? "full" : steps[cur].focus, false);
});
els.cam.addEventListener("change", () => {
  els.view.dataset.full = els.cam.checked ? "" : "1";
  els.view.innerHTML = els.cam.checked ? bil("全景", "Full view") : bil("特寫", "Close-up");
  if (els.cam.checked) view.focus(steps[cur].focus, false);
});
els.brief.addEventListener("change", () => {
  const old = steps[cur];
  steps = buildSteps(els.brief.checked);
  let k = steps.findIndex((st) => st.group === old.group && st.phase === old.phase);
  if (k < 0) k = steps.findIndex((st) => st.group === old.group);
  setPlaying(false);
  go(Math.max(0, k), false);
});
try {
  const saved = localStorage.getItem("ictrev-sim-voice");
  if (saved && [...els.voice.options].some((o) => o.value === saved)) els.voice.value = saved;
} catch (e) {}
// 未有選擇過時，旁白語言跟隨介面語言
if (LANG === "en" && els.voice.value === "zh") {
  let chosen = null;
  try { chosen = localStorage.getItem("ictrev-sim-voice"); } catch (e) {}
  if (!chosen) els.voice.value = "en";
}
els.voice.addEventListener("change", () => {
  try { localStorage.setItem("ictrev-sim-voice", els.voice.value); } catch (e) {}
  audioUnlocked = true;
  startNarration(steps[cur]);
});
// 使用者第一次操作頁面後，才開始播放旁白
["pointerdown", "keydown"].forEach((ev) => document.addEventListener(ev, () => { audioUnlocked = true; }, { capture: true }));
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, select, textarea")) return;
  if (e.key === "ArrowRight") { e.preventDefault(); els.next.click(); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); els.prev.click(); }
  else if (e.key === " " && !e.target.closest("button")) { e.preventDefault(); els.play.click(); }
});

// ---------------------------------------------------------------- language

function bil(zh, en) { return `<span class="lz">${zh}</span><span class="le">${en}</span>`; }

const TITLES = {
  zh: "程式執行模擬｜提取─譯碼─執行周期",
  en: "Program Execution Simulation | Fetch-Decode-Execute Cycle",
};

function applyStaticLang() {
  const d = document.documentElement;
  d.dataset.lang = LANG;
  d.lang = LANG === "en" ? "en" : "zh-Hant-HK";
  document.title = TITLES[LANG];
  document.querySelectorAll("[data-zh-aria]").forEach((el) => {
    const t = el.dataset[LANG === "en" ? "enAria" : "zhAria"];
    el.setAttribute("aria-label", t);
    if (el.hasAttribute("title")) el.title = t;
  });
  document.querySelectorAll("option[data-zh]").forEach((o) => { o.textContent = o.dataset[LANG]; });
  setPlaying(playing, resumeAfterInput);
  view.relabel();
}

function setLang(l) {
  if (l === LANG) return;
  LANG = l;
  try { localStorage.setItem("ictrev-lang", l); } catch (e) {}
  // 旁白語言跟隨介面語言（如有該語言的錄音）；選了「關閉」則不變
  if (els.voice.value !== "off" && [...els.voice.options].some((o) => o.value === l)) els.voice.value = l;
  applyStaticLang();
  const old = steps[cur];
  steps = buildSteps(els.brief.checked);
  setPlaying(false);
  go(old.index, false);
}

document.querySelectorAll("[data-set-lang]").forEach((b) => {
  b.addEventListener("click", () => { audioUnlocked = true; setLang(b.dataset.setLang); });
});

applyStaticLang();
go(0, false);
