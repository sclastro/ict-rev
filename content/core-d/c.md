## 3.1 課程要求

了解變量、常數和簡單列表（單陣列），並使用於不同的問題情境；使用運算符（算術運算符包括加、減、乘、除和模數；關係運算符包括等於、不等於、大於、大於或等於、小於、小於或等於；布爾運算符包括 AND、OR 和 NOT）、算式、賦值語句、輸入和輸出語句；了解並使用序列、選擇和迭代（不需要嵌套循環）構造編寫程式；建立程式解決問題，例如在列表中查找最小值、最大值和平均值，搜索列表中的項目並輸出結果，找出字串的長度，從字串中提取所需的字符，計算符合指定條件的項目總數，檢查列表中的值是否按次序排列，使用數學公式。

本頁的程式碼一律用 Python。卷一乙部的程式題容許 Python 或 C++（2027 年或以前亦可用 Pascal）作答，考生須在答題簿上註明所用的語言。

## 3.2 Python 程式的基本元素

```python
# 計算長方形的面積（# 之後是註釋，不會執行）
LENGTH = 12            # 常數：慣例以大寫命名，表示數值不應改變
width = float(input("輸入闊度："))
area = LENGTH * width
print("面積是", area)
```

**變量**是有名稱的儲存位置，數值可以改變；**常數**在程式執行期間不應改變。Python 沒有真正的常數，慣例以全大寫的名稱表示。

| 命名規則 | 有效 | 無效 |
|---|---|---|
| 以字母或底線開始 | `total_score`、`_count` | `1st_place` |
| 只可包含字母、數字、底線 | `price2` | `user-name`、`my score` |
| 不可使用保留字 | `for_count` | `for`、`while`、`True` |
| 區分大小寫 | `Score` 與 `score` 是兩個不同的變量 | |

好的變量名稱應有意義，例如用 `total_mark` 而不用 `t`。

**縮排**：Python 以縮排標示哪些語句屬於 `if`、`for`、`while` 或函數之內。考評局指出，Python 的縮排錯誤屬影響程式流程的嚴重錯誤，不會給分；遺漏 `if`、`for` 末尾的冒號則屬輕微錯誤。

## 3.3 數據類型與類型轉換

| 課程的數據類型 | Python | 例子 |
|---|---|---|
| 整數 | `int` | `25`、`-3` |
| 實數 | `float` | `3.14`、`82.0` |
| 字符、字串 | `str`（Python 沒有獨立的字符類型，字符即長度為 1 的字串） | `'A'`、`"STEAM"` |
| 布爾 | `bool` | `True`、`False` |
| 單陣列 | `list` | `[68, 84, 82, 80, 92]` |

`input()` 一律傳回**字串**，用作計算前必須轉換：

| 語句 | 結果 |
|---|---|
| `int("25")` | `25` |
| `float("10.5")` | `10.5` |
| `int(3.9)` | `3`（捨去小數部分，不是四捨五入） |
| `str(25)` | `"25"` |
| `int("5.7")`、`int("abc")` | 運行時錯誤（ValueError） |
| `"10" + "20"` | `"1020"`（字串相連，不是相加） |

## 3.4 運算符與算式

**算術運算符**

| 運算 | Python | 例子 | 結果 |
|---|---|---|---|
| 加、減、乘 | `+` `-` `*` | `7 * 3` | `21` |
| 除 | `/` | `7 / 2` | `3.5`（結果必為實數，`6 / 2` 得 `3.0`） |
| 求商（整數除法） | `//` | `7 // 2` | `3` |
| 求餘數（模數） | `%` | `7 % 2` | `1` |
| 乘冪 | `**` | `2 ** 3` | `8` |

**關係運算符**：`==`（等於）、`!=`（不等於）、`>`、`>=`、`<`、`<=`，結果是 `True` 或 `False`。

**布爾運算符**：`and`、`or`、`not`。

**運算次序**：括號 → `**` → `*` `/` `//` `%` → `+` `-` → 關係運算符 → `not` → `and` → `or`。例如 `12 + 8 / 2 ** 2` 先計 `2 ** 2 = 4`，再計 `8 / 4 = 2.0`，結果是 `14.0`。

**由偽代碼轉為 Python**

