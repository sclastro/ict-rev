## 3.1 Curriculum requirements

Be aware of the different types of relationships among entities in a relational database; analyse simple scenarios in business, education or other fields and create simple ER diagrams involving binary relationships only in designing databases, including the resolution of a many-to-many relationship into multiple one-to-many relationships; explain the concept of data redundancy and discuss the methods used to reduce it, reducing data redundancy through normalisation up to Third Normal Form; describe the needs and procedures of denormalisation; transform ER diagrams to tables in relational databases; use access rights to achieve data privacy.

## 3.2 Relationships among entities

A **binary relationship** is a relationship between two entities; the curriculum requires binary relationships only. By the maximum number of instances on each side (the **cardinality**), there are three types:

| Relationship | Meaning | Example |
|---|---|---|
| One-to-one (1:1) | Each instance of A is related to at most one instance of B, and vice versa | Each student is allocated at most one locker, and each locker is allocated to at most one student |
| One-to-many (1:M) | One instance of A may be related to many instances of B, but each instance of B is related to at most one instance of A | A teacher is the class teacher of many students; each student has only one class teacher |
| Many-to-many (M:N) | One instance of A may be related to many instances of B, and vice versa | A student may join many clubs; a club has many students |

The type of relationship depends on the rules of the scenario. For "students join clubs", it is one-to-many if the school allows each student to join only one club, and many-to-many if students may join several. Decide from the description in the question, not from your own assumptions.

## 3.3 ER diagram symbols

An **entity-relationship diagram** (ER diagram) shows entities, attributes and the relationships among entities as a picture. It lets designers plan the structure of the data before creating tables, and find omissions or ambiguities early. The symbols set by the HKEAA are printed at the end of the Paper 2 question book:

<figure class="erd">
<svg viewBox="0 0 660 300" role="img" aria-label="ER diagram symbols"><text class="lab" x="12" y="45">Entity</text><rect class="shape" x="132" y="18" width="116" height="44"/><text x="190" y="45">Entity</text><text class="lab" x="12" y="117">Attribute</text><ellipse class="shape" cx="190" cy="112" rx="56" ry="20"/><text x="190" y="117">Attribute</text><text class="lab" x="12" y="189">Key attribute</text><ellipse class="shape" cx="190" cy="184" rx="56" ry="20"/><text x="190" y="189">Attribute</text><line class="link" x1="155" y1="193" x2="225" y2="193"/><text class="lab" x="12" y="261">Relationship</text><polygon class="shape" points="134,256 190,226 246,256 190,286"/><text x="190" y="261" class="small">Relationship</text><text class="lab" x="300" y="45">One-to-one</text><line class="link" x1="412" y1="40" x2="642" y2="40"/><polygon class="shape" points="465,40 521,13 577,40 521,67"/><text x="521" y="45" class="small">Relationship</text><text class="card" x="437" y="32">1</text><text class="card" x="612" y="32">1</text><text class="lab" x="300" y="117">One-to-many</text><line class="link" x1="412" y1="112" x2="642" y2="112"/><polygon class="shape" points="465,112 521,85 577,112 521,139"/><text x="521" y="117" class="small">Relationship</text><text class="card" x="437" y="104">1</text><text class="card" x="612" y="104">M</text><text class="lab" x="300" y="189">Many-to-many</text><line class="link" x1="412" y1="184" x2="642" y2="184"/><polygon class="shape" points="465,184 521,157 577,184 521,211"/><text x="521" y="189" class="small">Relationship</text><text class="card" x="437" y="176">M</text><text class="card" x="612" y="176">N</text><text class="lab" x="300" y="261">Participation</text><line class="link" x1="412" y1="256" x2="642" y2="256"/><polygon class="shape" points="465,256 521,229 577,256 521,283"/><text x="521" y="261" class="small">Relationship</text><line class="mark" x1="432" y1="247" x2="432" y2="265"/><circle class="shape" cx="615" cy="256" r="6.5"/><line class="link" x1="282" y1="10" x2="282" y2="290" stroke-dasharray="3 4"/></svg>
<figcaption>ER diagram symbols printed at the end of the HKEAA paper (redrawn). Participation: "|" on the mandatory side, "O" on the optional side.</figcaption>
</figure>

