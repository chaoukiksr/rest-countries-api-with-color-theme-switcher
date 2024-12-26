
let contriesDiv = document.getElementById('contriesDiv')
let resource = './data.json'
let itemsPerPage = 25
let currentPage = 1
let totalPages
let fetchData = async () =>{
  try {
     let response = await fetch('./data.json')
     let data = await response.json()
     return data
  } catch (error) {
   console.error(error)
   return []
  }
}

const rendre = (arr)=>{
   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const paginatedData = arr.slice(startIndex,endIndex)
   totalPages = Math.ceil(arr.length / itemsPerPage)
   console.log(paginatedData)
   contriesDiv.innerHTML = ""

   paginatedData.forEach(country => {
      contriesDiv.innerHTML += `
       <div class="col-8 col-sm-6 col-md-4 col-lg-3 mb-3">
               <div class="card">
                     <img src="${country.flags.svg}"class="card-img-top countryImg" alt="bg-missing" />
                     <div class="card-body">
                       <h5 class="card-title"><strong>${country.name}</strong></></h5>

                       <ul class="list-unstyled">
                        <li><span class="label">Population</span>: <span class="value">${country.population}</span></li>
                        <li><span class="label">Region</span>: <span class="value">${country.region}</span></li>
                        <li><span class="label">Capitale</span>: <span class="value">${country.capital}</span></li>
                       </ul>

                     </div>
                   </div>
            </div>

      `
   });
}

const initialRendre = async () =>{
  try {
     let data = await fetchData()
     console.log(data)
     rendre(data)
  } catch (error) {
   console.error(error)
  }
}

initialRendre()







let countrySearchInput = document.getElementById('countrySearchInput')

countrySearchInput.addEventListener('keyup',async ()=>{
   if(countrySearchInput.value.length == 0){
      initialRendre()
   }
   let data = await fetchData(resource)

   let filterData = data.filter(c=>c.name.toLowerCase().startsWith(countrySearchInput.value.toLowerCase()))
   
   rendre(filterData)
  
   console.log(filterData)
   // return filtredData


})

const updateButtonStates = () =>{
   if(currentPage==1){
      previous.disabled = true
      previous.classList.add('disabled')
   }

   if(currentPage ==totalPages){
      next.disabled = true
      next.classList.add('disabled')
      previous.disabled = false
      previous.classList.remove('disabled')
   }

   if(currentPage > 1 && currentPage <totalPages){
      previous.disabled = false
      next.disabled = false
      next.classList.remove('disabled')
      previous.classList.remove('disabled')
      
   }
} 
const updateView =async ()=>{
   let data = await fetchData()
   rendre(data)
   pageNumber.innerHTML = currentPage
   updateButtonStates()
}
let previous = document.getElementById('previous')
let pageNumber = document.getElementById('pageNumber')
let next = document.getElementById('next')


previous.addEventListener('click', async () => {
   if(currentPage ==1){
      previous.classList.add('desabled')
   }
      currentPage--
      await updateView()
   } 
)
next.addEventListener('click', async () => {
   if(currentPage <= totalPages-1){
      currentPage++
      await updateView()
   }
})
let continentSelect = document.getElementById('continentSelect')
continentSelect.addEventListener('change',async()=>{
   // console.log(continentSelect.value)
   let value = continentSelect.value
   if(!value){
      initialRendre()
   }

   let data = await fetchData(resource)
   let filtredData = data.filter(c=>c.region==value)
   rendre(filtredData)
})
