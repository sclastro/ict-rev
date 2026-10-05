## 3.1 Learning outcomes

Distinguish between analogue and digital data and state situations requiring conversion between them; explain why IT uses digital data, including the relationship between the number of bits and the number of combinations; convert between denary, binary and hexadecimal; represent negative integers in two's complement; perform binary addition and subtraction and analyse overflow errors (maximum 2 bytes); know how characters are represented in ASCII, Big-5, GB and Unicode (recall of specific codes is not required); know how multimedia elements are digitised and compare common file formats (bmp, png, jpg, wav, mp3, avi, mpeg4, txt, docx, odt, pdf).

## 3.2 Analogue and digital data

| Comparison | Analogue data | Digital data |
|---|---|---|
| Representation | Continuous signal (smooth waveform) | Discrete values (0 and 1) |
| Copying | Quality degrades with every copy | Can be copied perfectly |
| Transmission | Higher error rate | Lower error rate; errors can be detected |
| Storage | Inefficient; bulky media | Efficient; compact media |
| Analysis and processing | Hard to search and reorganise | Easy for computers to process, search and edit |

**Digitisation** has two steps:

1. **Sampling**: take a sample of the continuous signal at fixed time intervals.
2. **Quantisation**: convert each sample into a digital code at one of a set number of levels.

Digitisation always loses some of the original information. A higher sampling rate and bit resolution bring the result closer to the original signal, but never identical.

Conversion devices: an analogue-to-digital converter (ADC) turns analogue signals into digital ones, e.g. the sound card when recording with a microphone; a digital-to-analogue converter (DAC) does the reverse, e.g. playing music through speakers. A scanner digitises photos; printers and monitors turn digital images into the analogue form our eyes see.

## 3.3 Number of bits and number of combinations

**n bits can represent 2ⁿ different combinations.** 3 bits can represent 8 colours; to represent the 26 English letters you need at least 5 bits (2⁴ = 16 is not enough; 2⁵ = 32 is).

> ⚠ **[2024 P1B 4(a)(ii)(2)] How many different images can a 5 × 3 black-and-white dot display board show?**
> ✔ 2¹⁵ = 32 768. ✘ Many candidates answered "15", mixing up the *number of bits* with the *number of combinations*.

> ⚠ **[2024 P1B 4(b)(ii)] How many bits are required to record the position of one dot (e.g. B3)?**
> ✔ 5 bits (3 bits for rows A–E and 2 bits for columns 1–3); or 4 bits (15 positions, 2⁴ = 16 ≥ 15).
> ✘ Weaker candidates gave 1 or 2 bits because "a dot is only black or white", ignoring that the question asks about the **position**.

## 3.4 Converting between number systems

| Conversion | Method |
|---|---|
| Binary / hexadecimal → denary | Multiply each digit by its place value and add |
| Denary → binary / hexadecimal | Divide repeatedly by 2 (or 16); read the remainders from bottom to top |
| Binary → hexadecimal | Group bits in fours from the right; convert each group |
| Hexadecimal → binary | Convert each digit into four bits |

Example: 2C7₁₆ = 2 × 256 + 12 × 16 + 7 = **711₁₀**; in binary it is **10 1100 0111₂** (2 → 0010, C → 1100, 7 → 0111, leading zeros removed).

Hexadecimal is often used between programmers and computer systems because it is shorter than binary and converts to binary easily.

## 3.5 Units of data

| Unit | Conversion |
|---|---|
| 1 byte (B) | 8 bits (b) |
| 1 KB | 1024 B |
| 1 MB | 1024 KB |
| 1 GB | 1024 MB |
| 1 TB | 1024 GB |

A **word** is the unit of data the CPU processes at one time; most computers today have a 64-bit word length.

## 3.6 Binary representation of integers

| Representation | Range for n bits | Range for 8 bits |
|---|---|---|
| Unsigned integer | 0 to 2ⁿ − 1 | 0 to 255 |
| Sign-and-magnitude | −(2ⁿ⁻¹ − 1) to 2ⁿ⁻¹ − 1 | −127 to 127 |
| Two's complement | −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1 | −128 to 127 |

