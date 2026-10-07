## 4.1 Curriculum requirements

Describe the potential risks caused by common network security threats, including virus, worm and Trojan programs, spyware, ransomware, unauthorised access, interception, intrusion via dynamic web pages and Denial of Service (DoS) attacks; propose effective measures to improve network security, including browser settings, anti-virus software, authentication, access and user right control, firewalls, wireless security protocols such as WPA, and Virtual Private Networks (VPN); discuss possible privacy threats on the Internet, supported by crimes reported in the news, such as eavesdropping, hacking, phishing, spamming and junk mail, and suggest ways to maintain privacy, stressing anonymity and passwords, together with the legal consequences of unauthorised access to computers; be aware of information encryption technologies that prevent eavesdropping and interception, including the basic concepts of data encryption, public and private key encryption systems (e.g. the Hong Kong Public Key Infrastructure) and the relationship between key size and the degree of security; explain authentication and authorisation as a means to control access to information on the Internet, including authentication methods for individuals, types of tokens and the procedure of authenticating a digitally signed document by obtaining the digital certificate of the signed body; know about security in electronic transactions, including Secure Sockets Layer (SSL), smart cards, security tokens, digital certificates and mobile Short Message Service (SMS); be aware of the latest developments in security measures.

## 4.2 Goals of network security

| Goal | Meaning | Related measures |
|---|---|---|
| Confidentiality | Only authorised people can read the data | Encryption, access control |
| Integrity | Data has not been altered in transmission or storage | Digital signatures, SSL |
| Authenticity | A message or user really comes from the claimed party | Authentication, digital signatures, digital certificates |
| Non-repudiation | The sender cannot deny having sent a message | Digital signatures |

These four goals help in analysing the measures in this topic. The curriculum does not require memorising the names.

## 4.3 Common security threats

**Malware**

| Threat | Features | Risks |
|---|---|---|
| Virus | Attaches to files and activates and spreads only when the user runs an infected file | Deletes or damages files; slows down the system |
| Worm | Does not need a host file; **replicates and spreads by itself** through networks and security loopholes | Uses up bandwidth and slows down the network |
| Trojan program | Disguises itself as a useful program to trick users into installing it; **does not replicate itself** | Opens a backdoor for hackers to control the computer remotely; steals login details |
| Spyware | Collects information without the user's knowledge, such as key loggers | Leaks passwords, credit card numbers and other personal data |
| Adware | Keeps displaying advertisements | Disrupts use and slows down the system |
| Ransomware | **Encrypts** the victim's files and demands a ransom for the decryption key; often spread by phishing emails or malicious downloads | Data cannot be accessed, business stops, financial loss |

A worm is not a program bug or the security loophole itself; it is malware that spreads by exploiting loopholes.

> ⚠ **[2024 P1A Q18] Amy finds that her computer is infected by ransomware. What should she do immediately?**
> ✔ Disconnect the network connection and shut down the computer (53% correct), so that the ransomware cannot keep encrypting files or spread to other computers on the network.
> ✘ 30% of candidates chose "execute an anti-virus program to scan for and clean viruses". The HKEAA noted that candidates did not fully understand how harmful ransomware is; it cannot be handled by an anti-virus program alone.

[Sample Paper Section A Q21] Ways to minimise the impact of ransomware: create backups of files regularly; do not open anonymous or phishing emails; do not download pirated software through P2P software. Backups are best kept offline so that they are not encrypted as well.

**Other threats**

| Threat | Description |
|---|---|
| Unauthorised access (hacking) | Entering a system without authorisation by exploiting software loopholes, stolen or guessed passwords, social engineering and so on |
| Interception | Capturing data in transit, such as using a packet sniffer to capture packets on unencrypted Wi-Fi, or posing as each party between two communicating parties (man-in-the-middle attack). The defence is to encrypt data |
| Intrusion via dynamic web pages | Entering malicious commands in web forms, such as SQL injection, to read or modify the web site's database. Web sites must validate user input |
| Denial of Service (DoS) attack | Overloads a server with a huge number of requests so that legitimate users cannot use the service |
| Distributed Denial of Service (DDoS) attack | Many infected computers (a botnet) launch a DoS attack at the same time; the many sources make it harder to identify and block |

