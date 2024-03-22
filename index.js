// 필요한 모듈 불러오기
const express = require('express');
const path = require('path');

// Express 앱 생성
const app = express();

// 정적 파일 제공을 위해 express.static 미들웨어 사용
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 설정
app.get('/', (req, res) => {
    // index.html 파일을 응답으로 보냄
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const axios = require('axios');
const XmlConvert = require('xml-js');

async function getOpenApiData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

const showListURL = 'http://www.kopis.or.kr/openApi/restful/pblprfr?service=fa3c8f8cc2c94da2bf5e4a40f8d54321'; // 공연목록 조회
const showDetailURL = 'http://www.kopis.or.kr/openApi/restful/pblprfr?service=fa3c8f8cc2c94da2bf5e4a40f8d54321&mt20id='; // 공연상세 조회
const showFacilityDetailURL = 'http://www.kopis.or.kr/openApi/restful/pblprfr?service=fa3c8f8cc2c94da2bf5e4a40f8d54321&mt10id='; // 공연시설상세 조회
const boxOfficeURL = 'http://www.kopis.or.kr/openApi/restful/boxoffice?service=fa3c8f8cc2c94da2bf5e4a40f8d54321&ststype=month&date='; // 박스오피스 조회


let stdate = '20231201';
let eddate = '20231230';
let cpage  = '1';
let rows   = '10';
//const ul = getOpenApiData.createElement('ul'); // 데이터 그려넣을 요소



// 정적 파일 제공을 위해 express.static 미들웨어 사용
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 설정
app.get('/', (req, res) => {
    // index.html 파일을 응답으로 보냄
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


let showListURLF = showListURL + '&stdate=' + stdate + '&edddate=' + eddate + '&cpage=' + cpage + '&rows=' + rows; // 위에 공연목록조회 url에 필수로 들어가는 파라미터를 합친 변수
getOpenApiData(showListURLF) // 파라미터를 다 합쳐서 요청 보내기
.then(data => { // 호출하고 그 결과값을 'data'라는 이름으로 다루겠다는 뜻
    if (data) { // 데이터가 있으면
            jsonData = XmlConvert.xml2json(data, { // xml에서 json으로 바꿈 최상단에 보면 xml-js라는 외부 라이브러리를 npm install해서 convert함
                compact :  true, // compact 라는 옵션이 있었는데 이게 더 이쁘게 나오는 옵션인듯
                spaces  :  4 // 공백 수
            });
            const dbList =  JSON.parse(jsonData).dbs.db; // api 결과가 dbs안에 db라는 리스트 안에 0번째,1번째,2번째 이런식으로 데이터가 들어있음

            dbList.forEach(element => {
                const li = document.createElement('li'); // 데이터 그려넣는 li
                // li 내용 설정
              li.innerHTML = `
              <strong>공연아이디:</strong> ${element.mt20id._text}<br>
              <strong>공연명:</strong> ${element.prfnm._text}<br>
              <strong>공연시작일:</strong> ${element.prfpdfrom._text}<br>
              <strong>공연마감일:</strong> ${element.prfpdto._text}<br>
              <strong>공연장소:</strong> ${element.fcltynm._text}<br>
              <strong>공연포스터:</strong> <img src="${element.poster._text}" alt="포스터"><br>
              <strong>공연장르:</strong> ${element.genrenm._text}<br>
              <strong>오픈런:</strong> ${element.openrun._text}<br>
              <strong>공연상태:</strong> ${element.prfstate._text}<br>
              <hr>
            `;

            // ul에 li 추가
            ul.appendChild(li);

            document.getElementById('showList').appendChild(ul);
            });
    } else {
      console.log('Failed to fetch data from the API.');
    }
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });