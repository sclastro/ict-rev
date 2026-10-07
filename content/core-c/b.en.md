## 2.1 Curriculum requirements

Formulate an effective strategy for searching for specific information on the Web by using search engines, and critically analyse the sources of information; identify various graphics, audio and video file formats suitable for web pages, and use plug-ins and players for the multimedia elements found on the Internet; apply various services on the Internet such as file transfer, remote logon, online chat, discussion forum and email; describe the concepts of streaming technology and its applications in voice mail, videoconferencing and webcasting (technical details are not required); value the significance of the development and expansion of the Internet for various activities in society, for instance achieving a smart city with the Internet of Things (IoT) and cloud services.

## 2.2 Search engines and search strategies

A **search engine** is an online service for finding information on the Internet, such as Google and Bing. ⚠ A search engine is not a browser: Chrome and Edge are browsers; Google is a search engine.

| Type | Description | Examples |
|---|---|---|
| General search engine | Searches the whole Web | Google, Bing, Baidu |
| Specialised search engine | Searches only one kind of information | Google Scholar (academic articles), flight comparison sites |
| Meta search engine | Sends a query to several search engines at once and combines the results | Dogpile |

A search engine uses a **web crawler** to visit web pages automatically and collect their content, which an indexer then organises into an index. When a user enters keywords, the search engine finds results in the index and ranks them by relevance, recency, authority of the site, user experience and other factors. Different search engines use different indexes and ranking methods, so the same query gives different results.

**An effective search strategy**

1. Define the information needed.
2. Choose a suitable search engine.
3. Use precise keywords, such as quotation marks for an exact phrase `"Hong Kong smart city"` and a minus sign to exclude a word `apple -phone`.
4. Use advanced search to restrict the language, region, last update date, file type or domain (for example only `.gov.hk`).
5. Evaluate the sources.
6. Refine the keywords according to the results and search again.

**Criteria for evaluating sources**: qualifications of the author or organisation; type of domain (`.gov` and `.edu` are generally more reliable); date of publication or update; whether it can be confirmed by several independent sources; whether it is sponsored content or an advertisement.

⚠ Suggestions to improve search results must be specific and fit the interface shown in the question, such as "click the 'Videos' tab", "add the word 'video' to the keywords" or "use quotation marks for an exact phrase". Features not offered by the interface, or just "use advanced search" or "type more words", earn no marks [adapted from 2019 P1B 2(b)(i)].

## 2.3 Multimedia file formats on web pages

| Category | Format | Suitable use |
|---|---|---|
| Image | JPG | Lossy compression, small files, suitable for photos; no transparency |
| | PNG | Lossless compression, supports transparency (including semi-transparency); suitable for icons and images needing a transparent background |
| | GIF | At most 256 colours; supports simple animation |
| | WebP | Lossy or lossless, supports transparency, smaller files than JPG and PNG |
| | SVG | Vector graphics that do not lose quality when enlarged; suitable for logos and icons |
| Audio | MP3, AAC | Lossy compression, small files, widely supported |
| | WAV | Uncompressed, very large files, not suitable for web pages |
| | FLAC | Lossless compression |
| Video | MP4 | Widely supported, suitable for streaming, played directly by HTML5 |
| | WebM | Designed for the web, efficient compression |

BMP is uncompressed and too large for web pages. If text is turned into an image on a web page, users cannot copy or search that text, and it becomes blurry when enlarged.

For the compression methods and features of each format, see sections 3.10 to 3.12 of [Module A Topic c](../core-a/c.html).

## 2.4 Plug-ins, media players and codecs

| Name | Function |
|---|---|
| Plug-in | A small program that adds functions to a browser, such as displaying content in a certain format |
| Media player | Plays audio and video; can be built into the browser (HTML5 `<audio>` and `<video>`) or a standalone program such as VLC |
| Codec (coder-decoder) | Compresses and decompresses audio or video data; if a computer lacks the required codec, the player cannot play the file |

HTML5 supports multimedia natively, and plug-ins may bring security loopholes, so web pages now rely much less on plug-ins.

