## 2.1 課程要求

使用結構化查詢語言（SQL）維護簡單的關聯式數據庫，在最多三個數據表中操控數據並提取所需資訊。所涉及的技能包括：修改數據表結構；增加、刪除及修改數據表內的數據；以篩選方式檢視、排序和挑選內容，並建立檢視；使用運算符及算式，包括算術運算符、比較運算符、邏輯運算符及 IN、BETWEEN、LIKE；使用簡單的內置函數，例如聚合函數和字串函數；查詢多個數據表，包括等值連接、自然連接和外連接；使用子查詢（只限一層）。

單元 A 已介紹單一數據表的 SELECT、WHERE、GROUP BY、HAVING 和 ORDER BY，見[單元 A 課題 d](../core-a/d.html) 的 4.10 節。本課題在此基礎上延伸至修改數據、多個數據表、子查詢、集合運算和檢視。

## 2.2 SQL 的寫法與考評局指令清單

卷二的試題簿末頁附有考評局的 SQL 清單（建基於 SQL-92 標準）。下表把清單的內容分類列出：

| 類別 | 清單內容 |
|---|---|
| 常數 | TRUE、FALSE |
| 運算符 | `+ - * / > < = >= <= <> % _ '`、AND、NOT、OR |
| 聚合函數 | AVG、COUNT、MAX、MIN、SUM |
| 數值及字串函數 | ABSOLUTE（ABS）、INT、ASC、AT、CHAR（CHR）、CHAR_LENGTH（LEN）、LOWER、TRIM、SPACE、SUBSTRING（SUBSTR／MID）、UPPER、VALUE（VAL） |
| 日期函數 | DATE、DAY、MONTH、YEAR |
| 其他關鍵字 | ADD、ALL、ALTER、ANY、AS、ASC、BETWEEN、BY、CREATE、DELETE、DESC、DISTINCT、DROP、EXISTS、FROM、GROUP、HAVING、IN、INDEX、INNER JOIN、INSERT、INTEGER、INTERSECT、INTO、LEFT [OUTER] JOIN、LIKE、MINUS、NULL、RIGHT [OUTER] JOIN、FULL [OUTER] JOIN、ON、ORDER、SELECT、SET、TABLE、TO、UNION、UNIQUE、UPDATE、VALUES、VIEW、WHERE |

**書寫慣例**

- 關鍵字大小寫均可；本網站一律用大寫，方便閱讀。
- 文字和日期要加引號，例如 `CLASS = '4A'`；**數值不加引號**，例如 `JYEAR = 2012`。
- 試卷的日期常寫成 `'28/7/2023'` 或 `'26-3-2025'`，評卷參考接受其他日期格式。
- 複合條件不肯定次序時加括號。
- 語句末的分號可寫可不寫。

**考評局寫法與 MySQL 寫法的分別**

本網站的示例以考評局清單和評卷參考的寫法為主。課本和學校電腦室常用 MySQL，部分寫法不同：

| 用途 | 考評局清單或評卷參考 | MySQL |
|---|---|---|
| 修改欄位的數據類型 | `ALTER TABLE CAND ALTER COLUMN CNUM CHAR(12)` | `ALTER TABLE CAND MODIFY CNUM CHAR(12)` |
| 差集 | `MINUS` | `EXCEPT`（MySQL 8.0.31 或以後） |
| 全外連接 | `FULL [OUTER] JOIN` | 不支援，要以 LEFT JOIN 和 RIGHT JOIN 的結果做 UNION |
| 字串長度 | `CHAR_LENGTH`（或 `LEN`） | `CHAR_LENGTH`（`LENGTH` 計算的是位元組數目） |
| 日期 | `'26-3-2025'` 等格式均可 | 必須寫成 `'2025-03-26'` |

自然連接（NATURAL JOIN）是課程文件列明的內容，但不在考評局清單內，見 2.9 節。建立和刪除索引的語句，見[課題 a](a.html) 的 1.6 節。

## 2.3 修改數據表結構

| 操作 | SQL |
|---|---|
| 加入欄位 | `ALTER TABLE STAFF ADD EMAIL VARCHAR(40)` |
| 修改欄位的數據類型或長度 | `ALTER TABLE STAFF ALTER COLUMN PHONE CHAR(12)` |
| 刪除欄位 | `ALTER TABLE STAFF DROP COLUMN EMAIL` |
| 刪除整個數據表（結構和數據） | `DROP TABLE STAFF` |

**DELETE 與 DROP 的分別**：`DELETE FROM STAFF` 刪除數據表內的所有記錄，數據表的結構仍然存在，之後可以再插入記錄；`DROP TABLE STAFF` 把整個數據表連同結構一併移除。

> ⚠ **〔2024 卷二甲 1(f)〕完成 SQL 語句，在 STAFF 加入欄位 MOB（字符，長度 8）以儲存流動電話號碼：`____ STAFF ADD ____`**
> ✔ `ALTER TABLE STAFF ADD MOB CHAR(8)`（亦接受 CHR、VARCHAR、CHARACTER）。
> ✘ 考評局指出，較弱的考生寫不出加入新欄位的正確 SQL 關鍵字。

〔樣本試卷卷二甲 5(e)〕在 DRIVER 加入欄位 BUSID，儲存最多 6 個字符的車牌號碼：`ALTER TABLE DRIVER ADD (BUSID VARCHAR(6))`。〔2012 練習卷卷二甲 1(c)(i)〕把 CNUM 的長度增至 12，並確保 CNUM 不會留空：`ALTER TABLE CAND ALTER COLUMN CNUM CHAR(12) NOT NULL`。

> ⚠ **〔2023 卷二甲 3(d)(iii)〕要移除數據表 DOCTOR，有人建議 `DELETE FROM DOCTOR`，有人建議 `DROP TABLE DOCTOR`。兩者的主要分別是甚麼？**
> ✔ DELETE 刪除數據表內的記錄；DROP 移除整個數據表。考評局指出，大部分考生能正確使用 DROP 指令。

