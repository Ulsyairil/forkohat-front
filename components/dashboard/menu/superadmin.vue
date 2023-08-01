<template>
  <div>
    <v-list nav v-for="list in lists" :key="list.index">
      <template v-if="list.group === true">
        <v-list-group
          v-for="item in list.items"
          :key="item.index"
          :v-model="item.value"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subitem in item.subitems"
            :key="subitem.index"
            :to="subitem.to"
            router
          >
            <v-list-item-action>
              <v-icon>{{ subitem.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="subitem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <template v-else>
        <v-list-item
          v-for="item in list.items"
          :key="item.index"
          :to="item.to"
          router
          exact-path
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          group: false,
          items: [
            {
              icon: 'dashboard',
              title: 'Beranda',
              to: '/dashboard/superadmin',
            },
            {
              icon: 'newspaper',
              title: 'Berita',
              to: '/dashboard/superadmin/berita',
            },
            {
              icon: 'live_help',
              title: 'FAQ',
              to: '/dashboard/superadmin/faq',
            },
          ],
        },
        {
          group: true,
          items: [
            {
              value: false,
              icon: 'south_america',
              title: 'Program',
              subitems: [
                {
                  icon: '',
                  title: 'Umum',
                  to: '/dashboard/superadmin/umum',
                },
                {
                  icon: '',
                  title: 'Wilayah',
                  to: '/dashboard/superadmin/program',
                },
              ],
            },
            {
              value: false,
              icon: 'group',
              title: 'Pengguna',
              subitems: [
                {
                  icon: '',
                  title: 'Daftar Pengguna',
                  to: '/dashboard/superadmin/user',
                },
                {
                  icon: '',
                  title: 'Aturan',
                  to: '/dashboard/superadmin/aturan',
                },
              ],
            },
            {
              value: false,
              icon: 'image',
              title: 'Gambar',
              subitems: [
                {
                  icon: '',
                  title: 'Carousel',
                  to: '/dashboard/superadmin/image/carousel',
                },
                {
                  icon: '',
                  title: 'Galeri',
                  to: '/dashboard/superadmin/image/galeri',
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
