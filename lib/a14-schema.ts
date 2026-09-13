
export const ROOT_FOLDER="1hlx_WFWiZETh536ukxyyZqKUScvoqVXL";
export const COMMON=["id","owner_id","created_at","updated_at","status"];
export const TABLES:Record<string,{private?:boolean;label:string;fields:string[]}>={
 CAU_HINH_LOP:{label:"Thông tin lớp",fields:["school","class_name","school_years","intro"]},
 HO_SO:{label:"Hồ sơ bạn học",fields:["member_id","name","nickname","bio","seat"]},
 ALBUM:{label:"Album kỷ niệm",fields:["title","year","description","folder_id"]},
 TEP_MEDIA:{label:"Ảnh và video",fields:["album_id","drive_file_id","file_name","mime_type","size","caption"]},
 GAN_THE:{label:"Gắn tên bạn bè",fields:["target_type","target_id","member_id"]},
 BAI_VIET:{label:"Chuyện ngày ấy",fields:["title","content","year"]},
 BAI_VIET_MEDIA:{label:"Ảnh trong bài viết",fields:["post_id","media_id"]},
 BINH_LUAN:{label:"Bình luận",fields:["target_type","target_id","content"]},
 CAM_XUC:{label:"Cảm xúc",fields:["target_type","target_id","kind"]},
 SU_KIEN:{label:"Hẹn họp lớp",fields:["title","date","place","content"]},
 PHUONG_AN_HOP_LOP:{label:"Phương án họp lớp",fields:["event_id","label"]},
 BINH_CHON:{label:"Bình chọn",fields:["event_id","option_id"]},
 THAM_GIA:{label:"Xác nhận tham gia",fields:["event_id","answer","guests","note"]},
 AM_NHAC:{label:"Góc âm nhạc",fields:["title","url","content"]},
 TAI_KHOAN:{private:true,label:"Tài khoản",fields:["member_id","username","name","email","role","account_status"]},
 YEU_CAU_THAM_GIA:{private:true,label:"Yêu cầu tham gia",fields:["member_id","name","email","result"]},
 LUU_BUT:{private:true,label:"Lưu bút",fields:["recipient_id","visibility","content"]},
 THU_THOI_GIAN:{private:true,label:"Thư thời gian",fields:["recipient_id","visibility","content","opens_at"]},
 BAO_CAO:{private:true,label:"Yêu cầu gỡ nội dung",fields:["target_type","target_id","content","resolution"]},
 NHAT_KY:{private:true,label:"Nhật ký quản trị",fields:["action","target_id"]}
};
export type Row=Record<string,string>;
export const YEARS=["Lớp 10","Lớp 11","Lớp 12","Họp lớp","Chưa rõ năm"];
export const VIEW_LABELS:Record<string,string>={album:"Album lớp mình",timeline:"Chuyện ngày ấy",members:"Bạn học năm ấy",guestbook:"Trang lưu bút",capsule:"Hộp thư thời gian",events:"Hẹn ngày gặp lại",music:"Góc âm nhạc",admin:"Quản trị lớp"};