## 2.4 增加、刪除及修改數據

**示例數據表 PRODUCT**

| PID | PNAME | CATEGORY | PRICE |
|---|---|---|---|
| P1 | 筆記簿 | 文具 | 25 |
| P2 | 原子筆 | 文具 | 8 |
| P3 | 計數機 | 電子 | 160 |
| P4 | 耳機 | 電子 | 299 |
| P5 | 水樽 | 生活 | 60 |

```sql
-- 插入一個完整的記錄：值的次序要與數據表的欄位次序相同
INSERT INTO PRODUCT VALUES ('P6', '藍牙喇叭', '電子', 450)

-- 只插入部分欄位：其餘欄位為空值
INSERT INTO PRODUCT (PID, PNAME) VALUES ('P7', '滑鼠墊')

-- 修改記錄：所有電子產品減價一成
UPDATE PRODUCT SET PRICE = PRICE * 0.9 WHERE CATEGORY = '電子'

-- 刪除記錄：刪除沒有價格的產品
DELETE FROM PRODUCT WHERE PRICE IS NULL
```

執行後，計數機、耳機、藍牙喇叭的價格分別變為 144、269.1、405；滑鼠墊的記錄已刪除。

- `UPDATE` 和 `DELETE` 若沒有 WHERE，會修改或刪除**所有記錄**。
- 修改多個欄位時以逗號分隔，例如 `SET PRICE = 30, CATEGORY = '文具'`。
- 數值欄位加減要寫成 `SET POINT = POINT + 10`，不可只寫 `SET POINT + 10`。

> ⚠ **〔2025 卷二甲 3(a)〕輸入表格把客戶「So Siu Ming」、編號「ABF218」、首次使用年份 2012 插入數據表 CUS（欄位次序：CCODE、CNAME、JYEAR）。寫出 `INSERT INTO CUS VALUES` 後缺少的部分。**
> ✔ `("ABF218", "So Siu Ming", 2012)`：值的次序跟數據表的欄位次序，而非表格上的次序；JYEAR 是整數，2012 不加引號。
> ✘ 考評局指出，不少考生用錯 INSERT INTO 語句，引號用得不當；評卷時寫成 `'2012'` 不給分。

> ⚠ **〔2024 卷二甲 3(c)(ii)〕SQL2 以 `DELETE FROM MEMBER WHERE MID = '00083'` 再 `INSERT INTO MEMBER VALUES (…)` 把會員 00083 的姓名改為 Chan Tai Man。完成能達到同樣效果的 SQL3：`UPDATE ____ SET ____ WHERE MID = '00083'`。**
> ✔ `UPDATE MEMBER SET MNAME = 'Chan Tai Man' WHERE MID = '00083'`。用 UPDATE 只修改一個欄位，毋須重新輸入整個記錄；若其他數據表以外鍵碼參照該會員，DELETE 還可能違反參照完整性。

> ⚠ **〔2023 卷二甲 1(e)(ii)〕向介紹了多於 5 人入會的會員加 10 分獎賞積分：`UPDATE ____ SET ____ = ____ WHERE MID IN (SELECT MID FROM V1 WHERE REFERRAL > 5)`。**
> ✔ `UPDATE MEMBER SET POINT = POINT + 10 WHERE MID IN (…)`。
> ✘ 考評局指出，較弱的考生誤用「PLUS」作運算符。

## 2.5 選取、篩選及排序

**示例數據表 CAMP（暑期活動營）**

| CID | CNAME | DISTRICT | DAYS | FEE |
|---|---|---|---|---|
| C01 | 攝影營 | 沙田 | 3 | 900 |
| C02 | 機械人營 | 觀塘 | 5 | 1500 |
| C03 | 攀石營 | 沙田 | 2 | 600 |
| C04 | 編程營 | 觀塘 | 4 | 1500 |
| C05 | 露營 | 西貢 | 2 | 450 |

| SQL | 結果 | 說明 |
|---|---|---|
| `SELECT CNAME, FEE FROM CAMP WHERE DISTRICT = '沙田'` | 攝影營 900<br>攀石營 600 | WHERE 篩選記錄 |
| `SELECT CNAME, FEE FROM CAMP ORDER BY FEE DESC, CNAME` | 機械人營 1500<br>編程營 1500<br>攝影營 900<br>攀石營 600<br>露營 450 | 先按 FEE 遞減；FEE 相同再按 CNAME 遞增（預設 ASC） |
| `SELECT DISTINCT DISTRICT FROM CAMP` | 沙田<br>觀塘<br>西貢 | DISTINCT 刪除重複的行 |
| `SELECT CNAME, FEE / DAYS AS DAILY FROM CAMP WHERE DAYS >= 4` | 機械人營 300<br>編程營 375 | 輸出算式，以 AS 命名 |

子句的次序固定為 `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY …`。

> ✔ **〔2024 卷二甲 1(b)〕** 列出曾進入房間 L502 的員工編號，按 TDATE 遞增排列：`SELECT SID FROM TRAN WHERE RID = 'L502' ORDER BY TDATE`。考評局評為「良好」。

> ✔ **〔2023 卷二甲 1(a)〕** 列出積分多於 20 的銀級會員編號，按入會日期遞減排列：`SELECT MID FROM MEMBER WHERE MTYPE = 'S' AND POINT > 20 ORDER BY JDATE DESC`。考評局評為「良好」。

> ⚠ **〔2025 卷二甲 5(b)(i)〕列出訂房編號首三個字符為 B88 的訂房記錄，按入住日期 SD 遞減排列。**
> ✔ `SELECT * FROM BK WHERE BID LIKE 'B88%' ORDER BY SD DESC`（亦接受 `SUBSTRING(BID, 1, 3) = 'B88'`）。
> ✘ 評卷原則指明，結構不當不給分，例如寫成 `WHERE BID LIKE 'B88%' AND ORDER BY SD DESC`：ORDER BY 是獨立的子句，前面不可加 AND。

