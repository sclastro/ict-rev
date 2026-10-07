## 3.1 Curriculum requirements

Recognise the basic constructs of Hypertext Markup Language (HTML), which is a means to address cross-platform issues; discuss the organisation of web pages for an intended audience and upload them onto the World Wide Web. The organisation of information in web pages includes ease of navigation, appropriate placement of links, tables, frames and multimedia elements, colour combinations, background design, and font size and style. Students are not required to memorise HTML codes, but they should be able to read common tags and analyse web page designs in context.

## 3.2 Features of HTML

**HTML (Hypertext Markup Language)** uses **tags** to describe the structure and content of a web page, such as where the headings, paragraphs, images and hyperlinks are. "Hypertext" means text that links to other documents.

| Feature | Description |
|---|---|
| Markup language | HTML only describes the structure of content; it has no logic such as calculation, decision or repetition, so it is **not a programming language** |
| Plain text | An HTML file consists of plain text and can be opened and edited with any text editor |
| Cross-platform | It uses standardised tags, so browsers on different operating systems and devices can interpret and display it |
| Multimedia and formatting | Images, audio, video, hyperlinks and tables can be added, and text can be formatted |

> ⚠ **[2025 P1A Q22] Which of the following statements about HTML are correct? (1) It is a programming language. (2) An HTML file consists of plain text. (3) It is cross-platform.**
> ✔ **(2) and (3)**; only 38% of candidates answered correctly. HTML is a markup language, not a programming language.

TXT files are also cross-platform, so when comparing HTML with TXT, the advantages of HTML to write are "supports multimedia and hyperlinks" and "allows text formatting", not "cross-platform".

Three technologies for building web pages:

| Technology | Role |
|---|---|
| HTML | Content and structure of the web page |
| CSS | Appearance of the web page, such as colours, fonts and layout |
| JavaScript | Interactive functions, such as checking form input (covered in Elective B) |

## 3.3 Basic structure of an HTML document

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Heung Shing College</title>
</head>
<body>
  <!-- Page content starts here -->
  <h1>Welcome</h1>
  <p>Our school was founded in <b>1975</b>.</p>
</body>
</html>
```

| Part | Role |
|---|---|
| `<!DOCTYPE html>` | Tells the browser that this is an HTML5 document so that it displays the page correctly |
| `<html lang="en">` | The root element of the document; the `lang` attribute states the language of the page, which helps screen readers and search engines |
| `<head>` | Holds information about the page that is not shown in the page content, such as `<meta>` (metadata such as the character set) and `<title>` (the title on the browser tab) |
| `<body>` | The content displayed on the page |
| `<!-- -->` | A comment, not displayed by the browser |

**Rules for tags and attributes**

- Most tags come in pairs, such as `<p>` and `</p>`; a few have no end tag, such as `<br>`, `<img>` and `<hr>`.
- **Attributes** are written in the start tag to give extra information, such as `<img src="logo.png" width="200">`. A tag can have no attributes, and the order of attributes does not affect the display.
- Tag names are not case-sensitive: `<P>` and `<p>` have the same effect.
- Tags can be nested but must be closed in order: `<b><i>text</i></b>` and `<i><b>text</b></i>` display the same result.

## 3.4 Common tags

| Tag | Role |
|---|---|
| `<h1>` to `<h6>` | Headings; `<h1>` is the largest |
| `<p>` | Paragraph |
| `<br>` | Line break |
| `<b>`, `<i>`, `<u>` | Bold, italic, underline |
| `<strong>`, `<em>` | Emphasis (usually shown as bold and italic) |
| `<sup>`, `<sub>`, `<small>` | Superscript, subscript, smaller text |
| `<hr>` | Horizontal line |
| `<div>` | Divides content into blocks for layout |
| `<img>` | Image |
| `<a href="...">` | Hyperlink |
| `<ul>`, `<ol>`, `<li>` | Unordered list, ordered list, list item |
| `<table>`, `<tr>`, `<th>`, `<td>` | Table, row, header cell, data cell |
| `<audio>`, `<video>` | Audio and video (HTML5); the `controls` attribute shows playback controls |
| `<iframe>` | Embeds another web page or content in the page, such as a map or a video |

The old `<frameset>` frames are no longer used; layouts are now built with `<div>` and CSS, or with `<iframe>`.

**Code-reading practice**

```html
<table border="1">
  <tr><th>Class</th><th>Students</th></tr>
  <tr><td>5A</td><td>32</td></tr>
