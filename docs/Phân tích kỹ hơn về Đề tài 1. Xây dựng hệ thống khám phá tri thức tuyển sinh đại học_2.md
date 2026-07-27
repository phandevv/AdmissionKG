# **Xây dựng hệthống khám phá tri thức tuyển sinh đại học dựa trên Knowledge Graph** 

# 1. Giới thiệu 

Những năm gần đây, phương thức tuyển sinh đại học tại Việt Nam có nhiều thay đổi với sựđa dạng vềphương thức xét tuyển, tổhợp môn, chương trình đào tạo và chính sách tuyển sinh của từng trường. Điều này giúp người học có nhiều cơ hội lựa chọn nhưng cũng làm cho việc tìm kiếm và tổng hợp thông tin trởnên khó khăn do dữliệu được công bốphân tán trên nhiều nguồn khác nhau. 

Trong khi các công cụtìm kiếm truyền thống chỉhỗtrợtra cứu theo từkhóa, các hệ thống AI hiện nay chủyếu trảlời dựa trên tài liệu văn bản mà chưa khai thác được các mối quan hệgiữa trường đại học, ngành đào tạo, tổhợp môn, phương thức xét tuyển, điểm chuẩn và các thông tin liên quan. 

Đềtài hướng đến việc xây dựng một hệthống khám phá tri thức tuyển sinh đại học dựa trên Knowledge Graph nhằm tổchức và liên kết dữliệu tuyển sinh dưới dạng đồthịtri thức, từđó hỗtrợngười dùng tra cứu, khám phá thông tin và tìm hiểu các mối quan hệ giữa các thực thểtrong lĩnh vực tuyển sinh một cách trực quan và hiệu quả. 

2. Phân tích bài toán 

- 2.1 Thực trạng 

Hiện nay, đểtìm hiểu thông tin tuyển sinh của một ngành học hoặc một trường đại học, học sinh thường phải truy cập vào nhiều nguồn thông tin khác nhau như website của Bộ Giáo dục và Đào tạo, website của từng trường đại học, đềán tuyển sinh và các cổng thông tin tuyển sinh. 

Ví dụ, khi muốn tìm hiểu ngành **Công nghệthông tin** , học sinh thường phải tựtrảlời nhiều câu hỏi: 

- Có những trường nào đào tạo ngành này? 

- Mỗi trường sửdụng những phương thức xét tuyển nào? 

- Những tổhợp môn nào được chấp nhận? 

- Điểm chuẩn các năm gần đây ra sao? 

- Học phí của từng trường như thếnào? 

- Sau khi tốt nghiệp có thểlàm những công việc gì? 

Những thông tin này tồn tại ởnhiều nguồn khác nhau và không được liên kết với nhau. Người dùng phải tựtổng hợp và đối chiếu, gây mất nhiều thời gian và dễbỏsót thông tin. 

# 2.2 Hạn chếcủa các hệthống hiện nay 

Các hệthống tìm kiếm hiện nay chủyếu dựa trên từkhóa hoặc tài liệu văn bản. Khi người dùng đặt các câu hỏi có liên quan đến nhiều thực thểkhác nhau, hệthống thường chỉtrảvềcác tài liệu liên quan thay vì thểhiện được mối quan hệgiữa các đối tượng. 

Ví dụ: 

Những trường nào đào tạo ngành Trí tuệnhân tạo và xét tuyển bằng phương thức đánh giá năng lực? 

Đểtrảlời câu hỏi này, hệthống cần đồng thời khai thác các mối quan hệgiữa: 

- Trường đại học. 

- Ngành đào tạo. 

- Phương thức xét tuyển. 

- Điều kiện xét tuyển. 

Trong khi đó, dữliệu hiện nay chưa được tổchức dưới dạng tri thức có cấu trúc nên việc truy vấn và khám phá các mối quan hệcòn nhiều hạn chế. 

# 2.3 Bài toán đặt ra 

Đềtài đặt ra yêu cầu xây dựng một hệthống có khảnăng tổchức dữliệu tuyển sinh dưới dạng Knowledge Graph, trong đó mỗi đối tượng được biểu diễn thành một thực thểvà được liên kết với các thực thểkhác thông qua các quan hệngữnghĩa. 

Ví dụ: 

Đại học Quy Nhơn 

│đào tạo 

▼ 

Công nghệthông tin 

- │sửdụng 

▼ 

A 0 

│thuộc 



<!-- Start of picture text -->
▼<br><!-- End of picture text -->

Xét điểm THPT 

0 

│có 

▼ 

# Điểm chuẩn 