## 2.6 運算符及算式

**示例數據表 STAFF**

| SID | SNAME | DEPT | SALARY | PHONE |
|---|---|---|---|---|
| S01 | Chan Siu Ming | IT | 29000 | 91234567 |
| S02 | Lee Ka Yan | HR | 28000 | （空值） |
| S03 | Wong Chi Hang | IT | 45000 | 62345678 |
| S04 | Ho Mei Lam | Sales | 26000 | 97778888 |
| S05 | Cheung Wai | Sales | 38000 | （空值） |

| 類別 | 運算符 | 例子 | 結果 |
|---|---|---|---|
| 算術 | `+ - * /` | `SELECT SNAME, SALARY * 12 AS ANNUAL FROM STAFF WHERE NOT DEPT = 'IT'` | Lee Ka Yan 336000 等三行 |
| 比較 | `= <> > < >= <=` | `WHERE SALARY >= 38000` | Wong Chi Hang、Cheung Wai |
| 邏輯 | AND、OR、NOT | 見下文 | |
| IN | 等於清單中任何一個值 | `WHERE DEPT IN ('HR', 'Sales')` | Lee Ka Yan、Ho Mei Lam、Cheung Wai |
| BETWEEN | 介乎兩值之間，**包括兩端** | `WHERE SALARY BETWEEN 28000 AND 38000` | Chan Siu Ming、Lee Ka Yan、Cheung Wai |
| LIKE | `%` 代表零個或多個字符；`_` 代表一個字符 | `WHERE SNAME LIKE '_o%'` | Wong Chi Hang、Ho Mei Lam |
| IS NULL | 欄位是空值 | `WHERE PHONE IS NULL` | Lee Ka Yan、Cheung Wai |

**AND 先於 OR**：

```sql
SELECT SNAME FROM STAFF WHERE DEPT = 'IT' OR DEPT = 'Sales' AND SALARY > 30000
-- 等於 DEPT = 'IT' OR (DEPT = 'Sales' AND SALARY > 30000)
-- 結果：Chan Siu Ming、Wong Chi Hang、Cheung Wai

SELECT SNAME FROM STAFF WHERE (DEPT = 'IT' OR DEPT = 'Sales') AND SALARY > 30000
-- 結果：Wong Chi Hang、Cheung Wai
```

- 判斷空值要寫 `IS NULL` 或 `IS NOT NULL`，不可寫 `= NULL`。
- 比較符號要寫 `<=`、`>=`、`<>`，不可寫成 ≤、≥、≠。評卷原則指明，用 ≤ 代替 `<=` 不給分。
- 比較日期時，較遲的日期較大。

> ⚠ **〔2023 卷二甲 1(b)〕不重複地列出曾在 2022 年 9 月預約服務的會員編號。**
> ✔ `SELECT DISTINCT MID FROM BOOKING WHERE BDATE BETWEEN '01/09/2022' AND '30/09/2022'`；亦可寫 `MONTH(BDATE) = 9 AND YEAR(BDATE) = 2022`。
> ✘ 考評局指出，較弱的考生寫不出「2022 年 9 月」這個條件。

> ⚠ **〔2025 卷二甲 5(b)(ii)〕列出 2025 年 3 月 26 日有人入住的房間號碼。BK 數據表記錄入住日期 SD 和退房日期 ED。**
> ✔ `SELECT RN FROM BK WHERE SD <= '26-3-2025' AND '26-3-2025' <= ED`，或 `WHERE '26-3-2025' BETWEEN SD AND ED`。
> ✘ 只寫其中一個條件只得一分。考評局簡報把這分題評為「一般」。若寫成 `SD = '26-3-2025'`，會漏掉在該日之前入住而仍未退房的房間。

## 2.7 內置函數

**聚合函數**對一組記錄計算一個值：

| 函數 | 作用 | 以 2.6 節的 STAFF 為例 |
|---|---|---|
| `COUNT(*)` | 記錄數目 | 5 |
| `COUNT(欄位)` | 該欄位**不是空值**的記錄數目 | `COUNT(PHONE)` = 3 |
| `COUNT(DISTINCT 欄位)` | 不同值的數目 | `COUNT(DISTINCT DEPT)` = 3 |
| `SUM`、`AVG` | 總和、平均值 | `SUM(SALARY)` = 166000；`AVG(SALARY)` = 33200 |
| `MAX`、`MIN` | 最大值、最小值；也可用於文字和日期 | `MAX(SALARY)` = 45000 |

**字串函數**

| 函數 | 作用 | 例子 | 結果 |
|---|---|---|---|
| `CHAR_LENGTH(s)`（`LEN`） | 字符數目 | `CHAR_LENGTH('Chan Siu Ming')` | 13 |
| `SUBSTRING(s, 起點, 長度)`（`SUBSTR`、`MID`） | 提取部分字串，第一個字符的位置是 1 | `SUBSTRING('ABF218', 1, 3)` | `'ABF'` |
| `UPPER(s)`、`LOWER(s)` | 轉為大寫、小寫 | `UPPER('Chan')` | `'CHAN'` |
| `TRIM(s)` | 刪除首尾空格 | `TRIM('  Lam ')` | `'Lam'` |
| `SPACE(n)` | 產生 n 個空格 | `SPACE(3)` | `'   '` |

清單中的 ASC 傳回字符的 ASCII 碼，CHAR（CHR）把 ASCII 碼轉為字符，VALUE（VAL）把數字字串轉為數值，AT 找出子字串的位置，INT 取整數部分，ABS 取絕對值。

**日期函數**：`YEAR(d)`、`MONTH(d)`、`DAY(d)` 分別取出日期的年、月、日，例如 `WHERE YEAR(JDATE) < 2019`；`DATE(…)` 取出日期時間值的日期部分。

