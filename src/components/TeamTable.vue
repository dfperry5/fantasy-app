<template>
  <v-container>
        <v-card flat>
            <v-card-title class="align-end fill-height">Current Team</v-card-title>
            <v-data-table
                :headers="headers"
                :items="players"
                :items-per-page="13"
                class="elevation-1"
                >
            </v-data-table>
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
            value: 'name',
          },
          { text: 'Position', value: 'position' },
          { text: 'Team', value: 'team' },
          { text: 'Bye Week', value: 'bye' }
        ],
      players: [
          {
            name: "Tarik Cohen",
            position: "RB",
            team: "CHI",
            bye: "4"
        },
        {
            name: "Matthew Stafford",
            position: "QB",
            team: "DET",
            bye: "5"
        }
    ]
  })
};
</script>