Khi dữliệu được tổchức theo dạng này, hệthống có thểtrảlời các truy vấn có tính suy luận và hỗtrợngười dùng khám phá thêm các thông tin liên quan thay vì chỉtrảvềdanh sách kết quả. 

# 2.4 Mục tiêu của hệthống 

Hệthống cần đáp ứng các mục tiêu sau: 

- Quản lý dữliệu tuyển sinh của các trường đại học. 

- Xây dựng Knowledge Graph biểu diễn tri thức tuyển sinh. 

- Hỗtrợtìm kiếm thông tin bằng từkhóa và ngôn ngữtựnhiên. 

- Khám phá các mối quan hệgiữa trường đại học, ngành đào tạo, tổhợp môn và phương thức xét tuyển. 

- Hiển thịtrực quan đồthịtri thức. 

- HỗtrợAI tổng hợp và diễn giải kết quảtruy vấn. 

# 2.5 Đối tượng sửdụng 

Hệthống hướng đến các nhóm người dùng sau: 

   - Học sinh THPT đang tìm hiểu thông tin tuyển sinh. 

   - Phụhuynh cần tham khảo thông tin đểhỗtrợcon lựa chọn ngành học. 

   - Giáo viên phụtrách công tác hướng nghiệp. 

   - Cán bộtư vấn tuyển sinh tại các trường đại học. 

- 2.6 Chức năng chính 

Quản lý dữliệu tuyển sinh 

Quản lý thông tin trường đại học, ngành đào tạo, tổhợp môn, phương thức xét tuyển, điểm chuẩn, học phí và học bổng. 

# Khám phá tri thức 

Cho phép người dùng khám phá mối quan hệgiữa các thực thểthông qua đồthịtri thức, ví dụtừmột ngành học có thểmởrộng đểxem các trường đào tạo, tổhợp xét tuyển, phương thức xét tuyển và nghềnghiệp liên quan. 

Truy vấn thông minh 

Người dùng có thểđặt câu hỏi bằng ngôn ngữtựnhiên như: 

- Trường nào đào tạo ngành Kỹthuật phần mềm? 

- Những ngành nào xét tuyển bằng tổhợp D01? 

- Có những trường nào có học phí dưới 20 triệu đồng mỗi năm? 

Hệthống sẽphân tích câu hỏi, truy vấn dữliệu từKnowledge Graph và tổng hợp câu trả lời. 

Trực quan hóa tri thức 

Các thực thểvà mối quan hệđược hiển thịdưới dạng đồthịtương tác, giúp người dùng quan sát và khám phá dữliệu trực quan hơn. 

3. Giải pháp kỹthuật và công nghệsửdụng 

- 3.1 Kiến trúc tổng thể 

Đềtài đềxuất xây dựng hệthống theo mô hình nhiều lớp (Multi-layer Architecture), bao gồm tầng giao diện người dùng, tầng xửlý nghiệp vụ, tầng quản lý tri thức và tầng lưu trữdữliệu. 

Người dùng có thểtìm kiếm thông tin bằng cách lựa chọn các tiêu chí hoặc nhập câu hỏi bằng ngôn ngữtựnhiên. Yêu cầu sẽđược gửi đến hệthống Backend đểphân tích, truy vấn dữliệu trong Knowledge Graph và tổng hợp kết quảtrước khi trảvềgiao diện. 

Khác với các hệthống tìm kiếm truyền thống, hệthống không chỉtrảvềdanh sách dữ liệu mà còn khai thác các mối quan hệgiữa các thực thểnhằm hỗtrợngười dùng khám phá tri thức và hiểu rõ hơn vềmiền tuyển sinh đại học. 

- 3.2 Knowledge Graph – Giải pháp cốt lõi 

Knowledge Graph là thành phần trung tâm của hệthống. 

Thay vì lưu trữdữliệu dưới dạng các bảng độc lập, toàn bộthông tin tuyển sinh được mô hình hóa thành các **thực thể(Node)** và **mối quan hệ(Relationship)** . 

Các thực thểchính bao gồm: 

- Trường đại học 

- Ngành đào tạo 

- Lĩnh vực đào tạo 

- Tổhợp môn 

- Phương thức xét tuyển 

- Điểm chuẩn 

- Học phí 

- Học bổng 

- Nghềnghiệp 

Các mối quan hệtiêu biểu: 

- Trường **đào tạo** ngành 

- Ngành **sửdụng** tổhợp môn 

- Ngành **áp dụng** phương thức xét tuyển 

- Ngành **hướng đến** nghềnghiệp 

- Trường **có** học phí 

- Trường **có** học bổng 

