<template>
  <aside>
    <p>
      <router-link to="/">
        <span role="img" aria-label="home">🏡</span> Home
      </router-link>
    </p>
    <p>
      Hi
      <span role="img" aria-label="wave">👋🏼</span> I'm Jed, a web developer.
      <br />I create this blog just for learning ReactJS and NodeJS.
    </p>
    <p>
      Source:
      <a href="https://flaviocopes.com/">Flaviocopes.com</a>
    </p>
    <p>
      <button @click="lightDarkModeToggle">
        <span role="img" aria-label="moon">🌓</span> Light|dark mode
      </button>
    </p>
    <h4>My Recommended Courses</h4>
    <ul>
      <li>Course 1</li>
      <li>Course 2</li>
      <li>Course 3</li>
      <li>Course 4</li>
    </ul>
    <div class="tags-cloud">
      <router-link
        v-for="tag in tags"
        :key="tag._id"
        :to="`/tag/${tag.slug}`"
        :class="`bg-${tag.slug}`"
      >{{tag.name}}</router-link>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("tag", {
      tags: state => state.tag.tags
    })
  },
  methods: {
    ...mapActions("tag", ["getTags"]),
    lightDarkModeToggle() {
      localStorage.setItem(
        "mode",
        (localStorage.getItem("mode") || "dark") === "dark" ? "light" : "dark"
      );
      localStorage.getItem("mode") === "dark"
        ? document.querySelector("body").classList.add("dark")
        : document.querySelector("body").classList.remove("dark");
    }
  },
  created() {
    this.getTags();
  }
};
</script>