> ⚠ **〔2012 練習卷卷二甲 1(c)(ii)〕考生編號 CNUM 的首三個字符是學校編號。列出所有考生姓名及其學校編號。**
> ✔ `SELECT CNAME, SUBSTR(CNUM, 1, 3) FROM CAND`；亦接受 SUBSTRING、MID 或 LEFT。

## 2.8 分組：GROUP BY 與 HAVING

**示例數據表 DONATE（賣旗籌款記錄）**

| DID | CLASS | HOUSE | AMT |
|---|---|---|---|
| D1 | 4A | 紅 | 50 |
| D2 | 4B | 藍 | 20 |
| D3 | 4A | 藍 | 30 |
| D4 | 4C | 紅 | 100 |
| D5 | 4B | 藍 | 40 |
| D6 | 4A | 紅 | 30 |

| SQL | 結果 |
|---|---|
| `SELECT CLASS, COUNT(*), SUM(AMT) FROM DONATE GROUP BY CLASS` | 4A 3 110<br>4B 2 60<br>4C 1 100 |
| `SELECT CLASS, SUM(AMT) FROM DONATE GROUP BY CLASS HAVING SUM(AMT) >= 80` | 4A 110<br>4C 100 |
| `SELECT CLASS, SUM(AMT) FROM DONATE WHERE AMT >= 30 GROUP BY CLASS` | 4A 110<br>4B 40<br>4C 100 |
| `SELECT CLASS, HOUSE, COUNT(*) FROM DONATE GROUP BY CLASS, HOUSE` | 4A 紅 2<br>4A 藍 1<br>4B 藍 2<br>4C 紅 1 |

**數據庫處理各子句的次序**：FROM（取得數據表）→ WHERE（篩選記錄）→ GROUP BY（分組）→ HAVING（篩選組別）→ SELECT（輸出欄位）→ ORDER BY（排序）。

- **WHERE** 在分組**前**篩選個別記錄；**HAVING** 在分組**後**篩選組別。
- 聚合函數不可放在 WHERE 內：處理 WHERE 時還未分組，例如 `WHERE COUNT(*) > 1` 是錯誤的。
- 使用 GROUP BY 時，SELECT 中的欄位要麼在 GROUP BY 中，要麼放在聚合函數內。例如 `SELECT DID, CLASS, SUM(AMT) FROM DONATE GROUP BY CLASS` 是錯誤的：每班有多個 DID，數據庫無法決定輸出哪一個。

> ⚠ **〔2023 卷二甲 1(d)〕列出在 30/09/2022 有多於 500 個預約記錄的健身中心編號。**
> ✔ `SELECT C.CID FROM BOOKING B, CENTRE C WHERE C.CID = B.CID AND BDATE = '30/09/2022' GROUP BY C.CID HAVING COUNT(B.BID) > 500`。日期條件放在 WHERE（分組前），記錄數目條件放在 HAVING（分組後）。只用 BOOKING 一個數據表亦可。
> ✘ 考評局指出，考生使用 GROUP BY 和 HAVING 的能力較弱。

〔2023 卷二甲 4(b)(i)〕列出每個場次已售出的貴賓票數目：`SELECT CID, MTIME, COUNT(*) FROM TINFO WHERE SNO <= 10 GROUP BY CID, MTIME`。

## 2.9 查詢多個數據表

**示例數據表**

STUDENT

| SID | SNAME | CLASS |
|---|---|---|
| S1 | 陳小明 | 4A |
| S2 | 李嘉欣 | 4B |
| S3 | 黃子軒 | 4A |
| S4 | 何詠詩 | 5C |

JOINCLUB（學生參加學會的記錄）

| SID | CID |
|---|---|
| S1 | C1 |
| S1 | C2 |
| S2 | C2 |
| S3 | C1 |

CLUB

| CID | CNAME | TID |
|---|---|---|
| C1 | 天文學會 | T1 |
| C2 | 攝影學會 | T2 |
| C3 | 辯論學會 | T1 |

**等值連接**：以 `=` 比較兩個數據表的鍵碼，通常是外鍵碼等於主關鍵碼。有兩種寫法，結果相同：

```sql
-- 寫法一：在 WHERE 寫連接條件
SELECT SNAME, CID FROM STUDENT, JOINCLUB
WHERE STUDENT.SID = JOINCLUB.SID

-- 寫法二：INNER JOIN … ON
SELECT SNAME, CID FROM STUDENT INNER JOIN JOINCLUB
ON STUDENT.SID = JOINCLUB.SID
```

| SNAME | CID |
|---|---|
| 陳小明 | C1 |
| 陳小明 | C2 |
| 李嘉欣 | C2 |
| 黃子軒 | C1 |

等值連接只輸出兩邊都有配對的記錄：何詠詩沒有參加學會，不會出現。

**連接三個數據表**：每多一個數據表，便多一個連接條件。

```sql
SELECT S.SNAME, C.CNAME
FROM STUDENT S, JOINCLUB J, CLUB C
WHERE S.SID = J.SID AND J.CID = C.CID AND C.CNAME = '攝影學會'
-- 結果：陳小明 攝影學會；李嘉欣 攝影學會
```

- `STUDENT S` 中的 S 是**別名**，之後可用 `S.SID` 代替 `STUDENT.SID`。
- 兩個數據表有同名欄位（例如 SID）時，必須寫明「數據表.欄位」，否則數據庫不知道指哪一個。
- **漏寫連接條件**，數據庫會把兩個數據表的記錄逐一配對：`SELECT * FROM STUDENT, JOINCLUB` 輸出 4 × 4 = 16 行，大部分配對沒有意義。這種所有可能組合的結果稱為笛卡兒積，SQL 的 CROSS JOIN 刻意產生這種結果，屬延伸內容。
- 一名學生參加多個學會時，連接結果會重複出現他的姓名。只需列出姓名時，加上 DISTINCT：`SELECT DISTINCT SNAME FROM STUDENT S, JOINCLUB J WHERE S.SID = J.SID` 輸出陳小明、李嘉欣、黃子軒各一次。

