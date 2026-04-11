# Qwen AI Build Day Webinar - Bản Dịch Tiếng Việt

Lưu ý:

- Đây là bản dịch sát từ transcript `qwenday.txt`.
- Mục tiêu là giữ đúng nội dung hội thoại, không tóm tắt.
- Các chỗ lặp từ, ngập ngừng, hoặc lỗi nói tự nhiên được làm sạch nhẹ để dễ đọc hơn, nhưng không đổi ý.

## [00:00:08] GenAI Fund

"Mọi người ơi, nhiều bạn đang dùng NoteTaker đúng không? Không sao đâu, chúng tôi sẽ ghi lại webinar này, và mọi người sau đó đều có thể xem lại.

Tuyệt, tuyệt. Hiện giờ đã có bao nhiêu người trong phòng rồi? Tôi thấy 95 người. Vẫn còn thêm người đang vào nữa.

Nhìn giờ thì tôi nghĩ chúng ta sẽ bắt đầu sau khoảng 5 phút nữa.

Trong 5 phút này, để tôi xem nào...

Vấn đề là lần trước, khi chúng tôi tham gia một sự kiện của Qwen, và nó do Jason, từ đội Qwen, host, đúng không?

Anh ấy cũng làm một trò này trước sự kiện. Kiểu như anh ấy hỏi Qwen cho mấy câu đùa. Nên bây giờ tôi cũng hỏi giống vậy.

Đây là vài câu đùa vui vui từ Qwen. Tôi không biết có vui thật không, nhưng các bạn có thể thử xem.

Câu chơi chữ classic của Qwen là: tại sao Qwen lại mang theo một cái thang đến hackathon? Có ai trả lời được không?

Để tôi nhắc lại. Tại sao Qwen lại mang theo một cái thang đến hackathon?

Vì nó nghe nói các prompt ở cấp độ tiếp theo.

Mọi người tự đánh giá nhé, xem model Qwen có biết làm trò đùa vui không.

Nó cũng có một câu đùa dành cho dev nữa.

Nó bảo rằng: tôi nhờ Qwen giúp tôi viết một câu đùa hackathon hoàn hảo.

Và nó sinh ra 10.000 lựa chọn.

Sau đó tôi phải mất rất nhiều thời gian debug để tìm xem cái nào mới thực sự vui. Và đó cũng chính là điều tôi đang làm lúc này.

Tôi nghĩ cũng không tồi, không tồi với model Qwen mới nhất.

Mọi người có thể thử, vì Qwen vừa mới ra mắt model 2.6 plus khoảng một hai tuần trước.

Tôi mừng là họ kịp ra mắt trước Qwen AI Build Day này để các bạn có thể tận dụng model mới nhất.

Chúng tôi sẽ ghi lại buổi này.

Tôi nghĩ là chúng ta đang ghi rồi.

Min, bạn có thể kiểm tra giúp xem chúng ta đang ghi webinar này không?"

## [00:02:45] Minh Tran - GenAI Fund

"Dạ, chúng ta đang ghi rồi."

## [00:02:47] GenAI Fund

"Tuyệt.

Okay, tốt rồi. Chúng ta đã có đầy đủ người tham gia. Bao nhiêu người rồi? 100 người.

Hôm nay có khá nhiều nội dung chúng tôi muốn cover.

Nên chúng ta bắt đầu đúng giờ luôn. Không đợi thêm nữa. Buổi này đang được ghi lại, và sau đó sẽ chia sẻ với mọi người để các bạn có thể xem lại.

Một lần nữa, cảm ơn mọi người đã tham gia hôm nay, dù là bây giờ ở Việt Nam đã tầm khoảng 2 giờ chiều. Cảm ơn rất nhiều. Chúng tôi sẽ cố gắng để buổi kickoff này trả lời được càng nhiều câu hỏi càng tốt.

Hôm nay tôi muốn đặt tổng thể nội dung sẽ cover. Mục tiêu chính là để tất cả mọi người hiểu rõ cơ chế vận hành của Qwen AI Build Day.

Vì format của nó hơi khác một hackathon thông thường.

Đồng thời, chúng tôi cũng sẽ hướng dẫn các bạn các bước cần làm trên Devpost. Một số bạn chưa quen với Devpost thì tôi sẽ đi cùng từng bước.

Và quan trọng nhất, chúng tôi có mặt các đại diện doanh nghiệp để briefing về challenge statement của họ, đồng thời đây cũng là cơ hội để các bạn hỏi trực tiếp để làm rõ trước khi bắt tay vào xây dựng dự án.

Nếu mọi người sẵn sàng, cho tôi một cái thumbs up, hoặc gõ số 1 vào chat nhé.

Tuyệt.

Hình như tôi quên giới thiệu bản thân. Tôi là Eugene, Head of Programs và Marketing Lead của GenAI Fund. Chào mừng mọi người đến với sự kiện kickoff Qwen AI Build Day hôm nay.

Qwen AI Build Day là gì?

Nó không phải một hackathon thông thường, đó là lý do chúng tôi không đặt tên nó thẳng là hackathon.