## 4.4 Measures to improve network security

**Browser settings**: block third-party cookies; disable unnecessary plug-ins; enable safe browsing to warn about dangerous sites; disable autofill and password saving; clear the browsing history regularly; enter sensitive data only on sites using HTTPS.

**Anti-virus software**

Anti-virus software consists of a scanning engine and **virus definition files**, and detects malware in two ways:

- **Signature-based detection**: compares files with the signatures of known viruses in the virus definition files.
- **Heuristic detection**: analyses the behaviour or code of programs for suspicious features, so it can find unknown new viruses.

When malware is detected, the anti-virus software can repair, delete or quarantine the infected files.

Anti-virus software must be updated regularly: updating the virus definition files lets it detect newly discovered viruses; updating the scanning engine fixes loopholes in the program itself and improves detection. ⚠ Answers such as "safer" or "to protect the computer" are too vague.

[2012 Practice Paper P1B 2(d)] Computer viruses can spread through email attachments or web browsing. Even state-of-the-art anti-virus software may fail to remove some viruses because the virus is a new type that the existing technology cannot handle, or the virus definition file is outdated.

**Firewalls**

A firewall **filters incoming and outgoing network traffic** according to preset rules (such as source and destination IP addresses and ports) to block unauthorised access. A firewall can be a hardware device (usually placed between the router and the LAN, and built into many routers) or personal firewall software installed on a computer.

A firewall does not scan files for viruses, cannot remove viruses that have already infected a computer, and cannot replace anti-virus software.

- [2024 P1A Q34] A firewall is used to filter incoming and outgoing network traffic (79% correct).
- [Sample Paper Section A Q23] A technician installs a firewall instead of anti-virus software in an office network mainly to protect the network from online security threats; a firewall cannot withstand virus attacks.
- [2023 P1A Q36] A firewall and an encryption program can enhance the security of using a computer; adware cannot (90% correct).

[adapted from 2025 Mock P1B 7(b)] To make a server more secure, place a firewall in the network to block unauthorised system access, or a proxy server to filter malicious traffic.

**Authentication and access rights**: users must log in to use the system and are given only the rights needed for their duties; see section 4.8.

**System updates**: [2023 P1A Q40] Updating the operating system frequently fixes security loopholes and reduces virus attacks (79% correct).

**Wireless network security**

| Measure | Effect |
|---|---|
| Use WPA2 or WPA3 encryption | Encrypts data sent through the air. WEP is easily cracked and **insecure**, and should no longer be used |
| Set a strong security key | Stops others from guessing the key and joining the network |
| Change the access point's default administrator password and update its firmware | Stops others from changing the settings; fixes loopholes |
| Hide the SSID | The network does not appear in the lists of nearby devices |
| MAC address filtering | Only devices with specified MAC addresses can connect |

⚠ When explaining why to change to WPA, write "WEP is insecure and easily cracked"; "WEP is outdated" alone is not enough. A Wi-Fi network for customers should not hide its SSID or use MAC address filtering, because customers need to find the network easily, and the shop cannot register the MAC addresses of all customers' devices in advance.

**Virtual Private Network (VPN)**

A VPN creates an **encrypted "tunnel"** over the public Internet so that remote users or branch offices can connect securely to an organisation's internal network; intercepted data cannot be read. Compared with renting a leased line, a VPN costs less and is more flexible. A VPN also hides the user's real IP address.

[adapted from 2025 Mock P1A Q17] A company that wants to secure data transmitted over the Internet should use a VPN. A VPN cannot replace anti-virus software. WPA3 protects only the link between the device and the access point, while a VPN protects the whole transmission across the Internet.

## 4.5 Privacy threats

