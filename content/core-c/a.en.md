## 1.1 Curriculum requirements

Define and compare Local Area Network (LAN) and Wide Area Network (WAN); know the formats and functions of IPv4 and IPv6 (technical details are not required); discuss the common services available in a networked environment, including internal communications, conferencing and resource sharing; explain the functions of the hardware required for a network, including communication links (fibre optics, microwave, Unshielded Twisted Pair (UTP) cable, satellite, etc.), modem, network interface card and network connecting devices (switch, router, etc.), and know the common industry standards for wireless networks together with concepts such as frequency, bandwidth, interference and roaming; compare common methods for Internet access in terms of speed, cost, security and availability; understand the need for communications software and communication protocols, including simple concepts of TCP/IP; describe how data is transmitted over the Internet and understand the concepts of Uniform Resource Locator (URL), Domain Name System (DNS), Hypertext Transfer Protocol (HTTP) and Hypertext Transfer Protocol Secure (HTTPS).

## 1.2 Basic concepts of computer networks

A **computer network** connects two or more computers and devices through communication links so that they can exchange data and share resources. Data communication has five basic components:

| Component | Description |
|---|---|
| Sender | The device that sends the message |
| Receiver | The device that receives the message |
| Message | The data transmitted, such as text, images and sound |
| Communication link | The medium that carries the message, such as cables and radio waves |
| Protocol | A set of rules that both sides follow when communicating |

By coverage, networks fall into two main types:

| Comparison | Local Area Network (LAN) | Wide Area Network (WAN) |
|---|---|---|
| Coverage | Small, such as a home, an office or a school | Large, across cities, countries or the whole world |
| Ownership and management | Usually owned and managed by one organisation | Usually involves several organisations, such as telecommunications companies |
| Data transfer rate | Higher | Generally lower |
| Set-up and maintenance cost | Lower | Higher, involving more complex equipment and infrastructure |
| Examples | Home network, school campus network | The Internet, a bank network linking its branches |

The Internet is the largest WAN in the world, formed by countless networks connected through routers. Classify a network by the technology it uses and its coverage: 5G mobile networking is a WAN technology, even when used to communicate with someone nearby.

By how resources are managed, networks can be divided into:

| Comparison | Client-server network | Peer-to-peer (P2P) network |
|---|---|---|
| Structure | Servers provide and manage resources centrally; clients send requests to servers | No dedicated server; every computer has equal status and manages and shares its own resources |
| Advantages | Central management of data, security and backup; suitable for medium and large organisations | Simple to set up and low cost; suitable for homes and small offices |
| Disadvantages | Servers are costly and need dedicated staff; a server failure affects all users | Hard to manage and back up centrally; weaker security |

A network that has a server (such as a file server or a print server) is a client-server network, not a peer-to-peer network.

## 1.3 Network services

| Service | Examples |
|---|---|
| Resource sharing | Hardware (printers, storage space), software, data, Internet connection |
| Internal communications | Intranet, email, instant messaging |
| Conferencing | Video conferencing, online meetings |

Sharing resources reduces the cost of buying equipment and makes central management and backup easier.

⚠ If a question asks for uses of a network "other than Internet access", do not answer "going online" again. Other uses of a home network: sharing a printer, transferring files between computers, sharing storage space [adapted from Sample Paper Section B 7(a)(ii)].

## 1.4 Transmission media

**Wired media**

| Medium | Features |
|---|---|
| Twisted pair (UTP, STP) | Two copper wires are twisted together to reduce electromagnetic interference; low cost and easy to install; the most common cable in wired LANs, connected with RJ-45 connectors |
| Optical fibre | Carries data as light signals; high bandwidth and long-distance transmission with little signal loss; immune to electromagnetic interference; hard to tap without being detected, so more secure; costly and harder to install, mostly used for backbones |
| Coaxial cable | A copper core with an outer shield; mostly used for cable TV and older networks |

