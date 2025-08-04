import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import confetti from "./components/confetti.vue"
import HomeUnderline from "./components/HomeUnderline.vue"
import { watch } from "vue";
let homePageStyle: HTMLStyleElement | undefined
export default {
  extends: DefaultTheme,
  enhanceApp({app,router}) { // [!code focus:4]
    // 注册全局组件
    app.component('confetti' , confetti)
    app.component('HomeUnderline' , HomeUnderline)

    if (typeof window !== 'undefined') {
        watch(
          () => router.route.data.relativePath,
          () => updateHomePageStyle(location.pathname === '/'), // 这里需要注意下自己的首页路径是否为 / 
          { immediate: true },
        )
      }
  }

};
// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
    if (value) {
      if (homePageStyle) return
  
      homePageStyle = document.createElement('style')
      homePageStyle.innerHTML = `
      :root {
        animation: rainbow 12s linear infinite;
      }`
      document.body.appendChild(homePageStyle)
    } else {
      if (!homePageStyle) return
  
      homePageStyle.remove()
      homePageStyle = undefined
    }
  }