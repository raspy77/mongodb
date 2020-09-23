const { MongoClient } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

// mongodb://{서버IP}//:{port}/{데이터베이스 이름}

// 클라이언트 생성
const url= "mongodb://192.168.1.131:27017/mydb"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// 접속 테스트 
function testConnect(){
    client.connect((err, client) =>{
        // 콜백 함수
        if(err){
            // 에러 발생시
            console.error(err);
        } else{
            // 정상접속
            console.log(client);
        }
    })
}
// testConnect();

// insertOne, insertMany
function testInsertDocumnet(docs){
    // doc 배열이면 -> insertMany
    // 객체면 -> insert
    if(Array.isArray(docs)){
        // insertMany
        // db.collection.insert([{문서}, {문서}...])
        // SQL: INSERT INTO table VALUES(...), (...),
        client.connect().then(client => {
            const db = client.db("mydb");
            db.collection("friends").insertMany(docs)
                .then(result => {
                    console.log(result.insertedCount,"개의 문서가 삽입");
                })
        }).catch(err =>{
            console.error(err);
        })
    }else{
        // insert
        // db.collection.insert({문서});
        // SQL: INSERT INTO table VALUES(...);
        client.connect((err, client) => {
            const db = client.db("mydb");
            // collection 객체에 접근
            db.collection("friends").insertOne((err, result) => {
                if(err){
                    console.error(err);
                } else{
                    console.log(result);
                    console.log(result.insertedCount, "개의 문서가 insert");
                }
            });
        });
    }
}
// testInsertDocumnet({ name:"전우치", job:"도사"});
testInsertDocumnet([
    {name: "고길동", gender: "남성", species: "인간", age: 50},
    {name: "둘리", gender: "남성", species: "공룡", age: 1000000},
    {name: "도우너", gender: "남성", species: "외계인", age: 15},
    {name: "또치", gender:"여성", species:"조류", age: 13},
    {name: "마이콜", gender:"남성", species:"인간", age:25},
    {name: "봉미선", gender:"여성", species:"인간", age:35}
]); // 문서의 배열 -> insertMany

function testDeleteAll(){
    // db.collection.delete() : 전체삭제
    // SQL: DELETE FROM table;
    client.connect().then(client =>{
        const db = client.db("mydb");
        db.collection('friends').deleteMany({})
            .then(result =>{
                console.log(result.deletedCount, "개의 문서가 삭제");
            })
    }).catch(err =>{
        console.error(err);
    });
}
// testDeleteAll();