Điểm khác biệt là đây là một hackathon AI được doanh nghiệp hậu thuẫn. Tất cả use case và challenge statement đều là bài toán thật đang tồn tại trong doanh nghiệp, và họ đang đi tìm lời giải.

Ngoài tiền thưởng, đây còn là cơ hội để các bạn có thể hợp tác với doanh nghiệp ở mức POC.

Và xa hơn nữa, nếu mọi thứ thuận lợi, các bạn thực sự có thể tung sản phẩm này cùng doanh nghiệp và đưa nó đến hàng triệu khách hàng của họ.

Tôi nghĩ đây chính là điều làm cho AI Build Day này rất đặc biệt và khác một hackathon thông thường, vì phía sau nó có những cơ hội lớn và tác động lớn mà các bạn có thể tạo ra, bắt đầu ngay từ Qwen AI Build Day này.

Tôi sẽ đi nhanh qua timeline tổng quan.

Ngay sau webinar hôm nay là bước vào build period, từ hôm nay đến hết ngày 17 tháng 4.

Trong giai đoạn này, các bạn có thể xây dựng từ xa, không cần phải có mặt trực tiếp. Các bạn có 7 ngày để build.

Sau đó sẽ có vòng đánh giá từ xa để shortlist tối đa 10 đội mỗi track.

10 đội này sẽ được chọn để pitch vào ngày 21 tháng 4, là ngày sự kiện diễn ra.

Ngày pitch day là 21 tháng 4, khi tất cả chúng ta sẽ tập hợp trực tiếp.

Và đội thắng mỗi track sẽ được chọn để showcase tại sự kiện sau pitch day, có tên là Alibaba Cloud SME AI Growth Day.

Nếu đội của bạn được shortlist, chúng tôi yêu cầu phải có ít nhất một đại diện tham gia trực tiếp vào pitch day để pitch trước ban giám khảo.

Yêu cầu quan trọng tiếp theo là tất cả các giải pháp phải sử dụng model Qwen để xây dựng.

Do đó hôm nay chúng tôi có khách mời đặc biệt đến từ Qwen, là Dr. Ferdin. Anh ấy sẽ đi qua một số thành phần trong tech stack của Qwen và một vài case study để các bạn có cảm hứng sử dụng model mới nhất này để xây dựng giải pháp.

Nếu có câu hỏi, các bạn cứ để lại trong chat. Đến phần Q&A tôi sẽ nhìn các câu hỏi và trả lời."

## [00:31:28 - 00:47:32] Laura Nguyen - Track tài chính và public sector

"Xin chào mọi người, mình là Laura. Hiện tại mình đang ở sân bay, nên nếu phía mình có hơi ồn thì xin mọi người thông cảm. Mình xin dành vài phút để đi qua track Shinhan, tức là track dịch vụ tài chính do Shinhan Future Lab hậu thuẫn.

Trước khi bắt đầu, cho mình hỏi nhanh: ở đây có bao nhiêu bạn đã từng xây dựng sản phẩm cho một tổ chức tài chính rồi?

Hay đó. Đây cũng là lý do track này khác biệt, vì nếu bạn từng vào financial services thì bạn sẽ biết rằng tiếp cận bài toán thật, dữ liệu thật, và team thật là một việc không hề dễ.

Với track này, các bạn không đang giải một case study giả định. Shinhan Financial Group đã mang đến cho chúng tôi 30 use case khác nhau trải trên 4 đơn vị của họ.

Bốn đơn vị đó là Shinhan Bank, Shinhan Finance, Shinhan Securities và Shinhan Life Insurance. Đây đều là những bài toán thật họ muốn giải.

Hôm nay, với sự hỗ trợ của Qwen, các bạn sẽ xây dựng một giải pháp cho một trong các use case đó.

Nếu các bạn thắng track, profile của các bạn sẽ được gửi trực tiếp tới Shinhan Future Lab như một curated recommendation từ GenAI Fund, và đây là lối đi tắt đến chương trình Innoboost.

Innoboost là chương trình open innovation của Shinhan do GenAI Fund vận hành. Công ty được chọn có thể chạy proof of concept 11-12 tuần trực tiếp với đơn vị kinh doanh của Shinhan, và nếu thành công có thể nhận 200 triệu đồng tài trợ.

Hackathon là cách đưa các bạn vào cánh cửa. Còn application của Innoboost là cách đưa các bạn đến Shinhan.

Deadline full application của Innoboost là ngày 3 tháng 5.

Bây giờ chuyển sang public sector. Đây là bài toán đến trực tiếp từ khu vực công, không phải chúng tôi tự nghĩ ra.

Hiện tại khi công dân nộp tài liệu hoặc gửi yêu cầu đến cơ quan nhà nước, họ có thể gửi tài liệu vật lý hoặc nộp qua cổng thông tin công dân.

Tất cả yêu cầu này sẽ được bộ phận hành chính tiếp nhận, kiểm tra xem có gửi đúng đơn vị hay không. Nếu đúng thì chuyển đến phòng ban xử lý. Nếu sai thì trả lại để nộp lại.

