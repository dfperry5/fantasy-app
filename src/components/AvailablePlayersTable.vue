<template>
  <v-container>
        <v-card flat>
            <v-card-title class="align-end fill-height">Available Players</v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-data-table
                v-model="selectedPlayer"
                :headers="headers"
                :items="players"
                :items-per-page="13"
                class="elevation-1"
                :single-select="singleSelect"
                item-key="Rank"
                show-select
                :search="search"

            >
            </v-data-table>

            <v-btn @click="weDrafted()" color="primary">We Drafted</v-btn>
            <v-spacer />
            <v-btn @click="othersDrafted()"  color="error">Someone Else Drafted </v-btn>
        </v-card>
  </v-container>
</template>

<script>
export default {
    data: () => ({
       singleSelect: true,
        selectedPlayer: null,
        search: '',
       headers: [
        {text: 'Rank', value: 'Rank'},
        {
            text: 'Player Name',
            align: 'left',
            sortable: false,
            value: 'Name',
          },
          { text: 'Position', value: 'Pos' },
          { text: 'Team', value: 'Team' },
          { text: 'Bye Week', value: 'Bye' }
        ],
      players: [],
  }),
  methods: {
    filter(value, search, item,) {
        console.log(`Value: ${value} -- Search: ${search} -- Item: ${item}`)
    },
    async getAllAvailablePlayers() {
        const response = await fetch('http://localhost:3000/players/')
        console.log(response);
        let data = await response.json()
        return data
    },
    async addPlayerToMyTeam(player){
        let response =  await fetch('http://localhost:3000/players/draft/myTeam', {
                method: 'post',
                body: JSON.stringify(player),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        let data = await response.json();
        return data;
    },
    weDrafted(){
        console.log("Yoooo!!");
        console.log(this.selectedPlayer[0])
        const newPlayer = {
            Rank: this.selectedPlayer[0].Rank,
            Name: this.selectedPlayer[0].Name,
            Bye: this.selectedPlayer[0].Bye,
            Pos: this.selectedPlayer[0].Pos.slice(0, -1),
            Team: this.selectedPlayer[0].Team
        }
        this.addPlayerToMyTeam(newPlayer).then(result => {
            console.log("Successfully added player!")
            this.getAllAvailablePlayers()
                .then( availablePlayers => {
                    console.log("In here!!!")
                    this.players = availablePlayers;
                })
        })
    },
    async addPlayerToOthers(player){
        let response =  await fetch('http://localhost:3000/players/draft/others', {
                method: 'post',
                body: JSON.stringify(player),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        let data = await response.json();
        return data;
    },
    othersDrafted(){
        console.log("Yoooo!!");
        console.log(this.selectedPlayer[0])
        const newPlayer = {
            Rank: this.selectedPlayer[0].Rank,
            Name: this.selectedPlayer[0].Name,
            Bye: this.selectedPlayer[0].Bye,
            Pos: this.selectedPlayer[0].Pos.slice(0, -1),
            Team: this.selectedPlayer[0].Team
        }

        this.addPlayerToOthers(newPlayer).then(result => {
            console.log("Successfully added player!")
            this.getAllAvailablePlayers()
                .then( availablePlayers => {
                    console.log("In here!!!")
                    this.players = availablePlayers;
            })
        })
    }
  },
  created() {
    this.getAllAvailablePlayers()
        .then(allPlayers => {
            this.players = allPlayers
        });
  }
}
</script>