</table>
<a href="notice.pdf">Download notice</a>
<img src="images/hall.jpg" width="400" height="300" alt="School hall">
```

This code displays a bordered table with two rows and two columns, the first row being the header; a hyperlink to `notice.pdf`; and `hall.jpg` from the `images` folder, displayed at 400 × 300 pixels, with the alternative text "School hall" shown if the image cannot be displayed.

## 3.5 Images on web pages

Common attributes of `<img>`:

| Attribute | Role |
|---|---|
| `src` | Location of the image file (required) |
| `width`, `height` | Displayed width and height |
| `alt` | Alternative text |

**Display size and file size**

Changing `width` and `height` in HTML changes only the **display size** of the image in the browser. The browser still downloads the original image file, so the file size and download time stay the same. To shorten the download time, use image editing software to reduce the resolution or raise the compression ratio, and save the image as a new file.

> ⚠ **[2025 P1B 4(a)] Mary's company web site shows a photo with an original resolution of 800 × 600. She changes the HTML code to make the displayed size 400 × 200. (i) Will the download time of the photo be shorter? (ii) Will the photo displayed be distorted?**
> ✔ (i) No, the same photo file will be downloaded.
> ✔ (ii) Yes, because the aspect ratio has been changed from 4:3 to 2:1.
> ✘ Performance was poor. The HKEAA found that candidates could not distinguish display size from file size, and only a few could describe the effect of changing the aspect ratio.

To keep the aspect ratio, change one side and calculate the other in proportion. For example, if a 1024 × 768 image is to be displayed 500 pixels wide, its height should be 768 × 500 ÷ 1024 = **375** pixels.

**Roles of alternative text (alt)**

- Shows text describing the image when the image cannot be displayed.
- Screen readers read it to visually impaired users, improving accessibility.
- Helps search engines understand the image, which benefits search ranking.

**Reasons an image is not displayed**

> ⚠ **[2025 P1A Q23] A web page cannot display an image in a browser. What is/are the possible reason(s) for this? (1) The resolution of the image is lower than that of the screen display. (2) The image file is stored in the wrong directory. (3) The operating system of the web server is different from that of the browser.**
> ✔ **(2) only** (58% correct). Resolution does not affect whether the image can be shown; HTML is cross-platform, so different operating systems do not matter.

Other reasons: the file name or path in `src` is misspelt; `src` points to a local path (such as `C:\photos\a.jpg`) that other computers cannot find after uploading; the image file was not uploaded or has been deleted; the server storing the image is down; the file format is not supported by the browser.

## 3.6 Hyperlinks and paths

| Form | Example | Description |
|---|---|---|
| Absolute URL | `<a href="https://www.edb.gov.hk/">` | Links to a resource on another web site |
| Relative path | `<a href="info/notice.html">` | Links to a file on the same web site, starting from the folder of the current page |
| Same-page location | `<a href="#contact">` | Jumps to the element with `id="contact"` on the same page |
| Email | `<a href="mailto:info@abc.edu.hk">` | Opens the email program with the recipient filled in |

Use relative paths for files on the same web site: the addresses are shorter, and the links need no change if the site moves to another domain or server. Absolute URLs are needed only for resources of other organisations.

**Files downloaded when a page is opened**

When a page is opened, the browser downloads the HTML file and the images, audio and video displayed directly on the page; HTML only refers to the multimedia files and does not store them inside the HTML file. Files behind hyperlinks and `mailto` links are downloaded or opened only when the user clicks them. If the same image comes from two different URLs, the browser treats them as two files and downloads both.

## 3.7 Organisation of web pages

Web design starts with the **intended audience**: elderly users need larger fonts and simple navigation, while a children's site may use more pictures and bright colours.

| Area | Design points |
|---|---|
| Navigation | A navigation menu in the same position on every page; hierarchical menus; a site map (showing the structure of the whole site); breadcrumb navigation (showing the current location and making it easy to go back up); a search function |
| Links | Placed in prominent and consistent positions, with link text that clearly describes the destination |
| Layout | Common frames are the header (logo, menu), navigation area, main content and footer (copyright, contact information, privacy policy); tables organise data |
| Multimedia | Keep file sizes small to avoid slow loading; avoid auto-playing sound; provide playback controls |
| Colour and background | Enough contrast between text and background; simple backgrounds that do not hinder reading; consistent colour scheme across the site |
| Font | Suitable size, legible style, consistent across the site |
| Accessibility | Alternative text for images; options to change font size and language |
| Responsive design | The layout adjusts automatically to the screen size so that the site is easy to use on phones, tablets and computers |

[2024 P1A Q26] When developing a web site for friends to browse, Greg should be concerned about the file sizes of multimedia elements and the user-friendliness of the web pages; the storage capacity of his friends' computers is irrelevant (76% correct).

**Input interfaces**

Using drop-down lists, radio buttons or check boxes instead of text boxes reduces input time and input errors and keeps the input format consistent. [adapted from 2025 Mock P1A Q25] Using check boxes for users to choose their hobbies reduces input time, reduces the chance of input errors and allows multiple choices.

> ⚠ **[2024 P1B 3(d)(i)] Ada develops an online system for students to view examination papers in PDF format; students input a subject and a year to select a past paper. Redesign the layout of the web page to improve the user-friendliness of selecting a past paper, navigating PDF documents and viewing PDF documents. Annotate your design.**
> ✔ Selecting: drop-down menus for subject and year. Navigating: page navigation, thumbnails or a search feature. Viewing: zoom in/out or a full-screen feature.
> ✘ Keeping the original vertical navigation bar earned no mark. The HKEAA noted that some candidates mixed up "navigating" (moving between pages) and "viewing" (seeing the content clearly).

## 3.8 Uploading web pages to the World Wide Web

1. **Create the web pages**: complete the HTML files and the images and multimedia files needed; the home page is usually named `index.html`.
2. **Choose a web hosting service**: rent server space from a web hosting provider, or set up a web server.
3. **Register a domain name**: and create a DNS record pointing the domain name to the IP address of the web server.
4. **Upload the files**: with an FTP client (which needs the server address, user name and password; SFTP encrypts the transfer) or the hosting service's control panel.
5. **Test**: check for broken links and test with different browsers and devices.

To use HTTPS, the site also needs a digital certificate from a certification authority; see section 4.12 of [Topic d](d.html).

Entering `https://www.floraworld.com.hk/` and `https://www.floraworld.com.hk/index.html` shows the same page because the web server has set `index.html` as the default page of that folder.

