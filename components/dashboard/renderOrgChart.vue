<style>
.svg-chart-container {
  /* Change this height with same div ref */
  height: 500px !important;
}
</style>

<template>
  <div>
    <div ref="svgElementContainer" class="svg-chart-container"></div>
  </div>
</template>

<script>
export default {
  name: 'Chart',
  props: ['data'],
  data() {
    return {
      chartReference: null,
    }
  },
  watch: {
    data(value) {
      this.renderChart(value)
    },
  },
  created() {},
  methods: {
    renderChart(data) {
      new this.$d3org.OrgChart()
        .container(this.$refs.svgElementContainer)
        .data(data)
        .nodeHeight((d) => 85)
        .nodeWidth((d) => {
          return 220
        })
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 25)
        .compactMarginPair((d) => 50)
        .neightbourMargin((a, b) => 25)
        .siblingsMargin((d) => 25)
        .buttonContent(({ node, state }) => {
          return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
            node.children
              ? `<i class="fas fa-angle-up"></i>`
              : `<i class="fas fa-angle-down"></i>`
          }</span> ${node.data._directSubordinates}  </div>`
        })
        .nodeContent(function (d, i, arr, state) {
          const color = '#FFFFFF'
          return `
            <div style="font-family:'Inter',sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
                <img src="https://i.pravatar.cc/" style="position:absolute;margin-top:-20px;margin-left:${20}px;border-radius:100px;width:40px;height:40px;" />
               
                <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"><i class="fas fa-ellipsis-h"></i></div>

                <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> 
                    ${d.data.User.fullname} 
                </div>
              
                <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> 
                    ${d.data.positionName}
                </div>
           </div>  
           `
        })
        .render()
    },
  },
}
</script>
