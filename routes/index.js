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

//회원 목록(게시판의경우 글 목록)을 누를때

router.get('/info', function(req, res, next) {
  //userInfo스키마에서 find하고 sort부분은 빨리쓴글이 밑으로 가게 sort한다 예외처리를 해서 오류가나면 오류를
  //thorow 하고 오류가 없을경우 info를 렌더링하고, info에 DB값을 보낸다.
  userInfo.find({}).sort({date:-1}).exec(function(err, rawUser) {
    if(err) throw err;
    //res.json(rawUser);
    res.render('info', {userInfo: rawUser});
});
});

router.get('/delete/:id',function(req,res,next){
  //주소의 파라미터로 id를 받아와서 id라는 변수에 저장한다.
  var id = req.params.id;
  //findByIdAndRemove라는 함수는 id값을 받아서 바로 지운다!
  userInfo.findByIdAndRemove(id,function(err, rawUser){
    if(err) {
      res.send(err);
    }
    res.redirect('/');
  })
});
module.exports = router;