> ⚠ **[2023 P1B 4(a)(i)] Name two transmission media for a wired network.**
> ✔ Unshielded twisted pair (UTP) cable, shielded twisted pair (STP) cable, optical fibre, coaxial cable. Simply writing "twisted pair" is accepted.
> ✘ "Network cable" and "LAN" were not accepted, and "TP" is not an accepted abbreviation. Performance was only fair; some candidates wrote the Chinese terms wrongly.

[2012 Practice Paper P1B 4(a)(ii)] Optical fibre should be used between two buildings 600 m apart because it supports long distances. Within a LAN, the advantages of optical fibre to write are higher bandwidth and immunity to electromagnetic interference, not "longer transmission distance".

**Wireless media**

| Medium | Features and uses |
|---|---|
| Radio waves | Travel in all directions and pass through walls; used for Wi-Fi and Bluetooth |
| Microwave | Higher frequency, mostly needs line of sight; used for mobile networks, satellite communication and long-distance point-to-point links |
| Satellite | Wide coverage, suitable for remote areas; longer delay, high cost |
| Infrared | Needs line of sight, very short range; used for remote controls |

[2012 Practice Paper P1B 4(a)(iii)] Disadvantages of connecting two networks by microwave: lower data transfer rate; performance easily affected by the weather; signals travel through the air and can be intercepted easily.

## 1.5 Network hardware

| Device | Function |
|---|---|
| Network interface card (NIC) | Connects a computer to a network and **sends and receives network signals**; wired and wireless networks need different NICs |
| Switch | Connects multiple devices **within one network** and forwards data packets to the correct port according to the destination **MAC address** |
| Router | **Connects different networks** (such as a LAN and the Internet) and chooses paths for data packets according to the destination **IP address** |
| Access point (AP) | Lets wireless devices join a network and connects the wireless network to the wired network |
| Modem | Converts between digital and analogue signals (modulation and demodulation) so that a computer can access the Internet through a telephone line or cable |

Every NIC has a unique **MAC address**, 48 bits long and written as 6 groups of hexadecimal digits, such as `25-FC-E3-61-9F-E3`. A MAC address identifies a device within a LAN; an IP address identifies a device across networks. A notebook computer with both a wired and a wireless NIC has two MAC addresses.

A home "wireless router" usually combines a router, a switch, an access point and even a modem, but in answers name the device according to the function asked.

> ⚠ **[2023 P1A Q15] Which of the following is the main function of a network interface card in a computer?**
> ✔ To send and receive network signals (73% correct). Directing data packets from one network to another is the job of a router.

> ⚠ **[2023 P1B 4(a)(ii)] In the toy shop network, David uses a switch instead of a router. Give a reason for this.**
> ✔ The shop only needs to form **one single network**; a switch connects all the devices in the shop so that they can communicate with each other.
> ✘ "A switch has more ports" and "no Internet connection is needed" were not accepted. The HKEAA found a weak understanding of the functions of routers and switches, and reminded candidates not to mix up home-use devices with the devices learnt in ICT.

**Reading network diagrams**

- [2023 P1A Q23] The diagram shows "computers → X → Y → Internet": X is a switch and Y is a router (73% correct).
- [2024 P1A Q25] The classroom and the staff room each have a Y connecting their computers; the two Ys connect to another Y, which connects to X, and X connects to the Internet: X is a router, whose major function is to connect multiple networks together (52% correct).
- [2025 P1A Q20] Computers A, B and C connect to a switch, and a printer is connected directly to Computer C. After Computer C is shut down, files can still be copied and deleted between the computers, but Computer A cannot print (68% correct).

> ⚠ **[2024 P1B 3(a)(i)] The rear side of an all-in-one wireless router has four LAN ports (1–4) and one WAN port (5). Suggest a port for the broadband modem and for the desktop computer.**
> ✔ Broadband modem: the WAN port (5); desktop computer: any LAN port (1–4).
> The HKEAA noted that this was a simple and direct question, yet some candidates still lost marks; follow the instructions of the question, for example by giving the port number when a port number is asked for.

[Sample Paper Section B 6(a)] The port of a router that connects to the Internet is the WAN port, which can use twisted pair cable such as UTP, STP, CAT5e or CAT6.

