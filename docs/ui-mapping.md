# 雙平台對照表

分兩部分：**元件對照**（UI Kit 每支元件在兩端有沒有對應實作）與 **主題色對照**（換主題時哪些 token 會變）。

# 元件對照表

UI Kit 的每一支元件，在 iOS 與 Android 上目前有沒有可以直接對應的共用元件。
**這份是給設計師用的**——畫面設計時先查這張表，就知道某個元件在哪一端要另外交付規格、
哪一端可以直接沿用既有樣式，不必等工程端回報才發現做不出來。

> 核對日期 2026-08-12 · 設計系統 `0.15.0` · iOS `develop`(7.43.1) · Android `develop`
> 核對方式：直接讀兩端原始碼的元件檔與 composable 宣告，**不看交接文件**（交接文件已知落後於實作）。

---

## 怎麼讀這張表

| 標記 | 意思 | 設計上代表什麼 |
|------|------|--------------|
| ✅ | 有共用元件，且對應到同一個東西 | 可以直接標註「用既有元件」，不必附規格 |
| ⚠️ | 有東西可以用，但不完全對位 | 樣式或行為會與設計稿有落差，**設計稿要額外說明差在哪** |
| ❌ | 沒有共用元件 | 各畫面自己刻，**每次設計都要附完整規格**，而且不同畫面會長得不一樣 |

「處理方式」欄寫的是**設計端接下來要做什麼**，不是工程端的修改步驟。

---

## 動作類

| 元件 | iOS | Android | 現況 | 處理方式 |
|------|:---:|:---:|------|---------|
| Button | ✅ | ✅ | 兩端都有完整樣式集，iOS 11 種、Android 對應齊全 | 直接標註樣式名即可 |
| IconButton | ✅ | ✅ | **三邊對齊得最好的一支**，4 種尺寸 × 8 種樣式連順序都一致 | 無需處理 |
| Fab | ✅ | ✅ | 尺寸、圓角、圖示大小三邊逐格吻合 | 無需處理 |
| ChipBar | ⚠️ | ❌ | iOS 有單顆 `ChipView`，沒有橫向捲動的整列容器；Android 兩者皆無。Chip 在本產品有兩種用途——**條件篩選**（集點兌禮的任務與商城分類）與**選參數**（掃描兌獎的「電子／傳統發票」、手動對獎的期數，語意同 radio），目前都是各畫面自刻 | 設計稿標明是篩選還是選參數，並附捲動、選取、badge 規格；同時提出新增元件需求 |

## 表單類

