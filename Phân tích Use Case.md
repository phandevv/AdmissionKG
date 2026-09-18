## **1. TỔNG QUAN VÀ PHẠM VI NGHIỆP VỤ** 

Tài liệu này phân tích chi tiết các trường hợp sử dụng Use Cases) của hệ thống khám phá tri thức và hỗ trợ tuyển sinh đại học. Nghiệp vụ được tổng hợp và chuẩn hóa dựa trên đề cương đồ án tốt nghiệp cùng các đề án tuyển sinh đại học chính thức năm 2026 của các trường đại học tiêu biểu Trường Đại học Quy Nhơn, Trường Đại học Y khoa Vinh, Học viện Tài chính). 

Hệ thống giải quyết các bài toán cốt lõi: 

1. Tra cứu và lọc thông tin tuyển sinh đa tiêu chí với tốc độ cao trên CSDL PostgreSQL. 

2. Tư vấn hỏi đáp bằng ngôn ngữ tự nhiên, chống ảo giác Zero-Hallucination) thông qua kiến trúc Graph RAG trên CSDL Đồ thị Neo4j. 

3. Đánh giá và phân loại rủi ro danh sách nguyện vọng theo Lý thuyết Quyết định ba nhánh Three-Way Decision - TWD chia thành 3 vùng: POS An toàn), BND Vừa sức / Cân nhắc), NEG Rủi ro cao). 

4. Khám phá mạng lưới tri thức tuyển sinh và định hướng lộ trình nghề nghiệp Career Path Mapping) bằng giao diện đồ thị Cytoscape.js. 

5. Tự động hóa quá trình bóc tách đề án tuyển sinh từ file PDF sang CSDL ETL Pipeline). 

## **2. XÁC ĐỊNH CÁC TÁC NHÂN (ACTORS)** 

**Tác nhân Actor** 

**Phân loại** 

**Vai trò & Trách nhiệm trong hệ thống** 

**Thí sinh / Phụ huynh Student / Guest)** 

Primary Actor 

Người dùng cuối thực hiện tra cứu thông tin; trò chuyện với Chatbot Graph RAG; nhập hồ sơ điểm cá nhân; nhận đánh giá rủi ro nguyện vọng TWD; khám phá đồ thị nghề nghiệp. 

|**Tác nhân Actor**|**Phân loại**|**Vai trò & Trách nhiệm**<br>**trong hệ thống**|
|---|---|---|
|**Quản trị viên / Cán bộ**<br>**tuyển sinh Admin**|Primary Actor|Quản lý hệ thống; tải lên<br>file PDF đề án tuyển sinh<br>để bóc tách tự động; kiểm<br>duyệt và phê duyệt dữ liệu<br>nạp vào PostgreSQL và<br>Neo4j; cấu hình tham số<br>thuật toán TWD.|
|**AI Graph RAG Engine**|Secondary / System …|Phân hệ trí tuệ nhân tạo<br>LLM + Neo4j) tiếp nhận<br>câu hỏi tự nhiên, sinh truy<br>vấn Cypher, trích xuất đồ<br>thị con (subgraph) và tổng<br>hợp câu trả lời chính xác<br>có trích dẫn minh bạch.|
|**TWD Recommendation**<br>**Engine**|Secondary / System …|Động cơ tính toán phân<br>loại danh sách nguyện<br>vọng theo Lý thuyết Quyết<br>định ba nhánh, tự động<br>tính điểm quy đổi và gán<br>nhãn rủi ro POS, BND,<br>NEG.|
|**PDF ETL Parser**|Secondary / System …|Tiến trình nền bóc tách các<br>bảng biểu, chỉ tiêu, điểm<br>chuẩn từ file PDF đề án<br>tuyển sinh sang cấu trúc<br>JSON chuẩn hóa.|



# **3. PHÂN RÃ HỆ THỐNG THÀNH CÁC GÓI USE CASE (USE CASE PACKAGES)** 

## **1: Phân hệ Tra cứu & Lọc Dữ liệu Tuyển sinh Tĩnh (PostgreSQL)** 

- **UC01 - Tra cứu Trường, Phân hiệu & Học phí:** Xem thông tin chi tiết các cơ sở đào tạo Hà Nội, TP.HCM, Hưng Yên, Quy Nhơn, Vinh...), thời gian đào tạo, đề án học phí theo năm. 

