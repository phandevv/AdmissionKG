# TRƯỜNG ĐẠI HỌC QUY NHƠN
## KHOA CÔNG NGHỆ THÔNG TIN






### ĐỀ CƯƠNG KHÓA LUẬN TỐT NGHIỆP
# NGHIÊN CỨU VÀ XÂY DỰNG HỆ THỐNG TƯ VẤN TUYỂN SINH THÔNG MINH DỰA TRÊN ĐỒ THỊ TRI THỨC (KNOWLEDGE GRAPH) VÀ MÔ HÌNH NGÔN NGỮ LỚN (LLM)


**Sinh viên thực hiện:** [Họ và tên sinh viên]  
**Mã số sinh viên:** [Mã số sinh viên]  
**Chuyên ngành:** Công nghệ phần mềm  
**Khóa học:** [Khóa học]  
**Giảng viên hướng dẫn:** [Họ và tên giảng viên hướng dẫn]  





*Quy Nhơn, tháng 8 năm 2026*

---

## MỤC LỤC
* [I. Đặt vấn đề](#i-đặt-vấn-đề)
  * [1. Lý do chọn đề tài](#1-lý-do-chọn-đề-tài)
  * [2. Mục tiêu nghiên cứu](#2-mục-tiêu-nghiên-cứu)
* [II. Tổng quan](#ii-tổng-quan)
* [III. Nội dung và phương pháp nghiên cứu](#iii-nội-dung-và-phương-pháp-nghiên-cứu)
  * [1. Đối tượng và phạm vi nghiên cứu](#1-đối-tượng-và-phạm-vi-nghiên-cứu)
  * [2. Nội dung nghiên cứu](#2-nội-dung-nghiên-cứu)
  * [3. Phương pháp nghiên cứu](#3-phương-pháp-nghiên-cứu)
* [IV. Kết quả/Sản phẩm dự kiến](#iv-kết-quảsản-phẩm-dự-kiến)
* [V. Tài liệu tham khảo](#v-tài-liệu-tham-khảo)
* [VI. Kế hoạch thực hiện đề tài](#vi-kế-hoạch-thực-hiện-đề-tài)

---

## I. Đặt vấn đề

### 1. Lý do chọn đề tài
Trong thời đại chuyển đổi số giáo dục mạnh mẽ hiện nay, nhu cầu tra cứu và tổng hợp thông tin tuyển sinh đại học của học sinh trung học phổ thông và phụ huynh ngày càng gia tăng. Tuy nhiên, công tác tuyển sinh tại Việt Nam hiện có nhiều bước chuyển biến phức tạp với sự đa dạng về các hình thức xét tuyển (như xét điểm thi THPT, xét điểm đánh giá năng lực, xét học bạ), hàng ngàn ngành đào tạo và biến động điểm chuẩn qua các năm [1]. Các nguồn thông tin hiện tại vẫn bị phân tán trên nhiều website rời rạc hoặc tồn tại dưới dạng các đề án tuyển sinh dạng văn bản PDF kéo dài, gây nhiều khó khăn cho việc tra cứu, đối chiếu và lựa chọn ngành học phù hợp.

Mặt khác, các giải pháp tìm kiếm hiện nay vẫn bộc lộ nhiều hạn chế. Công cụ tìm kiếm truyền thống chỉ tra cứu theo từ khóa đơn lẻ, không thể hiện được mối liên kết đa chiều giữa trường đại học, ngành đào tạo, tổ hợp môn, điểm chuẩn và cơ hội nghề nghiệp. Trái lại, các mô hình ngôn ngữ lớn (LLM) thuần túy khi được hỏi về thông tin tuyển sinh thường gặp hiện tượng "ảo giác" (hallucination) – tự suy diễn dữ liệu sai lệch khi thiếu cơ sở dữ liệu đối chiếu chính xác [2].

Vì vậy, việc xây dựng hệ thống tư vấn tuyển sinh thông minh dựa trên Đồ thị tri thức (Knowledge Graph - Neo4j) [3] và Mô hình ngôn ngữ lớn (LLM - DeepSeek/Gemini) kết hợp với Cơ sở dữ liệu quan hệ (PostgreSQL) theo kiến trúc Graph RAG [4], [5] và Lý thuyết Quyết định ba nhánh (Three-Way Decision - TWD) [6] là cần thiết và mang tính thực tiễn cao. Hệ thống hướng đến giải quyết bài toán tra cứu chính xác, cung cấp câu trả lời có căn cứ xác thực và hỗ trợ học sinh phân tích mức độ an toàn của danh sách nguyện vọng tuyển sinh một cách trực quan.

### 2. Mục tiêu nghiên cứu
- Xây dựng Đồ thị tri thức (Knowledge Graph) lưu trữ các thực thể trong lĩnh vực tuyển sinh (trường đại học, ngành đào tạo, tổ hợp môn, phương thức xét tuyển, điểm chuẩn các năm, học phí và nghề nghiệp đầu ra) cùng các mối quan hệ giữa chúng [3].
- Nghiên cứu cơ chế Graph RAG (Retrieval-Augmented Generation với đồ thị), cho phép chuyển đổi câu hỏi ngôn ngữ tự nhiên thành câu truy vấn đồ thị Cypher, trích xuất dữ liệu làm ngữ cảnh để LLM sinh câu trả lời chính xác, loại bỏ hiện tượng ảo giác thông tin [2], [4].
- Ứng dụng lý thuyết Quyết định ba nhánh (TWD) để xây dựng phân hệ đánh giá danh sách nguyện vọng của học sinh, tự động chia thành 3 vùng rủi ro: Chấp thuận (POS - an toàn), Trì hoãn (BND - vừa sức/xem xét) và Từ chối (NEG - rủi ro cao) [6].
- Thiết kế kiến trúc cơ sở dữ liệu lai kết hợp PostgreSQL (lưu trữ dữ liệu tĩnh có cấu trúc, tra cứu đa tiêu chí tốc độ cao) và Neo4j (phục vụ suy luận đồ thị và Chatbot AI) [3].
- Xây dựng ứng dụng Web tương tác hiện đại với giao diện trực quan hóa đồ thị bằng Cytoscape.js, tích hợp tính năng định hướng lộ trình nghề nghiệp (Career Path Mapping).
- Xây dựng module quản lý dữ liệu tự động, bóc tách đề án tuyển sinh PDF bằng LLM và nạp đồng bộ dữ liệu vào cơ sở dữ liệu.

---

## II. Tổng quan

Các hệ thống tư vấn hướng nghiệp và tuyển sinh đã trải qua quá trình phát triển từ các hệ chuyên gia (Expert Systems) dựa trên bộ luật tĩnh cứng nhắc [7] đến các hệ thống tư vấn hiện đại. 

Trên thế giới, các mô hình kết hợp Đồ thị tri thức với Mô hình ngôn ngữ lớn (Graph RAG) đang được nghiên cứu và ứng dụng rộng rãi nhằm nâng cao độ chính xác và khả năng giải thích cho hệ thống AI [4], [5]. Các nghiên cứu cho thấy việc truy xuất thông tin từ đồ thị tri thức làm ngữ cảnh cho LLM giúp triệt tiêu đáng kể hiện tượng đưa ra câu trả lời sai lệch (hallucination) [2]. Bên cạnh đó, Lý thuyết Quyết định ba nhánh (Three-Way Decision - TWD) do GS. Yiyu Yao đề xuất từ năm 2010 [6] đã khẳng định tính hiệu quả trong các bài toán phân loại và hỗ trợ ra quyết định dưới điều kiện thông tin không chắc chắn. Các thuật toán đồ thị và quản trị CSDL đồ thị Neo4j [3] cũng cung cấp nền tảng vững chắc cho việc biểu diễn và truy vấn tri thức đa liên kết.

Tại Việt Nam, nhiều trang tin và cổng thông tin tuyển sinh đã được triển khai phục vụ học sinh tra cứu điểm chuẩn theo quy chế chính thức [1]. Tuy nhiên, hầu hết các hệ thống hiện nay vẫn gặp một số hạn chế:
- Chưa hỗ trợ đầy đủ việc khai thác mối quan hệ ngữ nghĩa giữa ngành học, khối thi và định hướng nghề nghiệp.
- Còn phụ thuộc vào các dạng bảng biểu tra cứu thủ công, chưa có tính năng tư vấn bằng ngôn ngữ tự nhiên linh hoạt.
- Thiếu công cụ phân tích rủi ro nguyện vọng cá nhân hóa dựa trên phổ điểm của từng học sinh [6].

Điều đó đặt ra yêu cầu cần có một mô hình thử nghiệm hệ thống tư vấn tuyển sinh thông minh, vừa đảm bảo tính chính xác tuyệt đối của dữ liệu điểm chuẩn, vừa cung cấp giao diện tương tác hiện đại, thân thiện cho người dùng.

---

## III. Nội dung và phương pháp nghiên cứu

### 1. Đối tượng và phạm vi nghiên cứu
- **Đối tượng nghiên cứu:** Hệ thống tư vấn và quản lý tri thức tuyển sinh đại học dựa trên Đồ thị tri thức (Neo4j) [3], kiến trúc suy luận Graph RAG (LLM) [4], [5], Cơ sở dữ liệu quan hệ (PostgreSQL) và Lý thuyết Quyết định ba nhánh (TWD) [6].
- **Phạm vi nghiên cứu:** Đề tài giới hạn trong việc xây dựng mô hình thử nghiệm của hệ thống phục vụ dữ liệu tuyển sinh cho khoảng 10–20 trường đại học tại Việt Nam (ưu tiên khối ngành Công nghệ thông tin và Kỹ thuật) theo quy chế tuyển sinh hiện hành [1], tập trung vào các chức năng chính gồm:
  - Tra cứu điểm chuẩn tĩnh và lọc dữ liệu đa tiêu chí.
  - Hỏi đáp tư vấn tuyển sinh bằng ngôn ngữ tự nhiên (Graph RAG) [4].
  - Phân loại rủi ro nguyện vọng theo mô hình Quyết định ba nhánh (TWD) [6].
  - Trực quan hóa sơ đồ đồ thị tri thức mạng lưới Trường – Ngành – Khối thi – Nghề nghiệp [3].
  - Quản lý và đồng bộ dữ liệu tự động từ Đề án tuyển sinh.

### 2. Nội dung nghiên cứu
Đề tài tập trung triển khai các nội dung nghiên cứu chính sau:
- **Khảo sát và Thiết kế hệ thống:** Khảo sát quy trình tuyển sinh đại học thực tế [1], xác định yêu cầu hệ thống; thiết kế kiến trúc phân lớp và cơ sở dữ liệu lai (PostgreSQL lưu dữ liệu tĩnh có cấu trúc, Neo4j biểu diễn đồ thị tri thức ngữ nghĩa) [3].
- **Xây dựng luồng đồng bộ ETL và Cơ chế Graph RAG:** Tự động bóc tách dữ liệu từ đề án PDF nạp từ PostgreSQL sang Neo4j; xây dựng AI Chatbot chuyển đổi câu hỏi tự nhiên thành truy vấn Cypher, trích xuất đồ thị con làm ngữ cảnh cho LLM (DeepSeek/Gemini) tổng hợp câu trả lời chính xác [2], [4].
- **Tích hợp Thuật toán TWD và Phát triển ứng dụng Web:** Cài đặt lý thuyết Quyết định ba nhánh (Three-Way Decision) [6] phân loại nguyện vọng thành 3 vùng rủi ro (POS 🟢, BND 🟡, NEG 🔴); xây dựng ứng dụng Web (Spring Boot, ReactJS) tích hợp thư viện Cytoscape.js trực quan hóa đồ thị và lộ trình nghề nghiệp.
- **Kiểm thử và Đánh giá:** Xây dựng bộ test case kiểm thử chức năng, hiệu năng API và đánh giá khả năng triệt tiêu "ảo giác" AI [2]; hoàn thiện ứng dụng và đề xuất hướng phát triển mở rộng.

### 3. Phương pháp nghiên cứu

#### Nghiên cứu tài liệu:
- Tìm hiểu các mô hình đồ thị tri thức, ngôn ngữ truy vấn Cypher và CSDL Neo4j [3].
- Nghiên cứu kiến trúc Graph RAG [4], [5], kỹ thuật Prompt Engineering và tích hợp API mô hình ngôn ngữ lớn (DeepSeek/Gemini).
- Tham khảo các nghiên cứu về Lý thuyết Quyết định ba nhánh (TWD) và Tập thô trong quản trị rủi ro [6].
- Tổng hợp cơ sở lý thuyết về phát triển ứng dụng Web phân lớp với Spring Boot và ReactJS.

#### Phân tích và thiết kế hệ thống:
- Sử dụng các sơ đồ UML (Use Case, Component, Sequence, Activity) để mô hình hóa hệ thống và thiết kế CSDL lai [3].

#### Thực nghiệm:
- Cài đặt hệ thống dựa trên mô hình đã thiết kế.
- Xây dựng các module chính:
  - Tra cứu tĩnh và lọc đa tiêu chí [1].
  - Chatbot AI Graph RAG tư vấn ngôn ngữ tự nhiên [4].
  - Phân loại rủi ro nguyện vọng TWD [6].
  - Trực quan hóa đồ thị tri thức bằng Cytoscape.js [3].
  - Module Admin bóc tách tài liệu và đồng bộ dữ liệu ETL.
- Tích hợp giao diện người dùng và các RESTful APIs.
- Kiểm thử chức năng bằng test case: kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử chức năng và kiểm thử khả năng chống ảo giác AI [2].

#### Đánh giá và tổng hợp:
- Đánh giá hiệu quả của mô hình Graph RAG trong việc đảm bảo tính chính xác của dữ liệu tư vấn [2], [4].
- Đánh giá mức độ đáp ứng yêu cầu hệ thống (chức năng, thời gian phản hồi, tính thân thiện của giao diện).
- Tổng hợp kết quả, ưu điểm, hạn chế và đề xuất hướng phát triển hệ thống.

---

## IV. Kết quả/Sản phẩm dự kiến

Xây dựng được hệ thống tư vấn tuyển sinh đại học hoàn chỉnh với các chức năng:
- **Tra cứu tĩnh:** Lọc thông tin trường/ngành đa tiêu chí tốc độ cao.
- **Chatbot AI Graph RAG:** Tư vấn bằng ngôn ngữ tự nhiên, trả lời chính xác quy chế [1] và điểm chuẩn mà không bị ảo giác [2].
- **Phân loại nguyện vọng TWD:** Phân tích và gán nhãn rủi ro danh sách nguyện vọng theo 3 vùng (POS 🟢, BND 🟡, NEG 🔴) [6].
- **Trực quan hóa đồ thị Cytoscape.js:** Sơ đồ mạng lưới tri thức tương tác và định hướng lộ trình nghề nghiệp [3].
- **Module Admin ETL:** Tự động hóa bóc tách đề án tuyển sinh PDF và đồng bộ dữ liệu.
- **Báo cáo khóa luận:** Cuốn báo cáo chính thức và bộ slide thuyết trình bảo vệ trước Hội đồng.

---

## V. Tài liệu tham khảo

[1] Bộ Giáo dục và Đào tạo Việt Nam, *Quy chế tuyển sinh đại học, tuyển sinh cao đẳng ngành Giáo dục Mầm non*, Ban hành kèm theo Thông tư số 08/2022/TT-BGDĐT, Hà Nội, Việt Nam, 2022.

[2] Z. Ji, N. Lee, R. Frieske, T. Yu, D. Su, Y. Xu, E. Ishii, Y. J. Yeung, A. Del Lucero, and P. Fung, "Survey of hallucination in natural language generation," *ACM Computing Surveys*, vol. 55, no. 12, pp. 1–38, Dec. 2023.

[3] M. Needham and A. E. Hodler, *Graph Algorithms: Practical Examples in Apache Spark and Neo4j*, 1st ed. Sebastopol, CA, USA: O'Reilly Media, 2019.

[4] D. Edge, H. Trinh, X. Cheng, J. Bradley, A. Chao, A. Mody, S. Truitt, and J. Larson, "From local to global: A graph RAG approach to query-focused summarization," *arXiv preprint arXiv:2404.16130*, Apr. 2024.

[5] S. Pan, L. Luo, Y. Wang, C. Chen, J. Wang, and X. Wu, "Unifying large language models and knowledge graphs: A roadmap," *IEEE Transactions on Knowledge and Data Engineering*, vol. 36, no. 7, pp. 3580–3599, Jul. 2024.

[6] Y. Y. Yao, "Three-way decisions with probabilistic rough sets," *Information Sciences*, vol. 180, no. 3, pp. 341–353, Feb. 2010.

[7] P. P. P. Chaudhari et al., "An expert system for career guidance," in *Proc. IEEE Int. Conf. Comput. Sci. Educ. (ICCSE)*, Nagoya, Japan, 2018, pp. 452–456.

---

## VI. Kế hoạch thực hiện đề tài

| STT | Nội dung thực hiện | Thời gian (Dự kiến) | Kết quả dự kiến |
| :---: | :--- | :---: | :--- |
| **1** | Xác định đề tài, nghiên cứu định hướng phát triển hệ thống tư vấn tuyển sinh thông minh, viết và nộp đề cương khóa luận. | 8/2026 | Đề cương được phê duyệt; xác định rõ phạm vi đề tài. |
| **2** | Tìm hiểu tài liệu khoa học (Graph RAG, Cypher, TWD), khảo sát quy trình tra cứu tuyển sinh đại học và phân tích yêu cầu hệ thống. | 9/8/2026 – 16/8/2026 | Báo cáo kết quả khảo sát các hệ thống liên quan và danh sách yêu cầu chức năng, phi chức năng. |
| **3** | Phân tích và thiết kế hệ thống (UML: Use Case, Sequence, ERD; thiết kế CSDL PostgreSQL và Lược đồ Đồ thị Neo4j). | 17/8/2026 – 31/8/2026 | Bộ tài liệu thiết kế hệ thống (Use case, ERD, Sequence) và CSDL lai. |
| **4** | Xây dựng Backend (Spring Boot), Frontend (ReactJS), tập trung vào các RESTful APIs tra cứu tĩnh và luồng đồng bộ dữ liệu ETL (PostgreSQL ➔ Neo4j). | 1/9/2026 – 30/9/2026 | Hệ thống có thể đăng nhập, tra cứu điểm chuẩn tĩnh và thực hiện đồng bộ dữ liệu lên đồ thị. |
| **5** | Tích hợp AI Engine (DeepSeek/Gemini): Xây dựng luồng Graph RAG (sinh truy vấn Cypher, trích xuất Subgraph), thuật toán TWD và trực quan đồ thị Cytoscape.js. | 1/10/2026 – 14/10/2026 | Tính năng Chatbot AI và Hỏi đáp tư vấn tuyển sinh hoạt động, cung cấp kết quả có trích dẫn ngữ cảnh và được gán nhãn rủi ro nguyện vọng TWD. |
| **6** | Kiểm thử hệ thống (đơn vị, tích hợp, chức năng, kiểm thử chống ảo giác AI), tinh chỉnh và tối ưu hóa hiệu năng. | 15/10/2026 – 31/10/2026 | Hệ thống hoạt động ổn định, khắc phục các lỗi phát sinh. |
| **7** | Viết báo cáo khóa luận tốt nghiệp, làm slide thuyết trình và chuẩn bị bảo vệ. | 1/11/2026 – 30/11/2026 | Báo cáo chính thức; slide bảo vệ; hoàn thành khóa luận. |

---

<br>

*Quy Nhơn, ngày …… tháng 08 năm 2026*  
**SINH VIÊN THỰC HIỆN**  
*(Ký và ghi rõ họ tên)*  



**[Họ và tên sinh viên]**  

<br>

**XÁC NHẬN CỦA KHOA**  
*Quy Nhơn, ngày …… tháng 08 năm 2026*  
**NGƯỜI HƯỚNG DẪN**  
*(Ký và ghi rõ họ tên)*  



**[Họ và tên giảng viên hướng dẫn]**  