| 元件 | iOS | Android | 現況 | 處理方式 |
|------|:---:|:---:|------|---------|
| TextField | ⚠️ | ✅ | Android 有單一元件且支援常駐提示文字；iOS 是**兩代並存**——2024 起的框線式元件已對齊設計系統，但 2019 的底線式舊元件用得更多，還活在 8 個畫面上（登入、OTP 驗證、綁定電子郵件載具、會員卡編輯 ×2、推薦碼、刪除帳號說明、第三方登入選帳號） | 新畫面正常畫，工程端有對齊的元件可用。**改到那 8 個舊畫面時要注意外觀會從底線變框線**，需重新出圖；已列入待修（見複核報告 C-15） |
| TextArea | ❌ | ❌ | **兩端都沒有多行輸入元件。**目前唯一的多行欄位是「刪除會員帳號」的原因說明，iOS 與 Android 各自硬刻一份；Android 的 TextField 寫死單行，開不了多行 | 出現新的多行輸入需求時**先提元件需求**，不要再各刻一份。在那之前，最小高度、行數、字數上限都要在設計稿寫明（見複核報告 C-16） |
| SearchField | ⚠️ | ✅ | **兩端都有共用的搜尋欄**，搜尋發票與愛心碼兩個畫面共用同一份設定，版面數值三邊一致（sunken 底、圓角 8、高 48、圖示 20）；iOS 那支的文字色與字級仍取自舊體系。系統搜尋列在 app 裡已經沒有活著的入口 | 直接標「用搜尋欄元件」即可，設計稿不需另附但書。**iOS 的顏色與字級已裁決要修**（見複核報告 X-16） |
| Select | ✅ | ⚠️ | 兩端都是「欄位 + 點開後的選單」兩層結構，與設計系統相同；iOS 逐項吻合，Android 的欄位圓角是 8（規格 12）、錯誤框線只有一半粗，且缺 focus 狀態 | 照「Select 欄位 + Sheet 選單」正常畫即可，**不需要在 Android 的三支 selector 之間挑**。**已裁決 Select 要有 focus 狀態**（開選單時亮 brand 框），Android 待補；圓角與錯誤框線同列待修（見複核報告 C-17、X-17） |
| Checkbox | ✅ | ✅ | 兩端都有，且都支援錯誤狀態與帶連結的同意條款 | 無需處理 |
| Radio | ✅ | ✅ | 兩端都有單顆樣式 | 無需處理 |
| RadioGroup | ⚠️ | ❌ | iOS 的群組行為併在單顆元件裡；Android 只有單顆，群組排列各畫面自組 | 選項間距、分隔線、單選互斥行為**需在設計稿標註**，Android 尤其不會自動套用 |
| Switch | ⚠️ | ✅ | Android 有設計系統版本；iOS 用系統開關，只有全域染成品牌色 | iOS 開關的尺寸與軌道樣式**無法依設計稿調整**，設計時請沿用系統外觀 |
| PinInput | ❌ | ❌ | 沒有共用元件，但**產品上唯一用到分格輸入的手動對獎，兩端都已各自做好且長得一樣**（圓角、框線、字級、色彩逐項吻合）。要注意那是「顯示格＋自訂數字鍵盤」，不是逐格輸入框。OTP 驗證兩端仍用一般單一輸入欄，**只有 web 端用 PinInput** | 手動對獎照現況標即可，**不需附完整規格、也不需提共用元件需求**（已定案）。**OTP 若要改成三端一致的分格輸入需另提**——App 端會是搭自訂鍵盤，行為與 web 的逐格輸入不同 |
| Slider | ❌ | ❌ | 兩端都沒有，**產品目前也沒有實際使用**；設計系統是先備著 | **已定案雙平台不開發共用元件。**日後真的要用再提 |
| FieldGroup | ✅ | ⚠️ | **這支是「單一欄位的容器」（label + 欄位 + 說明），不是多欄位分組。**iOS 有 `GroupFormTextFieldView`，label 的字級、顏色、間距與設計系統逐項吻合；Android 是各畫面自己寫一個私有的 label，目前數值也對，但沒有共用元件擋住下次寫歪 | 直接標「欄位標題」即可，**不需要標分組間距那類數值**。Android 若同一版有多頁表單，可順帶請他們抽成共用的（低優先，不急） |
| FieldGroupHelpText | ✅ | ✅ | **兩端都有欄位層級的說明文字，且與設計系統逐項吻合**（16 的 info / 錯誤 icon、body-small、subtle / danger 兩色）——只是烘在輸入欄元件裡，不是獨立元件。「群組層級的說明文字」在 Figma 上不存在（FieldGroup 只有一個 Slot） | 無需處理。說明文字直接標在欄位下方 |

## 資訊呈現類

