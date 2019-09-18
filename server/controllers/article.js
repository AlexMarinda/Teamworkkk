import articles  from '../model/article';
import moment from 'moment';
import jwt from 'jsonwebtoken';


class Article {
    


static  createArticle(req, res) {
const getUser = jwt.decode(req.headers.authorization.split(' ')[1]);
const newArticle = {
article_id:articles.length + 1,
title:req.body.title,
article:req.body.article,
category:req.body.category,
createdOn:moment().format(),
user_id: getUser.user_id,
inappropriate:0,
status:"unshare"

};

    articles.push(newArticle);


if(newArticle)
 res.status(201).send({ status: 201, message:'article successfully created',data: { ...newArticle } });
return res.status(400).send({ status: 400,'message':'article not created' });

}

static  shareArticle (req, res) {
  const getUser = jwt.decode(req.headers.authorization.split(' ')[1]);
    const findArticle =   articles.find(t => t.article_id === parseInt(req.params.article_id));
    if(findArticle){
       
       if(getUser.user_id === findArticle.user_id){

        findArticle.status = "share";

  
        return res.status(200).send({ status: 200, 'message': 'article successfully shared', data: {
          title:findArticle.title,
          article:findArticle.article,
        status:findArticle.status}});
      }
      else{
        return res.status(400).send({ status: 400, 'message':'You did not make this article with article_id'});
      }
     } 
     else {
          return res.status(404).send({ status: 404,  'message':'article not found!'});
     }
     }





}
export default Article;