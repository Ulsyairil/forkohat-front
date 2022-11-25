<template>
    <v-container fluid class="pa-0">
        <v-img lazy-src="https://cdn.tmpo.co/data/2020/02/07/id_913062/913062_720.jpg" max-height="500" max-width="2000"
            aspect-ratio="1" src="https://cdn.tmpo.co/data/2020/02/07/id_913062/913062_720.jpg">
        </v-img>

        <v-row class="mb-10">
            <v-col cols="12" class="mb-5">
                <div class="text-center mt-10 mb-10">
                    <h1>Berita</h1>
                    <hr style="width:150px; margin: auto;" class="mt-1 teal" />
                </div>
                <v-row class="mx-5">
                    <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                        <v-card>
                            <v-img :src="card.src" class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                <v-card-title v-text="card.title"></v-card-title>
                            </v-img>

                            <v-card-title> Top western road trips </v-card-title>

                            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                            <v-card-actions>
                                <v-btn text color="teal accent-4" @click="reveal = true">
                                    Selengkapnya
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <div class="text-center mt-10 mb-10">
                    <v-btn color="primary" elevation="6" large>Lihat Berita Lainnya</v-btn>
                </div>
            </v-col>

            <v-col cols="12">
                <div class="text-center mt-10">
                    <h1>Protokol Kesehatan</h1>
                    <hr style="width:150px; margin: auto;" class="mt-1 teal" />
                </div>

                <div class="d-flex flex-column justify-space-between align-center">
                    <v-img contain max-height="550" max-width="550"
                        src="https://s3-alpha-sig.figma.com/img/154f/9173/00f6c976b3393f8eab4afe0912e9cefd?Expires=1670198400&Signature=MiF5DkCA~hmn5zo3-mlHrA5SjGGNtMLpxnJBb-MKXue1kh5WCBpIyvL9IL0jnkTHPfJboasytZlvDyDNSeuJJHrxgknvnEvTEctdqY2Gx-LvyCM~G84bbF2kak5T6MnE7yAsT0nmX5g-YDxn9zTw-~BrRH0FmIbwcZ15Muoiwy3UXEaXvzjCTQZ1rVTFPLaX1FrExb1P0NeMfP59DiNKlh3qFEW6QPH8HMzAIsD1WETPcvuza-1CP-TDNPrP8iw4k658OVEDwQ-WgDXL2BC-dBmPBBnzHG9b43bGDoLYTGt51ak16RLbGoDD-WqMKBJms-lJDCAyDI1g2XEwq~yPvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA">
                    </v-img>
                </div>
            </v-col>

            <v-col cols="12">
                <div class="text-center mt-5 mb-10">
                    <h1>Event</h1>
                    <hr style="width:150px; margin: auto;" class="mt-1 teal" />
                </div>
                <v-row class="mx-5">
                    <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                        <v-card>
                            <v-img :src="card.src" class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                <v-card-title v-text="card.title"></v-card-title>
                            </v-img>

                            <v-card-title> Top western road trips </v-card-title>

                            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                            <v-card-actions>
                                <v-btn text color="teal accent-4" @click="reveal = true">
                                    Selengkapnya
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <div class="text-center mt-10 mb-10">
                    <v-btn color="primary" elevation="6" large>Lihat Berita Lainnya</v-btn>
                </div>
            </v-col>

            <v-col cols="12">
                <div class="text-center mt-10 mb-10">
                    <h1>Partner</h1>
                    <hr style="width:150px; margin: auto;" class="mt-1 teal" />
                </div>

                <v-row class="mx-5">
                    <v-col class="d-flex child-flex" cols="4">
                        <v-img contain max-height="400" max-width="400"
                            src="https://s3-alpha-sig.figma.com/img/08b1/9a7a/47a87e230718d373d5f9b030e94aa540?Expires=1670198400&Signature=KljdwGTK-8sj-oGIME865Bc6AKydMqsSGBGoBL7iTHRZSeLteGOUpwqGx3csFKH1Bh2NFDc2GHj69VpO0~YiTg5~rwP7PgUtRKtAlQPlCiTpZeKjWNatWYktFxluNHhirQzUm3glkqOyQ~ywMjhZ4KaE1lkSeIg6FAoshBlhMRuV1u7IFr1oVur2ept7mqexkJuabrzmvDwDnfpaJXYX5KT7wgqShBcbJ8lqgvhrgGE8h-zJwK6NHnvQZ52C9eqyW~O04Arl76pIHdsHS91hSUWV5sc~Hw~-q2ggZ0pouiNIaKtn77Ewu4napPoabHBu3mDQsYY7TbxjtCYgJ5qwsw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA">
                        </v-img>
                    </v-col>
                    <v-col class="d-flex child-flex" cols="4">
                        <v-img contain max-height="400" max-width="400"
                            src="https://s3-alpha-sig.figma.com/img/c72b/564b/e91d4e0eca99f67bab46979b864a29a9?Expires=1670198400&Signature=IhaF4LXrY3BSa1Phwub0RYyfp3JcNw5PC0FOz8l0IYbYdCi1vY6OAFE7~VSB28advFlu4PJuRoEAS9mfRfoduKFNa9qqZvH4LOC330uh917u-dVWCKqistqldbOKkgq6qzdjms3HdOprDSTQS067RMwsaVrmuTHRX4Z2rO498YCPDP3cB6a04TZNKpbZ~~jBsGdp-T-vDKB3XmFRxhChLDptMfbnn5EclY3ZO2Tjn7V4ez4tiCvntgFmt8KEgPkqxyLSWfqZ1kov3O65KDLo6rYGCXp8MIrs1fdTz1MqNsR65O4QEq9zXrmDYY9WQoUAbUaiKtJ1RDCyiVuQAlfyHQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA">
                        </v-img>
                    </v-col>
                    <v-col class="d-flex child-flex" cols="4">
                        <v-img contain max-height="400" max-width="400"
                            src="https://s3-alpha-sig.figma.com/img/c72b/564b/e91d4e0eca99f67bab46979b864a29a9?Expires=1670198400&Signature=IhaF4LXrY3BSa1Phwub0RYyfp3JcNw5PC0FOz8l0IYbYdCi1vY6OAFE7~VSB28advFlu4PJuRoEAS9mfRfoduKFNa9qqZvH4LOC330uh917u-dVWCKqistqldbOKkgq6qzdjms3HdOprDSTQS067RMwsaVrmuTHRX4Z2rO498YCPDP3cB6a04TZNKpbZ~~jBsGdp-T-vDKB3XmFRxhChLDptMfbnn5EclY3ZO2Tjn7V4ez4tiCvntgFmt8KEgPkqxyLSWfqZ1kov3O65KDLo6rYGCXp8MIrs1fdTz1MqNsR65O4QEq9zXrmDYY9WQoUAbUaiKtJ1RDCyiVuQAlfyHQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA">
                        </v-img>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    cards: [
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 4,
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 4,
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 4,
      },
    ],
    items: [
      {
        src: 'https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2021/10/20/1040466642.jpg',
      },
      {
        src: 'https://explore.makassarkota.go.id/wp-content/uploads/2022/03/DSC_1379-1-2048x1356.jpg',
      },
      {
        src: 'https://asset.kompas.com/crops/UuJ3c5sXX0Y-4X3NRrAAWbKrpDI=/84x4:1139x532/750x500/data/photo/2020/02/05/5e3ac50f06746.jpeg',
      },
      {
        src: 'https://portalbalikpapan.com/wp-content/uploads/2019/08/talkshow_baf_fair_2019.jpg',
      },
    ],
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
}
</script>