- **Sign-and-magnitude**: the leftmost bit is the sign bit (0 positive, 1 negative); the other bits give the magnitude. Drawback: zero has two representations (0000 0000 and 1000 0000).
- **Two's complement**: every integer has exactly one representation; modern computers use it.

**Finding the two's complement of a negative number (−45, 8 bits)**

1. Write 45 in binary: 0010 1101
2. Invert all bits (one's complement): 1101 0010
3. Add 1: **1101 0011**

Check: −128 + 64 + 16 + 2 + 1 = −45 ✔

**Converting two's complement back to denary**: a leftmost 1 means negative; invert and add 1 again to find the magnitude, then add the minus sign. Alternatively, treat the leftmost bit as −2ⁿ⁻¹ and add the rest as usual.

Remember the special patterns: in 8 bits the largest positive number is 0111 1111 (127), the smallest negative number is 1000 0000 (−128), and −1 is 1111 1111 [Sample Paper Section A Q5].

## 3.7 Binary addition, subtraction and overflow errors

An **overflow error** occurs when the result is outside the range the bits can represent.

- **Unsigned integers**: a carry out of the most significant bit (addition), or a borrow beyond it (subtraction), means overflow.
- **Two's complement**: adding two numbers of the **same sign** that gives a result of the **opposite sign** means overflow. Adding numbers of different signs never overflows; the leftmost carry is simply discarded.

Example (8-bit two's complement): 100 + 50

```
  0110 0100   (100)
+ 0011 0010   ( 50)
-----------
  1001 0110   sign bit becomes 1
```

Two positive numbers give a negative result, so an overflow error has occurred (150 is greater than 127).

✔ A subtraction can be rewritten as adding a negative number, e.g. −33 − 65 = −33 + (−65).
✔ Which gives 0000 0000: "1110 1111 + 0001 0000" or "1101 1111 + 0010 0001"? Add bit by bit and discard the final carry — the second one [adapted from 2025 P1A Q4].

## 3.8 Character encoding

| Encoding | Characters covered | Bytes per character |
|---|---|---|
| ASCII | English letters, digits, punctuation (7 bits, 128 characters) | 1 |
| Big-5 | Traditional Chinese plus ASCII characters | 1 to 2 |
| GB (Guobiao) | Simplified Chinese plus ASCII characters | 1 to 2 |
| Unicode (commonly UTF-8) | Characters of all living languages | 1 to 4 (English 1, Chinese usually 3) |

- The larger the character set, the more bits each character needs.
- The same Chinese character has different codes in different encodings; opening a file with the wrong encoding produces garbled text.
- UTF-8 is backward compatible with ASCII: English characters have the same codes in both.
- File size example: the plain text "ICT 資訊" takes 4 + 2 × 3 = 10 bytes in UTF-8 and 4 + 2 × 2 = 8 bytes in Big-5.

> ⚠ **[2023 P1A Q13]** Only about half the candidates knew that "Unicode is used for representing characters in English and other languages". Common misconceptions: that Big-5 contains Chinese characters only (it also contains ASCII characters); that the character set used is decided by the operating system or the browser.

## 3.9 Multimedia: text

| Format | Characteristics |
|---|---|
| TXT | Plain text with no formatting; smallest files; opens in any text editor |
| RTF | Supports basic text formatting |
| DOCX | Full formatting, images and tables; needs a compatible word processor |
| ODT | An open international standard for documents |
| PDF | Fixed layout that looks the same on every device; generally not directly editable; can be password-protected and restrict printing and copying |

> ⚠ **[2025 P1A Q9]** Reason for publishing an article as PDF instead of HTML: **PDF offers better document protection**. Only 52% answered correctly; many chose options that actually favour HTML.
> ✔ PDF over TXT: keeps text formatting and allows images. ODT over PDF: easier to edit [Sample Paper Section B Q5].

## 3.10 Multimedia: images

A **bitmap** image is made of pixels; its quality depends on **resolution** and **colour depth**.

| Colour depth | Number of colours | Use |
|---|---|---|
| 1 bit | 2 | Black-and-white documents, fax |
| 8 bits | 256 | Greyscale, indexed colour |
| 24 bits | about 16.8 million | True-colour photos |

A **vector graphic** describes lines and shapes with mathematical formulas. It does not lose quality when enlarged and its files are usually smaller, so it suits logos, icons and line art. Common formats: SVG, AI, EPS, WMF.

| Format | Compression | Transparency | Animation | Main use |
|---|---|---|---|---|
| BMP | Uncompressed | ✘ | ✘ | Highest quality, large files |
| JPG | Lossy | ✘ | ✘ | Digital photos, web pages |
| PNG | Lossless | ✔ | ✘ | Web images, images needing a transparent background |
| GIF | Lossless (256 colours only) | ✔ | ✔ | Simple animations |
| RAW | Uncompressed | ✘ | ✘ | Raw camera data for post-production |
| TIFF | Lossy or lossless | ✔ | ✘ | Printing and publishing |
| HEIC | Lossy or lossless | — | — | Smartphone photos: small files, high quality |
| WebP | Lossy or lossless | ✔ | ✔ | Web pages and mobile apps |

**Lossy compression** discards some data to reduce file size, and the discarded data **cannot be recovered**; **lossless compression** can restore the original data exactly.

The **aspect ratio** is the ratio of width to height, e.g. 4:3 or 16:9. Displaying an image or video with a different aspect ratio **distorts** it or adds black bars at the sides.

> ⚠ **[2024 P1A Q3]** "ai" is an image file format (Adobe Illustrator vector graphics); only about a third of candidates knew this.
> ⚠ **[2023 Old Paper 2C Q1]** Disadvantages of bitmaps should be stated as "larger file size" or "quality drops when enlarged"; vague answers such as "looks blocky" or "the picture is distorted / unclear" scored no marks. Fewer than one in five candidates could describe a situation that calls for vector graphics, e.g. a logo that must be shown at different sizes. Only about a third knew that lossy compression permanently removes some data.
> ⚠ **[2024 Old Paper 2C Q1]** Advantages of GIF: transparency, animation, lossless compression; disadvantage: at most 256 colours. Weaker candidates wrongly compared the file sizes of GIF and JPG.
> ⚠ **[2023 and 2024 Old Paper 2C Q1]** A video whose aspect ratio differs from the screen shows black bars or is distorted. Fewer than 10% mentioned black bars and a remedy (correct the aspect ratio with editing software, or shoot at the correct resolution).

## 3.11 Multimedia: audio

Digital audio quality depends on the **sampling rate** (samples per second, in Hz), the **bit resolution** (bits per sample) and the **number of channels** (mono 1, stereo 2, 7.1 surround 8).

| Format | Characteristics |
|---|---|
| WAV | Uncompressed; best quality; large files |
| MP3 | Lossy; about one tenth of the original size |
| AAC | Lossy; better quality than MP3 at the same bitrate; supports multiple channels |
| FLAC | Lossless compression |
| MIDI | Stores musical instructions only, no recorded sound; very small; cannot store human voice |

> ⚠ **[2023 Old Paper 2C Q2]** The formats used only for audio are AAC, MP3 and WAV. Weaker candidates thought MP4 was also audio-only; MP4 is a video format.

## 3.12 Multimedia: video

The size of uncompressed video depends on the **frame size** (width × height in pixels), **colour depth**, **frame rate** (fps) and **duration**.

| Format | Characteristics |
|---|---|
| AVI | A common uncompressed video format; high quality, large files |
| MP4 (MPEG-4) | Lossy; small files; supports streaming and subtitles; supported by HTML5 |
| MPEG | Used on optical discs such as DVD |
| MOV | Video format developed by Apple |
| WebM | Open source; common on the web |

A higher frame rate gives smoother motion but a larger file.

## 3.13 File size and transfer time calculations

**Formula sheet**

| Item | Formula (result in bits) |
|---|---|
| Uncompressed image | width (pixels) × height (pixels) × colour depth |
| Uncompressed audio | sampling rate × bit resolution × number of channels × time (s) |
| Uncompressed video | width × height × colour depth × frame rate × time (s) |
| Compressed audio or video | bitrate (bps) × time (s) |
| Transfer time | file size (bits) ÷ bandwidth (bps) |
| Compression ratio | original size ÷ compressed size |

**Unit rules**

- Bytes (B) to bits (b): **× 8**; bits to bytes: ÷ 8.
- **File sizes** (KB, MB, GB): convert with 1024.
- **Bandwidth and bitrate** (kbps, Mbps, Gbps): **always convert with 1000**; 1 Mbps = 1 000 000 bps.
- Make the units consistent first, and write the unit with the final answer.

**Example 1: uncompressed image**
A 1600 × 1200 pixel BMP with 24-bit colour depth:
1600 × 1200 × 24 ÷ 8 = 5 760 000 B; ÷ 1024 ÷ 1024 ≈ **5.49 MB**

**Example 2: uncompressed audio**
Stereo, 44.1 kHz, 16-bit, 3 minutes:
44 100 × 16 × 2 × 180 = 254 016 000 b; ÷ 8 ÷ 1024 ÷ 1024 ≈ **30.28 MB**

**Example 3: compressed audio**
Bitrate 256 kbps, 3 minutes:
256 × 1000 × 180 = 46 080 000 b; ÷ 8 ÷ 1024 ÷ 1024 ≈ **5.49 MB**
(The size of a compressed file depends only on bitrate and time, not on sampling rate or number of channels.)

**Example 4: transfer time**
Uploading a 3 GB video at 50 Mbps:
3 × 1024³ × 8 ÷ (50 × 1 000 000) ≈ **515.4 s** (about 8.6 minutes)

> ⚠ **[2025 P1B 3(a)] Each photo is 5 MB and the upload bandwidth is 100 Mbps. Estimate the shortest time to upload 200 photos.**
> ✔ (200 × 5 × 8) ÷ 100 = **80 s**. Using 1024 for the file size (about 84 s) was also accepted.
> ✘ Frequent errors: failing to convert bytes to bits (1 B = 8 b); leaving out the unit (seconds); **using 1024 for the bandwidth**. Performance was only *fair*.

> ⚠ **[2023 P1B 5(b)(ii)] 200 records of 2 KB each are sent at 10 Mbps.**
> ✔ 200 × 2 × 1024 × 8 ÷ (10 × 1 000 000) ≈ 0.33 s.
> ✘ Errors listed in the marking guidelines: 1000 for the file size (0 marks); 1024 for the bandwidth (0 marks); a missing zero; forgetting × 200; no unit.

> ⚠ **[2024 Old Paper 2C Q1 & Q2]** In image size calculations a few candidates used 256 (the number of colours) instead of **8 bits**; in bitrate calculations some used 1024 instead of 1000.

✔ The HKEAA's advice: write down the formula with units, show the calculation clearly, and give the final answer with the correct unit.

## 3.14 Cross-module link: images on web pages

> ⚠ **[2025 P1B 4(a)] A photo with original resolution 800 × 600 is displayed at 400 × 200 by changing the HTML code.**
> (i) Will the download time be shorter? ✔ **No** — the same photo file is still downloaded; only the display size changes, not the file size. Performance: *poor*.
> (ii) Will the photo be distorted? ✔ **Yes**, because the aspect ratio changes from 4:3 to 2:1. Performance: *poor*; some candidates did not understand the word "distorted".

## 3.15 Self-test

<details><summary>1. What are the largest and smallest integers in 10-bit two's complement?</summary>

Largest 2⁹ − 1 = **511**; smallest −2⁹ = **−512**.
</details>

<details><summary>2. Convert 1110 0101 (8-bit two's complement) to denary.</summary>

The leftmost bit is 1, so it is negative. Inverting gives 0001 1010; adding 1 gives 0001 1011 = 27, so the answer is **−27**.
</details>

<details><summary>3. An MP4 video has a bitrate of 5 Mbps and lasts 10 minutes. What is its file size in MB?</summary>

5 × 1 000 000 × 600 = 3 000 000 000 b; ÷ 8 = 375 000 000 B; ÷ 1024 ÷ 1024 ≈ **357.6 MB**.
</details>

<details><summary>4. Why does compressing a JPG file into a ZIP hardly change its size?</summary>

JPG is already compressed, so little redundant data is left and further compression has limited effect. Plain-text files such as TXT and HTML can shrink greatly.
</details>
