# A14 · Miền ký ức

Website hoài niệm của lớp A14: album ảnh/video, câu chuyện, bạn học, sơ đồ chỗ ngồi, lưu bút riêng, thư hẹn ngày mở, họp lớp và âm nhạc.

## File HTML ở đâu?

**[docs/index.html](docs/index.html)** là bản HTML đã xuất dành cho GitHub Pages.
Cần đưa **toàn bộ thư mục docs** lên GitHub, bao gồm assets, ảnh, phông chữ và a14-config.js. Không chỉ tải một mình index.html.

File index.html tại gốc dự án là đầu vào cho bộ biên dịch. Bản đã chạy được nằm trong docs/index.html.

## Đưa giao diện lên GitHub Pages

1. Push mã nguồn lên repository.
2. Trong GitHub: Settings → Pages → Build and deployment.
3. Chọn Deploy from a branch, nhánh chứa mã nguồn và thư mục /docs, rồi Save.
4. GitHub sẽ hiển thị URL website sau khi hoàn tất triển khai.

Website dùng điều hướng bằng dấu # nên không bị lỗi 404 khi mở trang đăng nhập trong repository có tên riêng.

## HTML và máy chủ

GitHub Pages chỉ phục vụ giao diện tĩnh. Nó không chạy API đăng nhập hoặc tự giữ bí mật Google.
Bản HTML chưa kết nối máy chủ sẽ hiển thị thông báo rõ ràng khi đăng nhập, không giả vờ lưu dữ liệu.

Ứng dụng đầy đủ nằm trong app/, lib/ và db/.
Khi có máy chủ A14 hoạt động:
- Đặt URL máy chủ HTTPS trong public/a14-config.js rồi chạy npm run build:github; hoặc chỉnh docs/a14-config.js sau khi xuất.
- Đặt FRONTEND_ORIGIN ở máy chủ bằng origin của GitHub Pages, không gồm đường dẫn repository.
- SITE_ORIGIN là URL của máy chủ, dùng cho callback Google.
- Máy chủ cần cho phép frontend truy cập và dùng cookie bảo mật. Trình duyệt chặn cookie bên thứ ba có thể yêu cầu mở ứng dụng tại URL máy chủ.

Không đặt mật khẩu, SESSION_SECRET, Google Client secret hoặc token trong a14-config.js hay HTML.

## Chạy ứng dụng đầy đủ

Yêu cầu Node.js >= 22.13 và npm.

    npm ci
    npm run dev

Mở http://localhost:5173.
Thiết lập các biến trong .env dựa trên .env.example. Tài khoản quản trị dùng ADMIN_USERNAME; mật khẩu được xác minh bằng ADMIN_PASSWORD_HASH (PBKDF2 SHA-256, 100000 vòng, salt ngẫu nhiên).

Ứng dụng dùng binding Cloudflare D1 DB cho bảo mật tài khoản và thông tin kết nối mã hóa. Tạo cấu trúc từ drizzle/0000_whole_pandemic.sql theo môi trường triển khai. Không có tài khoản mẫu hoặc mật khẩu mặc định trong mã nguồn.

Build máy chủ:

    npm run build

Build giao diện GitHub Pages:

    npm run build:github

## Kết nối Google Drive

Thư mục đã cấu hình: https://drive.google.com/drive/folders/1hlx_WFWiZETh536ukxyyZqKUScvoqVXL

1. Trong Google Cloud, bật Drive API và Sheets API.
2. Tạo OAuth Client kiểu Web application; đăng ký URL callback hiển thị trong trang Quản trị lớp.
3. Nếu ứng dụng ở chế độ thử nghiệm, thêm tài khoản quản lý Drive vào danh sách người dùng thử.
4. Đăng nhập admin, nhập Client ID và Client secret, rồi chọn Kết nối Google.
5. Dùng tài khoản có quyền chỉnh sửa thư mục A14. Chỉ cấp quyền sau khi đọc màn hình Google.
6. Giới hạn quyền truy cập thư mục A14 cho người quản lý. Không chia sẻ công khai file dữ liệu.
7. Chọn Khởi tạo kho dữ liệu. Chỉ sau khi thành công mới có thể lưu kỷ niệm.

Hai file Google Sheets:
- A14_Noi_dung: cấu hình lớp, hồ sơ, album, ảnh/video, bài viết, bình luận, cảm xúc, sự kiện, bình chọn, tham gia, âm nhạc và các bảng liên kết.
- A14_Quan_tri_Rieng_tu: tài khoản (không chứa mật khẩu), yêu cầu tham gia, lưu bút, thư thời gian, báo cáo và nhật ký.

Ảnh/video lưu trong 02_Anh_Video theo năm học. 03_Anh_thu_nho và 04_Sao_luu là thư mục dự phòng; chưa có lịch sao lưu tự động.

## Bảo mật và trạng thái triển khai

- Kiểm tra quyền ở máy chủ cho mọi thao tác.
- Thành viên đăng ký ở trạng thái chờ duyệt.
- Mật khẩu băm, cookie HttpOnly, kiểm tra Origin và giới hạn số lần đăng nhập.
- Google Client secret và token được mã hóa tại máy chủ, không nằm trong Sheets.
- Lưu bút riêng chỉ trả về cho người gửi/người nhận. Nội dung thư tương lai không gửi xuống trình duyệt trước ngày mở.
- Bản hiện tại đã kiểm tra đăng nhập và các quy tắc riêng tư bằng bản cục bộ.
- Chưa xác minh upload trực tiếp vào Google Drive vì chưa có kết nối OAuth của chủ thư mục.

Kiểm tra quy tắc riêng tư:

    node tests/a14-security.mjs

Minh họa lớp học được tạo riêng cho website; không phải ảnh thật của lớp. Phông Noto Serif từ Google Fonts.
