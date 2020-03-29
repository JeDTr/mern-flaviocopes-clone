<template>
  <div class="container">
    <Sidebar />
    <article class="post-container" v-if="hasData">
      <h1>{{ post.title }}</h1>
      <p>{{ post.subtitle}}</p>
      <p class="single-post-date">
        Published
        <time>{{post.dateAdded}}</time>
      </p>
      <div class="single-post-content">{{post.content}}</div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import Sidebar from "@/components/Sidebar";

export default {
  computed: {
    ...mapState("post", {
      post: state => state.post.post
    }),
    ...mapGetters("post", ["hasData"])
  },
  methods: {
    ...mapActions("post", ["getPost"])
  },
  created() {
    // debugger;
    //
    this.getPost(this.$route.params.cuid.split("-").pop());
  },
  components: {
    Sidebar
  }
};
</script>

<style lang="">
</style>