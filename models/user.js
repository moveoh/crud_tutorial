var mongoose = require('mongoose');

//회원 스키마 생성
var userSchema = mongoose.Schema({
    name:String, // 유저 명
    userid: String, // 유저 아이디
    password: String, // 유저 비밀번호
    email: String, // 유저 메일
    updel: {mod:{type: Number, default: 0}, date:{type:Date, default: Date.now}}, // 수정 삭제 여부
    date:{type:Date, default:Date.now} // 등록 날짜
});

module.exports = mongoose.model('userInfo', userSchema);