| 偽代碼 | Python |
|---|---|
| `X ← X + 1` | `x = x + 1` 或 `x += 1` |
| `如果 A = B` | `if a == b:` |
| `A <> B` | `a != b` |
| `(A / 2) 的餘數` | `a % 2` |
| `(P / Q) 的商` | `p // q` |
| `((L + R) ÷ 2) 的整數部分` | `(l + r) // 2` |
| `AND`、`OR`、`NOT` | `and`、`or`、`not` |
| `輸入 N`（整數） | `n = int(input())` |
| `輸出 S` | `print(s)` |

⚠ 賦值用一個等號 `=`，比較用兩個等號 `==`。在 `if` 的條件中寫 `if a = b:` 屬語法錯誤。

## 3.5 輸入與輸出

```python
name = input("輸入姓名：")
price = float(input("輸入價錢："))
qty = int(input("輸入數量："))
total = price * qty
print("顧客：", name)
print(f"總額：${total:.2f}")      # f 字串；:.2f 顯示兩個小數位
print(round(total, 1))            # 四捨五入至一個小數位
```

`print()` 可輸出多個項目，以逗號分隔，項目之間自動加一個空格。f 字串以 `{}` 嵌入變量的值。

## 3.6 列表（單陣列）

Python 以**列表**實現單陣列。

```python
marks = [42, 78, 65, 91, 56]
print(marks[0])          # 第一個元素：42（索引由 0 開始）
print(marks[4])          # 最後一個元素：56
print(len(marks))        # 元素數目：5
marks[2] = 70            # 修改第三個元素
for i in range(0, len(marks)):
    print(i, marks[i])
```

- 長度為 N 的列表，索引由 0 至 N − 1；存取 `marks[5]` 會引致運行時錯誤（IndexError）。
- 列表必須先建立才可按索引存取，例如 `scores = [0] * 10` 建立十個 0。
- `marks[-1]` 表示最後一個元素，屬 Python 的寫法。

**題目的陣列索引由 1 開始時**：Python 程式應沿用題目的索引，不用 `L[0]`。例如題目註明分數存於 `JS[1]` 至 `JS[5]`，循環就寫 `for i in range(1, 6):`。2025 年評卷參考的 Python 答案正是這樣處理。

## 3.7 選擇結構

```python
mark = int(input("輸入分數："))
if mark >= 80:
    grade = "Distinction"
elif mark >= 40:
    grade = "Attained"
else:
    grade = "Unattained"
print(grade)
```

- `if`、`elif`、`else` 末尾要加冒號，下一行要縮排。
- `elif` 只在前面所有條件都不成立時才檢查，適合多向選擇。
- 範圍檢查可寫 `if 18 <= age <= 60:`，也可寫 `if age >= 18 and age <= 60:`。

## 3.8 迭代結構

**for 循環與 range()**

| 寫法 | 產生的數 | 對應偽代碼 |
|---|---|---|
| `range(5)` | 0, 1, 2, 3, 4 | 設 i 由 0 至 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 | 設 i 由 1 至 5 |
| `range(2, n + 1)` | 2, 3, …, n | 設 i 由 2 至 N |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 | |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 | 設 i 由 5 下至 1 |

⚠ `range(a, b)` **不包括** b。考評局指出，2025 年不少考生把「設 i 由 2 至 N」寫成 `range(2, N)`，少做了最後一次。

**while 循環**（前測循環）

```python
total = 0
day = 1
while day <= 7:
    steps = int(input())
    total = total + steps
    day = day + 1
print(total)
```

**以 while 循環驗證輸入**

> ⚠ **〔2025 卷一乙 8(c)(ii)〕完成程式，確保評判輸入的分數 sc 有效，即 0 ≤ sc ≤ 100。**
> ✔ `while sc < 0 or sc > 100:`，也可寫 `while not (sc >= 0 and sc <= 100):`。
> ✘ 寫成 `while sc < 0 and sc > 100:`：沒有數值能同時小於 0 和大於 100，循環永不執行。

```python
sc = int(input())
while sc < 0 or sc > 100:
    print("Invalid input. Please input again.")
    sc = int(input())
```

Python 沒有後測循環，須要「最少執行一次」時，可先執行一次再以 `while` 重複（如上例），或用 `while True:` 配合 `break`。`break` 和 `continue` 屬延伸內容，以旗標控制循環同樣可行。課程不要求嵌套循環。

## 3.9 函數

```python
def calc_bmi(weight, height):      # weight、height 是參數
    return weight / (height ** 2)

bmi = calc_bmi(60, 1.65)           # 60、1.65 是傳入的值（引數）
print(round(bmi, 1))               # 22.0
```

