<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SteelMachine</span>
        <span class="font-weight-light">  FANTASY DRAFT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
       <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6"
              md="8"
            >
              <v-card
                class="pa-2"
                outlined
                tile
              >
                <AvailablePlayersTable />
              </v-card>
            </v-col>
            <v-col
              cols="6"
              md="4"
            >
              <v-card
                class="pa-2"
                outlined
                tile
              >
                <MyTeamTable />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import TeamTable  from './components/TeamTable';
import AddPlayer from './components/AddPlayer';
import AvailablePlayersTable from "./components/AvailablePlayersTable";
import MyTeamTable from './components/MyTeamTable';

export default {
  name: 'App',
  components: {
    HelloWorld,
    TeamTable,
    AddPlayer,
    AvailablePlayersTable,
    MyTeamTable
  },
  data: () => ({
    //
  }),
};
</script>