- **UC02 - Lọc Ngành học Đa tiêu chí:** Lọc đồng thời theo điểm thi cá nhân, tổ hợp môn A00, B00, D01, X06, X26...), khoảng học phí, khu vực địa lý Bắc, Trung, Nam), loại chương trình Chuẩn, CLC/Chứng chỉ quốc tế ACCA/CMA, Sư phạm, Liên kết quốc tế). 

- **UC03 - Tra cứu Bảng Quy đổi Điểm & Điểm cộng:** Tra cứu bảng quy đổi chứng chỉ IELTS, VSTEP, TOEFL, SAT, ACT sang điểm môn hoặc điểm khuyến khích; chính sách thưởng giải HSG, giải KHKT, thể thao. 

## **2: Phân hệ Tư vấn Hỏi đáp Thông minh Graph RAG (Neo4j + LLM)** 

- **UC04 - Hỏi đáp Ngôn ngữ Tự nhiên:** Tiếp nhận các câu hỏi phức tạp đa điều kiện từ thí sinh về quy chế, tổ hợp môn, điều kiện phụ xét tuyển. 

- **UC05 - Sinh Truy vấn Cypher & Lấy Subgraph:** Phân tích ý định Intent Recognition), ánh xạ thực thể Entity Linking) và dịch câu hỏi thành câu lệnh Cypher để trích xuất đồ thị con liên quan trong Neo4j. 

- **UC06 - Trích xuất Dẫn chứng & Giải thích:** Đưa đồ thị con vào ngữ cảnh của LLM để sinh câu trả lời chính xác, kèm đường dẫn và trích dẫn cụ thể điều khoản trong đề án tuyển sinh. 

## **3: Phân hệ Đánh giá & Phân loại Nguyện vọng theo Quyết định ba nhánh (TWD)** 

- **UC07 - Quản lý Hồ sơ Năng lực Cá nhân:** Nhập và quản lý đa nguồn điểm Điểm thi THPT, Học bạ 6 kỳ, Điểm thi ĐGNL/ĐGTD, Chứng chỉ tiếng Anh, Giải thưởng HSG, Khu vực & Đối tượng ưu tiên). 

- **UC08 - Thiết lập Danh sách Nguyện vọng:** Chọn các ngành, phương thức và tổ hợp môn dự kiến đăng ký theo thứ tự ưu tiên NV1, NV2, NV3...). 

- **UC09 - Tính Điểm Xét tuyển & Kiểm tra Sơ tuyển:** Tự động tính điểm xét tuyển chuẩn hóa (áp dụng công thức giảm điểm ưu tiên khi >= 22.5 điểm của Bộ GD&ĐT, quy đổi IELTS/VSTEP và kiểm tra điều kiện cần Gatekeeper: ngưỡng học lực lớp 12, sức khỏe, điểm sàn môn Toán). 

- **UC10 - Phân loại 3 Vùng Rủi ro POS - BND - NEG** Áp dụng thuật toán Quyết định ba nhánh so sánh điểm của thí sinh với phân phối điểm chuẩn lịch sử 2024, 2025 và biến động chỉ tiêu năm 2026 để gán nhãn rủi ro và khuyến nghị điều chỉnh thứ tự NV. 

## **4: Phân hệ Đồ thị Tri thức & Định hướng Nghề nghiệp** 

## **(Cytoscape.js)** 

- **UC11 - Khám phá Mạng lưới Tri thức Tuyển sinh:** Hiển thị sơ đồ mạng liên kết tương tác giữa Trường → Phân hiệu → Chương trình → Phương thức → Tổ hợp môn → Môn thi. 

- **UC12 - Khám phá Lộ trình Nghề nghiệp Career Path Mapping):** Xem các vị trí việc làm đầu ra của từng chương trình đào tạo kèm các kỹ năng cần chuẩn bị. 

## **5: Phân hệ Quản trị & Tự động hóa Bóc tách Đề án PDF (Admin & ETL)** 

- **UC13 - Tải lên Đề án PDF & Bóc tách ETL** Tiếp nhận file PDF đề án, LLM Parser tự động nhận diện và trích xuất bảng chỉ tiêu, điểm chuẩn, tổ hợp, quy chế quy đổi điểm. 

- **UC14 - Kiểm duyệt & Đồng bộ dữ liệu:** Quản trị viên đối soát dữ liệu trên giao diện Staging và bấm duyệt để nạp đồng thời vào PostgreSQL và Neo4j. 

- **UC15 - Cấu hình Tham số Thuật toán & Điểm sàn:** Thiết lập ngưỡng tổn thất (alpha, beta) cho thuật toán TWD, cập nhật ngưỡng điểm sàn tối thiểu. 