[2024 P1A Q15] A home-use laser printer is usually connected by USB cable, Wi-Fi or Bluetooth, not by fibre optics (85% correct).

## 1.6 Wireless networks

**Wi-Fi** is a wireless LAN based on the IEEE 802.11 standards. A computer needs a wireless NIC and connects to the network through an access point. Each wireless network is identified by an **SSID** (Service Set Identifier), and one access point can broadcast several SSIDs, such as a staff network and a guest network.

| Concept | Key points |
|---|---|
| Frequency | Measured in hertz (Hz). Lower frequencies penetrate walls better: 2.4 GHz has wider coverage; 5 GHz and 6 GHz offer higher bandwidth and less interference but smaller coverage |
| Bandwidth | Measured in bps; the maximum data transfer rate. The actual speed is usually lower |
| Interference | The 2.4 GHz band is shared with Bluetooth, microwave ovens, cordless phones and so on, so it suffers more interference; walls and other wireless networks also weaken signals |
| Roaming | A user moving between the coverage areas of different access points stays connected. All access points must use **the same SSID and security key** |

Common Wi-Fi standards:

| Standard | Name | Bands |
|---|---|---|
| 802.11ac | Wi-Fi 5 | 5 GHz |
| 802.11ax | Wi-Fi 6/6E | 2.4 GHz, 5 GHz (6E adds 6 GHz) |
| 802.11be | Wi-Fi 7 | 2.4 GHz, 5 GHz, 6 GHz |

[Sample Paper Section B 6(b)] If a wireless connection is occasionally very slow, switch to a less busy channel, change from 2.4 GHz to 5 GHz to reduce interference, or limit the number of connected devices. To improve a weak signal, move the access point to a central location or add another access point with the same SSID.

Other wireless communication technologies:

| Technology | Range | Uses |
|---|---|---|
| Bluetooth | About 10 m | Earphones, keyboards, mice, smart watches |
| Near field communication (NFC) | A few centimetres | Contactless payment, access control |
| Radio-frequency identification (RFID) | A few centimetres to tens of metres | Warehouse inventory, access control, automatic toll payment in tunnels |
| Zigbee | About 10–100 m | Low power consumption; smart home and IoT devices |
| Mobile networks (4G, 5G) | Wide | Mobile data, IoT |
| Satellite | Global | Global positioning system, communication in remote areas |

## 1.7 Comparing wired and wireless networks

| Comparison | Wired network | Wireless network |
|---|---|---|
| Connection stability | **More stable**, less interference | Easily affected by interference and obstacles |
| Security | **Higher**; signals are hard to intercept | Signals travel through the air and are easier to intercept |
| Mobility and flexibility | Device locations are limited by cables | Devices can be **placed and moved flexibly**, with roaming |
| Expansion | New devices need new cables | New devices can be added without cabling |

> ⚠ **[2025 P1A Q19] Tom sets up a wireless network instead of a wired network for the Internet connection at home. Why?**
> ✔ Only "to enhance the flexibility of where computers can be placed" (91% correct). A wireless network does not make the connection more stable or more secure.

> ⚠ **[2024 P1B 3(a)(ii)] Other than bandwidth, state an advantage of using a wired connection over a wireless connection between the router and the computer.**
> ✔ The connection is more stable (less interference); security is higher (signals are less likely to be intercepted).
> ✘ Speed, bandwidth, coverage and cost were not accepted. The HKEAA noted that this is "not the first time" this problem has appeared.

[2023 P1A Q26] A wired network offers a more stable connection; a wireless network offers flexible network access (93% correct). [2023 P1B 5(b)(iii)] Problems of uploading data via Wi-Fi: security problems (such as eavesdropping) and an unstable connection.

⚠ Write advantages of wireless networks from the user's point of view, such as "devices are not restricted by cables and can move within the coverage area". In a single-room context, do not answer "roaming" [adapted from 2021 P1B 2(a)].

## 1.8 Methods of Internet access

Users access the Internet through an **Internet Service Provider (ISP)**. An ISP provides the connection and may also provide services such as email and DNS.

| Method | Description | Comparison |
|---|---|---|
| Leased line | An organisation rents a dedicated line from a telecommunications company, with fixed bandwidth that is not shared | Most stable and most secure, but most expensive; needs a router |
| Broadband: DSL | Uses existing telephone lines with a DSL modem | Slower; being phased out |
| Broadband: fibre (FTTC, FTTH) | FTTC runs fibre to a roadside cabinet, then copper wire into the home; FTTH runs fibre directly to the home | Speed: FTTH > FTTC > DSL |
| Mobile networks (4G, 5G) | Access through a mobile network operator; needs a SIM card | Available almost anywhere, but less stable with limited bandwidth; some plans charge by data usage |
| Wi-Fi hotspot | Wireless Internet access in public places, such as Wi-Fi.HK | Mostly free; lower security, not suitable for sensitive data |

[2012 Practice Paper P1A Q24] A company subscribes to a 10M leased line instead of a 10M broadband connection because the leased line is more secure; the maximum data transfer rates of the two are the same.

Remote areas without wired infrastructure have to rely on mobile networks or satellites for Internet access.

## 1.9 Communication protocols and TCP/IP

A **communication protocol** is a set of rules for communication between devices, specifying the data format, the method of transmission and error handling. Devices from different manufacturers and with different operating systems can communicate as long as they follow the same protocols.

The Internet uses the **TCP/IP** protocol suite. Before transmission, data is split into smaller **packets**.

| Protocol | Function |
|---|---|
| Transmission Control Protocol (TCP) | Sender: splits data into packets and adds **sequence numbers**. Receiver: reorders the packets by sequence number and **reassembles** the data; uses checksums to detect damaged packets, requests retransmission of lost or damaged packets and discards duplicates. TCP ensures that data arrives reliably |
| Internet Protocol (IP) | Adds the **source and destination IP addresses** to each packet so that routers can deliver it to the destination according to the IP address |

Packets travel through routers **independently**. Packets of the same file may take different paths and arrive in a different order; the receiver's TCP puts them back in order. This is called packet switching.

> ⚠ **[2025 P1A Q24] Which of the following statements about transmitting data using TCP/IP are correct? (1) An IP address is used to identify a device in a network. (2) Data packets are reassembled back to the original data at the destination. (3) The IP determines a fixed path to send data packets to the specific destination.**
> ✔ **(1) and (2)**; only 49% of candidates answered correctly. The HKEAA noted that many candidates wrongly assumed that IP routing involves fixed paths, which relates to circuit switching rather than packet switching.

[Sample Paper Section A Q18] The functions of TCP include splitting and reassembling data and adding sequence numbers to data packets; routing the data to the destination is not a function of TCP. [2012 Practice Paper P1A Q23] When a simple web page is browsed, its content is divided into several packets that are probably sent through different physical paths.

[adapted from 2025 Mock P1A Q24] At the receiving end, TCP reassembles the received packets into the original data; splitting the data is done by the sender, and routing is done by routers according to IP addresses.

The TCP/IP model has four layers: application (HTTP, HTTPS, DNS, FTP, etc.), transport (TCP), Internet (IP) and network access (transmission media, NIC). The layer names are extension material and need not be memorised.

## 1.10 IP addresses

An **IP address** identifies a device on a network so that packets reach the correct device. IP addresses on the Internet must be unique, and their allocation is coordinated by the Internet Corporation for Assigned Names and Numbers (ICANN). IP addresses can be used on both the Internet and an organisation's intranet [2023 P1A Q24].

| Comparison | IPv4 | IPv6 |
|---|---|---|
| Length | 32 bits | 128 bits |
| Notation | 4 decimal numbers separated by ".", each **0 to 255** | 8 groups of hexadecimal digits separated by ":" |
| Example | `192.168.0.1` | `2001:0db8:0000:0000:0000:0000:1428:57ab` |
| Number of addresses | About 2³² (about 4.3 billion) | About 2¹²⁸ |

