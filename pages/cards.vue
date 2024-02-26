<template>
  <div
    id="flashcard-app"
  >
    <v-row
      class="pa-4"
    >
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        v-on:click="toggleCard(card)"
        class="flex cards"
      >
        <transition name="flip">
          <div
            :key="card.flipped"
            class="card"
          >
            <span>{{ card.flipped ? card.back : "" }}</span>
          </div>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>

const cardsArray = [
  {
    front: '',
    back: 1,
    flipped: false,
  },
  {
    front: '',
    back: 2,
    flipped: false,
  },
  {
    front: '',
    back: 3,
    flipped: false,
  },
  {
    front: '',
    back: 4,
    flipped: false,
  },
      {
    front: '',
    back: 5,
    flipped: false,
  },
  {
    front: '',
    back: 6,
    flipped: false,
  },
  {
    front: '',
    back: 7,
    flipped: false,
  },
  {
    front: '',
    back: 8,
    flipped: false,
  },
      {
    front: '',
    back: 9,
    flipped: false,
  },
  {
    front: '',
    back: 10,
    flipped: false,
  },
]

export default {

  data: () => ({
    cards:cardsArray,
    newFront: '',
    newBack: '',
    error: false
  }),
  created() {
    this.randomList(this.cards)
  },
  methods: {

    randomList: function(rand){
      return rand.sort(function(){return 0.5 - Math.random()})
    },

    toggleCard: function(card) {
      card.flipped = !card.flipped;
    },

  },

  head() {
    // У всех страниц должны быть title и description.
    let title = "Статистика оффлайн игр в мафию";
    let description = "Описание контента главной страницы сайта";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },
};
</script>

<style scoped>

body {
    font-family: 'Montserrat', sans-serif;
    text-align: center;
  }

  .hidden {
    display: none;
  }

  ul {
    padding-left: 0;
    display: flex;
    flex-flow: row wrap;
  }

  li {
    list-style-type: none;
    padding: 10px 10px;
    transition: all 0.3s ease;
  }

  li:hover{
    transform: scale(1.1);
  }

  .cards {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .child-flex > *, .flex {
    flex: 1;
    max-width: 100%;
  }

  .card {
    display: flex;
    background-color: #ff0f0f;
    border-radius: 7px;
    width: 32vh;
    height: 42vh;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    position: relative;
    color: #fff;
    font-weight: 200;
    font-size: 160px;
    -webkit-box-shadow: 9px 10px 22px -8px rgba(255,15,15,.6);
    -moz-box-shadow: 9px 10px 22px -8px rgba(255,15,15,.6);
    box-shadow: 9px 10px 22px -8px rgba(255,15,15,.6);
    will-change: transform;
  }

  @media (max-width: 700px) {
    .card {
      width: 18vh;
      height: 14vh;
      font-size: 60px;
    }
  }

  span {
    display: flex;
  }

  li:nth-child(-n+3) .card{
    background-color: #e65f51;
    }

  li:nth-child(2n+1) .card{
    background-color: #a17de9;
    }

  li:nth-child(4n) .card{
    background-color: #feca34;
    }

  li:nth-child(5n-2) .card{
    background-color: #51aae5;
    }

  li:nth-child(4n+4) .card{
    background-color: #feca34;
    }

  li:nth-child(-7n+7) .card{
    background-color: #e46055;
    }

  .delete-card {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 15px;
    opacity: .4;
    transition: all 0.5s ease;
  }

  .delete-card:hover, .error {
    opacity: 1;
    transform: rotate(360deg);
  }

  .flip-enter-active {
    transition: all 0.4s ease;
  }

  .flip-leave-active {
    display: none;
  }

  .flip-enter, .flip-leave {
    transform: rotateY(180deg);
    opacity: 0;

  }

</style>