| Threat | Description |
|---|---|
| Eavesdropping | Unauthorised interception and monitoring of private communications, such as capturing user names and passwords with a packet sniffer on unsecured Wi-Fi |
| Hacking | Unauthorised access to a system, leading to data breaches or defacement of web sites |
| Phishing | Pretending to be a trusted organisation or person and using emails, SMS messages or fake web sites to trick users into giving sensitive data such as passwords and bank details |
| Spamming | Sending large numbers of unsolicited, irrelevant messages, sometimes collecting data through fake forms or links |
| Junk mail | Unwanted bulk emails, including promotional emails from legitimate organisations; receiving a lot of junk mail suggests that the email address may have been leaked |

Variants of phishing include vishing (by telephone) and smishing (by SMS).

**Social engineering**: exploiting people's fear, greed, curiosity or urgency to trick them into revealing information or taking certain actions, such as phishing, pretending to be technical support staff to ask for passwords, or leaving a malware-infected USB flash drive in a public place.

[Sample Paper Section B 2(a)] Anti-virus software cannot effectively protect against social engineering attacks such as phishing, because it only prevents, detects and removes malware and cannot stop users from revealing sensitive information themselves.

**Recognising phishing emails**

- The sender's domain does not match the claimed organisation, such as a claim to be from the government with a `.com` domain, or a look-alike domain such as `gmall.com`.
- An urgent or threatening tone demanding immediate action.
- Links asking for personal data, or suspicious attachments.

> ⚠ **[2023 P1B 5(d)] John receives an email from survey@HKSAR.com.hk with the subject "From HKSAR Government", asking him to complete a survey through a link. Explain briefly why it is probably a scam email. Describe what harmful consequence might happen after clicking the link.**
> ✔ The email comes from a `.com` domain, which is commercial, not from the government's `.gov` domain. Clicking the link may direct him to a phishing web site, or trigger the download of malware or ransomware, leading to the leakage of personal data.

⚠ The reason must point out the problem with the domain specifically; "wrong domain name" alone is too general. "No recipient is shown" has nothing to do with the scam, because the recipient may be in the Bcc field [adapted from 2013 P1B 5(d)].

[Sample Paper Section A Q25] Phishing emails typically use a fake web site to acquire personal information; they are not company advertisements and do not make computers unusable for days. [adapted from 2015 P1A Q38] Phishing emails often contain links to fake web sites, use an urgent tone, and may carry malware attachments.

How to handle suspicious messages: do not click links or open attachments; verify through official channels; block the sender; report it as spam or phishing.

## 4.6 Ways to maintain privacy

**Staying anonymous**

| Method | Effect | Limitations |
|---|---|---|
| VPN | Encrypts all Internet traffic and hides the user's real IP address, making tracking by web sites and hackers difficult | The VPN provider must be trusted |
| Proxy server (extension) | Web sites see only the proxy server's IP address | Does not encrypt data; the proxy administrator can still monitor users |

**Private browsing mode** (incognito mode)

After a private browsing window is closed, the browser does not keep the browsing history, cookies, form and search entries or temporary files. It is suitable for public computers.

⚠ Private browsing **does not make the user anonymous**: it does not hide the IP address, and the ISP, the employer and the visited web sites can still track the user's activities. It only stops other users of the same computer from seeing the browsing history.

**Cookies**

A cookie is a small **text file** that a web site stores in the user's browser to record preferences such as login status, language and shopping cart, improving the browsing experience. Cookies are created by the web server but stored on the user's device; each browser keeps its own cookies.

- First-party cookies: set by the site being visited, used to keep users logged in and remember preferences.
- Third-party cookies: set by other domains (such as advertisers); they can track users across web sites for targeted advertising and pose privacy risks.

> ⚠ **[2023 P1A Q21] Peter browses a new web site and sees the message "We use third-party cookies to personalize content and to analyse web traffic." What is/are the consequence(s) of clicking the "Accept" button?**
> ✔ Personal information may be collected (61% correct). Accepting cookies does not decrease the network bandwidth or disclose the address book of his email account.

**Adjusting privacy settings**