Diagnosing problems: if an online video plays in the browser on Computer A but not on Computer B, Computer B's browser most likely lacks the required plug-in or does not support the format; if a downloaded video file plays on Computer B but not on Computer A, Computer A most likely lacks the required codec.

## 2.5 Internet services

**Email**

An email address has the format `user name@domain name`, such as `admin@hkict.com`. The email header includes:

| Field | Purpose |
|---|---|
| To | Main recipients |
| Carbon copy (Cc) | Other recipients; all recipients can see these addresses |
| Blind carbon copy (Bcc) | Other recipients cannot see these addresses; suitable for mass announcements or protecting recipients' privacy |

"Reply" replies only to the sender; "Reply all" replies to the sender and everyone in the To and Cc fields, but not the Bcc recipients. "Forward" sends the email to new recipients, and the original sender is not informed.

To send the same email to 50 people without letting them know each other's identities, put all the addresses in the Bcc field.

> ⚠ **[2025 P1B 3(b)(ii)] Give an advantage of using an attachment over a hyperlink to send the file.**
> ✔ The attached file is not altered after the email has been sent; there is no risk of the link being leaked or of inadequate sharing settings; recipients can always download an attachment, while a hyperlink can become invalid if the owner changes the setting; after the email is downloaded, the attachment can be opened without an Internet connection.
> ✘ Candidates were unclear about the operational differences between the two methods. Performance was only fair.

Advantages of a hyperlink include: no attachment size limit; access permissions can be changed and the file updated after sending.

> ⚠ **[2024 P1B 3(c)] Give two benefits of sending emails in HTML format instead of plain text format.**
> ✔ Text can be formatted (fonts, tables, paragraphs); multimedia elements or hyperlinks can be included.
> ✘ "Attachments can be added", "interactive" and "cross-platform" were not accepted. The two answers must belong to different categories.

**Other Internet services**

| Service | Description |
|---|---|
| File transfer | FTP (client-server model, needing an FTP server, user accounts and permissions; SFTP encrypts the transfer), cloud storage (easy sharing and collaboration), peer-to-peer sharing (such as BitTorrent, with no central server) |
| Remote logon | Logging on to and operating another computer from a distance, such as working from home or technical support |
| Online chat | Real-time exchange of text, images and voice, suitable for instant communication |
| Discussion forum | Organised by topic; users post and reply without being online at the same time; discussions are kept for later reference |
| Social networking | Sharing updates, photos and videos and building personal networks |
| Video conferencing | Needs a web cam, microphone and speakers; software provides screen sharing, text chat, meeting passwords and other features |

[2012 Practice Paper P1B 4(c)] Email access protocols: when the mailbox is very small, POP is preferable because emails are deleted from the server once downloaded to the computer; when students access their mailbox from different computers, IMAP is preferable because emails stay on the server and their status is synchronised across computers. These two protocols are extension material.

## 2.6 Streaming technology

**Streaming** sends audio or video continuously in small parts, so the user plays the downloaded part while the rest is still downloading. The player first stores some content in a **buffer** to make playback smoother.

⚠ Do not write "streaming needs no downloading"; streaming keeps downloading data. The correct idea is "playback can start without waiting for the whole file to be downloaded". [2012 Practice Paper P1A Q25] Streaming lets the video be watched before the file is completely downloaded, but it does not increase the data transfer rate or enhance the video quality.

| Application | Description |
|---|---|
| Voice mail | Recipients can listen to recorded messages at once |
| Video conferencing | Images and voices of both sides are transmitted in real time |
| Webcasting | Live broadcasting of talks, matches or events, such as online lessons |
| Video and music streaming services | Online video platforms, music streaming |

Factors affecting smooth streaming: bandwidth, media format, compression ratio, frame size (resolution), frame rate and the number of simultaneous viewers. The disk capacity of the server is not a major factor.

> ⚠ **[2023 P1B 5(c)] A fitness centre provides livestreamed fitness lessons. (i) A member complains that the streaming of videos is sometimes not smooth, though the bandwidth of his broadband connection is sufficiently large. Why? (ii) The centre decides to record videos of the lessons for members to download. Other than solving the problem in (i), give a benefit of this decision.**
> ✔ (i) There is interference from the environment; too many members view the lessons at the same time and network traffic becomes heavy.
> ✔ (ii) The content can be edited before release; subtitles can be inserted; members can watch at any time or multiple times; videos can be watched offline.
> ✘ "Members can choose the lessons they want" and "members can watch with friends later" were not accepted.

