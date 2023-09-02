let loadData = async () => {
   let res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
   let data = await res.json()
   let tabItem = data.data

   let tabContainer = document.getElementById('tab-container')

   tabItem.forEach(item => {
      let btn = document.createElement('div')
      btn.innerHTML = `<button onclick="loadVideos('${item.category_id}')" class="text-sm py-1.5 md:py-2 px-3 lg:px-5 rounded bg-[#25252533] font-medium text-[#252525]">${item.category}</button>`;
      tabContainer.appendChild(btn)
   })
   showPosts()
}

let postContainer = document.getElementById('post-container')

let allPosts = null;
const loadVideos = async (category_id=1000)=>{
   let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
   let data = await res.json();
   let posts = data.data;
   allPosts = posts;
   showPosts(posts);
}
let showPosts = (posts) => {
   shortData.style = 'color: #000; background-color: #25252533'

   let emptyContainer = document.getElementById('empty-posts-container')
   if(posts.length === 0){
      emptyContainer.classList.remove('hidden')
   } else {
      emptyContainer.classList.add('hidden')
   }

   postContainer.innerText = ''

   posts.forEach(post => {
      let card = document.createElement('div')
      card.innerHTML = `
         <div class="relative">
            <img src="${post?.thumbnail}" class="rounded w-full h-44">
            <div id="posted-date">
               <p class="text-[10px] text-white bg-[#171717] rounded absolute bottom-2.5 right-2.5 py-1 px-1.5">${getDate(post.others.posted_date)}</p>
            </div>
         </div>
         <div class="flex pt-5 gap-2">
            <img src="${post.authors[0]?.profile_picture}" class="w-10 h-10 rounded-full">
            <div>
               <h6 class="text-[#171717] text-md font-semibold leading-normal">${post.title}</h6>
               <p class="items-center my-1.5 text-sm text-[#171717B2] flex gap-1.5">${post.authors[0]?.profile_name} <span><img src="${post.authors[0]?.verified ? 'img/fi_10629607.png' : ''}"></span></p>
               <p class="text-sm text-[#171717B2]">${post.others.views}</p>
            </div>
         </div>
      `
      postContainer.appendChild(card)
      

      let timeDiv = card.childNodes[1].childNodes[3];
      if(post.others.posted_date !== "") {
         timeDiv.style.display = 'block'
      } else {
         timeDiv.style.display = 'none'
      };
   })   
}

loadVideos();
loadData()

function getDate(date){
   let hours = Math.floor(date / (60* 60))
   let minutes = Math.floor((date / 60) % 60)
   let postedDate = `${hours}hrs ${minutes} min ago`
   return postedDate
}

let shortData = document.getElementById('short-data')
shortData.addEventListener('click', function(){
   allPosts.sort((a, b) =>{
      let firstNum = a.others.views.split("K")[0]
      let secondNum = b.others.views.split("K")[0]
      return secondNum - firstNum
   });
   showPosts(allPosts);
   shortData.style = `color: #ffffff; background-color: #FF1F3D`
})

document.getElementById('btn-blog').addEventListener('click', function(){
   window.location.href = 'blog.html'
})