Thông thường quy trình này mất 5 đến 7 ngày làm việc.

Sau khi vào đúng bộ phận, họ lại phải tóm tắt xem yêu cầu là gì, thông tin nào đã có, ai liên quan, rồi mới xử lý tiếp.

Rất nhiều tài liệu hiện vẫn được xử lý thủ công, cả vật lý lẫn online.

Tài liệu trong khu vực công có 4 cấp độ: công khai, mật, tối mật, tuyệt mật. Mỗi cấp độ được xử lý khác nhau.

Challenge có thể là:

- nhận diện thủ công tài liệu
- tổng hợp xuyên phòng ban
- chu kỳ phê duyệt kéo dài

Hoặc các bạn có thể xây một workflow end-to-end.

Khi xây dựng, hãy nghĩ đến cả tài liệu vật lý và online, đến phân loại tài liệu, và đến kết quả có thể định lượng được. Ví dụ hiện tại mất 5-7 ngày thì giải pháp của bạn rút còn bao nhiêu.

Vì đây là bài toán có thể replicate sang nhiều đơn vị khác nhau, nên nếu các bạn có đề xuất tốt, chúng tôi sẵn sàng kết nối trực tiếp với cơ quan khu vực công.

Sẽ có một lãnh đạo khu vực công cấp phó giám đốc tham gia judge cho challenge này."

## [00:50:48 - 00:59:45] Phong Dinh Phong - Tasco

"Tasco là một hệ sinh thái mobility và automotive. Chúng tôi tập trung vào xe hơi, mua bán xe, và các dịch vụ mobility.

Có hai vòng đời:

- vòng đời sở hữu xe: mua xe, tài chính, bảo hiểm, trade-in, bán xe, mua xe mới
- vòng đời sử dụng xe: thu phí, e-parking, car rental, map, navigation và các touchpoint khác

Năm ngoái chúng tôi bán hơn 40.000 xe, gần 14% thị phần, và vận hành khoảng 180 showroom trên khắp Việt Nam.

Chúng tôi bán và phục vụ xe cho 16 thương hiệu. Có 5 thương hiệu mà chúng tôi là nhà nhập khẩu và phân phối độc quyền.

Chúng tôi cũng sở hữu VETC, nhà cung cấp thu phí tự động đang dẫn đầu thị trường với 75% thị phần, phục vụ 4,1 triệu chủ xe và xử lý 2 triệu giao dịch mỗi ngày.

Challenge thứ nhất là challenge mở trong mobility. Chúng tôi chưa bao phủ hết mọi touchpoint trong hai vòng đời đó. Nếu các bạn thấy có pain point hay use case nào trong mobility mà có giá trị, chúng tôi sẵn sàng hoan nghênh.

Động lực của challenge này là tăng user engagement. Hiện tại dù có 4 triệu user, họ chỉ vào app khi cần nạp ví BOT. Chúng tôi muốn biến monthly active users thành daily active users.

Challenge thứ hai là learning and development.

Chúng tôi có hơn 10.000 nhân viên cần đào tạo thường xuyên. Hiện tại việc học và phát triển vẫn diễn ra theo cách khá truyền thống với lớp học offline.

Chúng tôi muốn số hóa, tập trung hóa, và chuyển từ class-based learning sang e-learning và micro-learning.

Để làm được điều đó, chúng tôi cần một app / engine để nhanh chóng tạo khóa học mới và tài liệu học mới, bao gồm quiz, video, slide, để import vào learning management system.

Output cuối cùng của hệ thống là các khóa học có thể import vào LMS và publish lên employee portal nội bộ.

Nhân viên của chúng tôi vào mobile app mỗi ngày để check-in, họp, và bây giờ sẽ học trên đó. Chúng tôi rất đói khát content chất lượng và hấp dẫn.

Nếu đội nào thắng, chúng tôi có thể đưa giải pháp đó vào production ngay."

## [01:01:23 - 01:10:11] Jean-Francois Legourd - Elfie

"Chào buổi chiều mọi người. JF đây, đồng sáng lập của Elfie, gọi từ TP.HCM.

Mục tiêu của chúng tôi là tạo tác động y khoa. Chúng tôi bắt đầu cách đây 5 năm và đã có 1,5 triệu người dùng. Chúng tôi có một super app làm việc với bệnh nhân và bác sĩ, hiện có mặt tại 30 quốc gia.

Ứng dụng của chúng tôi có 4,9 sao trên store. Chúng tôi biết cách xây sản phẩm. Tôi từng là head of digital của Samsung Asia Pacific trong nhiều năm. Hiện tại công ty đang hướng đến định giá gần 100 triệu đô.

Có thể đây là một trong những công ty digital health lớn nhất sinh ra từ khu vực Asia Pacific, dù trụ sở đặt tại Mỹ.

Chúng tôi tăng trưởng 50% mỗi năm, và phần lớn đội engineering đặt tại TP.HCM. Chúng tôi là công ty công nghệ, nhưng làm trong lĩnh vực healthcare.

