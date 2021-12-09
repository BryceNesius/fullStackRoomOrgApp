<template>
  <Stories :stories="items" />
</template>

<script id="Stories">
import Stories from "vue-stories-instagram";

export default {
  components: { Stories },
  data: () => ({
    items: [
      {
        username: "Isaac Wickham",
        picture: "https://randomuser.me/api/portraits/men/69.jpg",
        time: "12h",
        images: [
          {
            url: "https://picsum.photos/id/1029/200/300",
            viewed: true,
          },
          {
            url: "https://picsum.photos/id/34/200/300",
            viewed: true,
          },
          {
            url: "https://picsum.photos/id/10/200/300",
            viewed: false,
          },
          {
            url: "https://picsum.photos/id/103/200/300",
            viewed: false,
          },
        ],
      },
    ]
  })
};
</script>