- `def` 定義函數，`return` 傳回結果並結束函數。
- 函數可以沒有 `return`，只執行工作（相當於程序）。
- 把各項工作寫成函數，主程式只須依次呼叫，結構較清晰，也方便重用和測試。

## 3.10 必須掌握的程式

### 最小值、最大值和平均值

```python
def find_max(L):
    max_val = L[0]
    for i in range(1, len(L)):
        if L[i] > max_val:
            max_val = L[i]
    return max_val

def find_min(L):
    min_val = L[0]
    for i in range(1, len(L)):
        if L[i] < min_val:
            min_val = L[i]
    return min_val

def find_mean(L):
    total = 0
    for i in range(0, len(L)):
        total = total + L[i]
    return total / len(L)

temps = [28.5, 30.2, 31.0, 29.8, 33.5, 27.0, 30.5]
print(find_max(temps), find_min(temps), find_mean(temps))
```

> ⚠ **〔2025 卷一乙 8(c)(i)〕五名評判的分數存於 JS[1] 至 JS[5]。以 Python 編寫程式，計算 Smax、Smin 和 FS（刪去最高分和最低分後，其餘三個分數的平均值）。**
> ✔ 評分要點：求最大值（循環前 `Smax = 1`，循環內 `if JS[i] > JS[Smax]: Smax = i`）、求最小值、求總和（循環前 `FS = 0` 或以 `JS[1]` 開始）、計算 `FS = (FS - JS[Smax] - JS[Smin]) / 3`、整體正確（循環範圍正確、保留 JS 原有的值、沒有引致錯誤的多餘語句）。
> ✘ 循環寫成 `range(2, N)`；Smax、Smin 或 FS 沒有設初始值；只加 JS[2] 至 JS[5]；以 `or` 代替 `and`；為找出極端值而改動了 JS 的內容。

```python
N = 5
Smax = 1
Smin = 1
FS = JS[1]
for i in range(2, N + 1):
    FS = FS + JS[i]
    if JS[i] > JS[Smax]:
        Smax = i
    elif JS[i] < JS[Smin]:
        Smin = i
FS = (FS - JS[Smax] - JS[Smin]) / 3
```

⚠ 若題目的索引由 1 開始，`JS` 須預留 `JS[0]` 不用，例如 `JS = [0, 68, 84, 82, 80, 92]`。

### 搜索列表中的項目並輸出結果

```python
present = [2, 6, 9, 10, 12, 15, 18, 21]
target = int(input("輸入班號："))
found = False
i = 0
while i < len(present) and not found:
    if present[i] == target:
        found = True
    else:
        i = i + 1
if found:
    print("在索引", i, "找到")
else:
    print("找不到")
```

找到後 `found` 變成 `True`，循環隨即停止，毋須檢查餘下的元素。Python 的 `in` 運算符（例如 `target in present`）可直接判斷項目是否存在，屬延伸內容；題目要求寫出搜尋步驟時，不宜只寫 `in`。

### 找出字串的長度

```python
s = input("輸入字串：")
print(len(s))            # 內建函數

count = 0                # 不用 len()，逐個字符計算
for ch in s:
    count = count + 1
print(count)
```

### 從字串中提取所需的字符

字串和列表一樣，可以用索引存取個別字符。

```python
prod_id = "2025-BEV-045"
year = ""
for i in range(0, 4):            # 索引 0 至 3：年份
    year = year + prod_id[i]
category = prod_id[5] + prod_id[6] + prod_id[7]
print(year, category)            # 2025 BEV
```

Python 的切割寫法 `prod_id[0:4]`、`prod_id[5:8]` 可得到相同結果（不包括終點索引），屬延伸內容。

### 計算符合指定條件的項目總數

```python
marks = [42, 78, 65, 91, 56, 73, 38, 69]
count = 0
for i in range(0, len(marks)):
    if marks[i] >= 50:
        count = count + 1
print("合格人數：", count)
```

計算雙數的數目，條件改為 `marks[i] % 2 == 0`；計算字串中某字符出現的次數，改為逐個字符比較。

### 檢查列表中的值是否按次序排列

```python
def is_ascending(L):
    for i in range(0, len(L) - 1):
        if L[i] > L[i + 1]:
            return False
    return True

print(is_ascending([1, 3, 5, 5, 8]))    # True
print(is_ascending([3, 5, 4, 8]))       # False
```

- N 個元素只須比較 N − 1 對相鄰元素，所以循環到 `len(L) - 1` 為止；若寫 `range(0, len(L))`，最後一次會存取 `L[len(L)]`，引致運行時錯誤。
- 檢查遞減次序，把條件改為 `L[i] < L[i + 1]`。
- 〔2024 卷一乙 4(c)〕檢查陣列是否按升序排列，條件寫 `A[i] > A[i+1]`，索引由 0 至 4（六個元素）。

### 使用數學公式

```python
# 每月按揭還款額 M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)
P = float(input("貸款額："))
annual_rate = float(input("年利率（例如 0.04）："))
years = int(input("年期："))
r = annual_rate / 12
n = years * 12
M = P * r * (1 + r) ** n / ((1 + r) ** n - 1)
print(f"每月還款：${M:.2f}")
```

⚠ 分母要加括號。考評局指出，把 `(left + right) / 2` 寫成 `left + right / 2` 屬影響邏輯的錯誤，不會給分。

## 3.11 自我檢測

<details><summary>1. 以下哪些是 Python 的有效變量名稱？total_score_1、1st_result、user-name、while、_count</summary>

`total_score_1` 和 `_count`。`1st_result` 以數字開始，`user-name` 含連字號，`while` 是保留字。
</details>

<details><summary>2. 寫出以下算式的結果：(a) 22 // 5 (b) 22 % 5 (c) 22 / 5 (d) 2 ** 3 + 1</summary>

(a) `4`；(b) `2`；(c) `4.4`；(d) `9`。
</details>

<details><summary>3. 執行 counter = 5，然後 counter *= 2 + 1。counter 的值是多少？</summary>

`15`。複合賦值先計算右邊的 `2 + 1 = 3`，再計 `5 * 3`。
</details>

<details><summary>4. 程式員寫了 radius = input("半徑：")，然後計算 3.14 * radius ** 2，結果出錯。為甚麼？怎樣更正？</summary>

`input()` 傳回字串，不能用作數學運算。應寫 `radius = float(input("半徑："))`。
</details>

<details><summary>5. 寫出 range(10, 2, -2) 產生的數。</summary>

10, 8, 6, 4（不包括 2）。
</details>

<details><summary>6. 把偽代碼「如果 (N / 2) 的餘數 = 0 則 輸出 "Even" 否則 輸出 "Odd"」轉為 Python。</summary>

```python
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
```
</details>

<details><summary>7. 以下程式要找出最快的時間，為甚麼結果錯誤？fastest = 0；for t in times: if t < fastest: fastest = t（times = [10.05, 9.98, 10.12]）</summary>

`fastest` 的初始值 0 比所有時間都小，條件永不成立，結果錯誤地是 0。應以 `fastest = times[0]` 作初始值。
</details>

<details><summary>8. 以下程式要檢查列表是否按降序排列，執行時出錯：for i in range(len(arr)): if arr[i] < arr[i + 1]: return False。指出錯誤並更正。</summary>

最後一次 `i = len(arr) - 1`，`arr[i + 1]` 超出索引範圍，引致運行時錯誤。應改為 `for i in range(len(arr) - 1):`。
</details>

<details><summary>9. 編寫 Python 程式，計算列表 numbers 中所有單數的總和。</summary>

```python
total_odd = 0
for i in range(0, len(numbers)):
    if numbers[i] % 2 != 0:
        total_odd = total_odd + numbers[i]
print(total_odd)
```
</details>

<details><summary>10. 編寫函數 find_target(numbers, target)：找到 target 時傳回其索引，找不到傳回 −1。</summary>

```python
def find_target(numbers, target):
    for i in range(len(numbers)):
        if numbers[i] == target:
            return i
    return -1
```

找到即以 `return` 傳回，函數隨即結束。
</details>

<details><summary>11. 戲院票價：12 歲以下 $50，65 歲或以上 $40，其他 $80。以 if、elif、else 編寫程式。為甚麼第二個條件用 elif，而不用另一句 if？</summary>

```python
age = int(input())
if age < 12:
    price = 50
elif age >= 65:
    price = 40
else:
    price = 80
print(price)
```

用 `elif` 令三個情況互相排斥：只有前面的條件不成立時才檢查下一個，`else` 亦只在所有條件都不成立時執行。若用另一句 `if`，`else` 只與第二句配對，12 歲以下的人的票價會變成 80。
</details>

<details><summary>12. 字串 code = "INV-2024-HK"。不用切割，寫出提取年份 "2024" 的程式。</summary>

```python
year = ""
for i in range(4, 8):
    year = year + code[i]
print(year)
```
</details>
