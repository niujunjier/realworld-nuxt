<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <article-comment :slug="article.slug" />
  </div>
</template>

<script>
import { getArtical } from "@/api/article";
import MarkdownIt from "markdown-it";
import articleMeta from "./comps/article-meta";
import articleComment from "./comps/comment";
export default {
  name: "ArticleIndex",
  data() {
    return {};
  },
  components: {
    articleMeta,
    articleComment,
  },
  async asyncData({ params }) {
    const { data } = await getArtical(params.slug);
    const md = new MarkdownIt();
    data.article.body = md.render(data.article.body);
    return {
      article: data.article,
    };
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style lang="" scoped>
</style>