| 元件 | iOS | Android | 現況 | 處理方式 |
|------|:---:|:---:|------|---------|
| Tag | ⚠️ | ⚠️ | 兩端都有，但各缺一角：iOS 的「警告」樣式**誤用了中獎的黃色**；Android 少了「中獎淺色」與「警告深色」兩種 | 兩項都已列入待修清單。設計稿標註警告標籤時請一併備註「應為橘色系」 |
| CategoryTag | ⚠️ | ✅ | Android 有獨立的分類標籤與圓形分類徽章兩支（圓形直徑 28 / 40）；iOS 的膠囊標籤併在一般標籤裡，圓形徽章**畫面上有但沒有元件**——硬刻在消費分析的列表列裡，直徑 30、只有一種尺寸 | **已裁決雙邊對齊、iOS 要補**（見複核報告 C-18）。設計稿可以正常標圓形分類徽章；**直徑待定**（建議沿用 Android 的 28 / 40），設計系統也要補圓形變體 |
| Badge | ⚠️ | ⚠️ | 紅點實際用在四處：TabBar、集點兌禮的金幣數、金幣紀錄列表的項目、IconButton。**有元件的地方都對**（Android 的 `NewNotifyDot` 12dp 逐項吻合、iOS 的 IconButton 紅點內建且正確），**沒用元件的地方各走各的**——iOS 的 TabBar 是把圓點字元塞進系統 badge、Android 的 TabBar 用了舊色，兩者與規格的紅不同色。**帶數字的版本兩端都沒有在用** | 紅點直接標即可，落差已列入待修（見複核報告 C-19）。**帶數字的通知數量標記先確認產品是否真的需要**——有需求才需要交付尺寸、位移與 99+ 規則 |
| Avatar | ❌ | ❌ | 兩端都沒有，**產品目前也沒有實際使用**；設計系統是先備著 | **已定案雙平台不開發共用元件。**日後真的要用再提 |
| Divider | ❌ | ✅ | **顏色三邊的實作已經一致，而且水平／垂直分得很乾淨**：水平（列間、區塊間）用 `border-subtle`（iOS 72 處、Android 52 處）、垂直（文字之間）用 `border-divider`（iOS 2 處、Android 2 處）。粗細一律 1。Android 有 `HorizontalDivider` / `VerticalDivider` 可用，iOS 沒有元件、37 個檔案各寫一次。**真正不一致的是水平線要不要內縮**：web 列間內縮 16、Android 幾乎全滿版、iOS 兩種都有 | 設計稿標「**列間**（內縮 16）」「**區塊間**（滿版）」或「**文字間**（垂直）」即可，**不要標色票**——顏色由方向決定。內縮的收斂已列入待修（見複核報告 C-20） |
| ProgressBar | ⚠️ | ⚠️ | **通用長條進度在產品上沒有實際使用**，設計系統是先建。兩端唯一真的進度特化版是**半圓形進度，用在首頁的預算區塊**（兩端各 1 處）。<br>（先前記載的「啟動畫面進度」是誤判：iOS 的 `LaunchScreenProgressView` 只是 splash 底圖的遮罩，**裡面沒有進度也沒有轉圈**，唯一的轉圈已於 2026-01 移除。） | **已定案雙平台不開發共用元件。**半圓進度維持現狀、各自服務單一畫面，設計稿不需另附規格 |
| ProgressGroup | ❌ | ❌ | 兩端都沒有，**產品目前也沒有實際使用**；設計系統是先建 | **已定案雙平台不開發共用元件。**日後真的要用再提 |
| DottedController | ⚠️ | ⚠️ | **兩端都有，值也幾乎都對**：iOS 是系統 `UIPageControl` ×3（首頁財務卡、公告 Sheet、小工具導覽），Android 是 `HomeFragment` 裡的私有 composable（8dp、間距 8，與設計系統吻合）。但 iOS 的尺寸與間距改不動、沒有 overlap 版，公告 Sheet 還用了舊色 | **已裁決要建共用元件**（見複核報告 C-21），兩端都做。設計稿可以正常標圓點樣式，含 overlap（照片上）那種 |
| ListItem | ❌ | ⚠️ | iOS 完全沒有共用元件（43 個 table cell + 23 個 collection cell 子類）；Android 的**設定類列已經收斂成 `SettingItemCompose`**（28 處引用、4 個畫面，token 正確），但它在 app 層、也只有一種型態 | **已裁決要建共用元件**（見複核報告 C-22），兩端都做。在建好之前，列高、左右內距、次要文字字級**每張設計稿仍要標** |
| CardItem | ❌ | ❌ | 兩端都沒有。iOS 的 `CardBannerView` 是 0 引用的死碼；Android 有 77 處 `Card(` 呼叫、11 個檔案自己寫圓角 | **已裁決要建共用元件**（見複核報告 C-22）。在建好之前，卡片內距與圓角需逐張標註 |
| ListHeader | ✅ | ✅ | **兩端都有，而且與設計系統逐項吻合**——用在個人設定頁每個區塊的表頭（`label-medium`、`content-subtle`、上 16 下 8 左右 16）。只是都寫在畫面裡，不是獨立元件。Android 的表頭另有一層 `background-sunken` 底色，**那是該平台的常態用法，不算落差**。iOS 另有一支 2019 的舊表頭元件，但設定頁沒有用它 | 直接標「區塊表頭」即可，不需附規格 |
| ListFooter | ✅ | ✅ | **兩端都有，而且逐項相同**——用在個人設定頁最下方的版本號（`body-medium`、`content-subtle`、靠右、上 8 下 16 左右 16）。同樣是寫在畫面裡，不是獨立元件 | 直接標「區塊表尾」即可，不需附規格 |