# **4. ĐẶC TẢ CHI TIẾT CÁC USE CASE TRỌNG TÂM** 

## **USE CASE 04: Hỏi đáp tư vấn tuyển sinh bằng AI Graph RAG** 

- **Mã Use Case:** UC04 

- **Tên Use Case:** Hỏi đáp tư vấn tuyển sinh bằng ngôn ngữ tự nhiên Graph RAG. 

- **Tác nhân chính:** Thí sinh / Phụ huynh. 

- **Tác nhân phụ:** AI Graph RAG Engine, CSDL Đồ thị Neo4j. 

- **Tiền điều kiện:** Hệ thống đã được nạp và đồng bộ dữ liệu tuyển sinh vào Neo4j. 

- **Kích hoạt:** Người dùng nhập câu hỏi vào khung chat và nhấn gửi. 

- **Luồng sự kiện chính:** 

   - a. Thí sinh nhập câu hỏi tự nhiên (ví dụ: "Ngành Y khoa tại ĐH Y khoa Vinh năm 2026 có xét học bạ không và tiêu chí phụ xét tuyển như thế nào?"). 

   - b. Hệ thống gửi câu hỏi đến AI Engine để nhận diện thực thể Entity và ý định tra cứu Intent. 

   - c. AI Engine dịch câu hỏi thành câu lệnh truy vấn Cypher tương ứng. 

   - d. Hệ thống thực thi Cypher trên Neo4j để trích xuất đồ thị con Subgraph). 

   - e. Hệ thống đóng gói Subgraph làm ngữ cảnh Context) và truyền vào LLM kèm Prompt kiểm soát tính trung thực. 

   - f. LLM tổng hợp câu trả lời chính xác dựa trên ngữ cảnh: trả lời rõ Y khoa không xét học bạ (chỉ xét điểm thi THPT, tuyển thẳng và diện khác) và liệt kê 3 tiêu chí phụ theo thứ tự. 

   - g. Giao diện Chatbot hiển thị câu trả lời kèm trích dẫn văn bản căn cứ. 

- **Ngoại lệ:** Nếu dữ liệu chưa có trong đồ thị, hệ thống thông báo rõ ràng cho thí sinh, tuyệt đối không suy diễn sai lệch. 

- **Hậu điều kiện:** Câu hỏi và câu trả lời được lưu vào lịch sử phiên hội thoại. 

## **USE CASE 10: Phân loại rủi ro danh sách nguyện vọng theo Quyết định ba nhánh (TWD)** 

- **Mã Use Case:** UC10 

- **Tên Use Case:** Đánh giá và phân loại rủi ro nguyện vọng bằng Three-Way Decision. 

- **Tác nhân chính:** Thí sinh / Phụ huynh. 

- **Tác nhân phụ:** TWD Recommendation Engine, PostgreSQL. 

- **Tiền điều kiện:** Thí sinh đã nhập hồ sơ năng lực điểm số UC07 và danh sách nguyện vọng dự kiến UC08. 

- **Kích hoạt:** Thí sinh nhấn nút "Phân tích & Đánh giá Rủi ro Nguyện vọng". 

### ● **Luồng sự kiện chính:** 

      - a. Hệ thống lấy hồ sơ điểm của thí sinh và danh sách các nguyện vọng đăng ký. 

      - b. Với từng nguyện vọng, hệ thống thực hiện: 

         - Kiểm tra điều kiện tiên quyết Gatekeeper): đối chiếu học lực lớp 12, chiều cao/sức khỏe, điểm sàn môn bắt buộc. 

         - Tính điểm xét tuyển quy đổi: áp dụng quy đổi chứng chỉ ngoại ngữ IELTS/VSTEP/SAT, điểm cộng thưởng giải HSG, và điểm ưu tiên khu vực/đối tượng theo công thức giảm trừ khi >= 22.5 điểm. 

         - Tính độ lệch biên an toàn Delta S so với điểm chuẩn các năm 2024, 2025 có trọng số điều chỉnh theo chỉ tiêu 2026. 

         - Phân loại theo ngưỡng Quyết định ba nhánh: 

            - Delta S >= alpha: Vùng Chấp thuận POS - Vùng An toàn). 

            - beta <= Delta S < alpha: Vùng Trì hoãn/Biên BND - Vùng Vừa sức / Cân nhắc). 

            - Delta S < beta: Vùng Từ chối NEG - Vùng Rủi ro cao). 

      - c. Hệ thống trực quan hóa kết quả phân tích bằng biểu đồ 3 màu Xanh lá - POS, Vàng cam - BND, Đỏ - NEG. 

      - d. Hệ thống đưa ra chiến lược tối ưu hóa thứ tự nguyện vọng cho thí sinh. 

