<template>
  <div>
    <div class="container">
      <Sidebar />
      <article class="post-container">
        <ul class="post-list">
          <li v-for="post in posts" :key="post.cuid" class="post-item">
            <router-link :to="`/post/${post.slug}-${post.cuid}`">
              <h3 class="title">{{post.title}}</h3>
              <p class="subtitle">{{post.subtitle}}</p>
            </router-link>
            <div class="date-tag">
              <time>{{formatDate(post.dateAdded)}}</time>
              <div class="tag">
                <router-link
                  :class="`button-tag bg-${post.tag.slug}`"
                  :to="`/tag/${post.tag.slug}`"
                >{{post.tag.name}}</router-link>
              </div>
            </div>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Sidebar from "@/components/Sidebar";

export default {
  computed: {
    ...mapState("post", {
      posts: state => state.post.posts
    })
  },
  methods: {
    ...mapActions("post", ["getPosts"]),
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US");
    }
  },
  // created() {
  //   this.getPosts(this.$route.params.slug);
  // },
  watch: {
    $route: {
      handler({ params }) {
        this.getPosts(params.slug);
      },
      immediate: true
    }
  },
  components: {
    Sidebar
  }
};
</script>

<style src="./style.css">
</style>