Trên toàn cầu chúng tôi có khoảng 90 người. Đa số product và engineering đều ở TP.HCM. Đây là cách chúng tôi giữ tốc độ.

Nếu các bạn muốn tìm hiểu thêm về chúng tôi, có rất nhiều tài liệu online. Các bạn có thể tải app về chơi thử. Các bạn sẽ thấy một số challenge chúng tôi đã giải bằng một cách nào đó, nhưng không phải lúc nào chúng tôi cũng hài lòng với cách giải đó. Chúng tôi cũng đang dùng cuộc thi này để test model mở nguồn như Qwen.

Về prize, chúng tôi nói là làm.

1 tỷ đồng cho hợp đồng thương mại. Nếu có đội nào xây được công ty trên challenge này hay challenge khác mà chúng tôi muốn hợp tác, chúng tôi sẽ dùng POC để trở thành khách hàng đầu tiên và giúp các bạn bắt đầu.

Nếu chúng tôi rất thích các bạn và các bạn cũng thích chúng tôi, muốn xây những AI-centered product thật ngầu, thì chúng tôi không giới hạn headcount để đưa đúng người tài năng vào.

Challenge đầu tiên là medical scribe.

Tất cả mọi người đều từng đi khám ở bệnh viện hoặc phòng khám. Điều mà mọi người có thể không biết là nhân viên y tế dành khoảng 20% thời gian chỉ để ghi note lại nội dung buổi khám. Đây là thời gian có thể tối ưu.

Nếu có một AI ngồi nghe cuộc hội thoại và chuẩn bị ghi chú, năng suất có thể tăng rất nhiều, và nhân viên y tế sẽ có thêm thời gian để làm việc mà họ vào ngành y để làm: chăm sóc bệnh nhân.

Ý tưởng ở đây là xây dựng một hệ thống AI có khả năng lắng nghe cuộc hội thoại, nhận diện ai đang nói, và sinh ra không chỉ transcript mà còn cả summary phù hợp với nội dung và phù hợp với format của tài liệu khám lâm sàng.

Đó là các chuẩn chính thức.

Khi nhận code của các bạn, chúng tôi sẽ đưa vào một audio consultation bằng tiếng Ả Rập, tiếng Việt, tiếng Pháp, hoặc tiếng Anh - sẽ chọn ngẫu nhiên - để xem các bạn có bắt được thông tin đầy đủ và chính xác hay không, và trải nghiệm người dùng của phần mềm có tốt hay không.

Challenge thứ hai là về image capability.

Khi là bệnh nhân, ai cũng biết dùng cân để xem cân nặng. Nhưng cái thực sự quan trọng lại là body fat. Để đo cái đó chính xác thì thường cần những thiết bị rất đắt tiền.

Tuy nhiên, chỉ với hai bức ảnh chụp từ camera trước của điện thoại, nếu đã biết chiều cao và cân nặng, có thể ước tính khá chính xác body fat và body measurement. Image recognition có thể nhìn vào cơ thể và giúp hiểu là nếu tăng cân thì có thể là cơ bắp, và hướng đi vẫn đúng.

Challenge này là xem với Qwen AI, các bạn có xây được một tool nhỏ có thể nhận ảnh và trong vài giây trả ra body measurement và body fat ratio hay không.

Chúng tôi dễ biết nó tốt hay không vì chúng tôi đã biết sẵn measurement và body fat ratio của các bức ảnh mẫu.

Challenge thứ ba là Labs Analyzer.

Mọi người đều biết lab result là gì: bạn đi lấy mẫu, nhận về một đống con số, nhưng hầu hết chúng ta không hiểu ý nghĩa của nó.

Nó không thực sự giúp bệnh nhân, và mỗi khi đổi lab thì format kết quả lại khác.

Vấn đề của thông tin y khoa là ngay cả khi nó có sẵn, nó vẫn rất khó hiểu.

Ý tưởng ở đây là: bạn upload lab result vào giải pháp mà mình đang xây, để hệ thống có thể phân tích, cấu trúc hóa dữ liệu, và trả lại cho người dùng không chỉ dữ liệu raw mà cả bản tóm tắt về điều gì đang ổn, điều gì đang có vấn đề. Nếu có nhiều lần xét nghiệm, hệ thống có thể chỉ ra cái gì tốt lên, cái gì xấu đi, và người dùng nên làm gì, nên hỏi bác sĩ câu gì.

Trong ứng dụng Elfie đã có một ví dụ của nó. Chúng tôi đã build nó rồi. Nhưng ở đây chúng tôi muốn xem Qwen, một model open source, có thể đánh bại các model phương Tây mà chúng tôi đang dùng hay không.

Cái chúng tôi thực sự đánh giá qua ba challenge này không chỉ là Qwen có làm được gì không. Chúng tôi đang đánh giá cách các bạn nhìn ra độ phức tạp ẩn sau những challenge có vẻ đơn giản này.

Đây là cách rất tốt để đánh giá trí thông minh của các bạn, khả năng bóc tách sự phức tạp đằng sau một bài toán tưởng như rất đơn giản với người dùng.