**自然連接**（NATURAL JOIN）自動以兩個數據表中名稱相同的欄位作等值連接，而且同名欄位在結果中只出現一次：

```sql
SELECT * FROM STUDENT NATURAL JOIN JOINCLUB
-- 結果欄位：SID、SNAME、CLASS、CID
```

只有連接欄位名稱相同時才可以用自然連接。若兩個數據表的連接欄位名稱不同（例如 CLUB.TID 與 TEACHER.TCODE），或有其他同名但無關的欄位，便要用等值連接。NATURAL JOIN 不在考評局的 SQL 清單內，答題時用等值連接一定可以。

**自連接**：把同一個數據表當作兩個數據表連接，用不同的別名區分。例如 EMP（EID、ENAME、BOSS）的 BOSS 是上司的員工編號：

```sql
SELECT E.ENAME, B.ENAME AS BOSSNAME
FROM EMP E, EMP B
WHERE E.BOSS = B.EID
```

E 代表員工本人，B 代表上司；沒有上司的員工（BOSS 為空值）不會出現在結果中。

> ⚠ **〔2024 卷二甲 1(c)〕STAFF、ROOM、TRAN 三個數據表分別記錄員工、房間和進入記錄。列出曾進入名稱含有「Lab」的房間的員工姓名。**
> ✔ `SELECT DISTINCT SNAME FROM STAFF S, ROOM R, TRAN T WHERE S.SID = T.SID AND R.RID = T.RID AND R.RNAME LIKE '%Lab%'`；亦可用兩層 IN 子查詢。姓名與房間名稱沒有直接關係，要經 TRAN 連接三個數據表。
> ✘ 考評局指出，較弱的考生寫不出正確的字串樣式比對條件。

> ⚠ **〔2025 卷二甲 3(b)〕CUS 記錄客戶，ACC 記錄戶口（一名客戶可有多個戶口）。寫出 SQL，找出客戶「So Siu Ming」所有戶口的結餘總和。**
> ✔ `SELECT SUM(BAL) FROM CUS, ACC WHERE CUS.CCODE = ACC.CCODE AND CUS.CNAME = 'So Siu Ming'`。SUM、連接條件、姓名條件各佔一分。
> ✘ 考評局指出，較弱的考生未能正確使用 SUM 函數。

〔樣本試卷卷二甲 5(a)〕列出可駕駛巴士路線 1A 的員工姓名和編號，按薪酬遞減排列：`SELECT ENAME, EMPLOYEE.EID FROM EMPLOYEE, DRIVER WHERE EMPLOYEE.EID = DRIVER.EID AND BID = '1A' ORDER BY SALARY DESC`。兩個數據表都有 EID，SELECT 中要寫明 `EMPLOYEE.EID`。

> ⚠ **〔2023 卷二甲 1(e)(i)〕MEMBER 的 REFER 是介紹人的會員編號。寫出以下 SQL 的目的：`CREATE VIEW V1 AS SELECT M1.MID, COUNT(M1.MID) AS REFERRAL FROM MEMBER M1, MEMBER M2 WHERE M1.MID = M2.REFER GROUP BY M1.MID`**
> ✔ 列出曾介紹他人入會的會員，以及每人介紹的總人數。答案要同時寫出「誰」和「人數」兩點。
> ✘ 考評局指出，考生難以描述這句 SQL 的目的。

## 2.10 外連接

等值連接只保留兩邊都有配對的記錄。**外連接**同時保留沒有配對的記錄，缺少的一方以空值填補。

| 連接 | 保留 |
|---|---|
| `LEFT [OUTER] JOIN` | 左邊數據表的所有記錄 |
| `RIGHT [OUTER] JOIN` | 右邊數據表的所有記錄 |
| `FULL [OUTER] JOIN` | 兩邊數據表的所有記錄 |

以 2.9 節的數據表為例：

```sql
SELECT S.SNAME, J.CID
FROM STUDENT S LEFT JOIN JOINCLUB J ON S.SID = J.SID
```

| SNAME | CID |
|---|---|
| 陳小明 | C1 |
| 陳小明 | C2 |
| 李嘉欣 | C2 |
| 黃子軒 | C1 |
| 何詠詩 | （空值） |

**找出沒有配對的記錄**：外連接後，沒有配對的記錄在右邊數據表的欄位全是空值。

```sql
-- 沒有參加任何學會的學生：何詠詩
SELECT S.SNAME FROM STUDENT S LEFT JOIN JOINCLUB J ON S.SID = J.SID
WHERE J.SID IS NULL

-- 沒有學生參加的學會：辯論學會
SELECT C.CNAME FROM JOINCLUB J RIGHT JOIN CLUB C ON J.CID = C.CID
WHERE J.CID IS NULL
```

同樣的結果也可以用子查詢 `NOT IN` 或 `NOT EXISTS` 寫，見 2.11 節。

**全外連接**的例子：老師 TEACHER 有林老師（T1）、張老師（T2）、陳老師（T3）；學會 CLUB 中的棋藝學會未有負責老師（TID 為空值）。`SELECT T.TNAME, C.CNAME FROM TEACHER T FULL JOIN CLUB C ON T.TID = C.TID` 的結果包括配對的三行，加上「陳老師、空值」和「空值、棋藝學會」兩行。

> ⚠ **〔2024 卷二甲 1(d)〕列出從未進入任何房間的員工姓名：`SELECT SNAME FROM ____ LEFT JOIN ____ ON ____ WHERE ____`**
> ✔ `SELECT SNAME FROM STAFF S LEFT JOIN TRAN T ON S.SID = T.SID WHERE T.SID IS NULL`；最後的條件也可用 T.RID、T.TID 或 T.TDATE。
> ✘ 考評局指出，考生對外連接的運作和 NULL 條件的理解較弱。