- **Hậu điều kiện:** Kết quả phân tích được lưu vào bảng 

   - twd_evaluation_logs. 

## **USE CASE 13: Tải lên Đề án Tuyển sinh PDF & Bóc tách Tự động (ETL)** 

- **Mã Use Case:** UC13 

- **Tên Use Case:** Tải lên đề án PDF và bóc tách dữ liệu tự động bằng LLM. 

- **Tác nhân chính:** Quản trị viên / Cán bộ tuyển sinh. 

- **Tác nhân phụ:** PDF ETL Parser LLM Document Processor). 

- **Tiền điều kiện:** Quản trị viên đã đăng nhập thành công với quyền ROLE_ADMIN. 

- **Kích hoạt:** Quản trị viên tải lên file tài liệu đề án tuyển sinh (.pdf). 

- **Luồng sự kiện chính:** 

   - a. Quản trị viên chọn file PDF đề án tuyển sinh và nhấn "Bắt đầu bóc tách". 

   - b. Phân hệ PDF ETL Parser đọc tài liệu, phân đoạn Chunking) theo các mục quy chế. 

   - c. Phân hệ gọi LLM Document Parser với JSON Schema định sẵn để trích xuất: Cơ sở đào tạo, Mã xét tuyển, Chỉ tiêu 2026, Tổ hợp môn, Điểm chuẩn 20242025, Quy tắc quy đổi chứng chỉ, Tiêu chí phụ. 

   - d. Hệ thống lưu kết quả vào vùng nhớ tạm Staging) và hiển thị lên giao diện cho Quản trị viên rà soát. 

   - e. Quản trị viên kiểm tra, chỉnh sửa thông tin nếu cần. 

   - f. Quản trị viên nhấn "Phê duyệt & Đồng bộ" để nạp đồng thời vào PostgreSQL và tạo Nodes/Edges trên Neo4j. 

- **Hậu điều kiện:** Dữ liệu tuyển sinh mới được cập nhật hoàn toàn vào hệ thống. 

### **5. MA TRẬN TRUY VẾT YÊU CẦU & BẢNG CSDL TƯƠNG ỨNG** 

|**Use Case ID**|**Tên Use Case**|**Bảng PostgreSQL phụ**<br>**trách**|**Node / Edge Neo4j phụ**<br>**trách**|
|---|---|---|---|
|**UC01, UC02**|Tra cứu & Lọc ngành học<br>đa tiêu chí|institutions, campuses,<br>majors, admission_tracks,<br>track_method_combination<br>s, benchmarks_quotas|Institution), Campus),<br>AdmissionTrack), Major|
|**UC03**|Tra cứu quy đổi chứng chỉ<br>& điểm thưởng|universal_conversions,<br>bonus_policies|CertificateRule),<br>BonusPolicy)|
|**UC04, UC05, UC06**|Chatbot AI Graph RAG hỏi<br>đáp|chat_sessions,<br>chat_messages|Toàn bộ Ontology Graph<br>Thực thi Cypher và trích<br>xuất Subgraph)|
|**UC07**|Quản lý hồ sơ điểm cá<br>nhân|user_academic_profiles,<br>users|Dữ liệu người dùng tại<br>PostgreSQL|
|**UC08, UC09, UC10**|Đánh giá rủi ro nguyện<br>vọng TWD|user_wishes,<br>twd_evaluation_logs,<br>score_formulas,|Tra cứu nhanh quan hệ<br>điểm chuẩn<br>HAS_BENCHMARK|



|**Use Case ID**|**Tên Use Case**|**Bảng PostgreSQL phụ**<br>**trách**|**Node / Edge Neo4j phụ**<br>**trách**|
|---|---|---|---|
|||track_eligibility_rules,<br>track_tie_breakers||
|**UC11, UC12**|Khám phá Đồ thị & Lộ trình<br>Nghề nghiệp|careers,<br>track_career_mapping,<br>admission_tracks|MajorLEADS_TO_CARE<br>ERCareer),<br>AdmissionTrack)|
|**UC13, UC14, UC15**|Bóc tách Đề án PDF &<br>Quản trị ETL|admission_schemes,<br>admission_tracks,<br>benchmarks_quotas,<br>universal_conversions|Đồng bộ tạo Node &<br>Relationship qua Spring<br>Batch ETL|



