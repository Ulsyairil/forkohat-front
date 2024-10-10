<template>
    <v-container fluid>
        <div class="text-center mt-10 mb-10">
            <h1>Berita</h1>
            <hr style="width:150px; margin: auto;" class="mt-1 teal" />
        </div>
        <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page.sync="page" :search="search"
            :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer class="mx-5">
            <template v-slot:header>
                <v-toolbar dark color="blue darken-3" class="mb-1">
                    <v-text-field v-model="search" clearable flat solo-inverted hide-details
                        prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
                </v-toolbar>
            </template>

            <template v-slot:default="props">
                <v-row class="mx-1 mb-5">
                    <!-- <v-col v-for="item in props.items" :key="item.title" cols="12" sm="6" md="4" lg="4" class="mt-5">
                        <v-card :loading="loading" class="mx-auto d-flex flex-column" max-width="400" height="100%">
                            <v-img :src="`${$axios.defaults.baseURL}/file/${item.image_mime}/${item.image_name}`" class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                            </v-img>
                                <v-card-subtitle> {{ item.created_at }}</v-card-subtitle>
                                
                                <v-card-title> {{ item.title }} </v-card-title>
                                
                                <v-card-subtitle class="text-justify">
                                    {{
                                    item.content.substring(0, 250) + '...........'
                                    }}</v-card-subtitle>
                                
                                <v-card-actions>
                                    <v-btn text color="teal accent-4" @click="reveal = true" :to="`/news/${item.id}`">
                                        Selengkapnya
                                    </v-btn>
                                </v-card-actions>
                        </v-card>
                    </v-col> -->

                    <v-col v-for="item in props.items" :key="item.title" cols="12" sm="12" md="4" lg="4" class="mt-5">
                        <v-card class="mx-auto d-flex flex-column" max-width="400" height="100%">
                            <template slot="progress">
                                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                            </template>

                            <div class="image-container">
                                <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                            </div>

                            <v-card-title>{{ item.title }}</v-card-title>

                            <v-card-text class="flex-grow-1">
                                <div class="text-subtitle-1">{{ item.created_at }}</div>
                                <div>
                                    {{
                                        item.content.substring(0, 150) + '...........'
                                    }}
                                </div>
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                            <v-card-actions>
                                    <v-btn text color="teal accent-4" @click="reveal = true" :to="`/news/${item.id}`">
                                        Selengkapnya
                                    </v-btn>
                                </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                    <span class="grey--text">Items per page</span>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                                {{ itemsPerPage }}
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index"
                                @click="updateItemsPerPage(number)">
                                <v-list-item-title>{{ number }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <span class="mr-4
            grey--text">
                        Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>
    </v-container>
</template>

<script>
export default {
    layout: 'default',
    data() {
        return {
            news: [],
            itemsPerPageArray: [3, 6, 9, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 3,
            sortBy: 'name',
            items: [],
        }
    },
    async fetch() {
        await this.initNews();
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.items.length / this.itemsPerPage)
        },
        filteredKeys() {
            return this.keys.filter(key => key !== 'Name')
        },
    },
    methods: {
        async initNews() {
            let payload = {
                page: 1,
                limit: 9,
                order: 'desc',
                trash: false,
            }
            const response = await this.$store.dispatch('publicMain/news', payload)
            this.items = response.data.data
            console.log(response.data)
            console.log(this.items)
        },

        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
    },
}
</script>