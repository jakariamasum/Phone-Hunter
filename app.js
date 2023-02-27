const container=document.getElementById('container');
const searchBtn=document.getElementById('search-btn');
const loadData=(name)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${name}`;
   // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>showPhones(data.data))
}

 loadData('a')
const showPhones=(phones)=>{
    //console.log(phones)
    if(phones.length===0)
    document.getElementById('err').classList.remove('hidden'); 
    else{
        document.getElementById('err').classList.add('hidden');
     }
    container.innerText=''
    for(const phone of phones){
        // console.log(phone)
        // modalValues(phone.slug)
        const div=document.createElement('div'); 
        div.innerHTML=`
        <div class="card card-compact w-full bg-base-100 shadow-xl px-6 py-3">
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body ">
                <h2 class="card-title text-sky-600">${phone.phone_name}</h2>
                  <p>Brand: ${phone.brand}</p>
                  <div class="card-actions justify-end">
                  <label for="my-modal" class="btn" onclick="ShowModal('${phone.slug}')">open modal </label>
                  <button class="btn btn-primary" >Buy Now</button>
                  </div>
                </div>
              </div>
              `
              container.appendChild(div);
            }
    toggleBar(false)
}

const searchByName=()=>{
    toggleBar(true)
    container.innerText=''
    const searchValue=document.getElementById('search-value').value;
    loadData(searchValue);
}

document.getElementById('search-value').addEventListener('keypress',(e)=>{
    const searchValue=document.getElementById('search-value').value;
    if(e.key==='Enter')
    {
        loadData(searchValue)
        container.innerText=''
        toggleBar(true)
    }
})


const  toggleBar=(data)=>{
    const toggle=document.getElementById('load')
    if(data)
    toggle.classList.remove('hidden');
    else{
        toggle.classList.add('hidden')
    }
}


const ShowModal=(data)=>{
    // console.log(data)
    const url=`https://openapi.programming-hero.com/api/phone/${data}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>addToModal(data.data))
}

const addToModal=(data)=>{
    document.getElementById('modal-title').innerText=data.name;
    document.getElementById('modal-body').innerHTML=`
    <ul class="text-1.5xl">
    <li>Main Features: ${data.mainFeatures.displaySize}</li>
    <li>Memory: ${data.mainFeatures.memory}</li>
    <li>Storage: ${data.mainFeatures.storage}</li>
    <li>ChipSet: ${data.mainFeatures.chipSet}</li>
    <li>Release Date: ${data.releaseDate}</li>
    </ul>
    `
}