| Target | Settings |
|---|---|
| Browser | Block third-party cookies; disable autofill; regularly clear the history, cache and saved passwords |
| Apps | Restrict access to photos, location, camera, microphone, contacts and so on |
| Messaging apps | Limit who can see the profile picture, status and last-seen time; turn off read receipts; block users; use disappearing messages |
| Social media | Make the account private; control who can see posts and tag you; limit who can send friend requests |

[2023 P1A Q35] Proper measures when using social media: manage privacy settings to control who can see your posts; use a strong login password and change it regularly; be aware of what personal information you have provided (86% correct).

**Encrypted communication**

| Method | What is encrypted |
|---|---|
| HTTPS | Only the data between the user and that web site; the ISP still knows which site is visited |
| End-to-end encryption (such as instant messaging apps) | Only the sender and recipient can read the message content |
| VPN | All traffic the device sends over the Internet, with the IP address hidden |

## 4.7 Passwords and authentication methods

**Strong passwords**

- At least 8 characters, mixing uppercase letters, lowercase letters, digits and symbols.
- No easily guessed information such as the user name, birthday or common words.
- A different password for each account; change regularly; do not use default passwords.
- Do not share or write down passwords; a password manager can help.

Attackers can crack passwords by **brute-force attacks** (trying every combination of characters) or **dictionary attacks** (guessing with lists of common words), so passwords must be long and complex and avoid dictionary words.

> ⚠ **[2024 P1B 2(c)] When Tom tries to change his password in an online system, his new password "Tom1133" does not fulfil three password requirements. The first is "minimum of 10 characters". Fill in the remaining two requirements.**
> ✔ A combination of uppercase letters, lowercase letters, numbers and symbols; the login name cannot be included in the password.
> ✘ "Include a symbol" (incomplete), "no meaning" and "cannot repeat any password used in the past" (unrelated to the scenario) were not accepted. The HKEAA reminded candidates to relate answers to the "password requirements" in the question and express them completely.

[Sample Paper Section A Q24] Good practice in online banking: create an uncommon login name; use a combination of letters and numbers for passwords and change them regularly. There is no reason to avoid a wired network just because a wireless network is available.

**Three categories of authentication methods**

| Category | Examples |
|---|---|
| Something you know | Password, personal identification number (PIN), security question |
| Something you have | Smart card, security token, mobile phone, digital certificate |
| Something you are | Biometrics: fingerprint, face, iris, retina, vein, voice |

**Biometric authentication** uses features that are hard to copy, and users need not remember passwords; but leaked biometric data cannot be changed, which is a privacy risk. Face recognition and palm vein recognition need no contact with the device, which is more hygienic. ⚠ Voice recognition (identifying who is speaking) is biometric authentication; speech recognition (converting speech into text) is not authentication.

**Tokens**

A token is an object used to prove the user's identity:

- Hardware tokens: security devices that generate one-time passwords; smart cards and key fobs (using RFID or NFC) that store credentials; software dongles plugged into computers.
- Software tokens: verification codes generated by mobile phone apps.

[2012 Practice Paper P1A Q39] With the disconnected security token used for online banking, the six-digit number changes regularly; the user still needs a user name and password.

> ⚠ **[2023 P1B 5(a)] John considers three methods of identifying members of his fitness centre: (1) a smart card, (2) a plastic card with a printed QR code, (3) a mobile application. (i) Give an advantage of (1) over (2). (ii) Give an advantage of (2) over (1). (iii) Give an advantage of (3) over (1) and (2).**
> ✔ (i) A smart card is harder to replicate, while a QR code can be replicated easily, so a smart card is more secure. (ii) A QR code card is cheaper and easier to produce. (iii) The app can provide more functions, such as checking membership and usage records; members need not carry a card.

**One-time passwords and two-factor authentication**

A **one-time password (OTP)** is generated by the system and is different for every login or transaction. **Two-factor authentication (2FA)** requires two different categories of proof of identity, such as a password plus an OTP sent by SMS, or a password plus a fingerprint. Even if the password is stolen, the account cannot be accessed without the second proof.

