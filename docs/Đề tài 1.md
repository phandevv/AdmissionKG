## ĐỀ TÀI

Xây dựng hệ thống khám phá tri thức tuyển sinh đại học dựa trên Knowledge Graph

## 1. Đặt vấn đề

Những năm gần đây, phương thức tuyển sinh đại học tại Việt Nam có nhiều thay đổi với sự đa dạng về phương thức xét tuyển, tổ hợp môn, chương trình đào tạo và chính sách tuyển sinh của từng trường. Điều này giúp người học có nhiều cơ hội lựa chọn nhưng cũng làm cho việc tìm kiếm và tổng hợp thông tin trở nên khó khăn do dữ liệu được công bố phân tán trên nhiều nguồn khác nhau. Trong khi các công cụ tìm kiếm truyền thống chỉ hỗ trợ tra cứu theo từ khóa, các hệ thống AI hiện nay chủ yếu trả lời dựa trên tài liệu văn bản mà chưa khai thác được các mối quan hệ giữa trường đại học, ngành đào tạo, tổ hợp môn, phương thức xét tuyển, điểm chuẩn và các thông tin liên quan. Đề tài hướng đến việc xây dựng một hệ thống khám phá tri thức tuyển sinh đại học dựa trên Knowledge Graph nhằm tổ chức và liên kết dữ liệu tuyển sinh dưới dạng đồ thị tri thức, từ đó hỗ trợ người dùng tra cứu, khám phá thông tin và tìm hiểu các mối quan hệ

giữa các thực thể trong lĩnh vực tuyển sinh một cách trực quan và hiệu quả.

- 2. Mục tiêu của đề tài

Đề tài hướng đến việc xây dựng một hệ thống phần mềm hỗ trợ khám phá và truy vấn tri thức tuyển sinh đại học dựa trên mô hình Knowledge Graph. Hệ thống cho phép người dùng tìm kiếm thông tin tuyển sinh bằng ngôn ngữ tự nhiên, đồng thời trực quan hóa các mối quan hệ giữa các thực thể trong đồ thị tri thức.

Các mục tiêu cụ thể bao gồm:

- Xây dñng c¡ sß dï liÇu qu£n lý thông tin tuyÃn sinh cça mÙt sÑ tr°Ýng -¡i hÍc.

- Xây dñng mô hình Knowledge Graph biÃu diÅn các thñc thÃ và mÑi quan hÇ trong lĩnh vực tuyển sinh.

- Phát triÃn các chéc nng truy v¥n và khám phá tri théc trên Ó thË b±ng ngôn ngï Cypher.

- Tích hãp mô hình ngôn ngï lÛn (LLM) -Ã h× trã truy v¥n b±ng ngôn ngï tñ nhiên.

- Trñc quan hóa ‒Ó thË tri théc nh±m giúp ng°Ýi dùng dÅ dàng khám phá các mÑi quan hệ giữa các thực thể.

## 3. Bài toán nghiên cứu

Đề tài tập trung giải quyết bài toán xây dựng một hệ thống hỗ trợ khám phá tri thức trong lĩnh vực tuyển sinh đại học.

Thay vì chỉ trả về một danh sách kết quả như các công cụ tìm kiếm truyền thống, hệ thống cho phép người dùng đặt các câu hỏi như:

- Ngành Công nghÇ thông tin ‑°ãc —ào t¡o ß nhïng tr°Ýng nào?


- MÙt ngành hÍc có nhïng ph°¡ng théc xét tuyÃn nào?

- Nhïng ngành nào sí dång tÕ hãp D01?

- Tr°Ýng nào có méc hÍc phí d°Ûi mÙt ng°áng xác ‒Ënh?

- Có nhïng ngành —ào t¡o nào thuÙc l)nh vñc Trí tuÇ nhân t¡o?

Sau khi nhận câu hỏi, hệ thống sẽ phân tích yêu cầu, truy vấn dữ liệu trong Knowledge Graph và tổng hợp kết quả thành câu trả lời bằng ngôn ngữ tự nhiên. Đồng thời, hệ thống trực quan hóa các mối quan hệ liên quan dưới dạng đồ thị để người dùng có thể tiếp tục khám phá thông tin.

## 4. Phạm vi nghiên cứu

Đề tài giới hạn phạm vi ở dữ liệu tuyển sinh của khoảng 10–20 trường đại học, ưu tiên các trường đào tạo khối ngành Công nghệ thông tin hoặc các trường đại học công lập có dữ liệu tuyển sinh đầy đủ.

Các loại dữ liệu bao gồm:

- Thông tin tr°Ýng ¡i hÍc.

- Ngành ào t¡o.