Việc biểu diễn dữliệu theo đồthịgiúp hệthống dễdàng trảlời các truy vấn có liên quan đến nhiều thực thể, đồng thời hỗtrợkhám phá các mối quan hệmà cơ sởdữliệu quan hệ truyền thống khó thểhiện trực quan. 

# 3.3 Truy vấn tri thức bằng Graph Query 

Sau khi dữliệu được tổchức thành Knowledge Graph, hệthống sửdụng ngôn ngữtruy vấn Cypher của Neo4j đểkhai thác thông tin. 

Ví dụ, thay vì phải thực hiện nhiều phép JOIN trên cơ sởdữliệu quan hệ, hệthống chỉ cần duyệt các mối quan hệtrong đồthịđểxác định: 

- Các trường đào tạo một ngành học. 

- Những tổhợp môn của từng ngành. 

- Các phương thức xét tuyển tương ứng. 

- Các ngành thuộc cùng một lĩnh vực. 

- Những nghềnghiệp liên quan đến một ngành đào tạo. 

Việc truy vấn theo đồthịgiúp giảm độphức tạp của các truy vấn liên kết nhiều bảng và thuận lợi cho việc mởrộng dữliệu trong tương lai. 

# 3.4 Tích hợp mô hình ngôn ngữlớn (LLM) 

Đểtăng khảnăng tương tác, hệthống tích hợp mô hình ngôn ngữlớn (Large Language Model - LLM) như Gemini hoặc GPT. 

LLM đóng vai trò là lớp giao tiếp với người dùng, giúp tiếp nhận câu hỏi bằng ngôn ngữ tựnhiên và diễn giải kết quảtruy vấn thành câu trảlời dễhiểu. 

Ví dụ, thay vì hiển thịdữliệu thô từcơ sởdữliệu, hệthống có thểtổng hợp và trình bày: 

“Hiện nay ngành Kỹthuật phần mềm được đào tạo tại 12 trường đại học trong tập dữliệu. Phần lớn các trường sửdụng tổhợp A00, A01 và D01. Ngoài xét điểm thi THPT, nhiều trường còn áp dụng phương thức xét kết quảkỳthi đánh giá năng lực.” 

Nhờđó, người dùng không cần hiểu cấu trúc dữliệu vẫn có thểkhai thác thông tin một cách hiệu quả. 

# 3.5 Graph RAG 

Một hạn chếcủa các mô hình ngôn ngữlớn là có thểsinh ra thông tin không chính xác hoặc không có căn cứ. 

Đểkhắc phục vấn đềnày, đềtài áp dụng kiến trúc **Graph Retrieval-Augmented Generation (Graph RAG)** . 

Quy trình hoạt động gồm các bước: 

1. Người dùng nhập câu hỏi. 

2. Hệthống phân tích ý định của câu hỏi. 

3. Truy vấn Knowledge Graph đểlấy các thực thểvà mối quan hệliên quan. 

4. Chuyển dữliệu truy vấn được vào LLM dưới dạng ngữcảnh. 

5. LLM tổng hợp và sinh câu trảlời dựa trên dữliệu đã truy xuất. 

Nhờđó, câu trảlời của hệthống luôn dựa trên dữliệu tuyển sinh đã được quản lý trong Knowledge Graph thay vì dựa hoàn toàn vào tri thức của mô hình ngôn ngữ. 

- 3.6 Trực quan hóa tri thức 

Một điểm khác biệt của đềtài là hỗtrợtrực quan hóa dữliệu dưới dạng đồthịtương tác. 

Người dùng có thểlựa chọn một thực thểbất kỳ(ví dụ: ngành Khoa học dữliệu) đểquan sát các mối quan hệvới: 

- Các trường đào tạo. 

- Các tổhợp xét tuyển. 

- Phương thức tuyển sinh. 

- Nghềnghiệp liên quan. 

- Các ngành có quan hệgần. 

Đồthịđược xây dựng bằng Cytoscape.js, cho phép người dùng phóng to, thu nhỏ, kéo thảvà mởrộng các nút đểtiếp tục khám phá tri thức. 

- 3.7 Công nghệsửdụng 

Hệthống dựkiến sửdụng các công nghệsau: 

|Thànhphần|Côngnghệ|
|---|---|
|Giao diện người dùng|Angular|
|Backend|Spring Boot|
|API|RESTful API|



Thành phần Công nghệ Cơ sởdữliệu quan hệ PostgreSQL Cơ sởdữliệu đồthị Neo4j Truy vấn đồthị Cypher ORM Spring Data JPA AI Gemini hoặc GPT Framework tích hợp LLM LangChain hoặc LlamaIndex Trực quan hóa Knowledge Graph Cytoscape.js Xác thực người dùng Spring Security + JWT 