> ⚠ **[2025 P1B 2(a)] When Eva logs on to a computer system, she will receive a one-time password for authentication. Give two characteristics of a one-time password.**
> ✔ It has a time limit and is valid only for a short period; it cannot be reused; it is sent through another channel, such as SMS, email, a token or a mobile app.
> ✘ Most candidates described what an OTP is, but only a few gave its key characteristics.

An OTP is more secure than an ordinary password because even if it is intercepted, it expires quickly and cannot be used again.

| Context | Purpose |
|---|---|
| [2024 P1A Q35] "Drag the slider to complete the puzzle" when logging in to an online store | CAPTCHA: verifies that the login is done by a human, not an automated program (97% correct) |
| [2024 P1A Q36] After account registration, the site emails a code for the user to input | Verifies the user's identity, confirming that the user owns the email address (82% correct) |
| Entering the old password when changing the password | Verifies the user's identity and that the user has the right to change the account |
| Entering the new password twice | Verifies that the input is correct, avoiding typing mistakes |

## 4.8 Authentication and authorisation

| Comparison | Authentication | Authorisation |
|---|---|---|
| Purpose | Confirms the user's identity: "who you are" | Decides which resources an authenticated user can access and which actions they can perform: "what you can do" |
| Involves | User name and password, tokens, biometrics | Permissions and roles |
| Example | Logging in to the school intranet with a user name and password | Students can view only their own results, cannot change them, and cannot view other students' results |

The system authenticates first and authorises afterwards. Common permissions include read, write (modify), execute, delete, create, list and share.

Sharing settings of cloud documents are an example of authorisation: a "viewer" can only read; a "commenter" can read and add comments but cannot edit; an "editor" can read and edit. A teacher marking a student report should be a "commenter", who can give comments without changing the original. Setting an expiry date on sharing permissions removes access automatically after a project ends, reducing the risk of data leakage.

Setting a file to read-only controls access rights; backing up files daily protects data from loss and is not access control.

## 4.9 Legal consequences of unauthorised access

| Legislation | Offence | Maximum penalty |
|---|---|---|
| Crimes Ordinance, section 161 | Access to a computer with criminal or dishonest intent, such as intent to deceive, to gain dishonestly for oneself or another, or to cause loss to another | Imprisonment for 5 years |
| Telecommunications Ordinance, section 27A | Knowingly causing a computer, by telecommunications, to obtain unauthorised access to any program or data held in a computer | Fine of HK$25,000 |

Even if an intruder steals or damages nothing, unauthorised access alone may already be an offence under section 27A of the Telecommunications Ordinance.

Extension: the Personal Data (Privacy) Ordinance regulates the collection, use and security of personal data and is enforced by the Office of the Privacy Commissioner for Personal Data; the Unsolicited Electronic Messages Ordinance regulates commercial electronic messages to curb spamming.

## 4.10 Data encryption

**Encryption** converts readable **plaintext** into unreadable **ciphertext** using a key and an algorithm; **decryption** turns the ciphertext back into plaintext. Even if data is eavesdropped or intercepted in transit, it cannot be read without the correct key.

A key is not a password: a key is a string of bits generated by the system for the encryption algorithm, which the user need not remember; a password is set by the user for authentication. Some systems generate a key from a password set by the user, but it is still the key that does the encryption.

**Key size and degree of security**

The longer the key, the more possible combinations, and the longer it takes to crack. A 128-bit key has 2¹²⁸ combinations and a 256-bit key has 2²⁵⁶, so cracking does not take just twice as long but 2¹²⁸ times as long.

> ✔ **[2012 Practice Paper P1A Q34] A web site adopts an encryption key 2048 bits long instead of 1024 bits long. Why does this increase the security level?**
> Hackers take more time to crack the system. Key length does not affect data transmission time and has nothing to do with whether the key can be memorised. Encryption and decryption take slightly longer.

**Symmetric and asymmetric encryption**