Với challenge 1, tôi sẽ upload một audio consultation. Thực ra các bạn cũng có thể tự tạo bằng cách nhờ AI mô phỏng hội thoại giữa bác sĩ và bệnh nhân, rồi dùng 11 Labs hoặc bất kỳ text-to-speech nào để tạo audio ở bất kỳ ngôn ngữ nào.

Đó là tất cả về Elfie và ba challenge của chúng tôi."

## [01:42:52 - 01:47:09] Febria - Hướng dẫn nhận credit

"Cảm ơn mọi người, mình là Febria từ đội Alibaba. Mình sẽ hướng dẫn quy trình claim credit.

Bước 1 là tạo tài khoản Alibaba Cloud, để sau đó chúng tôi có thể nạp coupon vào đúng tài khoản của các bạn.

Bước 2 là thêm và xác minh payment method cho tài khoản.

Trong console 'expenses and costs', vào phần payment method. Các bạn có thể thêm thẻ tín dụng, thẻ ghi nợ, hoặc PayPal.

Bước 3 là gửi yêu cầu nhận credit cho hackathon. Link này đã có trên Devpost.

Đây là bước rất quan trọng. Sau khi hoàn thành bước 1 và 2, mọi người nhất định phải làm bước 3.

Nếu chưa xong bước 1 và 2, khi mở form thường sẽ bị lỗi hoặc trang trống.

Hãy điền đầy đủ thông tin. Cuối ngày, tầm khoảng 7 giờ tối, mình sẽ xem tất cả dữ liệu, lấy user ID và inject coupon.

Sau đó mọi người sẽ nhận email thông báo đã được cấp coupon hay chưa.

Sau khi nhận email, trong tab expenses, vào mục coupons để xem coupon đã được nạp vào tài khoản hay chưa.

Cho hackathon này, chúng tôi sẽ cấp khoảng 50 USD credit để bắt đầu.

Mọi người có thể dùng nó để thử Model Studio như Dr. Ferdin vừa giới thiệu và bắt đầu dự án bằng Qwen.

Nếu có vấn đề, hãy nhắn cho mình trong group chat để mình hỗ trợ troubleshoot."

## [01:47:28 - 01:52:15] GenAI Fund - FAQ

"Cảm ơn Fabria.

Phần trước đã cover khá nhiều nội dung về tạo tài khoản và năng lực của Qwen. Resource và cloud credit guide đã được đưa lên Devpost rồi. Nếu bạn không tìm thấy thì có lẽ bạn chưa đọc kỹ, nhưng chúng tôi sẽ cố gắng để nó dễ thấy hơn.

Bây giờ đến phần Q&A, nhưng trước đó có một vài FAQ.

Câu hỏi 1: một đội có được nộp hơn một dự án không?

Có. Các bạn được phép nộp nhiều dự án. Nhưng mỗi dự án phải là một project riêng trên Devpost. Không được gom nhiều dự án vào cùng một submission.

Câu hỏi 2: có cần xây dựng giải pháp mới hoàn toàn từ đầu không?

Không nhất thiết. Nếu sau khi nghe challenge mà các bạn nhận ra mình đã có sẵn một giải pháp đang bán trên thị trường, các bạn vẫn có thể đem nó vào AI Build Day, miễn là tích hợp model Qwen. Nếu hiện tại chưa dùng Qwen, thì hãy tùy biến và chạy nó bằng Qwen.

Câu hỏi 3: một cá nhân có thể nằm trong hơn một team không?

Có.

Câu hỏi 4: có phải cả đội đều phải có mặt ngày 21 tháng 4 không?

Không cần, nhưng phải có ít nhất một đại diện chính thức đến pitch nếu được shortlist.

Câu hỏi 5: có được sửa bài sau ngày 17 tháng 4 không?

Không. Bất kỳ thứ gì đã nộp và tồn tại khi đến 11:59 đêm ngày 17 tháng 4 đều được xem là bản cuối cùng. Không được sửa nữa, kể cả khi được shortlist. Ngày pitch, các bạn chỉ được pitch những gì đã nộp."

## [01:52:16 - 01:57:25] Elfie Q&A

### Jean-Francois Legourd

"Về câu hỏi challenge 1 và 3 của Elfie - đây là những thứ chúng tôi đang xây ngay lúc này.

Khi làm trong healthcare, cuối cùng bạn phải localize từng ứng dụng theo từng quốc gia.

Vấn đề là nhiều LLM phương Tây thường không sẵn có ở đa số nước đang phát triển. Chỉ có một hub ở đây, một hub ở kia. Nên chúng tôi cần bắt đầu phát triển model của chính mình bằng model mở nguồn, để deploy trên môi trường cloud không phụ thuộc AWS, GCP, Azure, hay thậm chí có / không có Alibaba Cloud.

Đây là lần đầu tiên chúng tôi dùng Qwen, và chúng tôi muốn xem liệu nó - vốn được biết đến là một trong những open-source LLM mạnh nhất - có thể giúp chúng tôi xây lại tool của mình trên open source hay không. Và không chỉ LLM, mà là tổng thể AI capability và AI services.

