<template>
  <div >
    <Top></Top>
    <el-tabs :tab-position="'left'" style="height: 600px; ">
      <el-tab-pane label="家常小炒">
        <Menucontent></Menucontent>
      </el-tab-pane>
      <el-tab-pane label="爆辣川菜">
        <Menucontent></Menucontent>
      </el-tab-pane>
      <el-tab-pane label="饱腹主食">
        <Menucontent></Menucontent>
      </el-tab-pane>
      <el-tab-pane label="饭后甜点">
        <Menucontent></Menucontent>
      </el-tab-pane>
      <el-tab-pane label="可口饮品">
        <Menucontent></Menucontent>
      </el-tab-pane>
    </el-tabs>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from './public/top'
import Menucontent from './public/menucontent'
import Bottom from './public/bottom'
export default {
  name: 'Menu',
  components:{
    Bottom,
    Top,
    Menucontent
  },
  data() {
    return {
      
    };
  }
}
</script>

<style>

</style>