| Comparison | Symmetric encryption | Asymmetric encryption (public and private key encryption) |
|---|---|---|
| Keys | **The same key** for encryption and decryption, kept secret by both sides | Each person has a key pair: the **public key** is available to everyone; the **private key** is kept only by its owner |
| Operation | Encrypt with the key and decrypt with the same key | Data encrypted with a public key can be decrypted only with the matching private key, and vice versa |
| Advantages | Faster encryption and decryption | No secret key exchange beforehand; n people need only n key pairs, which is easier to manage; supports digital signatures for authenticity and non-repudiation |
| Disadvantages | The key must be exchanged securely before sending data; communicating with many people means managing many keys (n people communicating in pairs need n(n − 1) ÷ 2 keys) | Slower encryption and decryption |

## 4.11 Public Key Infrastructure (PKI)

The **Hong Kong Public Key Infrastructure (Hong Kong PKI)** is a framework for managing digital certificates and public key encryption, supporting secure electronic transactions, digital signatures and authentication.

**Use 1: making sure only the recipient can read (confidentiality)**

The sender encrypts with the **recipient's public key**, and the recipient decrypts with **his/her own private key**. Since only the recipient holds that private key, an interceptor cannot decrypt even with the ciphertext and the public key.

> ⚠ **[2025 P1B 2(b)] Eva sends a document file to Paul. Describe how they use Public Key Infrastructure (PKI) to ensure that only Paul can open and read the file.**
> ✔ Eva encrypts the file using **Paul's public key** (1 mark), and Paul decrypts the received file with **his private key** (1 mark).
> ✘ The marking scheme notes that "Eva sends the file" does not mean "encrypt", and "Paul reads/opens" does not mean "decrypt". The HKEAA found that some candidates did not specify who encrypts or decrypts, or who owns the key.

**Use 2: proving where a message comes from (authenticity, non-repudiation)**

The sender signs (encrypts) with **his/her own private key**, and the recipient verifies (decrypts) with the **sender's public key**. Successful decryption proves that the message really came from the sender, who cannot deny sending it. This method is not confidential, because anyone can obtain the sender's public key.

> ⚠ **[2024 P1B 3(b)] Ada plans to send an important message to Bob through the Internet, and PKI is used to guarantee that the message originated from Ada. Ada uses ___ to sign the message. Then, Bob uses ___ to verify the message.**
> ✔ Ada uses **Ada's private key** to sign; Bob uses **Ada's public key** to verify.
> The HKEAA stressed that answers must state both whose key and which key, and that names are better than "his" or "her" to avoid ambiguity.

| Purpose | Key used by the sender to encrypt or sign | Key used by the recipient to decrypt or verify |
|---|---|---|
| Only the recipient can read | Recipient's public key | Recipient's private key |
| Prove the message came from the sender | Sender's private key | Sender's public key |
| Both | Sign with the sender's private key, then encrypt with the recipient's public key | Decrypt with the recipient's private key, then verify with the sender's public key |

**Digital signatures**

Encrypting a whole document with a private key is slow, so digital signatures are used in practice:

