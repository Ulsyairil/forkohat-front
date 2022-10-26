<template>
  <v-container>
    <div class="text-center mt-15 mb-15">
      <h1>Tatanan</h1>
    </div>

    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Lorem Ipsum
              </v-list-item-title>
              <v-list-item-subtitle
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam sed euismod diam. Cras porta mattis viverra. Morbi
                tincidunt sed dui vel malesuada. Nam id ligula quis nisi
                venenatis bibendum ut et dui. Nunc lobortis dolor nec volutpat
                luctus. Aenean nunc dui, condimentum nec porta nec, lobortis eu
                leo.</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="120"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text> Preview </v-btn>
            <v-btn outlined rounded text> Kegiatan </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Lorem Ipsum
              </v-list-item-title>
              <v-list-item-subtitle
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam sed euismod diam. Cras porta mattis viverra. Morbi
                tincidunt sed dui vel malesuada. Nam id ligula quis nisi
                venenatis bibendum ut et dui. Nunc lobortis dolor nec volutpat
                luctus. Aenean nunc dui, condimentum nec porta nec, lobortis eu
                leo.</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="120"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text> Preview </v-btn>
            <v-btn outlined rounded text> Kegiatan </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Lorem Ipsum
              </v-list-item-title>
              <v-list-item-subtitle
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam sed euismod diam. Cras porta mattis viverra. Morbi
                tincidunt sed dui vel malesuada. Nam id ligula quis nisi
                venenatis bibendum ut et dui. Nunc lobortis dolor nec volutpat
                luctus. Aenean nunc dui, condimentum nec porta nec, lobortis eu
                leo.</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="120"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text> Preview </v-btn>
            <v-btn outlined rounded text> Kegiatan </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  }),
}
</script>