> ⚠ **〔2023 卷二甲 1(c)〕列出沒有任何預約記錄的會員編號和入會日期。**
> ✔ `SELECT MID, JDATE FROM MEMBER WHERE MID NOT IN (SELECT MID FROM BOOKING)`，或用外連接。
> ✘ 考評局指出，不足一半考生能正確寫出「沒有預約記錄」的條件。

〔樣本試卷卷二甲 5(b)〕列出不能駕駛任何巴士路線的員工：`SELECT EMPLOYEE.EID, ENAME FROM EMPLOYEE LEFT OUTER JOIN DRIVER ON EMPLOYEE.EID = DRIVER.EID WHERE DRIVER.BID IS NULL`。

## 2.11 子查詢

**子查詢**是放在另一句 SQL 之內、以括號包住的 SELECT 語句。課程只要求一層子查詢，即子查詢之內不再有子查詢。

**示例數據表**

PRODUCT

| PID | PNAME | CATEGORY | PRICE |
|---|---|---|---|
| P1 | 筆記簿 | 文具 | 25 |
| P2 | 原子筆 | 文具 | 8 |
| P3 | 計數機 | 電子 | 160 |
| P4 | 耳機 | 電子 | 299 |
| P5 | 水樽 | 生活 | 60 |

ORDERS

| OID | PID | QTY |
|---|---|---|
| O1 | P1 | 10 |
| O2 | P3 | 2 |
| O3 | P1 | 5 |
| O4 | P4 | 1 |
| O5 | P2 | 30 |
| O6 | P3 | 1 |

| 用途 | SQL | 結果 |
|---|---|---|
| IN：在子查詢結果之中 | `SELECT PNAME FROM PRODUCT WHERE PID IN (SELECT PID FROM ORDERS)` | 筆記簿、原子筆、計數機、耳機 |
| NOT IN：不在子查詢結果之中 | `SELECT PNAME FROM PRODUCT WHERE PID NOT IN (SELECT PID FROM ORDERS)` | 水樽 |
| 與聚合結果比較 | `SELECT PNAME FROM PRODUCT WHERE PRICE = (SELECT MAX(PRICE) FROM PRODUCT)` | 耳機 |
| 高於平均值 | `SELECT PNAME FROM PRODUCT WHERE PRICE > (SELECT AVG(PRICE) FROM PRODUCT)` | 計數機、耳機（平均價 110.4） |
| 子查詢中分組 | `SELECT PNAME FROM PRODUCT WHERE PID IN (SELECT PID FROM ORDERS GROUP BY PID HAVING COUNT(*) > 1)` | 筆記簿、計數機 |

- 與 IN 一起使用的子查詢只可以傳回**一個欄位**。
- 以 `=`、`>` 等比較時，子查詢必須只傳回**一個值**，通常是聚合函數的結果。
- **不可**寫成 `WHERE PRICE = MAX(PRICE)`：聚合函數不可直接放在 WHERE，必須寫成子查詢。

**ANY 與 ALL**：與子查詢傳回的一組值比較。

| 寫法 | 意思 | 例子（電子產品的價格為 160、299） | 結果 |
|---|---|---|---|
| `> ANY (…)` | 大於其中**最少一個**值，即大於最小值 | `PRICE < ANY (SELECT PRICE FROM PRODUCT WHERE CATEGORY = '電子')` 即小於 299 | 筆記簿、原子筆、計數機、水樽 |
| `> ALL (…)` | 大於**所有**值，即大於最大值 | `PRICE < ALL (SELECT PRICE FROM PRODUCT WHERE CATEGORY = '電子')` 即小於 160 | 筆記簿、原子筆、水樽 |

`= ANY (…)` 的作用與 `IN (…)` 相同。

**EXISTS 與 NOT EXISTS**：檢查子查詢有沒有傳回任何記錄。子查詢通常參照外層查詢的欄位，外層每處理一個記錄便執行一次子查詢。

```sql
-- 曾有一張訂單訂購 10 件或以上的產品：筆記簿、原子筆
SELECT PNAME FROM PRODUCT P
WHERE EXISTS (SELECT * FROM ORDERS O WHERE O.PID = P.PID AND O.QTY >= 10)

-- 從未有人訂購的產品：水樽
SELECT PNAME FROM PRODUCT P
WHERE NOT EXISTS (SELECT * FROM ORDERS O WHERE O.PID = P.PID)
```

**子查詢與連接互換**：很多查詢兩種寫法都可以，評卷時功能相同的寫法同樣得分。但若要輸出多個數據表的欄位，必須用連接；若條件要與聚合結果比較（例如最高價格），則要用子查詢。

> ⚠ **〔2025 卷二甲 5(b)(iii)〕列出曾預訂房價最高的房間的客人編號。RM 記錄房間及房價，BK 記錄訂房。**
> ✔ `SELECT DISTINCT GID FROM RM A, BK WHERE A.RN = BK.RN AND A.PRICE IN (SELECT MAX(PRICE) FROM RM)`（`IN` 可寫成 `=`）。
> ✘ 考評局指出，超過一半考生不懂運用子查詢和 MAX 函數；評卷原則指明，寫成 `WHERE PRICE = MAX(PRICE)` 不給分。

> ⚠ **〔2024 卷二甲 1(e)〕部分房間在 TRAN 中有超過 100 個進入記錄，列出這些房間的類型。**
> ✔ `SELECT DISTINCT RTYPE FROM ROOM WHERE RID IN (SELECT RID FROM TRAN GROUP BY RID HAVING COUNT(*) > 100)`。評卷參考按連接或子查詢、GROUP BY 與 HAVING、整體正確各給一分。
> ✘ 考評局指出，考生難以寫出適當的子查詢，也未能正確運用 GROUP BY 和 HAVING。