Chúng tôi phải xây lại, và đó là trường hợp của medical scribe cũng như lab result analyzer.

Còn challenge 2, hiện tại chúng tôi đang dùng vendor bên ngoài. Nó đắt khủng khiếp. Và nó tệ.

Nên tôi cần xây lại nó. Tôi đã không ưu tiên nó trước đây, nhưng cả team đều muốn rebuild. Nên chúng tôi nói: tại sao không dùng dịp này xem thử có thể xây lại bằng Qwen hay không? Vì chúng tôi chắc chắn phải thay đổi."

### GenAI Fund

"Tôi hiểu là Elfie đang muốn các bạn đánh bại giải pháp hiện tại, đúng không?"

### Jean-Francois Legourd (continues)

"Với challenge 1 và 3 thì đúng. Challenge 3 đã tồn tại rồi, và nó hoạt động rất tốt. Dow trong team đã xây nó.

Còn challenge 2 thì chúng tôi đang dùng một vendor khác và họ rất tệ. Nên ở challenge này, về cơ bản, các bạn đang cạnh tranh với một vendor đang tồn tại. Vì vậy chúng tôi có ngân sách cho nó. Nếu các bạn xây được công ty quanh nó, hoặc nếu các bạn gia nhập với chúng tôi, chúng tôi có rất nhiều ngân sách.

Còn challenge 1, Daryl và team đang xây tool mới.

Ngay cả nếu các bạn không hoàn thiện được sản phẩm ở mức hoàn hảo, thì họ vẫn sẽ nhìn ra được chính xác loại khó khăn mà các bạn gặp phải, quy trình suy nghĩ của các bạn, tốc độ làm việc của các bạn.

Đây là cách tốt nhất để chúng tôi đánh giá chất lượng đội của các bạn, không phải chỉ bằng việc xem các bạn có giải được một bài toán hay không.

Cuộc sống là giải nhiều loại bài toán khác nhau. Chúng tôi muốn đánh giá phong cách, tốc độ và mức độ thông minh của các bạn khi giải một vấn đề mà bạn chưa từng nghe đến, không có nền tảng y khoa. Chúng tôi cũng không có nền tảng y khoa khi bắt đầu. Rất nhiều người giỏi nhất ở Elfie phải học mọi thứ từ đầu.

Và đó là cách nhận ra người thông minh: không phải vì họ đã mang sẵn kiến thức, mà vì họ có sức xử lý."

### Jean-Francois Legourd - về sample data

"Tôi đã upload một file audio rồi, và tôi sẽ upload một lab result. Tôi đang ẩn danh hóa nó để chắc chắn mọi người không biết chủ nhân của nó. Nhưng dù sao các bạn sẽ có ít nhất một sample.

Và nhân tiện, các bạn cũng có thể ra Diag ở Việt Nam với một vài trăm, làm gói kiểm tra sức khỏe, và thế là có ngay một mẫu lab result tốt.

Tệ nhất thì các bạn biết mình vẫn khỏe, và có một sample rất tốt. Họ trả kết quả trong khoảng một tiếng.

Đó là cách đơn giản. Cuối cùng làm challenge này xong, biết đâu các bạn còn có sức khỏe tốt hơn, như thế đã là một chiến thắng rồi."

## [01:58:21 - 02:00:30] Tasco Q&A

### Phong Dinh Phong

"Về việc truy cập learning portal, tôi nghĩ cấp thẳng một tài khoản để vào hệ thống có lẽ không khả thi.

Nhưng điều tôi có thể làm là chụp screenshot các màn hình liên quan đến training và development, để mọi người hiểu được flow.

Về input material, ví dụ PDF hay các file có thể dùng để tạo learning material, thì có. Chúng tôi sẽ xem cái gì không nhạy cảm và chọn một vài sample cho các bạn."

### Phong Dinh Phong 2

"Tôi không nghĩ là cần phải có công ty Việt Nam mới được tham gia chương trình của Tasco. Tất nhiên quy trình mua sắm và xây dựng sau này có thể phức tạp hơn một chút, nhưng đây không phải vấn đề lớn. Điều quan trọng nhất là chúng tôi muốn tìm được giải pháp tốt."

### GenAI Fund 2

"GenAI Fund sẽ hỗ trợ về mặt hành chính nếu cần. Lúc này cứ tập trung xây dựng giải pháp thật tốt. Nếu giải pháp đủ tốt, phần còn lại chúng ta sẽ cùng nhau tìm cách."

## [02:03:00 - 02:09:36] GenAI Fund - Closing và next steps

"Ngày quan trọng đầu tiên là build period, kết thúc vào 11:59 PM ngày 17 tháng 4, giờ Việt Nam GMT+7.

Mọi thứ các bạn đã nộp và tồn tại sau thời điểm đó đều được xem là bản cuối cùng. Tất cả những gì nộp trước đó vẫn được xem là draft và vẫn sửa được.

Sẽ có online evaluation trong giai đoạn này, shortlist được thông báo vào ngày 21 tháng 4, và đội shortlisted sẽ pitch ngay hôm đó.