IPv6 addresses can be shortened: leading zeros in each group can be omitted, and consecutive groups of zeros can be replaced by `::`, but `::` may appear only once in an address. The example above can be written as `2001:db8::1428:57ab`.

Advantages of IPv6: a far larger number of addresses, solving the shortage of IPv4 addresses; built-in IPSec security; traffic prioritisation; better support for mobile devices. Many devices still use IPv4 because older devices do not support IPv6 and the transition involves cost.

> ⚠ **[2025 P1A Q18] Which of the following is/are valid IPv4 address(es)? (1) `10.512.10.0` (2) `1.2.3.4` (3) `192.168.1.256`**
> ✔ **(2) only**; only 44% of candidates answered correctly. Both 512 and 256 are outside the range 0 to 255. The HKEAA noted that most candidates did not fully understand how IP addresses are represented.

Common signs of an invalid IPv4 address: a number greater than 255; not exactly 4 numbers; letters or hexadecimal digits; a domain name instead of numbers.

[Sample Paper Section A Q17] IPv6 addresses are usually written in hexadecimal, and consecutive sections of zeros can be replaced by two colons; an IPv6 address is 128 bits long, not 256 bits. [Sample Paper Section A Q19] IoT devices exchange data over networks, so they must have an IP address; a powerful CPU and large storage are not required.

[adapted from 2026 Mock P1A Q23] In descending order of number of bits: IPv6 (128) > MAC address (48) > IPv4 (32).

## 1.11 Domain names and DNS

IP addresses are hard to remember, so web sites use **domain names**. A fully qualified domain name (FQDN) has several levels, read from right to left:

| Part | Example in `www.edb.gov.hk` | Description |
|---|---|---|
| Top-level domain (TLD) | `hk` | Country or territory code (`.hk`, `.mo`), or generic top-level domain (`.com`, `.org`, `.net`) |
| Second-level domain | `gov` | Type of organisation: `gov` government, `edu` education, `com` commercial, `org` non-profit organisation, `idv` individual |
| Organisation name | `edb` | The name registered with the registry |
| Host name | `www` | A server in the organisation |

`.hk` domains are managed by the Hong Kong Internet Registration Corporation (HKIRC), and ICANN coordinates domain names worldwide to keep every name unique. [2012 Practice Paper P1A Q21] A government body should use a `.gov.hk` domain.

> ⚠ **[2024 P1A Q23] Ms Ng has registered abc.edu.hk as the domain name for a school. Which of the following URLs can she use? (1) `http://abc.hk` (2) `http://hk.abc.edu.hk` (3) `http://hk.abc.edu`**
> ✔ **(2) only**; only 49% of candidates answered correctly. The owner of abc.edu.hk can add host names or subdomains on the left; `abc.hk` and `abc.edu` are different domains that must be registered separately.

[adapted from 2025 Mock P1A Q18] A school's domain is heungshing.edu.hk. `https://www.heungshing.hk` belongs to a different domain and is invalid for the school, while `https://heungshing.edu.hk` is valid.

The **Domain Name System (DNS)** converts domain names into IP addresses. The browser sends the domain name to a DNS server, which returns the corresponding IP address [2023 P1A Q25: input a domain name, output an IP address]. Organisations usually set up two DNS servers so that one still works if the other fails.

If a web page opens with its IP address but not with its domain name, possible reasons are: the DNS server is down, the computer's DNS settings are wrong, or the DNS record is wrong. ⚠ Writing only "the server is down" earns no mark; state which server. The web server is working in this case.

## 1.12 URL, HTTP and HTTPS

A **Uniform Resource Locator (URL)** gives the location of a resource on the web, in the format:

`protocol://domain name or IP address[:port]/path/file name`

For example, `https://www.abc.edu.hk:8080/info/notice.html`:

| Part | Example | Description |
|---|---|---|
| Protocol | `https` | Common ones are `http`, `https` and `ftp`; `tcp://` and `ip://` are not valid URL protocols |
| Domain name | `www.abc.edu.hk` | Can be replaced by an IP address, such as `https://202.8.88.24/...` |
| Port | `8080` | Written after the domain name or IP address; if omitted, HTTP uses 80 and HTTPS uses 443 |
| Path and file | `/info/notice.html` | The folder and file on the web server; if the file name is omitted, the server returns the default page, such as `index.html` |

Domain names are not case-sensitive, but paths and file names may be; `index.htm` and `index.html` are two different files.

| Protocol | Function |
|---|---|
| HTTP | The browser **requests and retrieves web pages** from a web server; data is not encrypted |
| HTTPS | Uses SSL/TLS on top of HTTP to **encrypt** the data between the browser and the web server, and lets the browser verify the identity of the web site |

[2023 P1A Q20] HTTP can retrieve a web page from a web server (60% correct). Converting a domain name into an IP address is the job of DNS; encrypting data is the job of HTTPS.

> ⚠ **[2025 P1A Q25] Which of the following statements about the URL `https://abc123.edu.hk/intro.docx` are correct? (1) The file will be converted into HTML format when accessing the URL in a browser. (2) The web site belongs to an educational institution. (3) The top level domain of the web site is 'abc123'. (4) Data is encrypted during the transmission on the Internet.**
> ✔ **(2) and (4)** (76% correct). The top-level domain is `hk`; a browser does not convert a DOCX file into HTML.

> ⚠ **[2025 P1B 3(b)(i)] Amy shares a file with `http://www.hkedcity.net/ihouse/Amy2504/photos.zip` and finds that entering `http://202.8.88.24/ihouse/Amy2504/photos.zip` also downloads the same file. Why?**
> ✔ `www.hkedcity.net` is the domain name of the web server with the IP address 202.8.88.24; both refer to the same server.
> ✘ Most candidates only identified that the two URLs were the same without discussing the role of IP addresses. Performance was only fair.

[adapted from 2025 Mock P1A Q20] Entering `https://42.112.125.10` in a browser involves SSL and TCP but not DNS, because the URL already uses an IP address and no domain name needs converting.

## 1.13 How data is transmitted when browsing the web

After a user enters a URL in a browser:

1. The browser queries a DNS server with the domain name and obtains the IP address of the web server.
2. The browser requests the web page from the web server at that IP address using HTTP (or HTTPS).
3. TCP on the web server splits the web page file into packets, and IP adds the source and destination IP addresses to each packet.
4. The packets pass through several routers, possibly by different paths, to the user's computer.
5. TCP on the user's computer checks the packets and reassembles them into the original file by sequence number.
6. The browser interprets the HTML code and displays the web page.

| Context | Protocols involved |
|---|---|
| [2023 P1A Q22] Uploading a photo to social media through a browser | IP, DNS, HTTP (64% correct) |
| [2024 P1A Q24] Using an audio streaming service | DNS, IP; not FTP (41% correct) |
| Browsing a web page directly by IP address | DNS is not involved |

[adapted from 2025 Mock P1A Q19] Browsing School A's web site on School B's campus involves a DNS server and School A's web server; School B's web server and file server are not involved.

## 1.14 Bandwidth and transmission time

The formula is: **transmission time = file size (bits) ÷ bandwidth (bps)**.

- Convert file size with **1024**, then multiply by 8 to get bits.
- Convert bandwidth with **1000**: 1 Mbps = 1 000 000 bps.
- Show the working and give the unit.

> ⚠ **[2025 P1B 3(a)] Each photo is 5 MB and the upload bandwidth is 100 Mbps. Estimate the shortest time required to upload 200 photos.**
> ✔ 200 × 5 × 1024 × 1024 × 8 ÷ (100 × 1000 × 1000) ≈ **84 s**. The marking scheme also accepted 80 s and 82 s.
> ✘ Marks were lost for forgetting to multiply by 8, omitting the unit, or converting bandwidth with 1024.

The actual transmission time is usually longer than calculated because the bandwidth is only the maximum rate, other users share the network and traffic is heavy, and every packet carries extra data such as headers (for example IP addresses).

For more explanation and examples of the calculation, see section 3.13 of [Module A Topic c](../core-a/c.html) and section 1.9 of [Module B Topic a](../core-b/a.html).

## 1.15 Self-test

<details><summary>1. A school's computers are connected through a switch and then to the Internet through a router. Describe the functions of the switch and the router.</summary>

The switch connects multiple devices within one network and forwards data packets to the correct device according to the destination MAC address. The router connects different networks, such as the school LAN and the Internet, and chooses paths for data packets according to IP addresses.
</details>

<details><summary>2. [adapted from 2023 P1B 4(a)(ii)] A small shop's network uses only a switch and no router. Why?</summary>

The shop only needs to form one network so that its devices can communicate with each other, and a switch is enough. Do not answer "a switch has more ports" or "no Internet access is needed".
</details>

<details><summary>3. Which of the following are valid IPv4 addresses? (1) <code>172.16.300.1</code> (2) <code>8.8.8.8</code> (3) <code>192.168.1</code> (4) <code>10.0.0.255</code></summary>

**(2) and (4)**. In (1), 300 is outside the range 0 to 255; (3) has only 3 numbers.
</details>

<details><summary>4. Shorten the IPv6 address <code>2001:0db8:0000:0000:0000:ff00:0042:8329</code> as much as possible.</summary>

`2001:db8::ff00:42:8329`. Leading zeros in each group are omitted, and the three consecutive groups of zeros are replaced by `::`.
</details>

<details><summary>5. State one task of TCP at the sending end and one at the receiving end.</summary>

Sending end: splits data into packets and adds a sequence number to each packet. Receiving end: reorders the packets by sequence number and reassembles the data; detects damaged or lost packets and requests retransmission. (Any one)
</details>

<details><summary>6. Someone says, "Packets of the same file always travel by the same path, so they arrive in order." Do you agree?</summary>

No. Packets travel independently and may take different paths, so they may arrive in a different order; the receiver's TCP reassembles them by sequence number. IP does not fix a path in advance.
</details>

<details><summary>7. May can open her company's web site with <code>http://203.0.113.5</code> but not with <code>http://www.abcco.com.hk</code>. Give two possible reasons.</summary>

The DNS server is down; the computer's DNS settings are wrong; the DNS record for the domain name is wrong. (Any two) The web server is working, so "the server is down" alone is not enough.
</details>

<details><summary>8. A company owns the domain name mikyco.com.hk. Which of the following addresses can it use without registering anything else? (1) <code>www.mikyco.com.hk</code> (2) <code>shop.mikyco.com.hk</code> (3) <code>www.mikyco.com</code> (4) <code>mikyco.hk</code></summary>

**(1) and (2)**. Host names or subdomains can be added to the left of a registered domain; `mikyco.com` and `mikyco.hk` are different domains that must be registered separately.
</details>

<details><summary>9. [adapted from 2024 P1B 3(a)(ii)] Other than bandwidth, state an advantage of using a wired connection between a computer and a router.</summary>

The connection is more stable with less interference; or security is higher because signals are harder to intercept. Do not write speed, coverage or cost.
</details>

<details><summary>10. A university installs access points on several floors so that students stay connected as they move around. How should the access points be configured? What is this feature called?</summary>

All access points use the same SSID and the same security key. This feature is called roaming.
</details>

<details><summary>11. In the URL <code>https://www.dsehk.edu.hk:8443/en/1.html</code>, write down: (a) the protocol (b) the fully qualified domain name (c) the top-level domain (d) the port (e) the requested file</summary>

(a) `https`; (b) `www.dsehk.edu.hk`; (c) `hk`; (d) `8443`; (e) `1.html` in the `en` folder.
</details>

<details><summary>12. Find the shortest time needed to download a 65 MB user manual over 60 Mbps broadband. Show your working.</summary>

65 × 1024 × 1024 × 8 ÷ (60 × 1000 × 1000) ≈ **9.09 s**.
</details>