## 回饋類

| 元件 | iOS | Android | 現況 | 處理方式 |
|------|:---:|:---:|------|---------|
| Banner | ✅ | ✅ | 兩端都有，且都支援多種語意色 | 無需處理 |
| Dialog | ✅ | ✅ | 兩端都是自訂實作，都有插圖與危險操作樣式。Android 的按鈕只能左右並排，**但直排版型目前沒有實際應用，已裁決不修** | 危險操作照現況用橫排即可，**設計稿不需標直排**（見複核報告 C-08） |
| Toast | ✅ | ✅ | **rich 與 loading 兩態兩端都有，數值幾乎全中**。rich（spinner + 階段文字 + 取消）用在**匯款帳戶頁等 API 回傳**：iOS `ToastView`、Android `SyncProgressToast`；loading（只有 spinner）就是**打 API 等待回應時的置中轉圈**：iOS 走 `ProgressHUDManager`（222 處）、Android 走 `LoadingComponent`。**唯一落差是 loading 的圓角**——設計系統 16、兩端都是 8，**已裁決以 16 為準、兩端改**；spinner 顏色也一併統一為 `border-inverse-plain`。<br>另有一支 `ToastUtil` 雖然叫 Toast，35 處全是「歸戶成功」「條碼格式不符」這類**操作結果通知**——語意上屬於 SnackBar | 兩種 Toast 都**直接標即可，不需附規格**。結果通知一律標 SnackBar（見複核報告 C-05、C-10） |
| SnackBar | ✅ | ⚠️ | 兩端都有。**Android 有兩套**：Compose 畫面用的那套（53 處）與設計系統逐項吻合，View / XML 畫面用的那套（25 處）三個顏色都是舊色，**深色模式下兩者一深一淺**。兩套都放在 `app` 而不是設計系統模組，所以設計系統改版時不會被一起盤點 | 直接標「SnackBar」即可，**深色模式的不一致已列入待修**（見複核報告 C-23） |
| InAppNotification | ✅ | ❌ | iOS 有完整實作，Android 完全沒有 | 這是唯一一支 iOS 有、Android 全無的元件。**需先確認產品是否真的需要雙平台一致** |
| Tooltip | ✅ | ✅ | 兩端都有，且都有浮動與行內兩種 | 方向數量未逐一核對，設計稿請標明指向 |
| Spinner | ⚠️ | ✅ | Android 有共用載入元件；iOS 各元件內各自使用系統轉圈，沒有統一入口 | iOS 載入指示器**尺寸與顏色由各元件自訂**，設計稿要指定時需個別標註 |
| PageStatus | ✅ | ✅ | 兩端都有空狀態／錯誤狀態元件 | 插圖風格與預設文案是否統一，仍待設計端裁決 |

