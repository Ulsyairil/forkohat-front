<template>
  <v-container fluid class="pa-0">
    <v-img lazy-src="https://cdn.vuetifyjs.com/images/cards/cooking.png" max-height="500" max-width="2000"
      aspect-ratio="1" src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
    </v-img>

    <v-row class="mb-10 mx-10">
      <v-col>
        <h2 class="blue--text mt-10 mb-1">
          Wali Kota Rencanakan Vaksinasi Tahap I Termin II Dilaksanakan Pekan 4
        </h2>
        <h4 class="mb-10">Kamis, 24-11-2022</h4>

        <p align="justify" class="text-wrap">
          Satgas Covid-19 Kota Balikpapan menerima informasi bahwa Rabu
          (24/2/21) besok akan tiba vaksin untuk Kalimantan Timur (Kaltim) di
          Bandara Sepinggan. Diantaranya, ada jatah untuk Kota Balikpapan. Wali
          Kota Balikpapan, Rizal Effendi menjelaskan, jatah vaksin untuk
          Balikpapan adalah 8.900 dosis. Sebenarnya ini tadinya akan digunakan
          untuk dua kali suntikan sebanyak 4.450 orang. "Tapi hasil webinar
          Kepala Dinas Kesehatan (Dinkes) dengan pemerintah pusat, hampir 9
          ribuan vaksin ini bisa digunakan untuk vaksin pertama dulu," terang
          Wali Kota Rizal Effendi, Selasa (23/2/21). Untuk mempercepat
          pemerataan vaksinasi, sebanyak 8.900 dosis ini akan digunakan sebagai
          vaksin pertama untuk masyarakat yang terlah masuk data vaksinasi tahap
          dua. "Kita sudah diberi petunjuk, vaksin pertama akan dilakukan untuk
          45 orang anggota DPRD keseluruhan, pejabat negara, wali kota dan wakil
          wali kota, tokoh agama, pedagang pasar, guru, keamanan, ASN, dan
          lainnya yang sudah kita data," sebut Wali Kota Balikpapan. Jika
          keseluruhan vaksin yang datang besok bisa disuntikkan sebagai vaksin
          pertama, nanti persentasenya akan dihitung kembali. "Berapa untuk
          masing-masing, misal berapa tokoh agama, berapa pedagang. Kita siapkan
          tahap pertama untuk pedagang pasar klandasan dan pasar Pandansari
          dulu," katanya. Dengan rencana ini, ia berharap pekan 4 di bulan
          Februari vaksinasi sudah bisa dilaksanakan. "Kalau besok datang, kan
          ke provinsi dulu. Mungkin pembagiannya sekitar satu atau dua hari,"
          ujar Rizal. Jika kalau begitu kemungkinan vaksinasi tahap II termin II
          ini sudah bisa dilakukan. Seperti diketahui di termin satu vaksinasi
          dilakukan untuk tenaga kesehatan. "Kami berharap nanti kalau ada
          panggilan vaksin dari satgas, dinas kesehatan maupun Puskesmas, agar
          masyarakat datang. Karena nanti juga akan ada vaksinasi massal di
          Dome," terangnya. Selain itu, keseluruhan ada 51 tempat vaksinasi,
          yakni di fasilitas pelayanan kesehatan. Mulai Rumah Sakit, Puskesmas
          hingga klinik," terangnya. Sementara untuk pedagang pasar, akan
          mendapatkan vaksinasi di pasar. Nanti akan ada petugas atau tim yang
          membuat tenda di pasar. Ditambahkannya juga, Dinkes Ini juga masih
          menghitung siapa saja yang menjadi penerima vaksin tahap I termin II
          ini. Seperti diketahui, mereka yang menjadi prioritas vaksin adalah
          pekerja pelayanan publik. "Jadi kami diberi panduan, termasuk
          keamanan, guru, pedagang, dan lainnya," sebutnya. Ia mengakui, memang
          jumlah vaksin yang akan datang ini masih kurang untuk masyarakat
          Balikpapan. Sehingga, jika nanti ada masyarakat yang menolak vaksin,
          akan ditunda sementara. "Jadi kalau yang namanya masuk dalam daftar
          tapi menolak vaksin, akan kami berikan pada yang lain dahulu. Kan
          nanti bisa dilakukan edukasi lagi," katanya. Saat ini perjalanan
          hingga vaksinasi merata untuk seluruh masyarakat masih sangat panjang.
          Sehingga pihaknya akan mendahulukan yang bersedia divaksin. "Kalau
          tidak mau ya yang lain dulu. Nanti dialihkan saja. Masih 9 ribuan,
          padahal kebutuhan lebih 50 ribuan. Jadi tidak masalah. Tapi nanti
          kalau sudah terakhir baru kami akan tentukan sikap bagaimana yang
          benar-benar tidak mau divaksin," tuturnya. (diskominfo/
          cha/editor:mgm)
        </p>

        <v-btn-toggle v-model="toggle_multiple" color="primary" dense group multiple>
          <v-btn :value="1" text>
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn :value="2" text>
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn :value="3" text>
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn :value="4" text>
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-divider></v-divider>

        <v-card class="mt-5" max-width="700" elevation="0">
          <v-list-item three-line>
            <v-list-item-avatar size="90" color="grey">
              <v-img
                src="https://s3-alpha-sig.figma.com/img/a250/b257/e4f8c1748c7fd8377b47858cd87b307f?Expires=1670198400&Signature=HwIkYYSF~HBINGANPSdiTdXQCDKSTG2cn~~Hf8gIV3vBc08-l7id050DwDue3poN3UAwpHmlLJClrxYNbG9DDDllM1iGjuyorq1cc2uNhRvdCFyigSUGu~z5yWHSg6qUjwMqMYOikmIexpdXSG6x3Wid5BLzp09ItjtpHXSXHVZLRskxw~iqpsJZ8Kkg0sxZIA4Xd4cKSgnZBgaPEhXrNR9MwwUZHx63bbDRcwk5ZavXMIBikopnpnugPY09kp0rsVwkDs75PuakhjWdtzj79RIN5hfi2wwOLm4udUphl-mcyaFe1nKKt~iYsvwQvWp~QmUcUFTSUFX-cWUGxATE~g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="cyan--text font-weight-black">Penulis</v-list-item-subtitle>
              <v-list-item-subtitle class="blue--text font-weight-bold mt-1">Nadia Sonya</v-list-item-subtitle>
              <v-list-item-content class="font-weight-light text-justify">Nadia Sonya adalah lulusan Teknik Informatika
                dari Binus
                University yang saat ini menjadi salah satu Content Writer di
                Jakarta Smart City. Gemar mengamati isu transportasi, olahraga,
                teknologi dan sains, ia memulai karier Jurnalistik bersama media
                internasional Motorsport.com pada 2016-2019. Saat ini ia
                terfokus pada topik kesehatan, khususnya mengenai penanggulangan
                pandemi Covid-19 di wilayah DKI Jakarta.</v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      news: [],
    }
  },
  async fetch() {
    await this.initNews();
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
  },
}
</script>
