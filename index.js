const api = require("./api");
const mysql = require("mysql");
const config = require("./db.js");
const connection = mysql.createConnection(config);

api
  .create()
  .getHashtag()
  .then(res => {
    var counter = 0;
    var data = res.data.graphql.hashtag.edge_hashtag_to_media.edges;
    while (counter < data.length) {
      var insert = {
        username: data[counter].node.owner.id,
        content: data[counter].node.display_url,
        like_count: data[counter].node.edge_liked_by.count,
        comment: data[counter].node.edge_media_to_comment.count,
        date: data[counter].node.taken_at_timestamp
      };
      console.log(insert);
      let sql = `INSERT INTO hastagig(username,content,like_count,comment,date) VALUES(${
        insert.username
      },"${insert.content}",${insert.like_count},${insert.comment},${
        insert.date
      })`;
      connection.query(sql);
      counter++;
    }
    connection.end();
  })
  .catch(err => {
    console.log("ERR", err);
  });