## 頁面框架類

| 元件 | iOS | Android | 現況 | 處理方式 |
|------|:---:|:---:|------|---------|
| NavigationBar | ⚠️ | ✅ | **Android 收得很乾淨**：`core/designsystem` 有一支底層 `AppBar`，對外三個入口——`TopBackAppBar`（返回）／`TopCloseAppBar`（關閉）／`TopTitleAppBar`（無返回），每支都有 **Regular／Large 兩種樣式** 與 **Default／Home 兩種型**（Large-Home 就是標題靠左那種），34 個畫面共用；只有登入與 OTP 兩頁還吃 2019 的 XML `invos_simple_toolbar`（色票對、字級硬寫 16 bold）。<br>**iOS 沒有共用元件**（`INVOSUI` 裡沒有任何導覽列），**四條路徑並存**：①**系統列 token 版** `ViewControllerNavigationDecoratable`（2023，34 檔，`labelLarge` + `content-bold` + `background-default`，SwiftUI 畫面經 `SwiftUINavigationBar` 也走這條）②**系統列 2019 舊版** `SwiftBaseViewController.setupNavgationBar`（6 畫面：城市地圖、帳號授權 ×2、推薦好友、選擇會員卡、Logging，硬寫 17pt semibold、預設白字、舊色 `backgroundInvosMedium` / `primaryBlack`）③**自刻 UIView 列** `PlainNavBarView`（2026/5，4 畫面：消費分析 ×2、會員卡詳情、會員卡排序，高 56、17pt semibold、字色固定 `foreverWhite`，給彩底頁用）④**三個主 tab 各自的自刻列**（`HomeCustomNavBarView` / `InvoiceBookCustomNavBarView` / `CarrierCustomNavBarView`，高 56、`display` 大標題靠左、色票正確）。<br>兩處全平台落差：**iOS 完全沒有系統大標題**（`prefersLargeTitles` 全部為 false），大標題只存在於 ④ 手刻的三座 tab 列；**iOS 導覽列一律沒有底線**（三處 appearance 全把 `shadowColor` 關掉，四支自刻列也沒畫線），Android 的 `showDivider` 預設是 true。另有兩項數值差異屬平台慣例／規格未落地：**一般列高 iOS 44、Android 64（M3）**；**大標題字重規格是 Bold 700，iOS 與 Android 都做成 Medium 500** | **設計稿標「一般標題／大標題」＋「底線有／無」即可，不要標高度與字重**——高度按平台慣例走，字重待裁決（規格 700、兩端都 500，建議改規格為 500）。**iOS 要指明走哪一條**：彩底頁（分析、會員卡）是 ③、主 tab 是 ④、其餘走 ①；**②那 6 個舊畫面改動時外觀會從 17pt 白字變 16pt `content-bold`，需重新出圖**。<br>**兩項需另外處理**：iOS 沒有大標題導覽列——設計稿要用大標題就得標明是手刻，或提出收斂需求；iOS 導覽列底線畫不出來——標了底線 iOS 做不到（與 [component-usage.md](./component-usage.md) 分隔線形態① 相關）。**iOS 四條路徑收斂成一支共用元件建議列入待修**（尚未編號）。search／tabs 兩型兩端都是在畫面層自己把搜尋欄或 Tabs 接在導覽列下方，不是元件參數，設計稿照常標即可 |
| TabBar | ⚠️ | ⚠️ | **兩端都是平台原生容器，而且整個 app 各只有一座**：iOS 是 `UITabBarController` 子類（`InvoiceMainViewController`）、Android 是 Material `BottomNavigationView`（`activity_main.xml`）。樣式都已收斂在單一處（iOS `setupTabBarAppearance()`，換主題時重跑；Android `MainActivity.initView()`），**五個分頁的順序與圖示兩端一致**，**選中圖示都有線框／實心兩套**（iOS `selectedImage`、Android selector drawable，都是 24），**顏色三邊逐項吻合**（未選 `content-subtlest`、選中圖示 `content-brand-default`、選中文字 `content-bold`、底色 `background-default`）。落差三處：**標籤字級 iOS 走系統預設（10、選中不變粗）、Android 明寫 12sp 且選中轉粗**；**紅點兩端都沒用 token**（iOS 把 `●` 字元塞進系統 badge、上系統紅，Android 用舊色 `invosError`），**帶數字的版本兩端都沒有在用**；**上緣分隔線 Android 明畫 1dp `border-subtle`、iOS 用系統預設 hairline** | **不必做成共用元件**——兩端都只有一座、樣式已集中在一處，再封裝沒有實益。設計稿標「底部導覽」即可，不需附版面規格。**字級仍待裁決**（設計系統目前是 10、Android 是 12；建議收斂為 12，iOS 要改需明寫 font）；紅點色與分隔線色的落差併入待修（紅點見複核報告 C-19） |
| Tabs | ✅ | ✅ | 兩端都有分頁切換列 | **Tabs 是導覽**（分頁切換、頁面內章節錨點）；篩選與選參數屬於 ChipBar，不要拿 Tabs 頂替（判準見 [usage.md](./usage.md)） |
| PageNavigation | ⚠️ | ⚠️ | **兩端都沒有共用元件，但這個樣式各有 2 支實作、涵蓋 3 個畫面**：①**我的發票列表 / 載具發票**（兩畫面共用一支——iOS `InvoiceBookTermView` 切期數、Android `BaseInvoiceBookPagerCompose.TermSelectorRow`）②**發票分類明細的月份選擇列**（iOS `InvoiceCategoryVC.makeMonthSwitchView()`、Android `InvoiceCategoryDetailActivity.YearMonthSelectorRow`）。<br>**②那組兩端逐格吻合，而且已經對齊設計系統**——可點區 40（圖示 24 + 內距 8）、標籤 `body-large` / `content-default`、垂直內距 4、元素間距 16、disabled alpha 0.4，全部相同。只多了兩件事：**上下各一條 1px 分隔線**（`border-subtle`）與**標籤本身可點，點了開年月選單**（iOS 年月輪盤、Android `MonthPicker` 底部面板）。**這兩件事設計系統已於 0.15.0 之後補上**——`divider` 與 `onLabelClick` 兩個 prop；但**Figma 的 divider 只有下底線**，所以兩端多畫的那條**上框線**是規格外的。<br>**①那組兩端互不一致，也不符規格**：圖示 20（規格 24）、標籤用 `content-bold`（規格 `content-default`）、可點區 iOS 32×32 / **Android 只有 20×20**（圖示外沒有內距，低於觸控下限）、disabled iOS `content-subtle` + alpha 0.4 / Android `content-subtlest` 不降透明度、容器 iOS 固定高 56 / Android `padding(16)`、①的標籤兩端都不可點 | **應建共用元件，以②為基準**（該組已三邊對齊，抄過來成本最低）。<br>**設計系統的兩個缺口已補**：`divider`（**只有下底線**，預設關）與 `onLabelClick`（傳了標籤才變成可點按鈕，預設是純文字）——設計稿現在標「上一頁／標籤／下一頁」＋**標籤可不可點**＋**要不要下底線**即可，元件都做得出來（細則見 [component-usage.md](./component-usage.md#pagenavigation)）。<br>**兩端待修三項**（見複核報告 C-24）：①的圖示 20→24、標籤色 `content-bold`→`content-default`、**Android 可點區 20→40**（可先單獨修，不必等元件化）；另外**②多畫的上框線要拿掉**，Figma 只有下底線。舊版消費分析頁也有類似的區間切換列，但**整頁都還沒進設計系統，不列入對照** |
| Sheet | ✅ | ✅ | 兩端都有底部彈出面板 | 無需處理 |
| SheetHeader | ⚠️ | ✅ | Android 有獨立的面板標題元件；iOS 內建在面板裡，**不能單獨使用** | iOS 的面板標題**只能用內建的兩種**（大標題／一般），設計稿超出這兩種需另提 |

---

## 反向清單：原生有、設計系統沒有

這些是兩端已經在用、但 UI Kit 裡沒有對應元件的東西。**設計時如果需要這些，是有東西可以用的**，只是設計系統沒有描述它們。

| 東西 | iOS | Android | 說明 |
|------|:---:|:---:|------|
| 數字鍵盤 | ✅ | ✅ | 自訂的九宮格數字鍵盤（含清除、退格）。兩端都只服務手動對獎，是那頁分格輸入的實際輸入方式 |
| 年月選擇 | ✅ | ✅ | 兩端都有滾輪式年月選擇 |
| 日期選擇 | — | ✅ | Android 另有自訂日期對話框，但**已定案雙平台不做共用元件**，採原生或套件 picker（見 [usage.md](./usage.md) 日期選擇條目）——設計稿不需標註日期選擇器樣式 |
| 條碼／QR 顯示 | ✅ | ✅ | 發票條碼與 QR 的顯示元件 |
| 下拉重新整理 | — | ✅ | 含品牌色指示器 |
| 載入骨架動畫 | — | ✅ | 內容載入時的閃爍佔位 |
| 動畫播放 | ✅ | — | Lottie 動畫容器 |
| 評分邀請 | ✅ | — | App Store 評分引導 |
| 分享列 | ✅ | — | 分享按鈕群組 |

---

# 主題色對應表

App 有「換主題色」功能：用戶選定主題後，**品牌色系的 token 會被整組換成該主題的顏色**，明暗模式各換一套。
本節的規格來源是 Figma [🎨 Design System 2025 — Color token / Theme](https://www.figma.com/design/FcUQOflk2OdZ2z2imVEcIw/%F0%9F%8E%A8-Design-System-2025?node-id=1128-6580)。

## 六套主題的三種叫法

同一套主題在三個地方叫不同名字，交接時最容易對錯。**設計稿用中文名，程式與 token 用英文名。**

| 產品名（Figma 表頭） | 設計系統 token | Figma 色階名 | 色相 |
|------|------|------|------|
| 白雪公主的蘋果 | `theme-apple` | `theme-red-*` | 紅 |
| 綠光 | `theme-green` | `theme-green-*` | 綠 |
| 少女粉色系 | `theme-girl` | `theme-pink-*` | 粉 |
| 湖中女神 | `theme-lake` | `theme-teal-*` | 藍綠 |
| 薰衣草 | `theme-lavender` | `theme-purple-*` | 紫 |
| 鐵漢柔情 | `theme-rock` | `theme-gray-*` | 灰藍 |

預設（未換主題）用的是 `blue-*` 色階。

## 哪些 token 會跟著主題變

Figma 標示會跟主題走的共 **17 個**；**兩個平台實際實作的是 15 個**。
「階」欄位是該 token 在明／暗模式下取用的色階號——六套主題都取同一階，只是換色相。

| Token | 明亮模式 | 深色模式 | iOS | Android | 用途 |
|------|:---:|:---:|:---:|:---:|------|
| `color-content-brand-default` | 500 | 400 | ✅ | ✅ | 內容要呈現品牌色，例如主要按鈕 |
| `color-content-brand-hover` | 600 | 300 | ✅ | ✅ | 同上，hover 狀態 |
| `color-content-brand-active` | 700 | 200 | ✅ | ✅ | 同上，點擊狀態 |
| `color-content-brand-subtle` | 300 | 600 | ✅ | ✅ | 內容在對比高的品牌色背景上 |
| `color-content-brand-bold` | 700 | 200 | ✅ | ✅ | 內容在對比低的品牌色背景上 |
| `color-content-inverse-brand` | 400 | 500 | ✅ | ✅ | 內容在明亮模式的深色背景上 |
| `color-content-fixed-brand` | 500 | 500 | ✅ | ✅ | 內容在明暗模式皆為淺色的背景上 |
| `color-background-brand-default` | 500 | 預設 500 / 主題 400 | ✅ | ✅ | 背景要呈現品牌色，例如主要按鈕 |
| `color-background-brand-hover` | 600 | 300 | ✅ | ✅ | 同上，hover 狀態 |
| `color-background-brand-active` | 700 | 200 | ✅ | ✅ | 同上，點擊狀態 |
| `color-background-brand-subtle` | 300 | 600 | ✅ | ✅ | 淺色的品牌色背景 |
| `color-background-brand-subtlest` | 100 | 800 | ✅ | ✅ | 對比低的品牌色背景 |
| `color-background-brand-bold` | 700 | 200 | ✅ | ✅ | 深色的品牌色背景 |
| `color-background-brand-boldest` | 800 | 100 | ✅ | ✅ | 對比高的品牌色背景 |
| `color-border-brand` | 500 | 400 | ✅ | ✅ | 品牌色調的元件邊線 |
| `color-content-brand-gradient-primary` | 500 | 500（同明亮） | ⚠️ | ⚠️ | 品牌漸層的主要顏色 |
| `color-content-brand-gradient-secondary` | 預設 cyan-400 / 主題 300 | 同明亮 | ⚠️ | ⚠️ | 品牌漸層的次要顏色 |

> 漸層的兩個 token 是表上唯一**明暗模式取同一階**的——其餘 15 個都會隨模式換階。

## 漸層色

首頁歡迎詞的漸層跑動效果會跟著主題換色，但雙平台都沒有使用這兩個 gradient token。

| 情境 | iOS | Android |
|------|------|------|
| 預設主題 | 硬寫 `#00D3F7` + `#3560FF`（兩色） | 硬寫 `#3560FF` + `#00CDF1` + `#3560FF`（三色） |
| 已換主題 | `content-brand-subtle` + `content-brand-default` | `content-brand-default` + `content-brand-subtle` + `content-brand-default` |

雙平台漸層色在深色模式的變色時機點也不同

| 情境 | 行為 | 是否符合規格 |
|------|------|:---:|
| 預設主題 | 硬寫 hex，明暗共用 → 不變 | ✅ |
| 已換主題 · Android | 隨模式重新解析 → 會變色 | ❌ |
| 已換主題 · iOS | 切換當下不變，該區塊重建後才變 → 延遲變色 | ❌ |

> **已決定維持現狀**（2026-08-12）：漸層的實作方式可接受，不做更動。
> 上表列出的差異僅供日後查閱，不需開票處理。設計稿標註漸層時直接沿用現況即可。

## 舊 token 的對應

少數頁面（載具管理、我的發票、消費分析）仍在用舊版 token，雙平台有新舊對應機制。

| 舊 token | 對應到 |
|------|------|
| `themeLight` | `color-background-brand-subtle` |
| `themeMedium` | `color-background-brand-default` |
| `themeDark` | `color-background-brand-bold` |

---

## 這份表沒有回答的事

- **只查到「元件存不存在」與「主要變體對不對得上」**，沒有逐一核對每個屬性的數值。標 ✅ 的元件仍可能有間距或字級差異。
- **未逐項核對**：Tooltip 的方向數量、PageStatus 的狀態種類與文案、ListItem 的尾端元素。
- 樣式層級的落差（字重、字距、等寬字）不在這張表裡，見雙平台對齊複核報告。

## 維護方式

**這份表會過期。** 兩端的元件持續在長，而這份是 2026-08-12 的快照。
建議在每次設計系統改版、或每季規劃前重新核對一次；核對方式是直接讀兩端原始碼的元件清單，
