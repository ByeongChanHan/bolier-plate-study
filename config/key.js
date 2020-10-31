// 프로덕션(배포이후)일때
if(process.env.NODE_ENV === 'production'){
    // prod.js를 이용
    module.exports = require('./prod')
}else{
    // 로컬일경우 dev.js를 이용
    module.exports = require('./dev')
}