- An entity is a rectangle, usually named with a noun, such as "Student" or "Order".
- A relationship is a diamond, usually named with a verb, such as "joins" or "submits".
- An attribute is an ellipse joined to its entity by a line; a key attribute (the primary key) is underlined. Questions usually state that it is not necessary to draw attributes.
- At the entity end of every line, write the **cardinality** (1, M or N) and the **participation constraint** ("|" or "O").

## 3.4 Reading participation and cardinality

The **participation constraint** gives the minimum: "|" means mandatory participation, at least one; "O" means optional participation, possibly zero. The **cardinality** gives the maximum: 1 means at most one; M or N means possibly more than one.

**Key to reading**: the symbols written beside entity X tell you "for **each** instance of the other entity, how many X".

<figure class="erd">
<svg viewBox="0 0 640 120" role="img" aria-label="ER diagram of members submitting complaints"><line class="link" x1="502" y1="60" x2="376" y2="60"/><line class="link" x1="138" y1="60" x2="264" y2="60"/><rect class="shape" x="22" y="38" width="116" height="44"/><text x="80" y="65">Member</text><polygon class="shape" points="264,60 320,30 376,60 320,90"/><text x="320" y="65">submits</text><rect class="shape" x="502" y="38" width="116" height="44"/><text x="560" y="65">Complaint</text><line class="mark" x1="154" y1="69" x2="154" y2="51"/><text class="card" x="160" y="49">1</text><circle class="shape" cx="482" cy="60" r="6.5"/><text class="card" x="480" y="49">M</text></svg>
<figcaption>"1" and "|" beside Member: each complaint is submitted by <strong>exactly one</strong> member. "M" and "O" beside Complaint: each member submits <strong>zero or more</strong> complaints.</figcaption>
</figure>

| Question | Symbols to look at | Meaning |
|---|---|---|
| How many members for each complaint? | 1 and \| beside Member | Exactly one (at least one, at most one) |
| How many complaints for each member? | M and O beside Complaint | Zero or more |

The four combinations of symbols:

| Symbols beside entity X | Number of X for each instance of the other entity |
|---|---|
| 1 and \| | Exactly one |
| 1 and O | Zero or one |
| M and \| | One or more |
| M and O | Zero or more |

Translate the question sentence by sentence: "each complaint is submitted by one member" decides the symbols beside Member; "a member may have no complaints" decides the symbols beside Complaint.

> ⚠ **[2025 P2A 1(a)] A mobile application lets members upload and share photos; the database stores members, photos and comments. Members may give zero or more comments on any photo; each photo has zero or more comments. The partial ER diagram "Members 1| — submit — MO Photos" is given; complete the diagram with Comments.**
> ✔ Add two relationships: Members 1| — "give" — MO Comments; Photos 1| — "belong to" — MO Comments. Each comment is given by one member and belongs to one photo, so 1 and | go beside Members and Photos; members and photos may have no comments, so M and O go beside Comments in both relationships.
> ✘ The HKEAA reported that weaker candidates were unable to provide the minimal cardinalities. The marking principles also reject missing ER diagram relationships.

> ⚠ **[2024 P2A 3(a)] A cinema company's database stores members, bookings, shows and cinemas: each booking is for one show; each show may or may not have bookings; each cinema must have at least one show.**
> ✔ Booking MO — "reserves" — 1| Show; Show M| — "plays" — Cinema (M or 1 accepted beside Cinema, with |). "Each show may or may not have bookings" decides the O beside Booking; "each cinema must have at least one show" decides the | beside Show.
> ✘ The HKEAA reported that weaker candidates failed to provide the correct minimal cardinalities.

> ⚠ **[2023 P2A 3(b)] In a clinic, each doctor has one to three nurses to work with; each nurse works with one doctor or without any doctor; each patient and each doctor have at least one record in VREC.**
> ✔ Doctor 1O — "work" — M| Nurse: M and | beside Nurse mean each doctor has one or more nurses; 1 and O beside Doctor mean each nurse has zero or one doctor. Doctor 1| — VREC M|; Patient 1| — VREC M|.
> ✘ The HKEAA reported that weaker candidates provided incorrect minimal cardinalities.

## 3.5 Drawing an ER diagram from a scenario

**Steps**

1. Find the nouns in the scenario to decide the entities (they are usually given).
2. Find the associations between entities and name each relationship with a verb.
3. For each relationship, ask in both directions: "For each A, how many B?" and "For each B, how many A?"
4. Write the maximum as the cardinality and the minimum as the participation constraint, beside the entity being counted.
5. Check that both ends of every relationship have a cardinality and a participation constraint, and that no relationship in the description is missing.