## 2.7 Development and impact of the Internet

| Development | Description |
|---|---|
| Internet of Things (IoT) | Everyday devices are fitted with sensors and network interfaces to collect and exchange data over the Internet, such as smart homes, wearable devices and smart agriculture. The devices need IP addresses |
| Cloud services | Computing resources provided over the Internet: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS, such as online office software). Advantages: access anytime and anywhere, easy to scale, no need to maintain hardware |
| Smart city | Combines IoT, cloud services and data to improve city life, such as traffic sensors, smart lampposts, "iAM Smart", the Faster Payment System and open data |
| E-commerce | Buying, selling and paying online |
| Web 3.0 | Emphasises the semantic web, decentralisation and blockchain; extension material |

> ⚠ **[2025 P1A Q21] What is the correct order of the steps for a common e-commerce activity?**
> ✔ Collect the customer's product choices → collect and validate the credit card information → record the transaction and payment details in a database → provide a transaction number to the customer → deliver the product (65% correct).

> ⚠ **[2023 P1B 4(b)] David considers changing the toy shop from a physical shop to an online shop. State a benefit and a drawback of this change and explain briefly.**
> ✔ Benefit: access to worldwide markets, and customers can shop at any time. Drawback: no face-to-face interaction; additional cost of building a web server.
> ✘ "No theft", "attracts more customers" (without a reason) and "security must be considered" (a physical shop also has security issues) were not accepted. The HKEAA reminded candidates to focus on the consequences of the change.

## 2.8 Self-test

<details><summary>1. Ming says, "I use the search engine Chrome to find information." Point out his mistake.</summary>

Chrome is a browser, not a search engine. Google and Bing are search engines.
</details>

<details><summary>2. Suggest two advanced search features for finding "IoT developments in Singapore after 2020".</summary>

Restrict the region to Singapore; restrict the publication date to after 2020; use quotation marks for an exact phrase. (Any two)
</details>

<details><summary>3. After collecting information, give two criteria for judging whether a source is credible.</summary>

Qualifications of the author or organisation; type of domain; date of publication or update; whether it can be confirmed by several sources. (Any two)
</details>

<details><summary>4. A web site needs to show a school logo with a transparent background that stays sharp when enlarged. Which image format should be used? Why?</summary>

SVG. It is a vector graphic that does not lose quality when enlarged, and it supports a transparent background.
</details>

<details><summary>5. A downloaded video file plays on Computer B but not on Computer A. What does Computer A most likely lack?</summary>

The codec needed to play the video.
</details>

<details><summary>6. Mr Chan sends an email: To Ms Lee, Cc Mr Cheung, Bcc Ms Lam. Who knows that Ms Lam also received the email?</summary>

Only Mr Chan (the sender) and Ms Lam herself. Ms Lee and Mr Cheung cannot see the addresses in the Bcc field.
</details>

<details><summary>7. Give two benefits of using a cloud storage sharing link instead of an email attachment.</summary>

No email attachment size limit; access permissions can be changed and the file updated after sending; recipients do not need to keep a large file in their mailbox. (Any two)
</details>

<details><summary>8. "Streaming technology lets users watch videos without downloading." What is wrong with this statement? How should it be rewritten?</summary>

Streaming keeps downloading data. Rewrite it as: "Streaming lets users play the downloaded part while the rest is still downloading, without waiting for the whole file to be downloaded."
</details>

<details><summary>9. Other than bandwidth, give two technical factors affecting smooth video streaming.</summary>

Media format; compression ratio; frame size (resolution); frame rate. (Any two)
</details>

<details><summary>10. [adapted from 2025 P1A Q21] Put the following e-commerce steps in order: (1) deliver the product (2) provide a transaction number (3) collect the customer's purchase details (4) collect and validate the payment information (5) store the transaction record in a database</summary>

(3) → (4) → (5) → (2) → (1).
</details>
