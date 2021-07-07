<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
                v-model="article.title"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="What's this article about?"
                v-model="article.description"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                v-model="article.body"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter tags"
                v-model="article.tags"
              />
            </fieldset>
            <fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="createArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArtical, updateArticle } from "@/api/article";
export default {
  name: "EditorIndex",
  middleware: ["authenticated"],
  data() {
    return {};
  },
  async asyncData({ params }) {
    let article = {
      title: "",
      description: "",
      body: "",
      tags: "",
    };
    if (params.slug) {
      const { data } = await getArtical(params.slug);
      const { title = "", description = "", body = "", tagList } = data.article;

      article = {
        title,
        description,
        body,
        tags: tagList.join(","),
      };
    }
    return {
      article,
    };
  },
  methods: {
    async createArticle() {
      const article = {
        ...this.article,
      };
      article.tagList = article.tags.split(",");
      delete article.tags;
      let slug = this.$route.params.slug;
      if (slug) {
        await updateArticle(slug, { article });
      } else {
        const { data } = await createArticle({ article });
        slug = data.article.slug;
      }
      this.$router.push({
        name: "article",
        params: {
          slug,
        },
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>