**Example**: a clubhouse booking system records residents, bookings and facilities. Each booking is made by one resident, and a resident may have no bookings; each booking involves only one facility, and some facilities have not been booked.

<figure class="erd">
<svg viewBox="0 0 640 300" role="img" aria-label="ER diagram of residents, bookings and facilities"><line class="link" x1="560" y1="238" x2="560" y2="195"/><line class="link" x1="560" y1="82" x2="560" y2="135"/><line class="link" x1="502" y1="60" x2="376" y2="60"/><line class="link" x1="138" y1="60" x2="264" y2="60"/><rect class="shape" x="22" y="38" width="116" height="44"/><text x="80" y="65">Resident</text><polygon class="shape" points="264,60 320,30 376,60 320,90"/><text x="320" y="65">makes</text><rect class="shape" x="502" y="38" width="116" height="44"/><text x="560" y="65">Booking</text><polygon class="shape" points="504,165 560,135 616,165 560,195"/><text x="560" y="170">involves</text><rect class="shape" x="502" y="238" width="116" height="44"/><text x="560" y="265">Facility</text><line class="mark" x1="154" y1="69" x2="154" y2="51"/><text class="card" x="160" y="49">1</text><circle class="shape" cx="482" cy="60" r="6.5"/><text class="card" x="480" y="49">M</text><circle class="shape" cx="560" cy="102" r="6.5"/><text class="card" x="544" y="109">M</text><line class="mark" x1="569" y1="222" x2="551" y2="222"/><text class="card" x="544" y="221">1</text></svg>
<figcaption>ER diagram of the clubhouse booking system: Resident to Booking is one-to-many; Booking to Facility is many-to-one.</figcaption>
</figure>

| Question | Answer | Symbols (beside the entity being counted) |
|---|---|---|
| How many residents make each booking? | Exactly one | Beside Resident: 1, \| |
| How many bookings does each resident make? | Zero or more | Beside Booking: M, O |
| How many facilities does each booking involve? | Exactly one | Beside Facility: 1, \| |
| How many bookings does each facility have? | Zero or more | Beside Booking: M, O |

## 3.6 Resolving many-to-many relationships

A relational database cannot represent a many-to-many relationship directly: whichever side the foreign key is placed in, each record would have to store several values. An **associative entity** is therefore added to resolve the many-to-many relationship into two one-to-many relationships. The associative entity is usually named after the original relationship, for example "joins" becomes "Membership" and "orders" becomes "Order item".

<figure class="erd">
<svg viewBox="0 0 640 120" role="img" aria-label="Many-to-many relationship between students and clubs"><line class="link" x1="502" y1="60" x2="376" y2="60"/><line class="link" x1="138" y1="60" x2="264" y2="60"/><rect class="shape" x="22" y="38" width="116" height="44"/><text x="80" y="65">Student</text><polygon class="shape" points="264,60 320,30 376,60 320,90"/><text x="320" y="65">joins</text><rect class="shape" x="502" y="38" width="116" height="44"/><text x="560" y="65">Club</text><line class="mark" x1="154" y1="69" x2="154" y2="51"/><text class="card" x="160" y="49">M</text><circle class="shape" cx="482" cy="60" r="6.5"/><text class="card" x="480" y="49">N</text></svg>
<figcaption>Before resolution: each student joins zero or more clubs (N and O beside Club); each club has at least one student (M and | beside Student).</figcaption>
</figure>

<figure class="erd">
<svg viewBox="0 0 660 300" role="img" aria-label="ER diagram after resolution"><line class="link" x1="585" y1="238" x2="585" y2="195"/><line class="link" x1="585" y1="82" x2="585" y2="135"/><line class="link" x1="527" y1="60" x2="386" y2="60"/><line class="link" x1="133" y1="60" x2="274" y2="60"/><rect class="shape" x="17" y="38" width="116" height="44"/><text x="75" y="65">Student</text><polygon class="shape" points="274,60 330,30 386,60 330,90"/><text x="330" y="65">has</text><rect class="shape" x="527" y="38" width="116" height="44"/><text x="585" y="65">Membership</text><polygon class="shape" points="529,165 585,135 641,165 585,195"/><text x="585" y="170" class="small">belongs to</text><rect class="shape" x="527" y="238" width="116" height="44"/><text x="585" y="265">Club</text><line class="mark" x1="149" y1="69" x2="149" y2="51"/><text class="card" x="155" y="49">1</text><circle class="shape" cx="507" cy="60" r="6.5"/><text class="card" x="505" y="49">M</text><line class="mark" x1="576" y1="98" x2="594" y2="98"/><text class="card" x="569" y="109">M</text><line class="mark" x1="594" y1="222" x2="576" y2="222"/><text class="card" x="569" y="221">1</text></svg>
<figcaption>After resolution: both original entities have "1" and "|" beside them. The "O" that was beside Club moves to the "has" side of Membership; the "|" that was beside Student moves to the "belongs to" side.</figcaption>
</figure>