If hyperlinks work when tested locally but fail after uploading, possible reasons are: the links use absolute local paths; some files were not uploaded; the letter case of file names on the server differs from the links.

## 3.9 Self-test

<details><summary>1. Someone says, "HTML is a programming language, so it can only be used on Windows." Point out two mistakes.</summary>

HTML is a markup language, not a programming language; it has no logic such as calculation or decision. An HTML file is plain text with standardised tags, so it is cross-platform and can be displayed by browsers on different operating systems.
</details>

<details><summary>2. Comparing HTML with TXT, give two reasons for using HTML to create web pages.</summary>

HTML supports multimedia elements such as images and audio, and hyperlinks; HTML allows text formatting and layout. Do not write "cross-platform", because TXT is also cross-platform.
</details>

<details><summary>3. Name two common tags in the &lt;head&gt; section and state their roles.</summary>

`<title>`: sets the title shown on the browser tab. `<meta>`: provides metadata about the page, such as the character set UTF-8.
</details>

<details><summary>4. A 1200 × 900 photo on a web page is given width="300" height="225" in HTML. (a) Will the download time be shorter? (b) Will the photo be distorted?</summary>

(a) No. The browser still downloads the original 1200 × 900 file and only displays it smaller. (b) No. Both 1200 : 900 and 300 : 225 are 4 : 3, so the aspect ratio is unchanged.
</details>

<details><summary>5. Give two roles of alternative text.</summary>

It describes the image in text when the image cannot be displayed; screen readers can read it aloud for visually impaired users; it helps search engines understand the image. (Any two)
</details>

<details><summary>6. A web page shows a logo with &lt;img src="C:\photos\logo.png"&gt;. It works on the designer's computer, but others cannot see it after uploading. Why? How should it be fixed?</summary>

`src` points to a local path on the designer's computer, and other computers do not have this file. Upload the image to the web server as well and use a relative path, such as `src="images/logo.png"`.
</details>

<details><summary>7. A web page has two identical images from different URLs, a link that plays song.mp3 only when clicked, and a mailto link. At least how many files does the browser download when the page is opened?</summary>

**3**: the HTML file and the two image files. song.mp3 is downloaded only when clicked; a mailto link involves no download.
</details>

<details><summary>8. Give three design considerations for a community centre web site for elderly users.</summary>

Larger fonts with an option to change the font size; enough contrast between text and background; simple, consistent navigation with menus in a fixed position; important functions placed prominently. (Any three)
</details>