> ⚠ **〔2025 卷二甲 2(b)〕T1 和 T2 的結構相同（CID、AID、AMT）。執行 `UPDATE T1 SET T1.AMT = 0 WHERE T1.AMT > 0 AND (EXISTS (SELECT * FROM T2 WHERE T1.CID = T2.CID AND T2.AMT = 0))` 後，列出 T1 中更新了的記錄。**
> ✔ 逐個檢查 T1 的記錄：AMT 要大於 0，而且 T2 中最少有一個 CID 相同、AMT 為 0 的記錄。答案要寫出更新了的記錄，以及更新後的 AMT（0）。考評局評為「良好」。

## 2.12 集合運算

集合運算把兩句 SELECT 的結果合併。兩句 SELECT 的**欄位數目必須相同**，對應欄位的數據類型要相容。

**示例數據表**：SWIM 記錄參加水運會的學生 S1、S2、S3；RUN 記錄參加陸運會的學生 S2、S4、S3、S5。

| 運算 | 意思 | `SELECT SID FROM SWIM … SELECT SID FROM RUN` 的結果 |
|---|---|---|
| `UNION` | 聯集，**刪除重複**的行 | S1、S2、S3、S4、S5（5 行） |
| `UNION ALL` | 聯集，保留重複的行 | 7 行 |
| `INTERSECT` | 交集：兩邊都有的行 | S2、S3 |
| `MINUS` | 差集：在第一句結果中、但不在第二句結果中的行 | S1 |

MINUS 的兩句 SELECT 次序不可調換：`SELECT SID FROM RUN MINUS SELECT SID FROM SWIM` 的結果是 S4、S5。

**重複的行指所有欄位都相同**。若 SELECT 多個欄位，只有每個欄位的值都相同，UNION 才會把它們當作重複而刪除，INTERSECT 才會保留。

> ⚠ **〔2025 卷二甲 2(a)〕T1 和 T2 各有四個記錄，結構相同；兩者之間只有一個記錄完全相同。執行 `SELECT * FROM T1 UNION SELECT CID, AID, AMT FROM T2` 後會列出多少個記錄？**
> ✔ 7。UNION 預設只保留不同的行：4 + 4 − 1 = 7。
> ✘ 考評局評為「差」：幾乎所有考生都不懂運用 UNION；較弱的考生不知道 UNION 預設只選取不同的行。

〔2024 卷二甲 4(b)〕兩區數據表 D1、D2 各有 5 個記錄，其中 3 個學生編號兩區都有。`SELECT SID FROM D1 UNION SELECT SID FROM D2` 輸出 7 個記錄，改用 UNION ALL 則輸出 10 個。

> ⚠ **〔2025 卷二甲 5(c)〕簡述以下 SQL 的用途：`SELECT RN FROM RM MINUS SELECT RN FROM BK`**
> ✔ 找出沒有任何訂房記錄的房間。
> ✘ 考評局指出，較弱的考生把 MINUS 與 MIN 混淆。

> ⚠ **〔2024 卷二甲 1(g)〕以下 SQL 的目的是甚麼？`SELECT SID FROM STAFF S WHERE DEPT = 'Physics' AND EXISTS (SELECT S.SID FROM TRAN T WHERE S.SID = T.SID) MINUS SELECT SID FROM TRAN WHERE TDATE = '28/7/2023'`**
> ✔ 列出物理部中曾進入房間、但在 2023 年 7 月 28 日沒有進入任何房間的員工。答案要包括「物理部」和「該日沒有進入」兩點。考評局評為「良好」。

〔2023 卷二甲 1(e)(iii)〕列出未曾介紹他人入會的會員編號：`SELECT MID FROM MEMBER MINUS SELECT MID FROM V1`（V1 是 2.9 節的檢視，只包含曾介紹他人入會的會員）。

## 2.13 檢視

**檢視**（view）是以 SELECT 語句定義的虛擬數據表。檢視本身不儲存數據，每次使用時按定義從原本的數據表取得最新數據。

```sql
CREATE VIEW SALES AS
SELECT PID, SUM(QTY) AS TOTALQTY FROM ORDERS GROUP BY PID

-- 檢視可以像數據表一樣查詢和連接：找出總銷量最高的產品
SELECT PNAME, TOTALQTY FROM PRODUCT, SALES
WHERE PRODUCT.PID = SALES.PID
AND TOTALQTY = (SELECT MAX(TOTALQTY) FROM SALES)
-- 結果：原子筆 30

DROP VIEW SALES   -- 刪除檢視，原本數據表的數據不受影響
```

（數據取自 2.11 節的 ORDERS。）

**使用檢視的好處**

- 簡化複雜的查詢：把連接、分組等步驟寫成檢視，之後查詢時毋須重寫。
- 先分組計算，再對計算結果作比較，例如上例先求各產品的總銷量，再找出最大值。
- 保障數據私隱：只讓用戶存取檢視，隱藏敏感欄位或其他用戶的記錄，見[課題 c](c.html) 的 3.12 節。

經檢視修改數據有很多限制，一般把檢視當作只供讀取。

> ⚠ **〔樣本試卷卷二甲 5(d)〕檢視 V1 和 V2 分別計算 2005 年 1 月 1 日之前和之後開始上班的司機的平均薪酬（AVG1、AVG2）。(i) V1 的目的是甚麼？(ii) 寫出 SQL 求 AVG1 − AVG2。**
> ✔ (i) 找出在 1/1/2005 之前加入公司的司機的平均薪酬；(ii) `SELECT AVG1 - AVG2 FROM V1, V2`。兩個檢視各只有一行，FROM 列出兩者便可在同一行計算。

〔2012 練習卷卷二甲 3(e)〕列出評級高於 3 的餐廳數目最多的地區名稱：先建立檢視 `CREATE VIEW DISTRICT_VIEW AS SELECT DISTRICT, COUNT(*) AS CNT FROM RES WHERE RATING > 3 GROUP BY DISTRICT`，再 `SELECT DISTNAME FROM DISTRICT_VIEW, DIST WHERE CNT = (SELECT MAX(CNT) FROM DISTRICT_VIEW) AND DIST.DISTRICT = DISTRICT_VIEW.DISTRICT`。

