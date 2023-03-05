import { defineStore } from "pinia";
import { DateTime } from "luxon"
import { axiosAPI } from '../plugin/axios';


// Pay attention to names which I wrote here , names are important for pinia to work
export const useArticlesStore = defineStore('articleStore', {
    state: () => ({
        fetching_in_progress : false,
        artTime: null,
        articles: null,
    }),
    actions: {
       async getPosts() {
            this.fetching_in_progress = true;
            axiosAPI.get('articles/').then((response) => {
              //changing date format
              const articles = response.data.articles.map((artTime) => {
                artTime.createdAt = DateTime.fromISO(artTime.createdAt).toFormat("yyyy/MM/dd hh:mm")
                return artTime 
              });
              console.log(articles);
              this.articles = articles;
              this.fetching_in_progress = false;
              
            })
              .catch((error) => {
                console.log(error);
                this.fetching_in_progress = false;
              })
          },

         toggleFav(slug){
          const article = this.articles.find(a => a.slug === slug)
          article.favorited = !article.favorited ;

          if (article.favorited){
            article.favoritesCount ++ ;
          }
          
          else if (!article.favorited){
            article.favoritesCount -- 
          }

         }
    }
})