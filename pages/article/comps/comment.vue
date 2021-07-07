<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" @submit.prevent="addComments">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="comment"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" :disabled="submitDisable">
            Post Comment
          </button>
        </div>
      </form>

      <div class="card" v-for="item in comments" :key="item.id">
        <div class="card-block">
          <p class="card-text">
            {{ item.body }}
          </p>
        </div>
        <div class="card-footer">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: item.author.username,
              },
            }"
            class="comment-author"
          >
            <img :src="item.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: item.author.username,
              },
            }"
            class="comment-author"
            >{{ item.author.username }}
          </nuxt-link>
          <span class="date-posted">{{ item.createdAt | date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "Comment",
  data() {
    return {
      comments: [],
      comment: "",
      submitDisable: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  props: {
    slug: {
      type: String,
      require: true,
    },
  },
  async fetch() {
    const { data } = await getComments(this.slug);
    this.comments = data.comments || [];
    this.submitDisable = false;
  },
  methods: {
    async addComments() {
      if (this.comment === "") return;
      this.submitDisable = true;
      await addComments(this.slug, {
        comment: {
          body: this.comment,
        },
      });
      this.comment = "";
      this.$fetch();
    },
    // async getComments() {
    //   const { data } = await getComments(this.slug);
    //   this.comments = data.comments || [];
    // },
  },
};
</script>

<style lang="" scoped>
</style>