1. The sender uses a hash function to compute a **hash value** of the document (the document's "fingerprint").
2. The sender encrypts the hash value with **his/her own private key** to form the digital signature, which is attached to the document and sent with it.
3. The recipient decrypts the digital signature with the **sender's public key** to obtain the original hash value.
4. The recipient computes the hash value of the received document again and compares it with the one from step 3. If they match, the document came from the sender and was not altered in transit.

A digital signature provides authenticity, integrity and non-repudiation, but the document itself is not encrypted, so there is no confidentiality. Under the Electronic Transactions Ordinance, a digital signature has the same legal status as a handwritten signature.

**Digital certificates and certification authorities**

If the "sender's public key" obtained by the recipient actually belongs to an impostor, verification goes wrong. A **certification authority (CA)** therefore uses a **digital certificate** to prove that a public key really belongs to a certain person or organisation.

A digital certificate contains: the holder's details (such as the name); the holder's public key; the CA's digital signature; the validity period. A digital certificate **does not contain** anyone's private key.

To verify a digital certificate, the CA's signature on the certificate is checked with the CA's public key; browsers and operating systems come with root certificates of trusted CAs pre-installed. A CA issues, verifies and manages digital certificates, but users generate their own key pairs and never give their private keys to the CA. Hongkong Post is one of the certification authorities in Hong Kong, and its e-Cert can be stored in the smart identity card.

## 4.12 Security of electronic transactions

**Secure Sockets Layer (SSL)** is a protocol that sets up an encrypted connection between a browser and a web server. HTTPS is HTTP protected by SSL or its successor, **Transport Layer Security (TLS)**. A padlock icon in the address bar shows that the connection is encrypted.

A simplified outline of how SSL works:

1. The browser requests an HTTPS connection to the web server.
2. The web server sends its digital certificate, which contains the server's public key.
3. The browser verifies the certificate with the CA's public key, confirming the identity of the web site.
4. The browser generates a symmetric session key, encrypts it with the **server's public key** and sends it to the server; the server decrypts it with **its own private key** to obtain the session key.
5. Both sides use the session key to encrypt and decrypt the data sent afterwards.

SSL provides data encryption (confidentiality), protection against alteration in transit (integrity) and verification of the web site's identity. SSL is generally not used to verify the user's identity (web sites verify users with login names and passwords), does not provide non-repudiation, and does not protect communication between the user and the DNS server.

- [2023 P1A Q38] An advantage of using SSL on web sites is that the transferred data is encrypted (81% correct); SSL does not raise the data transfer rate or hide the IP addresses of web sites.
- [Sample Paper Section A Q20] SSL is needed on the Internet so that data can be safely transmitted.
- [Sample Paper Section B 7(b)] A supermarket web site uses a firewall to filter network traffic and block unauthorised access to the server, and SSL to encrypt the user name, password and credit card details sent between Mrs Wong and the site.
- [adapted from 2026 Mock P1A Q22] If a browser warns of an "untrusted connection" or "certificate error", the site's certificate may have expired or be invalid, or the browser cannot verify the site's identity.

> ⚠ **[2023 P1B 4(c)] David has set up mytoyshop.com for customers to order toys and considers providing an HTTPS connection with the URL `https://mytoyshop.com`. (i) What should David apply for and obtain before he can implement an HTTPS connection? (ii) A public and private key encryption system is used in the web site. Who should use the public key and private key respectively?**
> ✔ (i) A digital certificate (SSL certificate, TLS certificate or e-Cert accepted). ✘ "Domain name" was not accepted.
> ✔ (ii) Public key: customers/users; private key: David/the web site.
> ✘ Some candidates lost marks by answering in terms of sending emails. The HKEAA reminded candidates that PKI is not only related to email.

[adapted from 2026 Mock P1B 4(b)] When a user logs in to a web site, the password is encrypted with the site's public key; only the site can decrypt it with its own private key, keeping the password confidential.

**Other security measures in electronic transactions**

| Measure | Effect |
|---|---|
| Smart card | The chip on the card stores credentials securely, and a PIN may be required for transactions; harder to copy than magnetic stripe cards and QR codes |
| Security token | Generates one-time passwords valid for a short time, forming two-factor authentication with a password |
| Digital certificate | Verifies the identity of the web site or the parties in a transaction, and is used to set up encrypted connections |
| Mobile SMS | Sends a one-time password to the user's registered phone during login or a transaction; the user must enter it to proceed |

## 4.13 Latest developments in security measures

| Development | Description |
|---|---|
| AI-driven threat detection | Analyses data patterns to spot unusual activity and phishing in real time and automatically isolates affected systems; adjusts authentication requirements according to user behaviour |
| Zero trust architecture | Assumes threats may come from inside or outside the network, strictly verifies every access and monitors continuously |
| Passwordless authentication | Replaces passwords with biometrics or hardware tokens (such as passkeys), reducing the risk of weak or stolen passwords |
| Multi-factor authentication (MFA) | Requires two or more authentication factors |
| Blockchain security | Verifies transactions by consensus mechanisms; records on the ledger cannot be altered; relies on cryptography to protect data |
| IoT security | Applies device security standards, changes default passwords and regularly updates firmware and security patches |

## 4.14 Self-test

<details><summary>1. State the difference between a virus and a worm in how they spread.</summary>

A virus attaches to files and spreads only when the user runs an infected file; a worm needs no host file and replicates and spreads by itself through the network.
</details>

<details><summary>2. Files on a company's file server are encrypted by ransomware. (a) State one consequence. (b) Give two measures to reduce the impact.</summary>

(a) Important files cannot be accessed until a ransom is paid, and business may stop. (b) Back up regularly and keep the backups offline; keep the anti-virus software and operating system up to date; train staff not to open attachments or links in suspicious emails. (Any two)
</details>

<details><summary>3. Ting's computer has anti-virus software installed but is still infected by a virus. Give two possible reasons.</summary>

The virus definition file has not been updated; the virus is a new variant that the anti-virus software cannot detect.
</details>

<details><summary>4. Someone says, "With a firewall installed, anti-virus software is unnecessary." Do you agree? Explain.</summary>

No. A firewall filters incoming and outgoing network traffic by rules to block unauthorised access, but it does not scan files for viruses or remove viruses that have already infected the computer, such as viruses brought in on a USB flash drive. Both should be used.
</details>

<details><summary>5. A café changes the encryption of its staff Wi-Fi from WEP to WPA3. Explain how this improves security and suggest one more wireless security measure.</summary>

WEP is insecure and easily cracked; WPA3 provides stronger encryption, so intercepted data is hard to read. Other measures: use a strong security key; enable MAC address filtering; change the access point's default administrator password and update its firmware. (Any one)
</details>

<details><summary>6. "If I use private browsing mode, my ISP will not know which web sites I have visited." Is this correct?</summary>

No. Private browsing only avoids saving history and cookies on the local computer; it does not hide the IP address, so the ISP and the visited sites can still track the user's activities. A VPN can be used to hide the IP address.
</details>

<details><summary>7. Jenny receives an email from admin@gmall.com with the subject "Urgent: your account will be suspended if you do not verify" and a "Click here to verify" link. Give three features that make her suspect it is a phishing email.</summary>

The sender's domain gmall.com imitates gmail.com; the subject uses an urgent, threatening tone; the link asks her to verify the account without clearly stating its destination.
</details>

<details><summary>8. A web site requires passwords to have "at least 8 characters". Suggest two other password requirements.</summary>

A mix of uppercase letters, lowercase letters, digits and symbols; must not contain the user name; must not be a common word. (Any two)
</details>

<details><summary>9. [adapted from 2025 P1B 2(a)] Give two reasons why a one-time password is more secure than an ordinary password.</summary>

An OTP is valid only for a short time, so even if intercepted it soon expires; each OTP can be used only once, so an attacker cannot reuse it.
</details>

<details><summary>10. Distinguish authentication from authorisation, with an example of each.</summary>

Authentication confirms the user's identity, such as logging in with a user name and password; authorisation decides which resources a logged-in user can access, such as students being able to view but not change their own results.
</details>

<details><summary>11. Give two disadvantages of symmetric encryption.</summary>

The two sides must exchange the key securely before sending data; communicating with many people means managing many keys.
</details>

<details><summary>12. Ming sends a file to Ting and uses PKI to ensure that (i) the file really came from Ming; (ii) only Ting can open the file. State the keys used in each case.</summary>

(i) Ming digitally signs the file with Ming's private key; Ting verifies it with Ming's public key. (ii) Ming encrypts the file with Ting's public key; Ting decrypts it with Ting's private key.
</details>

<details><summary>13. Which of the following are contained in a digital certificate issued by a CA to Kin? (1) Kin's details (2) Kin's private key (3) Kin's public key (4) the CA's private key (5) the CA's digital signature</summary>

**(1), (3) and (5)**. A digital certificate never contains any private key.
</details>

<details><summary>14. An online bookshop uses HTTPS. (a) What must the bookshop obtain first? (b) Give two roles of SSL in online transactions.</summary>

(a) A digital certificate issued by a certification authority. (b) Encrypts data sent between the browser and the server, such as credit card details; ensures the data is not altered in transit; lets users verify the identity of the web site. (Any two)
</details>
