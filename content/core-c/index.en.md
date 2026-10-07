> For: HKDSE Information and Communication Technology, new curriculum (examinations from 2025 onwards)
> Sources: CDC–HKEAA *ICT Curriculum and Assessment Guide*; HKEAA exam briefing materials 2023–2025; the 2025 Sample Paper; the 2012 Practice Paper; past papers and marking schemes; the HKACE 2025 and 2026 mock examinations
> Labels: [2025 P1A Q18] means 2025 HKDSE Paper 1A Question 18; [adapted from 2025 Mock P1B 6(a)] means a question adapted from the Hong Kong Association for Computer Education 2025 mock examination; "⚠" marks a common mistake reported by the HKEAA; "✔" marks a high-scoring answer
> The 2023 and 2024 questions, and earlier ones, come from the old-curriculum HKDSE. Module C is largely the same in the old and new curricula, so these questions are still useful

For the paper structure and the HKEAA's answering principles, see [Exam Strategies: Paper Structure and Answering Principles](../exam/structure.html).

## Module C in the new curriculum
| Part | Module / option | Suggested hours |
|---|---|---|
| Compulsory (144 hours) | A Information Processing | 37 |
| | B Computer System Fundamentals | 20 |
| | **C Internet and its Applications** | **31** |
| | D Computational Thinking and Programming | 48 |
| | E Social Implications | 8 |
| Elective (76 hours, choose two) | A Databases, B Web Application Development, C Algorithm and Programming | 38 each |

Module C covers how computer networks and the Internet work, common Internet services, the basic structure of web pages, and security and privacy on the Internet. It has four topics:

| Topic | Hours | Textbook chapters |
|---|---|---|
| a. Networking and Internet Basics | 9 | Ch. 1 (network concepts and hardware), Ch. 2 (wireless communication and Internet access), Ch. 3 (communication software and protocols) |
| b. Internet Services and Applications | 5 | Ch. 4 |
| c. Elementary Web Authoring | 3 | Ch. 5 |
| d. Threats and Security on the Internet | **14** | Ch. 6 (security threats and measures), Ch. 7 (privacy), Ch. 8 (encryption, authentication and electronic transactions) |

The HKEAA reported that "Internet and its Applications" was the area in which candidates performed worst in the 2025 Paper 1A. Module C questions are usually set in contexts such as a home or office network, an online shop, emails or web pages. Answers must name the technology and state what it does specifically: write "a router connects different networks", not "a router is used to go online".

## Recent examination focus
| Year | Questions related to Module C |
|---|---|
| Sample Paper | Section A Q17–25 (IPv6, functions of TCP, IoT devices need IP addresses, SSL, reducing the impact of ransomware, URL and folder structure, firewalls, good practice in online banking, phishing emails); Section B Q2(a) (anti-virus software cannot stop social engineering), Q6 (router ports, improving wireless speed), Q7(a), (b) (devices in a home wireless network, firewalls and SSL) |
| 2025 | P1A Q18–25 (valid IPv4 addresses, advantages of wireless networks, switched network, steps of e-commerce, features of HTML, image not displayed, data transmission with TCP/IP, URLs); P1B Q2 (one-time passwords, using PKI so that only the recipient can open a file), Q3(b) (IP address instead of domain name, attachments and hyperlinks), Q4(a) (HTML display size and aspect ratio) |
| 2024 | P1A Q15, 18, 23–26, 34–36 (printer connection methods, ransomware, subdomains, protocols in audio streaming, routers, web site design concerns, firewalls, CAPTCHA, email verification codes); P1B Q2(c) (password requirements), Q3(a)–(d)(i) (router ports, advantages of wired connections, using PKI to prove the sender, HTML-format emails, improving web page design) |
| 2023 | P1A Q15, 20–26, 35, 36, 38, 40 (network interface cards, HTTP, third-party cookies, protocols in uploading a photo, network diagram, IP addresses, DNS, wired and wireless networks, privacy on social media, firewalls and encryption programs, SSL, system updates); P1B Q4(a)–(c) (wired transmission media, switches, online shops, HTTPS and digital certificates, public and private keys), Q5 (smart cards and QR codes, problems of uploading via Wi-Fi, unsmooth streaming, scam emails) |

## One-page checklist before the exam

**Networking basics**
- [ ] A LAN covers a small area and is usually managed by one organisation; a WAN covers a large area, and the Internet is the largest WAN
- [ ] A switch forwards data packets within one network using MAC addresses; a router connects different networks and chooses paths using IP addresses
- [ ] A modem converts between digital and analogue signals; an access point lets wireless devices join the network
- [ ] The router's WAN port connects to the modem (the Internet); its LAN ports connect to computers
- [ ] Name wired media as "twisted pair / UTP" or "optical fibre", not "network cable" or "TP"
- [ ] Wired over wireless: more stable connection, higher security; wireless over wired: flexible placement and movement of devices. Do not write "speed" or "cost"
- [ ] Roaming: all access points use the same SSID and security key

**TCP/IP, IP addresses and URLs**
- [ ] TCP splits data into packets, adds sequence numbers, checks for errors and reassembles the data at the destination; IP adds the source and destination IP addresses to packets so that they can be routed
- [ ] Packets may travel by different paths; IP does not fix a path in advance
- [ ] IPv4: 32 bits, four decimal numbers from 0 to 255; IPv6: 128 bits, eight groups of hexadecimal numbers, with consecutive zeros replaceable by `::`
- [ ] DNS converts domain names into IP addresses; HTTP retrieves web pages from web servers; HTTPS encrypts the transmitted data
- [ ] Using an IP address instead of the domain name opens the same page because both refer to the same web server
- [ ] `.edu.hk` belongs to an educational institution; `.hk` is the top-level domain; `https` means data is encrypted in transit

**Internet services and web pages**
- [ ] Streaming: play the downloaded part while the rest is still downloading; do not write "no downloading is needed"
- [ ] Bcc hides recipients; attachments can be opened offline, while hyperlink permissions can be changed after sending
- [ ] HTML is plain text and cross-platform; it is not a programming language
- [ ] Reducing the display size in HTML does not shorten the download time; changing the aspect ratio distorts the image
- [ ] Image not displayed: wrong path or directory, missing file, misspelt file name, server failure

**Security and privacy**
- [ ] Ransomware infection: disconnect from the network and shut down immediately; prevention: regular backups kept offline
- [ ] A firewall filters incoming and outgoing network traffic by rules but cannot remove viruses; update anti-virus definition files regularly
- [ ] WEP is insecure; use WPA2 or WPA3 instead
- [ ] Private browsing does not save history or cookies, but it does not make the user anonymous
- [ ] One-time password: valid for a short time, used only once, sent through another channel (SMS, token, app)
- [ ] Authentication confirms "who you are"; authorisation decides "what you can do"

**Encryption and PKI (always state whose key and which key)**
- [ ] Confidentiality: the sender encrypts with the **recipient's public key**; the recipient decrypts with **his/her own private key**
- [ ] Proving the sender (digital signature): the sender signs with **his/her own private key**; the recipient verifies with the **sender's public key**
- [ ] A web site needs a digital certificate before using HTTPS; users use the site's public key, and the site uses its own private key
- [ ] A longer key gives more possible combinations, so it takes longer to crack; transmission time is unchanged
- [ ] A digital certificate is issued by a certification authority and contains the holder's details, the holder's public key and the CA's digital signature