Showcase event cho đội thắng sẽ diễn ra ngày 22 tháng 4 tại Alibaba Cloud SME Growth Day.

Có 5 việc cần làm, nhưng ưu tiên cao nhất lúc này là xác nhận track trước ngày 13 tháng 4.

Làm thế nào?

Hãy vào Devpost, kể cả khi chưa build gì, cứ điền tạm dữ liệu giả lập ở mức cao, chọn track muốn tham gia, save continue đến cuối, và bấm Submit.

Bất kỳ thứ gì các bạn nộp lúc này chỉ là tentative submission, nhưng nó cho chúng tôi biết đội của các bạn đang hướng đến track nào.

Về sau, trước deadline, các bạn hoàn thiện project, upload đầy đủ, update đầy đủ, save, và cuối cùng nhất định bấm Submit.

Rất nhiều đội lần trước quên bấm submit. Họ tưởng đã nộp rồi nhưng thực ra vẫn ở dạng draft, và chúng tôi buộc phải loại họ. Nên lần này xin đừng để điều đó xảy ra.

Nếu đã biết muốn build track nào rồi, hãy tạo project ngay bây giờ. Bạn có thể thêm team sau, sửa sau, làm gì sau cũng được, nhưng tối thiểu phải chọn track ngay.

Nếu dự định build 3 track, hãy tạo 3 project và chọn 3 track ngay.

Những việc khác cần làm:

- đăng ký Devpost và hoàn thành profile
- tham gia WhatsApp group
- nhắc thành viên cùng đăng ký Devpost
- đăng ký trên Luma vì chúng tôi sẽ dùng Luma để check-in attendance

Tài nguyên bổ sung sẽ được cập nhật vào thứ Hai vì cuối tuần doanh nghiệp cần thời gian tổng hợp.

Chúng tôi sẽ tiếp tục cập nhật qua WhatsApp và email.

Trước khi kết thúc, chúng ta chụp một tấm ảnh nhóm.

Mọi người bật camera lên. Chúng ta sẽ chụp screenshot tất cả những ai có mặt. Chúng tôi cũng sẽ đăng lên social media và các kênh khác để mọi người có thể tìm thấy mình trong ảnh.

Okay, chúng ta làm hình trái tim bằng tay nhé.

1, 2, 3...

Yeah! Bắt đầu build thôi, builders!"

### Minh Tran - GenAI Fund

"Đã chụp xong rồi."

### GenAI Fund 3

"Cảm ơn mọi người. Bắt đầu build thôi. Tôi thấy ai cũng đang rất háo hức rồi. Hẹn gặp mọi người vào ngày sự kiện.

Cảm ơn."

## [01:11:38 - 01:42:10] Dr. Ferdin - Chia sẻ kỹ thuật về Alibaba Cloud và Qwen 3

"Chào buổi tối mọi người. Tôi sẽ chia sẻ về sản phẩm Model Studio.

Đây là công cụ tiêu thụ AI token của Alibaba Cloud. Trước tiên, tôi muốn cho mọi người thấy hạ tầng toàn cầu của Alibaba Cloud. Hiện chúng tôi có 29 region trên 29 khu vực địa lý và 92 data center.

Nếu nhìn vào mật độ data center, đặc biệt ở Đông Á và Đông Nam Á, sẽ thấy rất dày. Riêng Đông Nam Á chúng tôi có data center ở Kuala Lumpur, Singapore, Jakarta, Bangkok, Manila, Hong Kong...

Về năng lực AI, theo Gartner, Alibaba Cloud liên tục nằm trong nhóm emerging leaders ở nhiều hạng mục như AI knowledge management apps, general productivity, generative AI engineering, model providers, và cloud infrastructure cho generative AI.

Chúng tôi có hơn 150 chứng chỉ compliance, bao gồm ISO, các chứng chỉ địa phương, privacy policy và quy định ngành.

Về Tongyi model family, trong hệ này có một sản phẩm tên là Model Studio. Đây là nơi các bạn sẽ tiêu thụ token.

Chúng tôi có hai foundation model chính là Qwen và Wan.

Qwen có Qwen Turbo, Qwen Plus, Qwen Max. Đây là nhóm text model. Có thêm reasoning model là QWQ. Vision-language model là Qwen VL. Multimedia generation như text-to-image, image-to-video, text-to-video thì có Wan.

Qwen trong tiếng Trung gọi là Qianwen, nghĩa là hỏi một ngàn câu hỏi. Nó được xây trên transformer architecture và hiện hỗ trợ hơn 200 ngôn ngữ.

Nó bắt đầu từ 7 tỷ tham số và hiện Qwen 3 đã lên tới 1 nghìn tỷ tham số.

Qwen có dải model từ tiny đến rất lớn, hiểu 119 ngôn ngữ, bao gồm Thai, Bahasa, Malay, Indonesian, Vietnamese, Korean, Japanese...

Về đa phương thức, có Qwen VL. Về audio speech, tất cả đều có thể dùng thông qua một API duy nhất.

Bốn flagship model là:

