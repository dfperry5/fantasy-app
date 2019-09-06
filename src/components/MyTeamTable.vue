<template>
  <v-container>
        <v-card flat>
            <v-card-title class="align-end fill-height">Our Current Team</v-card-title>
            <v-data-table
                :headers="headers"
                :items="players"
                :items-per-page="13"
                class="elevation-1"
            >
            </v-data-table>
            <v-btn @click="refreshTeam()" color="primary">Refresh Team</v-btn>
        </v-card>
  </v-container>
</template>

<script>
export default {
    name: "TeamTable",
    data: () => ({
       headers: [
        {
            text: 'Player Name',
            align: 'left',
            sortable: false,
            value: 'Name',
          },
          { text: 'Position', value: 'Pos' },
          { text: 'Bye Week', value: 'Bye' }
        ],
      players: [],
  }),
  methods: {
    async getMyPlayers() {
        const response = await fetch('http://localhost:3000/players/draft/myTeam')
        console.log(response);
        let data = await response.json()
        return data
    },
    refreshTeam() {
        this.getMyPlayers()
            .then(allPlayers => {
                this.players = allPlayers
            });
    }
  },
  created() {
    this.getMyPlayers()
        .then(allPlayers => {
            this.players = allPlayers
        });
  }
}
</script>