## 2.14 SQL 常見失分

以下整理自 2025 年卷二甲的評卷原則，以及 2023 至 2025 年的考生表現評論：

- ✘ 數值加引號，例如 `JYEAR = '2012'`；文字和日期卻漏寫引號。
- ✘ 用 ≤、≥、≠ 代替 `<=`、`>=`、`<>`。
- ✘ 結構不當，例如 `… LIKE 'B88%' AND ORDER BY SD DESC`。
- ✘ 聚合函數放在 WHERE，例如 `WHERE PRICE = MAX(PRICE)`、`WHERE COUNT(*) > 1`；應改用子查詢或 HAVING。
- ✘ 判斷空值寫成 `= NULL`；應寫 `IS NULL`。
- ✘ 不知道 UNION 會刪除重複的行；把 MINUS 與 MIN 混淆。
- ✘ 需要加總時漏寫 SUM，列出了個別記錄。
- ✘ 描述 SQL 的目的時說不清楚：要逐個條件寫出，例如「物理部」「該日沒有進入」。
- ✔ 評卷接受功能相同的寫法，例如以連接代替子查詢、`LIKE 'B88*'` 代替 `LIKE 'B88%'`，以及多餘但不影響結果的連接；很輕微的錯誤亦可接受。

**實作建議**：在任何 SQL 系統（例如 MySQL 或 SQLite）建立本頁各節的示例數據表，逐句執行，對照本頁的結果；再把考評局寫法改成該系統的寫法（例如 MINUS 改為 EXCEPT、日期改為 `'2025-03-26'`），留意兩者的分別。

## 2.15 自我檢測

<details><summary>1. 寫出 SQL，在數據表 CUST 加入欄位 EMAIL，最多 40 個字符。</summary>

`ALTER TABLE CUST ADD EMAIL VARCHAR(40)`
</details>

<details><summary>2. <code>DELETE FROM CUST</code> 與 <code>DROP TABLE CUST</code> 有甚麼分別？</summary>

`DELETE FROM CUST` 刪除數據表內所有記錄，數據表的結構仍然存在；`DROP TABLE CUST` 把整個數據表連同結構移除。
</details>

<details><summary>3. 數據表 NURSE 有 NID、NAME、PT（薪級點）。寫出 SQL，把所有薪級點低於 18 的護士的薪級點加 1。</summary>

`UPDATE NURSE SET PT = PT + 1 WHERE PT < 18`
</details>

<details><summary>4. 以 2.5 節的 CAMP 為例，寫出 SQL 列出收費在 500 至 1000（包括兩端）的活動營名稱，按日數遞減排列。寫出結果。</summary>

`SELECT CNAME FROM CAMP WHERE FEE BETWEEN 500 AND 1000 ORDER BY DAYS DESC`。結果：攝影營（3 日）、攀石營（2 日）。
</details>

<details><summary>5. 以 2.6 節的 STAFF 為例，<code>SELECT COUNT(*), COUNT(PHONE) FROM STAFF</code> 的結果是甚麼？為甚麼兩個數字不同？</summary>

5 和 3。`COUNT(*)` 計算所有記錄；`COUNT(PHONE)` 只計算 PHONE 不是空值的記錄，有兩名員工的 PHONE 為空值。
</details>

<details><summary>6. 指出以下 SQL 的錯誤並改正：<code>SELECT CLASS, SUM(AMT) FROM DONATE WHERE SUM(AMT) > 80 GROUP BY CLASS</code></summary>

聚合函數不可放在 WHERE。應改為 `SELECT CLASS, SUM(AMT) FROM DONATE GROUP BY CLASS HAVING SUM(AMT) > 80`。
</details>

<details><summary>7. 以 2.9 節的數據表為例，寫出 SQL 列出參加「天文學會」的學生姓名和班別。</summary>

`SELECT SNAME, CLASS FROM STUDENT S, JOINCLUB J, CLUB C WHERE S.SID = J.SID AND J.CID = C.CID AND C.CNAME = '天文學會'`。結果：陳小明 4A、黃子軒 4A。
</details>

<details><summary>8. <code>SELECT * FROM STUDENT, JOINCLUB</code> 會輸出多少行？為甚麼？</summary>

16 行。沒有連接條件，STUDENT 的 4 個記錄與 JOINCLUB 的 4 個記錄逐一配對，得到 4 × 4 = 16 行。
</details>

<details><summary>9. 用兩種方法寫出 SQL，列出沒有參加任何學會的學生姓名。</summary>

外連接：`SELECT SNAME FROM STUDENT S LEFT JOIN JOINCLUB J ON S.SID = J.SID WHERE J.SID IS NULL`。子查詢：`SELECT SNAME FROM STUDENT WHERE SID NOT IN (SELECT SID FROM JOINCLUB)`。
</details>

<details><summary>10. 以 2.11 節的數據表為例，寫出 SQL 列出價格最低的產品名稱。為何不可寫成 <code>WHERE PRICE = MIN(PRICE)</code>？</summary>

`SELECT PNAME FROM PRODUCT WHERE PRICE = (SELECT MIN(PRICE) FROM PRODUCT)`，結果是原子筆。聚合函數不可直接放在 WHERE，處理 WHERE 時還未計算 MIN，必須以子查詢先求出最低價格。
</details>

<details><summary>11. SWIM 有 3 個學生編號，RUN 有 4 個，其中 2 個相同。<code>UNION</code>、<code>UNION ALL</code>、<code>INTERSECT</code> 各輸出多少行？</summary>

UNION：3 + 4 − 2 = 5 行；UNION ALL：7 行；INTERSECT：2 行。
</details>

<details><summary>12. 寫出使用檢視的兩個好處。</summary>

簡化複雜的查詢，毋須每次重寫連接和分組；可以先計算再比較（例如先求各組總數，再找最大值）；只讓用戶看到檢視中的欄位和記錄，保障數據私隱。（任何兩項）
</details>