- Qwen Max cho reasoning phức tạp và sinh văn bản lớn
- Qwen Plus cho bot, sinh nội dung và ứng dụng doanh nghiệp
- Qwen Flash cho tốc độ nhanh, chi phí thấp, phù hợp chatbot độ trễ thấp
- specialist models như Qwen coder, QWQ, Qwen embedding

Qwen coder được dùng cho IDE. Có coding plan của Qwen. Mức hackathon, nếu đăng ký 10 USD thì đã có khá nhiều credit. Nó tích hợp với Visual Studio Code và nhiều IDE khác.

QWQ và Qwen Math cho suy luận và toán học. Qwen embedding cho RAG.

Về các kiểu dữ liệu mà Qwen xử lý:

- Qwen VL cho hình ảnh và video, video tối đa 1 giờ
- Qwen Audio và Qwen ASR cho speech
- Qwen Image cho text-to-image
- Qwen Omni cho text, image, audio, video trong một model

Qwen có thể làm information retrieval, writing assistance, coding development, educational support.

Mọi người hôm nay nhắc đến nhiều scenario như finance, public sector... thì có thể nhìn use case để chọn model phù hợp.

Qwen đã đi qua các phiên bản 1.5, 2, 2.5, và hiện tại 3.6.

- 1.5 phù hợp latency rất thấp
- 2 phù hợp general purpose
- 2.5 phù hợp mission-critical tasks và R&D
- 3.5 / 3.6 phù hợp output nặng và tính năng cao

Trên Hugging Face và open router leaderboard, Qwen đang đạt vị trí rất cao. Ở một số benchmark, Qwen đang dẫn đầu.

Chúng tôi cũng có model-as-a-service, bao gồm Tongyi Qwen, third-party model, và industry model.

Ngoài Qwen và Wan, còn có Fun model. Ví dụ Cozi Voice và Fun ASR. Đây là các model song song cho audio và speech.

Hiện tại Qwen đã có hơn 600 triệu lượt tải trên Hugging Face, và đã có hơn 170.000 model tùy chỉnh được tạo từ nó.

Về endpoint, hiện chúng tôi có 5 endpoint trên toàn cầu:

- Beijing
- Singapore
- Virginia
- Frankfurt
- Hong Kong

Endpoint giúp giảm latency khi phục vụ người dùng ở các khu vực khác nhau. Nếu đội ở Việt Nam nhưng phục vụ khách hàng Châu Âu, có thể dùng Frankfurt.

Về cách sử dụng:

Vào Model Studio, chọn model, và gọi bằng API. Hoặc dùng playground để thử nhanh.

Trong playground, tôi thử prompt nhờ hệ thống tạo lịch trình 3 ngày ở TP.HCM. Model sẽ suy nghĩ và trả kết quả.

Chi phí sẽ được tính theo input tokens, thinking tokens và output tokens. So với nhiều sản phẩm AI khác, với cùng một số tiền, Model Studio cho nhiều token hơn.

Về speech:

- Qwen ASR hoặc Fun ASR cho speech recognition
- speech synthesis cho text-to-speech

Về vision:

Bạn upload ảnh để hỏi trong ảnh có gì. Nếu muốn tạo ảnh thì dùng image generation. Có Qwen image và Wan.

Video generation có Wan 2.2, 2.5, 2.6...

Wan có thể tạo video theo prompt rất ngắn, có thể chỉ định góc quay, background, ánh sáng, hiệu ứng, âm nhạc...

Chúng tôi đã dùng Wan cho iLight Festival tại Singapore, để người dùng quét QR, chụp selfie, upload lên hệ thống, rồi hệ thống tạo video cho thấy họ trong một thành phố AI.

Qwen Coder rất hợp với việc viết code và tạo ứng dụng. Tôi khuyên nghị plugin KiloCode trên VS Code.

Alibaba Cloud Coding Plan có hai gói:

- Lite 10 USD / tháng
- Pro 50 USD / tháng

Lite đã đủ để làm challenge hackathon.

Tôi khuyên nghị dùng VS Code + Model Studio API.

Về API key:

Vào gear icon, chọn API key, tạo key mới, copy lại. Sau đó vào trang model, lấy sample code, thay API key mẫu bằng key của mình, là có thể gọi API.

Trong VS Code, cài extension, dùng endpoint Dashscope INTL và API key đó là chạy được.

Qwen 3 Live Translate là một tính năng rất quan trọng. Nếu có ứng dụng streaming mà người dùng nói một ngôn ngữ, nhưng bạn muốn dịch và broadcast ngay lập tức đến nhiều người dùng bằng nhiều ngôn ngữ khác nhau, có thể dùng nó. Latency chỉ khoảng 1-2 giây.

Về monitoring và permission, các bạn có thể xem usage, tạo RAM user, phân quyền cho team, và theo dõi tiêu thụ.

Mặc định, khi tạo tài khoản, các bạn đã có khá nhiều token. Ngoài ra đội của tôi sẽ còn cấp thêm coupon, nên không cần lo thiếu token để hoàn thành hackathon.

Đó là hết phần chia sẻ và demo của tôi."