3.8 Điểm mới của giải pháp 

So với các hệthống tra cứu tuyển sinh hiện nay, đềtài có một sốđiểm nổi bật: 

- Biểu diễn dữliệu tuyển sinh dưới dạng Knowledge Graph thay vì chỉlưu trong cơ sởdữliệu quan hệ. 

- Hỗtrợkhám phá tri thức thông qua các mối quan hệgiữa trường đại học, ngành học, tổhợp môn và phương thức xét tuyển. 

- Kết hợp Graph RAG với mô hình ngôn ngữlớn đểtạo câu trảlời có căn cứtừdữ liệu của hệthống. 

- Trực quan hóa đồthịtri thức giúp người dùng dễdàng khám phá và phân tích thông tin. 

- Kiến trúc hệthống có khảnăng mởrộng đểtích hợp thêm dữliệu tuyển sinh của nhiều trường hoặc mởrộng sang các lĩnh vực như hướng nghiệp, chương trình đào tạo và quản lý học liệu. 

# **Tóm tắt các "Giải pháp kỹthuật lõi (Core Technical Innovations)":** 

   1. Mô hình hóa tri thức bằng Knowledge Graph – chuyển đổi dữliệu tuyển sinh từ cấu trúc bảng sang đồthịngữnghĩa. 

   2. Graph Retrieval Engine – xây dựng cơ chếtruy vấn và khám phá quan hệtrên Neo4j bằng Cypher. 

   3. LLM + Graph RAG Pipeline – kết hợp LLM với dữliệu truy xuất từKnowledge Graph đểsinh câu trảlời có căn cứvà giảm hiện tượng AI "ảo giác". 

4. Interactive Knowledge Exploration – trực quan hóa đồthịtri thức, cho phép người dùng khám phá thông tin theo các mối quan hệthay vì chỉxem kết quảtìm kiếm. 

**Sơ đồ1. Kiến trúc tổng thểhệthống** 



<!-- Start of picture text -->
Fo Ss eee<br>| Neuwai ding |<br>Spe eee eye eee<br>|<br>Vv<br>2 ae eran eae<br>| Angular Web UI |<br>BS eee eae eee eas<br>|<br>REST API<br>|<br>i<br>Sea ae See ee ae eee<br>| Spring Boot Backend |<br>| Authentication |<br>| Admission Service |<br>| Knowledge Service |<br>| AI Service |<br>iLoocorss as inoomoseeerseeesssarat<br>| |<br>ee eet<br>| |<br>Vv v<br>qe ee es Se eee<br>| PostgreSQL | | Neo4j |<br>| Admission Data | | KnowledgeGraph |<br>Ho omsanameeseaaaa: foo reeaceisssosess<br>|<br>v<br>ea<br>| Gemini / GPT |<br>eae aoe ay<br><!-- End of picture text -->



<!-- Start of picture text -->
University<br>|<br>| | |<br>offers hasTuition hasScholarship<br>|<br>Major<br>|<br>| | |<br>usesCombo useMethod relatedCareer<br>| | |<br>Subject Admission Career<br>Combination Method<br>|<br>hasCutoftt<br>|<br>Cutoff Score<br><!-- End of picture text -->



<!-- Start of picture text -->
Nguoi ding<br>Dat cau hoi tu nhién<br>¥<br>Et<br>| Graph Retrieval |<br>| (Cypher + Neo4j) |<br>Tri thitc 1ién quan<br>¥<br>|<br>| LLM (Gemini/GPT) |<br>| Graph RAG |<br>v<br>a|<br>| Cau tra 1di + Dd thi |<br>| See ears ee eeeee<br><!-- End of picture text -->

Ngudéi ding ¥ 

Cau hoi tu nhién ¥ 

Query Processing Agent 

(Intent + Entity) 

¥ 

Cypher Query Generator 

¥ 

Neo4j Knowledge Graph 

Relevant Subgraph 

¥ Prompt Construction 

¥ Gemini / GPT ¥ Cau tra lai + Knowledge Graph 



<!-- Start of picture text -->
Knowledge Graph<br>|<br>¥<br>Seie<br>| Nganh CNTT |<br>eeae ce |<br>[ar ann EERE EERE<br>¥ v v ¥<br>Truong Té hop PT xét tuyén Nghé nghiaép<br>| | | |<br>Hoc phi ®Diém chudn Chi tiéu Ky nang<br>| | | |<br>ee ee (ees<br>|<br>¥<br>Kham pha tri thifc<br><!-- End of picture text -->