- Ph°¡ng théc xét tuyÃn.

- TÕ hãp môn.

- iÃm chu©n.

- HÍc phí.

- HÍc bÕng.

- MÙt sÑ thông tin nghÁ nghiÇp liên quan ¿n ngành ào t¡o.

Dữ liệu được thu thập từ các nguồn chính thức như đề án tuyển sinh, website của các trường đại học và Bộ Giáo dục và Đào tạo.

## 5. Giải pháp đề xuất

Kiến trúc hệ thống được xây dựng theo mô hình nhiều lớp.

Ở tầng giao diện, người dùng sử dụng ứng dụng Web để tìm kiếm thông tin, khám phá đồ thị tri thức và tương tác với hệ thống thông qua giao diện trực quan.

Ở tầng nghiệp vụ, hệ thống được phát triển bằng Spring Boot, cung cấp các dịch vụ quản lý dữ liệu tuyển sinh, truy vấn Knowledge Graph và tích hợp mô hình AI.

Dữ liệu nghiệp vụ được lưu trữ trong PostgreSQL, trong khi các thực thể và mối quan hệ được mô hình hóa và lưu trữ trong Neo4j.

Knowledge Graph đóng vai trò trung tâm của hệ thống, biểu diễn các thực thể như Trường đại học, Ngành đào tạo, Phương thức xét tuyển, Tổ hợp môn, Điểm chuẩn và Học bổng cùng các mối quan hệ giữa chúng. Các truy vấn trên đồ thị được thực hiện bằng ngôn ngữ Cypher.

Để nâng cao khả năng tương tác, hệ thống tích hợp mô hình ngôn ngữ lớn (LLM). Khi người dùng đặt câu hỏi bằng ngôn ngữ tự nhiên, hệ thống sẽ chuyển đổi câu hỏi thành


truy vấn trên Knowledge Graph, lấy các dữ liệu liên quan và cung cấp cho LLM để sinh câu trả lời có căn cứ. Cách tiếp cận này giúp hạn chế hiện tượng mô hình ngôn ngữ tạo ra thông tin không chính xác và nâng cao khả năng giải thích kết quả.

## 6. Công nghệ dự kiến sử dụng

- Frontend: Angular.

- Backend: Spring Boot.

- C¡ sß dï liÇu quan hÇ: PostgreSQL.

- C¡ sß dï liÇu ‐Ó thË: Neo4j.

- Truy v¥n ‒Ó thË: Cypher.

- Mô hình ngôn ngï lÛn: Gemini ho·c GPT.

- Framework tích hãp AI: LangChain ho·c LlamaIndex.

- Th° viÇn trñc quan hóa -Ó thË: Cytoscape.js ho·c Neo4j Visualization.

## 7. Kết quả dự kiến

Sau khi hoàn thành, hệ thống dự kiến đạt được các kết quả sau:

- Xây dñng ‑°ãc c¡ sß dï liÇu tuyÃn sinh cça mÙt sÑ tr°Ýng ‑¡i hÍc.

- Xây dñng ‐°ãc Knowledge Graph mô hình hóa tri théc tuyÃn sinh.

- Phát triÃn hÇ thÑng Web h× trã tìm ki¿m và khám phá tri théc tuyÃn sinh.

- Cho phép truy v¥n b±ng ngôn ngï tñ nhiên k¿t hãp vÛi Knowledge Graph.

- Trñc quan hóa các mÑi quan hÇ giïa tr°Ýng -¡i hÍc, ngành hÍc, tÕ hãp môn và phương thức xét tuyển.

- ‑ánh giá tính kh£ thi cça viÇc éng dång Knowledge Graph trong các hÇ thÑng h× trợ tra cứu và khám phá tri thức giáo dục.

## 8. Ý nghĩa của đề tài

Đề tài có ý nghĩa cả về mặt khoa học và thực tiễn.

Về mặt khoa học, đề tài góp phần nghiên cứu việc ứng dụng Knowledge Graph kết hợp với mô hình ngôn ngữ lớn trong bài toán khám phá tri thức. Đây là hướng nghiên cứu đang được nhiều tổ chức và doanh nghiệp quan tâm trong quá trình phát triển các hệ thống AI có khả năng giải thích và truy xuất tri thức.

Về mặt thực tiễn, hệ thống giúp học sinh, phụ huynh và giáo viên tiếp cận thông tin tuyển sinh một cách trực quan, nhanh chóng và chính xác hơn. Đồng thời, kiến trúc của hệ thống có thể mở rộng để áp dụng cho các lĩnh vực khác như chương trình đào tạo, hướng nghiệp, quản lý học liệu hoặc các hệ thống tra cứu tri thức chuyên ngành.
