const areas = {
  east: { eyebrow:"01 · 日出海岸", title:"济州东线", intro:"最适合第一次到济州的经典路线：牛岛、城山日出峰、涉地可支、月汀里与咸德。四人同行建议包车或乘大型出租车，减少换乘。", view:"城山日出峰", stay:"咸德 Ebenezer 酒店", food:"景美家海鲜拉面", image:"jeju-view-3.webp", query:"Seongsan Ilchulbong Jeju" },
  west: { eyebrow:"02 · 日落公路", title:"济州西线", intro:"适合慢慢逛的一天：涯月咖啡街、挟才海水浴场、翰林公园、风车海岸与雪绿茶博物馆，把傍晚留给西海岸日落。", view:"挟才海水浴场", stay:"涯月 Hidden Hill 酒店", food:"涯月带鱼锅", image:"jeju-view-1.webp", query:"Hyeopjae Beach Jeju" },
  south: { eyebrow:"03 · 玄武岩与瀑布", title:"济州南线", intro:"自然景观与度假酒店最集中的区域：中文旅游区、柱状节理带、西归浦每日偶来市场、独立岩与正房瀑布。", view:"柱状节理带", stay:"中文区济州新罗酒店", food:"西归浦每日偶来市场", image:"jeju-view-2.webp", query:"Jusangjeolli Cliff Jeju" },
  city: { eyebrow:"04 · 轻松抵达", title:"济州市区", intro:"离机场最近、餐饮选择最多，也方便参加一日游。四人乘一辆大型出租车分摊车费，通常比各自换乘巴士更省心。", view:"道头峰与彩虹海岸公路", stay:"济州君悦酒店", food:"24小时土豆脊骨汤", image:"jeju-view-4.webp", query:"Dodubong Peak Jeju" }
};

const photo = document.querySelector("#area-photo");
const fields = ["eyebrow","title","intro","view","stay","food"];
function selectArea(key) {
  const area = areas[key];
  document.querySelectorAll("[data-area]").forEach((button) => {
    const active = button.dataset.area === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  fields.forEach((field) => document.querySelector(`#area-${field}`).textContent = area[field]);
  photo.style.backgroundImage = `url("${area.image}")`;
  photo.setAttribute("aria-label", `${area.title}海岸风景`);
  document.querySelector("#area-map").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(area.query)}`;
}
document.querySelectorAll("[data-area]").forEach((button) => button.addEventListener("click", () => selectArea(button.dataset.area)));
selectArea("east");

const saved = new Set();
document.querySelectorAll("[data-save]").forEach((button) => button.addEventListener("click", () => {
  const name = button.dataset.save;
  saved.has(name) ? saved.delete(name) : saved.add(name);
  button.textContent = saved.has(name) ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(saved.has(name)));
  const lead = saved.size ? `已收藏 ${saved.size} 家` : "收藏适合我们的住宿";
  document.querySelector("#save-status").textContent = `${lead}。价格变化较快，预订两间房前请比较房型、连通房选项、取消政策与近期评价。`;
}));

document.querySelectorAll("[data-share]").forEach((button) => button.addEventListener("click", async () => {
  try {
    if (navigator.share) await navigator.share({ title: document.title, url: location.href });
    else await navigator.clipboard.writeText(location.href);
    const original = button.textContent;
    button.textContent = "链接已准备 ✓";
    setTimeout(() => button.textContent = original, 1800);
  } catch {}
}));
