<template>
  <v-container>
        <v-card flat>
            <v-card-title class="align-end fill-height">Add New Player</v-card-title>
                <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                >
                    <v-text-field
                        v-model="name"
                        :counter="50"
                        :rules="nameRules"
                        label="Player Name"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="team"
                        :rules="teamRules"
                        label="Team Name"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="bye"
                        label="Bye Week"
                        :rules="byeRules"
                        required
                    ></v-text-field>

                    <v-select
                        v-model="position"
                        :items="items"
                        :rules="[v => !!v || 'Item is required']"
                        label="Position"
                        required
                    ></v-select>


                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="addPlayer"
                    >
                        Add Player
                    </v-btn>

                </v-form>
        </v-card>
  </v-container>
</template>

<script>
 export default {
    name: "AddPlayer",
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      bye: '',
      byeRules: [
          bye => !!bye || "Bye is required",
          bye => (bye && bye.length < 2) || 'Bye must be 1 character',
          bye => !(isNaN(bye)) || 'Bye must be a number'
      ],
      teamRules: [
          team => !!team || "Team name is required",
          team => (team && team.length < 4) || "Team must be 3 characters or less",
          team => !(/\d/.test(team)) || "Team must only be characters - no numbers"
      ],
      team: '',
      position: null,
      items: [
        'QB',
        'RB',
        'WR',
        'TE',
        'DEF',
        'K',
      ],
      lazy: false,
      rank: 1
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      addPlayer() {
          const newPlayer = {
              rank: this.rank,
              name: this.name,
              team: this.team,
              bye: this.bye,
              position: this.position
          }

          console.log(newPlayer);

          
      }
    },
  }
</script>
