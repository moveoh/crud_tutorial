var express = require('express');
var router = express.Router();

//회원가입 모듈 불러오깅~ userInfo에다가..
var userInfo = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//회원가입 페이지를 띄워줌
router.get('/create', function(req, res, next) {
    res.render('create');
});

//회원가입 확인을 누를때
router.post('/create_member',function(req,res,next){
  //cmd에 유저가 가입시 입력한 정보를 출력
  console.log(req.body);

  //member에 model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는프로그래밍 인터페이스를 정의
  var member = new userInfo();
  //member.name..은 db에 있는 항목. req.body.user_name 등등..은 form태그의 name에있는 값을 읽어옴
  //post는 body나 params를, get방식은 query를 사용
  member.name = req.body.user_name;
  member.email = req.body.user_mail;
  member.userid = req.body.user_id;
  member.password = req.body.user_pw;

  member.save(function(err){
    if(err){
      console.error(err);
      return;
    }
    res.redirect('/');
  });
});

module.exports = router;
