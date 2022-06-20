# vue-trello

## 라우팅
- 현재 라우터가 제공하는 컴포넌트가 렌더링
```
<router-view> </router-view>
```

- a 태그 처럼 링크를 이동시키는데 차이점은 <br>
  a 태그는 페이지 새로고침이 되고, 라우터 링크는 페이지 리로드하지 않는다.
```
<router-link to="/"> </router-link> 
```
- 동적 라우팅 : path: '/board/:id' 값을 주면, (동적 세그먼트는 콜론으로 시작한다) <br>
  this.$route.params.id 로 적은 데이터를 가져올 수 있다.<br>
  
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## API 통신
- 백엔드 API 살펴보기
  - https://github.com/jeonghwan-kim/lecture-vue-trello-server.git   주소를 clone 후,
  - 터미널에 git clone 깃헙주소 붙여넣기
  - cd lecture-vue-trello-server 로 폴더안으로 들어가기
  - 얘도 node로 만든 서버라 npm i 해줘야한다.
  - npm run dev
  - server is running localhost:3000 번이라 뜨면 성공인거다!
  - locaolhost:3000번으로 접속하자
