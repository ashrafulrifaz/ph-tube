let loadData = async () => {
   let res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
   let data = await res.json()
   let tabItem = data.data

   let tabContainer = document.getElementById('tab-container')

   tabItem.forEach(item => {
      let btn = document.createElement('div')
      btn.innerHTML = `<button onclick="showPosts('${item.category_id}')" class="text-sm py-2 px-5 rounded bg-[#25252533] font-medium text-[#252525]">${item.category}</button>`;
      tabContainer.appendChild(btn)
      console.log(item);
   })

   showPosts()   
}

let showPosts = async (id = 1000) => {
   let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
   let data = await res.json();
   let posts = data.data
   console.log(posts);

   let postContainer = document.getElementById('post-container')
   postContainer.innerText = ''

   let verifyImg = document.getElementById('verify_img')

   posts.forEach(post => {
      let card = document.createElement('div')
      console.log(post);
      
      card.innerHTML = `
         <div class="relative">
            <img src="${post?.thumbnail}" class="rounded w-full h-44">
            <span class="text-[10px] text-white py-1 px-1.5 bg-[#171717] rounded absolute bottom-2.5 right-2.5">3hrs 56 min ago</span>
         </div>
         <div class="flex pt-5 gap-2">
            <img src="${post.authors[0]?.profile_picture}" class="w-10 h-10 rounded-full">
            <div>
               <h6 class="text-[#171717] text-[15px] font-semibold leading-normal">Building a Winning UX Strategy Using the Kano Model</h6>
               <p class="items-center my-1.5 text-sm text-[#171717B2] flex gap-1.5">${post.authors[0]?.profile_name} <span id="verify_img"><img src="img/fi_10629607.png"></span></p>
               <p class="text-sm text-[#171717B2]">${post.others.views}</p>
            </div>
         </div>
      `
      // if(!!post.authors[0].verified){
      //    verifyImg.classList.add('inline')
      //    verifyImg.classList.remove('hidden')
      // } else {
      //    verifyImg.classList.remove('inline')
      //    verifyImg.classList.add('hidden')
      // }
      postContainer.appendChild(card)
   })
}

loadData()