**Steps of resolution**

1. Replace the original diamond with the new associative entity, linked to the two original entities by two new relationships; name the new entity and relationships.
2. Both new relationships are one-to-many: write 1 beside the original entities and M beside the associative entity.
3. Both original entities get "|": each membership record belongs to exactly one student and exactly one club.
4. Swap the original participation constraints and place them beside the associative entity: the O that was beside Club (a student need not join any club) moves to the Student—has—Membership side; the | that was beside Student (each club has at least one student) moves to the Membership—belongs to—Club side.

**Check**: read the resolved diagram sentence by sentence; the meaning should be the same as before. "Each student has zero or more memberships" means a student need not join any club; "each club has one or more memberships" means each club has at least one student.

Attributes of the relationship itself (such as the student's post in the club or the joining date) become attributes of the associative entity after resolution.

## 3.7 Data redundancy, data anomalies and derived attributes

**Data redundancy** means the same data are stored more than once in a database. Redundancy wastes storage space; worse, updates easily make the data inconsistent, causing three kinds of **data anomaly**:

**Example**: a tutorial centre records enrolments in one table

| SID | SNAME | CCODE | CNAME | TID | TNAME |
|---|---|---|---|---|---|
| S01 | Chan Hiu Ming | C1 | Chinese Writing | T1 | Mr Lam |
| S01 | Chan Hiu Ming | C2 | English Speaking | T2 | Ms Cheung |
| S02 | Li Ka Kei | C1 | Chinese Writing | T1 | Mr Lam |

| Anomaly | Meaning | Example |
|---|---|---|
| Insertion anomaly | New data cannot be stored unless other, unrelated data are entered as well | A new course with no enrolments yet cannot be recorded with its name and tutor |
| Update anomaly | The same data are stored in several records; updating only some of them makes the data inconsistent | When "Chinese Writing" is renamed, every record of the course must be changed; missing one leaves two names |
| Deletion anomaly | Deleting a record also loses other useful data | Chan Hiu Ming drops English Speaking and the record is deleted; as the only student of that course, the course and Ms Cheung's details disappear too |

**Reducing data redundancy**: split the table into several related tables so that each item of data is stored only once, and link them with primary and foreign keys. This process is **normalisation**; see section 3.9.

> ⚠ **[2024 P2A 2(a)(iii)] The table ENROL records enrolment details of courses (CCODE, CNAME, CYEAR, TEACHER) and students (SID, SNAME, MOBILE). Describe an example of data redundancy in ENROL.**
> ✔ CNAME is repeated for students enrolled in the same course, such as CS1001 and CS1003; or SNAME and MOBILE are repeated for students enrolled in more than one course. State which field is repeated and in what situation.
> ✘ The HKEAA reported that about half of the candidates had difficulties in explaining the data redundancy in ENROL.

A **derived attribute** is one that can be calculated from other attributes, such as age from date of birth, or the order total from unit price times quantity.

| | Explanation |
|---|---|
| Drawbacks of storing a derived attribute | Extra storage space; it must be updated whenever the original data change, otherwise the data become inconsistent (age, for instance, must be updated every year) |
| Benefit of storing a derived attribute | It need not be calculated each time it is needed, so queries are faster |

> ⚠ **[2023 P2A 3(a)] PATIENT has PID, HKID, BDATE (date of birth) and NOOFVISIT (number of visits); VREC records each visit. Which field can be regarded as a derived attribute? State a benefit of using a derived attribute.**
> ✔ NOOFVISIT: it can be calculated from the number of the patient's records in VREC. Benefit: there is no need to calculate the number of visits in real time.
> ✘ The HKEAA reported that weaker candidates incorrectly identified HKID as a derived attribute.

[Sample Paper P2 Section A 3] STAFF stores both DOB and AGE. AGE is a derived attribute because it can be calculated from DOB; the disadvantages of using it include more storage space, higher cost of updating and possible data inconsistency.

## 3.8 Functional dependency

If knowing the value of field A determines the value of field B, then B is **functionally dependent** on A, written A → B (B depends on A, or A determines B). In the enrolment table in section 3.7:

- SID → SNAME (the student ID determines the student name)
- CCODE → CNAME, TID (the course code determines the course name and the tutor ID)
- TID → TNAME (the tutor ID determines the tutor name)

Dependencies must be decided from the rules stated in the question, not just from the sample records. For example, CCODE → TID holds only if the question states that each course is taught by one tutor only.

> ✔ **[2023 P2A 4(a)]** The ticket table TINFO has movie ID MID, movie name MNAME, show time MTIME, cinema ID CID, cinema type CTYPE, number of seats TN and seat number SNO. MNAME depends on MID; CTYPE and TN depend on CID. The HKEAA rated this "Excellent".

[2024 P2A 2(a)(ii)] The two fields in ENROL that depend on SID only are SNAME and MOBILE; a very high proportion of candidates answered correctly.

## 3.9 Normalisation

**Normalisation** is the step-by-step splitting of tables to reduce data redundancy and avoid data anomalies. The curriculum requires normalisation up to Third Normal Form.

| Normal form | Condition | Method |
|---|---|---|
| First Normal Form (1NF) | Each field holds one indivisible (atomic) value; no repeating groups | Split several values in one cell, or repeated fields (such as Course1, Course2, Course3), into separate records; choose a primary key |
| Second Normal Form (2NF) | In 1NF; every non-key field depends on the **whole** primary key, with no **partial dependency** | Move fields that depend on only part of a composite key, together with that part, to a new table |
| Third Normal Form (3NF) | In 2NF; no non-key field depends on another non-key field, with no **transitive dependency** | Move fields that depend on another non-key field, together with that field, to a new table |

A partial dependency can occur only when the primary key is composite; a table in 1NF whose primary key is a single field is already in 2NF.

**Complete example**: the enrolment form of a tutorial centre. Each student may enrol in several courses; each course is taught by one tutor only.

**Unnormalised**: one row per student, with the courses as a repeating group.

| SID | SNAME | CLASS | Course1 | Course1 name | Tutor1 | Course2 | Course2 name | Tutor2 |
|---|---|---|---|---|---|---|---|---|
| S01 | Chan Hiu Ming | 4A | C1 | Chinese Writing | T1 Mr Lam | C2 | English Speaking | T2 Ms Cheung |

**First Normal Form**: one row per enrolment, one value per cell, with the tutor split into an ID and a name. The registration date RDATE belongs to each enrolment.

ENROL(<u>SID</u>, <u>CCODE</u>, SNAME, CLASS, CNAME, TID, TNAME, RDATE)　Primary key: SID + CCODE

**Second Normal Form**: find the partial dependencies. SNAME and CLASS depend on SID only; CNAME, TID and TNAME depend on CCODE only; only RDATE depends on the whole primary key.

- STUDENT(<u>SID</u>, SNAME, CLASS)
- COURSE(<u>CCODE</u>, CNAME, TID, TNAME)
- ENROL(<u>SID</u>, <u>CCODE</u>, RDATE)　Foreign keys: SID references SID of STUDENT; CCODE references CCODE of COURSE

**Third Normal Form**: in COURSE, TNAME depends on the non-key field TID (CCODE → TID → TNAME), a transitive dependency.

- STUDENT(<u>SID</u>, SNAME, CLASS)
- COURSE(<u>CCODE</u>, CNAME, TID)　Foreign key: TID references TID of TUTOR
- TUTOR(<u>TID</u>, TNAME)
- ENROL(<u>SID</u>, <u>CCODE</u>, RDATE)　Foreign keys: SID references SID of STUDENT; CCODE references CCODE of COURSE

After normalisation, a new course with no enrolments can be recorded in COURSE; renaming a tutor changes only one record in TUTOR; when a student drops out, only the ENROL record is deleted and the course and tutor details remain.

**Format of a database schema**: following HKEAA questions, write "TABLE(field1, field2, …)" with the primary key underlined, or state "Primary key:" and "Foreign key: … references … of …" separately; write "N/A" where not applicable.

> ⚠ **[2025 P2A 4] A table records students (SN, SNAME), courses (CID, CNAME), homework (HC, HDES) and homework marks MK. The sample records show homework EX4 in both Mathematics and Information Technology. STUD(SN, SNAME) and COURSE(CID, CNAME) are given; write the fields of HW (homework) and STMARK (students' marks) and underline the primary keys.**
> ✔ HW(<u>HC</u>, <u>CID</u>, HDES); STMARK(<u>SN</u>, <u>CID</u>, <u>HC</u>, MK). Different courses can use the same homework code, so HC alone cannot identify a piece of homework; the primary key must be HC + CID.
> ✘ HW(<u>HC</u>, HDES) and STMARK(<u>SN</u>, <u>HC</u>, MK) score one mark each. The HKEAA reported that only a small number of candidates completed the two normalised tables with appropriate attributes and correct primary keys.

> ⚠ **[2024 P2A 2] ENROL records enrolments at a computer training centre. Each course is offered once a year and taught by one teacher only; students may enrol on the same course in different years.**
> ✔ (a)(i) Primary key: CCODE + CYEAR + SID. (b) Third Normal Form: COURSE(<u>CCODE</u>, CNAME); COURSEDETAIL(<u>CCODE</u>, <u>CYEAR</u>, TEACHER); STUDENT(<u>SID</u>, SNAME, MOBILE); EINFO(<u>CCODE</u>, <u>CYEAR</u>, <u>SID</u>), with foreign keys CCODE and CYEAR referencing COURSEDETAIL and SID referencing STUDENT. The teacher depends on "course + year", not on the course alone.
> ✘ The HKEAA reported that in (a)(i) weaker candidates found only two attributes, and in (b) only a small number of candidates provided correct normalised tables, with the majority not properly providing the primary keys and foreign keys.

[2023 P2A 4(c)] Normalising the ticket table TINFO to Third Normal Form: MOVIE(<u>MID</u>, MNAME); CINEMA(<u>CID</u>, CTYPE, TN); TICKET(MID, MTIME, CID, SNO), with primary key MTIME + CID + SNO and foreign key CID referencing CINEMA. The HKEAA rated this "Good", though some weaker candidates failed to identify the primary key of TICKET.

[2012 Practice Paper P2A 4(c)] To explain why a table is in Third Normal Form, state all three points: no repeating groups (1NF), no partial dependency (2NF) and no transitive dependency (3NF).

## 3.10 Denormalisation

**Denormalisation** deliberately adds a little redundancy to a normalised database to improve query performance. After normalisation, data are spread over many tables, and queries need many joins; with large amounts of data, joins slow queries down.

**When denormalisation is needed**

- the database is very large and queries that join many tables are too slow;
- reading is far more frequent than updating, as in reports, dashboards and statistical analysis;
- common queries need to be simpler to write.

**Procedures of denormalisation** (accepted in the marking schemes)

- merge two related tables into one table;
- add redundant fields, such as the room price in the booking table, so that queries need not join the room table;
- add derived attributes, such as storing the total in an order;
- create and use views containing the related tables.

To merge tables, `CREATE TABLE … AS SELECT …` can create a new table from the result of a join query; this form is not in the HKEAA list and is extension content.

| Benefits of denormalisation | Drawbacks of denormalisation |
|---|---|
| Fewer complex joins, so queries are faster | More data redundancy |
| Less memory used when running queries | Updates must be made in several places, so data easily become inconsistent |
| Queries are easier to write, saving development time | More storage space is needed |

> ⚠ **[2025 P2A 5(e)] (i) Briefly describe a way of denormalising RM (rooms) and BK (bookings). (ii) Give a benefit of the action in (i).**
> ✔ (i) Merge RM and BK into one table; or add redundant fields or derived attributes in RM and BK; or create and use views with RM and BK. (ii) Fewer complex joins between RM and BK, so queries run faster; or less memory is used during query execution; or queries are simpler to write.
> ✘ The marking principles reject "less storage" as a benefit: denormalisation adds redundancy and needs more storage. The HKEAA reported that only a small number of candidates accurately described the process of denormalising two tables and its benefits, and weaker candidates confused decomposing tables (normalisation) with denormalising tables.

## 3.11 Transforming ER diagrams to tables

**Steps**

1. Resolve all many-to-many relationships first (section 3.6).
2. Each entity becomes a table, its attributes become fields and its key attribute becomes the primary key.
3. Add foreign keys according to the relationships:

| Relationship | Where the foreign key goes | Example |
|---|---|---|
| One-to-many | Put the primary key of the "1" side into the "M" side as a foreign key | Resident 1 to M Booking: BOOKING(<u>BKID</u>, BDATE, RID, FID), with RID referencing the resident and FID the facility |
| One-to-one | Either side, with the foreign key set as UNIQUE; putting it on the mandatory side avoids NULLs | Every student must be allocated a locker: STUDENT(<u>SID</u>, SNAME, LOCKERID), with LOCKERID UNIQUE |
| Many-to-many | The associative entity becomes a table whose foreign keys are the primary keys of both sides, usually together forming its primary key | JOINCLUB(<u>SID</u>, <u>CID</u>, JDATE) |

4. Decide the data type and constraints of each field and write the CREATE TABLE statements (see section 1.8 of [Topic a](a.html)).

For the clubhouse in section 3.5:

- RESIDENT(<u>RID</u>, RNAME, FLAT)
- FACILITY(<u>FID</u>, FNAME, FEE)
- BOOKING(<u>BKID</u>, BDATE, BTIME, RID, FID)　Foreign keys: RID references RID of RESIDENT; FID references FID of FACILITY

[2012 Practice Paper P2A 2(c)] The "visits for" relationship between patients and illnesses and the "prescribes" relationship between illnesses and injections are both many-to-many, so each becomes a table: X(PNUM, VDATE, ICODE) and Y(ICODE, MCODE).

## 3.12 Using access rights to achieve data privacy

Databases often hold a great deal of personal data. Organisations must ensure that only authorised people can view or change such data; this is a security requirement and also a legal and ethical responsibility.

**Access rights** specify which operations each user may perform on the data. The four common operations are known together as CRUD:

| Operation | SQL |
|---|---|
| Create | INSERT |
| Read | SELECT |
| Update | UPDATE |
| Delete | DELETE |

In addition, only the database administrator should be allowed to create, alter or drop tables (CREATE, ALTER, DROP). Rights can be set at different levels: the whole database, individual tables, individual records (for example, students may see only their own records) and individual fields (for example, the name but not the phone number).

**User roles**: put users who need the same rights into a role and grant rights to the role, which is easier than setting them one by one.

| Role (school example) | Rights |
|---|---|
| System administrator | Manage all data and tables |
| Teacher | Read and update the marks of students in the classes taught |
| General office staff | Update students' contact details; cannot see marks |
| Student | Read only their own details and marks |

**Restricting access with views**: let users access only views, not the tables themselves, to hide sensitive fields and other people's records.

```sql
CREATE VIEW CLASS6A AS
SELECT SID, SNAME, MARK FROM STUDENT
WHERE CLASS = '6A'
-- The 6A class teacher is authorised to access CLASS6A only: no records of other classes, no address or HKID fields
```

Other protective measures include encrypting data, collecting only the personal data needed and regularly deleting data no longer required. Under the Personal Data (Privacy) Ordinance, personal data may be used only for the purpose stated when they were collected or a directly related purpose; using them for any other purpose requires the consent of the person concerned. For other requirements of the Ordinance, see section 2.8 of [Module E Topic b](../core-e/b.html).

MySQL grants rights with `GRANT SELECT ON database.table TO user`. GRANT is not in the HKEAA SQL list and is extension content.

> ⚠ **[2024 P2A 3(d)] A cinema company plans to share member information in MEMBER with an advertising company to promote other businesses. What is the potential problem with this plan? How can it be solved?**
> ✔ Problem: it will violate the members' data privacy. Solution: the company asks for the members' consent.
> ✘ The HKEAA reported that a high proportion of candidates identified the problem, while weaker candidates did not provide a suitable solution.

> ✔ **[2023 P2A 2(d)]** In an elective-subject system, a teacher creates for each student a view containing only that student's personal information and the popularity of subjects, and a working table in which the student enters choices; the teacher then updates ELECTIVE from the working tables. A student should be able to read their own view and to read and write their own working table; the teacher can read the working tables and read and write ELECTIVE. The HKEAA rated this "Good", though some weaker candidates failed to set the access rights for the teacher column.

[2023 P2A 4(d)] A cinema stores members' personal information in a database. Database security methods to protect the information include data encryption and setting access rights; other technical methods such as firewalls and antivirus programs are also accepted. [2012 Practice Paper P2A 4(b)] Parents complain about having to give HKID numbers: the database designer should make sure that no unnecessary personal data are collected; the data entry operator should make sure that personal data are not leaked to unauthorised people.

**Practical suggestion**: choose a familiar scenario (such as borrowing school equipment or class association activities), write down the rules, draw the ER diagram, resolve the many-to-many relationships, transform it into tables and normalise them to Third Normal Form; finally create the tables in an SQL system and check that all the data in the scenario can be entered.

## 3.13 Self-test

<details><summary>1. A teacher is the class teacher of many students; each student has only one class teacher; some teachers are not class teachers. Give the cardinality and participation on each side of "Teacher — is class teacher of — Student".</summary>

Beside Teacher: 1 and | (each student has exactly one class teacher). Beside Student: M and O (each teacher has zero or more students, because some teachers are not class teachers).
</details>

<details><summary>2. An ER diagram shows "Customer 1| — places — M| Order". Describe the relationship in two sentences.</summary>

Each order is placed by exactly one customer. Each customer places one or more orders.
</details>

<details><summary>3. [Sample Paper P2 Section A 1] A company employs couriers to deliver food to customers. Each customer submits one or more orders; each courier delivers zero or more orders; each order is delivered by one courier only. Give the cardinalities and participation constraints of the two relationships in the ER diagram.</summary>

Customer 1| — "submits" — M| Order; Courier 1| — "delivers" — MO Order.
</details>

<details><summary>4. Why must a relational database resolve many-to-many relationships? How?</summary>

A many-to-many relationship cannot be represented by one foreign key, because a record on either side would have to store several values. It is resolved by adding an associative entity linked to the two original entities by two one-to-many relationships; the associative entity uses the primary keys of both sides as foreign keys.
</details>

<details><summary>5. Resolve "Student M| — takes — NO Course". Give the cardinalities and participation constraints of the two new relationships.</summary>

Student 1| — "has" — MO Enrolment; Enrolment M| — "belongs to" — 1| Course. The O that was beside Course moves to the Student side; the | that was beside Student moves to the Course side.
</details>

<details><summary>6. Use an example to explain insertion, update and deletion anomalies.</summary>

With students, courses and tutors in one table: a new course with no enrolments cannot be recorded (insertion anomaly); renaming a course means changing many records, and missing one causes inconsistency (update anomaly); deleting the record of a course's only student also loses the course details (deletion anomaly).
</details>

<details><summary>7. An order table stores the unit price, quantity and total. Which is a derived attribute? What is the drawback of storing it?</summary>

The total, which can be calculated as unit price times quantity. Storing it takes extra space, and if the unit price or quantity changes without the total being updated, the data become inconsistent.
</details>

<details><summary>8. Explain partial dependency and transitive dependency, with an example of each.</summary>

Partial dependency: a non-key field depends on only part of a composite key, e.g. in ENROL(SID, CCODE, SNAME), SNAME depends on SID only. Transitive dependency: a non-key field depends on another non-key field, e.g. in COURSE(CCODE, TID, TNAME), TNAME depends on TID.
</details>

<details><summary>9. BORROW(MID, MNAME, BID, BTITLE, BDATE) records loans, with primary key MID + BID + BDATE. Normalise it to Third Normal Form.</summary>

MEMBER(<u>MID</u>, MNAME); BOOK(<u>BID</u>, BTITLE); BORROW(<u>MID</u>, <u>BID</u>, <u>BDATE</u>), with foreign keys MID referencing MEMBER and BID referencing BOOK. MNAME depends on MID only and BTITLE on BID only; both are partial dependencies and must be split off.
</details>

<details><summary>10. State one method, one benefit and one drawback of denormalisation.</summary>

Method: merge two tables that are often queried together, or add redundant fields. Benefit: fewer joins, so queries are faster. Drawback: data redundancy, inconsistency during updates, and more storage space.
</details>

<details><summary>11. When "Resident 1 to M Booking" is transformed into tables, which table gets the foreign key? Why?</summary>

BOOKING (the "M" side) gets the resident's primary key RID as a foreign key. Each booking belongs to only one resident, so each BOOKING record stores only one RID; in the resident table, each resident would have to store several booking IDs.
</details>

<details><summary>12. A school database stores students' marks, addresses and HKID numbers. Suggest two ways of using access rights to protect data privacy.</summary>

Set different rights for different user roles, for example students can read only their own records and general office staff cannot see marks; create views containing only the fields and records needed, and let teachers access only the views, so that addresses, HKID numbers and other classes' records are hidden.
</details>
